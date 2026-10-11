import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";

/** Accepts the secret key as base58 (gen-keypair output), base64, or a JSON byte array. */
export function parseVaultKeypair(secret: string): Keypair {
  const value = secret.trim();
  if (value.startsWith("[")) {
    return Keypair.fromSecretKey(Uint8Array.from(JSON.parse(value) as number[]));
  }
  try {
    return Keypair.fromSecretKey(bs58.decode(value));
  } catch {
    return Keypair.fromSecretKey(Uint8Array.from(Buffer.from(value, "base64")));
  }
}

export function getVaultPublicKey(): string | null {
  const secret = process.env.SURVEY_VAULT_KEYPAIR;
  if (!secret) return null;
  try {
    return parseVaultKeypair(secret).publicKey.toBase58();
  } catch {
    return null;
  }
}
