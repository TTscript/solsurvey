import { NextRequest, NextResponse } from "next/server";
import { Connection } from "@solana/web3.js";
import { RPC_URL } from "@/lib/constants";
import { userFacingError } from "@/lib/errors";
import { toPublicSurvey } from "@/lib/public-survey";
import { getSurvey, updateSurvey } from "@/lib/survey-store";
import { verifyPoolFunding } from "@/lib/verify-funding";
import { getVaultPublicKey } from "@/lib/vault";
import { clientIp, rateLimit } from "@/lib/rate-limit";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const ip = clientIp(request);
  const limited = rateLimit(`fund:${ip}`, 30, 60 * 60 * 1000);
  if (!limited.ok) {
    return NextResponse.json(
      { error: userFacingError("Too many requests. Rate limit exceeded.") },
      { status: 429 },
    );
  }

  try {
    const { id } = await params;
    const survey = getSurvey(id);
    if (!survey) {
      return NextResponse.json({ error: userFacingError("Survey not found") }, { status: 404 });
    }

    if (survey.status === "active") {
      return NextResponse.json({
        survey: toPublicSurvey(survey),
        message: "Survey is already funded and live.",
      });
    }

    const body = await request.json();
    const { walletAddress, signature } = body;

    if (!walletAddress || !signature) {
      return NextResponse.json({ error: "Missing wallet or transaction signature." }, { status: 400 });
    }

    if (walletAddress.toLowerCase() !== survey.createdBy.toLowerCase()) {
      return NextResponse.json(
        { error: "Only the creator wallet that published this survey can fund the pool." },
        { status: 403 },
      );
    }

    const vaultPublicKey = getVaultPublicKey();
    if (!vaultPublicKey) {
      return NextResponse.json(
        { error: userFacingError("SURVEY_VAULT_KEYPAIR not configured") },
        { status: 503 },
      );
    }

    const connection = new Connection(RPC_URL);
    const verification = await verifyPoolFunding(
      connection,
      signature,
      walletAddress,
      vaultPublicKey,
      survey.totalRewardPoolLamports,
    );

    if (!verification.ok) {
      return NextResponse.json(
        { error: "Could not verify pool funding. Check the amount and try again." },
        { status: 400 },
      );
    }

    const updated = updateSurvey(id, {
      status: "active",
      fundSignature: signature,
      fundedAt: new Date().toISOString(),
    });

    return NextResponse.json({
      survey: updated ? toPublicSurvey(updated) : null,
      message: "Pool funded. Your survey is live.",
    });
  } catch (err) {
    console.error("Fund survey error:", err);
    return NextResponse.json(
      { error: userFacingError(err instanceof Error ? err.message : "Funding failed") },
      { status: 500 },
    );
  }
}
