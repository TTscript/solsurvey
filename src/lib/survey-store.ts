import { randomBytes } from "crypto";
import type { Survey, SurveyStatus, SurveySubmission } from "./types";
import { readJsonFile, writeJsonFile } from "./persist";

const SURVEYS_FILE = "surveys.json";
const SUBMISSIONS_FILE = "submissions.json";

type SurveyStore = Record<string, Survey>;
type SubmissionStore = Record<string, SurveySubmission[]>;

function loadSurveys(): SurveyStore {
  const raw = readJsonFile<Record<string, Survey & { status?: SurveyStatus }>>(SURVEYS_FILE, {});
  const normalized: SurveyStore = {};

  for (const [id, survey] of Object.entries(raw)) {
    normalized[id] = {
      ...survey,
      status: survey.status ?? "active",
      createdBy: survey.createdBy ?? "legacy",
    };
  }

  return normalized;
}

function saveSurveys(store: SurveyStore): void {
  writeJsonFile(SURVEYS_FILE, store);
}

function loadSubmissions(): SubmissionStore {
  return readJsonFile<SubmissionStore>(SUBMISSIONS_FILE, {});
}

function saveSubmissions(store: SubmissionStore): void {
  writeJsonFile(SUBMISSIONS_FILE, store);
}

function generateId(): string {
  return randomBytes(6).toString("hex");
}

function generateManageToken(): string {
  return randomBytes(24).toString("hex");
}

export function createSurvey(
  survey: Omit<Survey, "id" | "createdAt" | "manageToken" | "status" | "fundSignature" | "fundedAt">,
): Survey {
  const store = loadSurveys();
  const id = generateId();
  const full: Survey = {
    ...survey,
    id,
    manageToken: generateManageToken(),
    status: "pending_funding",
    createdAt: new Date().toISOString(),
  };
  store[id] = full;
  saveSurveys(store);

  const subs = loadSubmissions();
  subs[id] = [];
  saveSubmissions(subs);

  return full;
}

export function updateSurvey(id: string, patch: Partial<Survey>): Survey | undefined {
  const store = loadSurveys();
  const existing = store[id];
  if (!existing) return undefined;
  const updated = { ...existing, ...patch };
  store[id] = updated;
  saveSurveys(store);
  return updated;
}

export function getSurvey(id: string): Survey | undefined {
  return loadSurveys()[id];
}

export function getSurveyByToken(id: string, token: string): Survey | undefined {
  const survey = getSurvey(id);
  if (!survey || survey.manageToken !== token) return undefined;
  return survey;
}

export function getSubmissions(surveyId: string): SurveySubmission[] {
  return loadSubmissions()[surveyId] ?? [];
}

export function hasSubmitted(surveyId: string, walletAddress: string): boolean {
  const subs = getSubmissions(surveyId);
  return subs.some((s) => s.walletAddress.toLowerCase() === walletAddress.toLowerCase());
}

export function addSubmission(sub: SurveySubmission): void {
  const store = loadSubmissions();
  const subs = store[sub.surveyId] ?? [];
  subs.push(sub);
  store[sub.surveyId] = subs;
  saveSubmissions(store);
}

export function isSurveyLive(survey: Survey): boolean {
  return survey.status === "active";
}

export function listSurveys(): Survey[] {
  return Object.values(loadSurveys()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export function listActiveSurveys(): Survey[] {
  return listSurveys().filter((s) => s.status === "active");
}

export function listSurveysByCreator(createdBy: string): Survey[] {
  const key = createdBy.toLowerCase();
  return listSurveys().filter((s) => s.createdBy.toLowerCase() === key);
}
