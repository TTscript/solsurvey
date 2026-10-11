import { NextRequest, NextResponse } from "next/server";
import { Connection } from "@solana/web3.js";
import { getSurvey, hasSubmitted, addSubmission, isSurveyLive } from "@/lib/survey-store";
import { verifyWallet } from "@/lib/verify-wallet";
import { sendSolPayout } from "@/lib/payout";
import { RPC_URL } from "@/lib/constants";
import { userFacingError } from "@/lib/errors";
import { canAcceptPaidResponse } from "@/lib/survey-stats";
import { clientIp, rateLimit } from "@/lib/rate-limit";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const ip = clientIp(request);
  const limited = rateLimit(`submit:${ip}`, 10, 60 * 1000);
  if (!limited.ok) {
    return NextResponse.json(
      { error: userFacingError("Too many requests. Rate limit exceeded.") },
      { status: 429, headers: { "Retry-After": String(limited.retryAfterSec) } },
    );
  }

  try {
    const { id } = await params;
    const survey = getSurvey(id);
    if (!survey) {
      return NextResponse.json(
        { error: userFacingError("Survey not found") },
        { status: 404 },
      );
    }

    const body = await request.json();
    const { walletAddress, answers } = body;

    if (!walletAddress || !answers) {
      return NextResponse.json(
        { error: "Connect your wallet and answer all required questions." },
        { status: 400 },
      );
    }

    if (!isSurveyLive(survey)) {
      return NextResponse.json(
        { error: "This survey is not live yet—the creator still needs to fund the reward pool." },
        { status: 400 },
      );
    }

    if (hasSubmitted(id, walletAddress)) {
      return NextResponse.json(
        { error: userFacingError("You have already submitted this survey") },
        { status: 400 },
      );
    }

    if (!canAcceptPaidResponse(survey)) {
      return NextResponse.json(
        { error: userFacingError("Survey reward pool is exhausted") },
        { status: 400 },
      );
    }

    const connection = new Connection(RPC_URL);

    const verification = await verifyWallet(connection, walletAddress);
    if (!verification.success) {
      return NextResponse.json(
        { error: userFacingError(verification.reason || "Wallet verification failed") },
        { status: 400 },
      );
    }

    const payout = await sendSolPayout(
      connection,
      walletAddress,
      survey.rewardPerResponseLamports,
    );

    if (!payout.success) {
      return NextResponse.json(
        { error: userFacingError(payout.error || "Payout failed") },
        { status: 500 },
      );
    }

    addSubmission({
      surveyId: id,
      walletAddress,
      answers,
      submittedAt: new Date().toISOString(),
      payoutSignature: payout.signature,
    });

    const explorerUrl = `https://solscan.io/tx/${payout.signature}${RPC_URL.includes("devnet") ? "?cluster=devnet" : ""}`;

    return NextResponse.json({
      success: true,
      message: "Survey submitted! Reward sent to your wallet.",
      signature: payout.signature,
      explorerUrl,
    });
  } catch (err) {
    console.error("Submit survey error:", err);
    return NextResponse.json(
      { error: userFacingError(err instanceof Error ? err.message : "Submission failed") },
      { status: 500 },
    );
  }
}
