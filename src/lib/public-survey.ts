import type { Survey, SurveyPublic } from "@/lib/types";

/** Strip secrets before returning a survey to clients. */
export function toPublicSurvey(survey: Survey): SurveyPublic {
  const { manageToken: _token, ...publicSurvey } = survey;
  return publicSurvey;
}
