import { NextResponse } from "next/server";
import { getVaultPublicKey } from "@/lib/vault";

export async function GET() {
  const publicKey = getVaultPublicKey();
  if (!publicKey) {
    return NextResponse.json({ error: "Payout wallet is not configured." }, { status: 503 });
  }
  return NextResponse.json({ publicKey });
}
