export function userFacingError(raw: string): string {
  const lower = raw.toLowerCase();

  if (lower.includes("survey_vault_keypair") || lower.includes("not configured")) {
    return "Rewards are temporarily unavailable. Please try again later.";
  }
  if (lower.includes("insufficient vault balance") || lower.includes("insufficient funds")) {
    return "This survey cannot pay rewards right now. Contact the survey creator.";
  }
  if (lower.includes("invalid survey_vault")) {
    return "Rewards are temporarily unavailable. Please try again later.";
  }
  if (lower.includes("wallet balance too low")) {
    return "Your wallet needs a small SOL balance to participate. Add a little SOL and try again.";
  }
  if (lower.includes("transaction") && lower.includes("verify")) {
    return "Your wallet needs a bit of on-chain activity before it can participate.";
  }
  if (lower.includes("already submitted")) {
    return "You have already completed this survey.";
  }
  if (lower.includes("not live yet") || lower.includes("pending_funding")) {
    return "This survey is not live yet—the reward pool has not been funded.";
  }
  if (lower.includes("pool") && (lower.includes("exhausted") || lower.includes("runs out"))) {
    return "This survey's reward pool is full. No more paid responses are available.";
  }
  if (lower.includes("survey not found")) {
    return "This survey could not be found. The link may be invalid or expired.";
  }
  if (lower.includes("too many requests") || lower.includes("rate limit")) {
    return "Too many attempts. Please wait a moment and try again.";
  }

  return raw;
}
