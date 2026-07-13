import { Connection, PublicKey } from "@solana/web3.js";
import { MIN_BALANCE_LAMPORTS, MIN_TRANSACTION_COUNT } from "./constants";

export interface VerificationResult {
  success: boolean;
  reason?: string;
}

export async function verifyWallet(
  connection: Connection,
  walletAddress: string,
): Promise<VerificationResult> {
  try {
    const pubkey = new PublicKey(walletAddress);

    const balance = await connection.getBalance(pubkey);
    if (balance < MIN_BALANCE_LAMPORTS) {
      return {
        success: false,
        reason: `Wallet balance too low. Minimum ${MIN_BALANCE_LAMPORTS / 1e9} SOL required.`,
      };
    }

    const sigs = await connection.getSignaturesForAddress(pubkey, {
      limit: MIN_TRANSACTION_COUNT + 1,
    });
    if (sigs.length < MIN_TRANSACTION_COUNT) {
      return {
        success: false,
        reason: `Wallet needs at least ${MIN_TRANSACTION_COUNT} transaction(s) to verify it's a real user.`,
      };
    }

    return { success: true };
  } catch {
    return {
      success: false,
      reason: "Invalid wallet address",
    };
  }
}
