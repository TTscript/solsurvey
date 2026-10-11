import { NextRequest, NextResponse } from "next/server";
import { getSurveyByToken, getSubmissions } from "@/lib/survey-store";
import { userFacingError } from "@/lib/errors";
import { getSurveyStats } from "@/lib/survey-stats";
import { clientIp, rateLimit } from "@/lib/rate-limit";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const ip = clientIp(request);
  const limited = rateLimit(`results:${ip}`, 60, 60 * 1000);
  if (!limited.ok) {
    return NextResponse.json(
      { error: userFacingError("Too many requests. Rate limit exceeded.") },
      { status: 429 },
    );
  }

  const { id } = await params;
  const token = request.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Access denied." }, { status: 401 });
  }

  const survey = getSurveyByToken(id, token);
  if (!survey) {
    return NextResponse.json({ error: "Survey not found or invalid access link." }, { status: 404 });
  }

  const submissions = getSubmissions(id);
  const stats = getSurveyStats(survey);
  const { manageToken: _token, ...publicSurvey } = survey;

  return NextResponse.json({
    survey: publicSurvey,
    stats,
    submissions: submissions.map((s) => ({
      walletAddress: s.walletAddress,
      answers: s.answers,
      submittedAt: s.submittedAt,
      payoutSignature: s.payoutSignature,
      explorerUrl: s.payoutSignature
        ? `https://solscan.io/tx/${s.payoutSignature}${
            process.env.NEXT_PUBLIC_RPC_URL?.includes("devnet") ? "?cluster=devnet" : ""
          }`
        : undefined,
    })),
  });
}
