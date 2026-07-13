import type { Survey } from "./types";
import { getSubmissions } from "./survey-store";

export type SurveyPublicStats = {
  paidResponses: number;
  maxPaidResponses: number;
  remainingPoolLamports: number;
  poolExhausted: boolean;
  spotsRemaining: number;
};

export function getSurveyStats(survey: Survey): SurveyPublicStats {
  const paidResponses = getSubmissions(survey.id).length;
  const maxPaidResponses =
    survey.rewardPerResponseLamports > 0
      ? Math.floor(survey.totalRewardPoolLamports / survey.rewardPerResponseLamports)
      : 0;
  const spentLamports = paidResponses * survey.rewardPerResponseLamports;
  const remainingPoolLamports = Math.max(0, survey.totalRewardPoolLamports - spentLamports);
  const spotsRemaining = Math.max(0, maxPaidResponses - paidResponses);
  const poolExhausted = spotsRemaining === 0;

  return {
    paidResponses,
    maxPaidResponses,
    remainingPoolLamports,
    poolExhausted,
    spotsRemaining,
  };
}

export function canAcceptPaidResponse(survey: Survey): boolean {
  return survey.status === "active" && !getSurveyStats(survey).poolExhausted;
}
