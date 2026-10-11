"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import type { Survey, SurveySubmission, SurveyQuestion } from "@/lib/types";
import { PageShell } from "@/components/PageShell";
import { RevealOnScroll } from "@/components/RevealOnScroll";

type Stats = {
  paidResponses: number;
  maxPaidResponses: number;
  remainingPoolLamports: number;
  poolExhausted: boolean;
  spotsRemaining: number;
};

type SubmissionRow = Pick<SurveySubmission, "walletAddress" | "answers" | "submittedAt" | "payoutSignature"> & {
  explorerUrl?: string;
};

function shortenWallet(addr: string) {
  return `${addr.slice(0, 4)}…${addr.slice(-4)}`;
}

function formatAnswer(question: SurveyQuestion | undefined, value: string | string[] | undefined) {
  if (!value) return "—";
  if (Array.isArray(value)) return value.join(", ");
  return value;
}

function buildChoiceTallies(survey: Survey, submissions: SubmissionRow[]) {
  return survey.questions
    .filter((q) => (q.type === "single" || q.type === "multiple") && q.options?.length)
    .map((q) => {
      const counts = Object.fromEntries((q.options ?? []).map((opt) => [opt, 0]));
      for (const sub of submissions) {
        const raw = sub.answers[q.id];
        const values = Array.isArray(raw) ? raw : raw ? [raw] : [];
        for (const v of values) {
          if (v in counts) counts[v] += 1;
        }
      }
      return { question: q, counts, total: submissions.length };
    });
}

function toCsv(survey: Survey, submissions: SubmissionRow[]) {
  const headers = ["wallet", "submittedAt", "payoutSignature", ...survey.questions.map((q) => q.text)];
  const escape = (v: string) => `"${v.replaceAll('"', '""')}"`;
  const rows = submissions.map((sub) => {
    const cells = [
      sub.walletAddress,
      sub.submittedAt,
      sub.payoutSignature ?? "",
      ...survey.questions.map((q) => formatAnswer(q, sub.answers[q.id])),
    ];
    return cells.map((c) => escape(String(c))).join(",");
  });
  return [headers.map(escape).join(","), ...rows].join("\n");
}

