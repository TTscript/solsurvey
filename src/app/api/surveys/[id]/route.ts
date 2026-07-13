import { NextRequest, NextResponse } from "next/server";
import { getSurvey } from "@/lib/survey-store";
import { userFacingError } from "@/lib/errors";
import { getSurveyStats } from "@/lib/survey-stats";
import type { SurveyWithStats } from "@/lib/types";

function toPublicSurvey(survey: NonNullable<ReturnType<typeof getSurvey>>): SurveyWithStats {
  const { manageToken: _token, ...publicSurvey } = survey;
  return {
    ...publicSurvey,
    stats: getSurveyStats(survey),
  };
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const survey = getSurvey(id);
  if (!survey) {
    return NextResponse.json(
      { error: userFacingError("Survey not found") },
      { status: 404 },
    );
  }
  return NextResponse.json({ survey: toPublicSurvey(survey) });
}
