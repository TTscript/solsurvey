import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";

export function getVaultPublicKey(): string | null {
  const secret = process.env.SURVEY_VAULT_KEYPAIR;
  if (!secret) return null;
  try {
    return Keypair.fromSecretKey(bs58.decode(secret)).publicKey.toBase58();
  } catch {
    return null;
  }
}
