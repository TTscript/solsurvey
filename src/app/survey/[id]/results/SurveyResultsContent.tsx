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
        <div className="py-12 text-center text-sm text-[#848e9c]">Loading…</div>
      </PageShell>
    );
  }

  if (status === "denied" || status === "missing") {
    return (
      <PageShell title="Survey results" description="Private creator view">
        <RevealOnScroll>
          <div className="rounded-2xl border border-white/10 bg-[#12161c]/60 p-8 text-center">
            <p className="mb-2 font-medium text-white">Access denied</p>
            <p className="mb-6 text-sm text-[#848e9c]">
              Use the private results link from the builder after publishing. It includes a secret token.
            </p>
            <Link
              href="/builder"
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#f0b90b] px-5 py-2.5 text-sm font-semibold text-[#0b0e11] hover:bg-[#fcd535]"
            >
              Open builder
            </Link>
          </div>
        </RevealOnScroll>
      </PageShell>
    );
  }

  if (!survey || !stats) return null;

  const rewardSol = (survey.rewardPerResponseLamports / 1e9).toFixed(4);
  const remainingSol = (stats.remainingPoolLamports / 1e9).toFixed(4);
  const totalPoolSol = (survey.totalRewardPoolLamports / 1e9).toFixed(4);
  const questionMap = Object.fromEntries(survey.questions.map((q) => [q.id, q]));

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
              className="rounded-xl border border-white/[0.08] bg-[#12161c]/60 px-4 py-4 text-center sm:px-5"
            >
              <p className="text-lg font-bold text-white sm:text-xl">{value}</p>
              <p className="mt-1 text-[10px] font-medium uppercase tracking-wider text-[#848e9c]">{label}</p>
            </div>
          ))}
        </div>
      </RevealOnScroll>

      <RevealOnScroll delay={160}>
        <div className="mb-8 rounded-xl border border-white/[0.08] bg-[#12161c]/40 p-4 sm:p-5">
          <p className="text-sm text-[#848e9c]">
            Total pool <span className="font-mono text-white">{totalPoolSol} SOL</span>
            {stats.poolExhausted ? (
              <span className="ml-2 rounded-full border border-rose-400/30 bg-rose-400/10 px-2 py-0.5 text-xs text-rose-300">
                Pool full
              </span>
            ) : (
              <span className="ml-2 rounded-full border border-[#f0b90b]/30 bg-[#f0b90b]/10 px-2 py-0.5 text-xs text-[#f0b90b]">
                Accepting responses
              </span>
            )}
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <Link href={`/survey/${survey.id}`} className="font-medium text-[#f0b90b] hover:text-[#fcd535]">
              Respondent link →
            </Link>
            <button
              type="button"
              onClick={() => navigator.clipboard.writeText(window.location.href)}
              className="text-[#848e9c] hover:text-white"
            >
              Copy results link
            </button>
          </div>
        </div>
      </RevealOnScroll>

      <RevealOnScroll delay={240}>
        <h2 className="mb-4 text-lg font-bold text-white sm:text-xl">Responses ({submissions.length})</h2>
        {submissions.length === 0 ? (
          <p className="rounded-xl border border-dashed border-white/15 px-4 py-10 text-center text-sm text-[#848e9c]">
            No responses yet. Share your survey link to start collecting feedback.
          </p>
        ) : (
          <div className="space-y-4">
            {submissions.map((sub, i) => (
              <RevealOnScroll key={`${sub.walletAddress}-${sub.submittedAt}`} delay={i * 40}>
                <article className="rounded-xl border border-white/[0.08] bg-[#12161c]/60 p-4 sm:p-5">
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-sm">
                    <span className="font-mono text-[#f0b90b]">{shortenWallet(sub.walletAddress)}</span>
                    <time className="text-[#5e6673]">{new Date(sub.submittedAt).toLocaleString()}</time>
                  </div>
                  <dl className="space-y-2 text-sm">
                    {survey.questions.map((q) => (
                      <div key={q.id}>
                        <dt className="text-[#848e9c]">{q.text}</dt>
                        <dd className="text-[#b7bdc6]">{formatAnswer(questionMap[q.id], sub.answers[q.id])}</dd>
                      </div>
                    ))}
                  </dl>
                  {sub.explorerUrl ? (
                    <a
                      href={sub.explorerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-block text-xs text-[#f0b90b] hover:text-[#fcd535]"
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
