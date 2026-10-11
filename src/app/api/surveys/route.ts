import { NextRequest, NextResponse } from "next/server";
import { createSurvey, listActiveSurveys, listSurveysByCreator } from "@/lib/survey-store";
import { userFacingError } from "@/lib/errors";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { getVaultPublicKey } from "@/lib/vault";
import { getSurveyStats } from "@/lib/survey-stats";
import type { Survey, SurveyListItem, SurveyQuestion } from "@/lib/types";

const LAMPORTS_PER_SOL = 1e9;

function toListItem(survey: Survey): SurveyListItem {
  const { manageToken: _t, fundSignature: _f, createdBy: _c, questions, ...rest } = survey;
  return {
    ...rest,
    questionCount: questions.length,
    stats: getSurveyStats(survey),
  };
}

export async function GET(request: NextRequest) {
  const creator = request.nextUrl.searchParams.get("creator");

  if (creator) {
    const surveys = listSurveysByCreator(creator).map(toListItem);
    return NextResponse.json({ surveys });
  }

  const surveys = listActiveSurveys().map(toListItem);
  return NextResponse.json({ surveys });
}

export async function POST(request: NextRequest) {
  const ip = clientIp(request);
  const limited = rateLimit(`create:${ip}`, 20, 60 * 60 * 1000);
  if (!limited.ok) {
    return NextResponse.json(
      { error: userFacingError("Too many requests. Rate limit exceeded.") },
      { status: 429, headers: { "Retry-After": String(limited.retryAfterSec) } },
    );
  }

  try {
    const body = await request.json();
    const {
      title,
      description,
      questions,
      rewardPerResponseSol,
      totalRewardPoolSol,
      createdBy,
    } = body;

    if (!createdBy || typeof createdBy !== "string") {
      return NextResponse.json(
        { error: "Connect your wallet before publishing a survey." },
        { status: 400 },
      );
    }

    if (!title || !Array.isArray(questions) || questions.length === 0) {
      return NextResponse.json(
        { error: "Add a title and at least one question." },
        { status: 400 },
      );
    }

    const rewardPerResponseLamports = Math.round(
      (Number(rewardPerResponseSol) || 0.01) * LAMPORTS_PER_SOL,
    );
    const totalRewardPoolLamports = Math.round(
      (Number(totalRewardPoolSol) || 0.1) * LAMPORTS_PER_SOL,
    );

    if (rewardPerResponseLamports <= 0 || totalRewardPoolLamports <= 0) {
      return NextResponse.json(
        { error: "Reward amounts must be greater than zero." },
        { status: 400 },
      );
    }

    if (totalRewardPoolLamports < rewardPerResponseLamports) {
      return NextResponse.json(
        { error: "Total pool must cover at least one reward payout." },
        { status: 400 },
      );
    }

    const validatedQuestions: SurveyQuestion[] = questions.map(
      (q: { type?: string; text?: string; required?: boolean; options?: string[] }, i: number) => ({
        id: `q${i}`,
        type: (q.type || "text") as "text" | "single" | "multiple",
        text: q.text || "",
        required: q.required !== false,
        options: q.options ?? [],
      }),
    );

    const survey = createSurvey({
      title,
      description: description || "",
      questions: validatedQuestions,
      rewardPerResponseLamports,
      totalRewardPoolLamports,
      createdBy,
    });

    const vaultPublicKey = getVaultPublicKey();
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || request.nextUrl.origin;

    return NextResponse.json({
      survey,
      surveyUrl: `${appUrl}/survey/${survey.id}`,
      resultsUrl: `${appUrl}/survey/${survey.id}/results?token=${survey.manageToken}`,
      vaultPublicKey,
      fundAmountSol: totalRewardPoolLamports / LAMPORTS_PER_SOL,
      message: "Survey draft created. Fund the pool from your connected wallet to go live.",
    });
  } catch (err) {
    console.error("Create survey error:", err);
    return NextResponse.json(
      { error: userFacingError(err instanceof Error ? err.message : "Failed to create survey") },
      { status: 500 },
    );
  }
}
