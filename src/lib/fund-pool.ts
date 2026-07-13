"use client";

import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

export async function fundSurveyPool(
  connection: Connection,
  publicKey: PublicKey,
  sendTransaction: ReturnType<typeof useWallet>["sendTransaction"],
  vaultPublicKey: string,
  poolLamports: number,
): Promise<string> {
  if (!sendTransaction) {
    throw new Error("Wallet cannot send transactions.");
  }

  const tx = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: publicKey,
      toPubkey: new PublicKey(vaultPublicKey),
      lamports: poolLamports,
    }),
  );

  const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash("confirmed");
  tx.recentBlockhash = blockhash;
  tx.feePayer = publicKey;

  const signature = await sendTransaction(tx, connection);
  await connection.confirmTransaction({ signature, blockhash, lastValidBlockHeight }, "confirmed");

  return signature;
}

export function lamportsFromSol(sol: number) {
  return Math.round(sol * LAMPORTS_PER_SOL);
}
