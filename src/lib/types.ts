export type QuestionType = "text" | "single" | "multiple";

export interface SurveyQuestion {
  id: string;
  type: QuestionType;
  text: string;
  required?: boolean;
  options?: string[];
}

export type SurveyStatus = "pending_funding" | "active";

export interface Survey {
  id: string;
  title: string;
  description?: string;
  questions: SurveyQuestion[];
  rewardPerResponseLamports: number;
  totalRewardPoolLamports: number;
  manageToken: string;
  createdAt: string;
  createdBy: string;
  status: SurveyStatus;
  fundSignature?: string;
  fundedAt?: string;
}

export interface SurveySubmission {
  surveyId: string;
  walletAddress: string;
  answers: Record<string, string | string[]>;
  submittedAt: string;
  payoutSignature?: string;
}

export type SurveyPublic = Omit<Survey, "manageToken">;

export type SurveyWithStats = SurveyPublic & {
  stats: {
    paidResponses: number;
    maxPaidResponses: number;
    remainingPoolLamports: number;
    poolExhausted: boolean;
    spotsRemaining: number;
  };
};

export type SurveyListItem = {
  id: string;
  title: string;
  description?: string;
  status: SurveyStatus;
  rewardPerResponseLamports: number;
  totalRewardPoolLamports: number;
  createdAt: string;
  questionCount: number;
  stats: SurveyWithStats["stats"];
};
