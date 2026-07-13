export const RPC_URL =
  process.env.NEXT_PUBLIC_RPC_URL || "https://api.devnet.solana.com";

export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3002";

export const MIN_BALANCE_LAMPORTS = Number(
  process.env.MIN_BALANCE_LAMPORTS || "100000"
);

export const MIN_TRANSACTION_COUNT = Number(
  process.env.MIN_TRANSACTION_COUNT || "1"
);
