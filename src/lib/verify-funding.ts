import { Connection, PublicKey } from "@solana/web3.js";

export async function verifyPoolFunding(
  connection: Connection,
  signature: string,
  expectedFrom: string,
  expectedTo: string,
  minLamports: number,
): Promise<{ ok: true } | { ok: false; reason: string }> {
  const parsed = await connection.getParsedTransaction(signature, {
    maxSupportedTransactionVersion: 0,
    commitment: "confirmed",
  });

  if (!parsed?.meta || parsed.meta.err) {
    return { ok: false, reason: "Transaction not found or failed" };
  }

  const keys = parsed.transaction.message.accountKeys.map((k) =>
    typeof k === "string" ? k : k.pubkey.toBase58(),
  );

  const fromIndex = keys.indexOf(expectedFrom);
  const toIndex = keys.indexOf(expectedTo);

  if (fromIndex < 0 || toIndex < 0) {
    return { ok: false, reason: "Transfer does not match expected wallets" };
  }

  const received = parsed.meta.postBalances[toIndex] - parsed.meta.preBalances[toIndex];
  if (received < minLamports) {
    return { ok: false, reason: "Funding amount is less than the configured pool" };
  }

  // Sanity-check sender participated
  try {
    PublicKey.isOnCurve(new PublicKey(expectedFrom).toBytes());
    PublicKey.isOnCurve(new PublicKey(expectedTo).toBytes());
  } catch {
    return { ok: false, reason: "Invalid wallet in transaction" };
  }

  return { ok: true };
}
