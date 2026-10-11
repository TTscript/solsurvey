import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import { parseVaultKeypair } from "@/lib/vault";

const LAMPORTS_PER_SOL = 1e9;

export interface PayoutResult {
  success: boolean;
  signature?: string;
  error?: string;
}

export async function sendSolPayout(
  connection: Connection,
  recipientAddress: string,
  lamports: number,
): Promise<PayoutResult> {
  const secret = process.env.SURVEY_VAULT_KEYPAIR;
  if (!secret) {
    console.error("SURVEY_VAULT_KEYPAIR not configured");
    return { success: false, error: "SURVEY_VAULT_KEYPAIR not configured" };
  }

  let keypair: Keypair;
  try {
    keypair = parseVaultKeypair(secret);
  } catch {
    console.error("Invalid SURVEY_VAULT_KEYPAIR");
    return { success: false, error: "Invalid SURVEY_VAULT_KEYPAIR" };
  }

  const balance = await connection.getBalance(keypair.publicKey);
  if (balance < lamports) {
    console.error(
      `Insufficient vault balance. Need ${lamports / LAMPORTS_PER_SOL} SOL, have ${balance / LAMPORTS_PER_SOL} SOL.`,
    );
    return {
      success: false,
      error: `Insufficient vault balance. Need ${lamports / LAMPORTS_PER_SOL} SOL, have ${balance / LAMPORTS_PER_SOL} SOL.`,
    };
  }

  try {
    const tx = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: keypair.publicKey,
        toPubkey: new PublicKey(recipientAddress),
        lamports,
      }),
    );

    const sig = await sendAndConfirmTransaction(connection, tx, [keypair], {
      commitment: "confirmed",
      preflightCommitment: "confirmed",
    });

    return { success: true, signature: sig };
  } catch (err) {
    console.error("Payout failed:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "Payout failed",
    };
  }
}