export default function SurveyResultsContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params?.id as string;
  const token = searchParams.get("token");

  const [survey, setSurvey] = useState<Survey | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [submissions, setSubmissions] = useState<SubmissionRow[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "denied" | "missing">("loading");

  useEffect(() => {
    if (!id || !token) {
      setStatus("denied");
      return;
    }

    fetch(`/api/surveys/${id}/results?token=${encodeURIComponent(token)}`)
      .then(async (r) => {
        const data = await r.json();
        if (!r.ok) {
          setStatus(r.status === 404 ? "missing" : "denied");
          return;
        }
        setSurvey(data.survey);
        setStats(data.stats);
        setSubmissions(data.submissions ?? []);
        setStatus("ready");
      })
      .catch(() => setStatus("denied"));
  }, [id, token]);

  if (status === "loading") {
    return (
      <PageShell title="Survey results" description="Loading responses…">
        <div className="py-12 text-center text-sm text-muted">Loading…</div>
      </PageShell>
    );
  }

  if (status === "denied" || status === "missing") {
    return (
      <PageShell title="Survey results" description="Private creator view">
        <RevealOnScroll>
          <div className="rounded-2xl border border-line bg-raised/80 p-8 text-center">
            <p className="mb-2 font-medium text-ink">Access denied</p>
            <p className="mb-6 text-sm text-muted">
              Use the private results link from the builder after publishing. It includes a secret token.
            </p>
            <Link
              href="/builder"
              className="ss-btn-primary inline-flex min-h-11 items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold"
            >
              Open builder
            </Link>
          </div>
        </RevealOnScroll>
      </PageShell>
    );
  }

  if (!survey || !stats) return null;

  const tallies = buildChoiceTallies(survey, submissions);
  const rewardSol = (survey.rewardPerResponseLamports / 1e9).toFixed(4);
  const remainingSol = (stats.remainingPoolLamports / 1e9).toFixed(4);
  const totalPoolSol = (survey.totalRewardPoolLamports / 1e9).toFixed(4);
  const questionMap = Object.fromEntries(survey.questions.map((q) => [q.id, q]));

  const downloadCsv = () => {
    const blob = new Blob([toCsv(survey, submissions)], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `solsurvey-${survey.id}-results.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <PageShell
      title={survey.title}
      description="Private results — bookmark this page to track completions and pool spend."
    >
      <RevealOnScroll delay={80}>
        <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Responses", value: String(stats.paidResponses) },
            { label: "Spots left", value: String(stats.spotsRemaining) },
            { label: "Pool remaining", value: `${remainingSol} SOL` },
            { label: "Per response", value: `${rewardSol} SOL` },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="rounded-xl border border-line bg-raised/80 px-4 py-4 text-center sm:px-5"
            >
              <p className="text-lg font-bold text-ink sm:text-xl">{value}</p>
              <p className="mt-1 text-[10px] font-medium uppercase tracking-wider text-muted">{label}</p>
            </div>
          ))}
        </div>
      </RevealOnScroll>

      <RevealOnScroll delay={160}>
        <div className="mb-8 rounded-xl border border-line bg-raised/60 p-4 sm:p-5">
          <p className="text-sm text-muted">
            Total pool <span className="font-mono text-ink">{totalPoolSol} SOL</span>
            {stats.poolExhausted ? (
              <span className="ml-2 rounded-full border border-rose-700/20 bg-rose-500/10 px-2 py-0.5 text-xs text-rose-800">
                Pool full
              </span>
            ) : (
              <span className="ml-2 rounded-full border border-pulse/30 bg-pulse-soft px-2 py-0.5 text-xs text-pulse-deep">
                Accepting responses
              </span>
            )}
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <Link href={`/survey/${survey.id}`} className="font-medium text-pulse-deep hover:text-pulse">
              Respondent link →
            </Link>
            <button
              type="button"
              onClick={() => navigator.clipboard.writeText(window.location.href)}
              className="text-muted hover:text-ink"
            >
              Copy results link
            </button>
            <button
              type="button"
              onClick={downloadCsv}
              disabled={submissions.length === 0}
              className="font-medium text-ink-soft hover:text-ink disabled:opacity-40"
            >
              Export CSV
            </button>
          </div>
        </div>
      </RevealOnScroll>

      {tallies.length > 0 ? (
        <RevealOnScroll delay={200}>
          <section className="mb-10">
            <h2 className="mb-4 text-lg font-bold text-ink sm:text-xl">Choice breakdown</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {tallies.map(({ question, counts, total }) => (
                <div key={question.id} className="rounded-xl border border-line bg-raised/80 p-4 sm:p-5">
                  <p className="mb-3 text-sm font-semibold text-ink">{question.text}</p>
                  <ul className="space-y-2.5">
                    {Object.entries(counts).map(([opt, n]) => {
                      const pct = total === 0 ? 0 : Math.round((n / total) * 100);
                      return (
                        <li key={opt}>
                          <div className="mb-1 flex justify-between gap-2 text-xs">
                            <span className="text-ink-soft">{opt}</span>
                            <span className="font-mono text-muted">
                              {n} · {pct}%
                            </span>
                          </div>
                          <div className="h-1.5 overflow-hidden rounded-full bg-paper">
                            <div
                              className="h-full rounded-full bg-pulse transition-[width] duration-500"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </RevealOnScroll>
      ) : null}

      <RevealOnScroll delay={240}>
        <h2 className="mb-4 text-lg font-bold text-ink sm:text-xl">Responses ({submissions.length})</h2>
        {submissions.length === 0 ? (
          <p className="rounded-xl border border-dashed border-line-strong px-4 py-10 text-center text-sm text-muted">
            No responses yet. Share your survey link to start collecting feedback.
          </p>
        ) : (
          <div className="space-y-4">
            {submissions.map((sub, i) => (
              <RevealOnScroll key={`${sub.walletAddress}-${sub.submittedAt}`} delay={i * 40}>
                <article className="rounded-xl border border-line bg-raised/80 p-4 sm:p-5">
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-sm">
                    <span className="font-mono text-reward">{shortenWallet(sub.walletAddress)}</span>
                    <time className="text-muted">{new Date(sub.submittedAt).toLocaleString()}</time>
                  </div>
                  <dl className="space-y-2 text-sm">
                    {survey.questions.map((q) => (
                      <div key={q.id}>
                        <dt className="text-muted">{q.text}</dt>
                        <dd className="text-ink-soft">{formatAnswer(questionMap[q.id], sub.answers[q.id])}</dd>
                      </div>
                    ))}
                  </dl>
                  {sub.explorerUrl ? (
                    <a
                      href={sub.explorerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-block text-xs text-pulse-deep hover:text-pulse"
                    >
                      View payout on Solscan →
                    </a>
                  ) : null}
                </article>
              </RevealOnScroll>
            ))}
          </div>
        )}
      </RevealOnScroll>
    </PageShell>
  );
}
