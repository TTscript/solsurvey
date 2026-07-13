"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useWallet } from "@solana/wallet-adapter-react";
import { ClientOnly } from "@/components/ClientOnly";
import { ConnectWalletPanel } from "@/components/ConnectWalletPanel";
import { PageShell } from "@/components/PageShell";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import type { SurveyQuestion, SurveyWithStats } from "@/lib/types";

function SurveyFormInner({ surveyId }: { surveyId: string }) {
  const { publicKey, connected } = useWallet();
  const [survey, setSurvey] = useState<SurveyWithStats | null>(null);
  const [loadState, setLoadState] = useState<"loading" | "ready" | "not-found">("loading");
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [explorerUrl, setExplorerUrl] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/surveys/${surveyId}`)
      .then(async (r) => {
        const data = await r.json();
        if (!r.ok || !data.survey) {
          setLoadState("not-found");
          return;
        }
        setSurvey(data.survey);
        setLoadState("ready");
      })
      .catch(() => setLoadState("not-found"));
  }, [surveyId]);

  function setAnswer(qId: string, value: string | string[]) {
    setAnswers((a) => ({ ...a, [qId]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!publicKey || !survey) return;
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch(`/api/surveys/${surveyId}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          walletAddress: publicKey.toBase58(),
          answers,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Submission failed");
      }

      setStatus("success");
      setMessage(data.message || "Submitted!");
      if (data.explorerUrl) setExplorerUrl(data.explorerUrl);
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (loadState === "loading") {
    return (
      <div className="py-12 text-center">
        <p className="text-sm text-muted">Loading survey…</p>
      </div>
    );
  }

  if (loadState === "not-found" || !survey) {
    return (
      <div className="py-10 text-center">
        <p className="mb-2 font-medium text-ink">Survey not found</p>
        <p className="mb-6 text-sm text-muted">This link may be invalid or the survey was removed.</p>
        <Link href="/" className="text-sm font-medium text-reward hover:text-pulse">
          ← Back to home
        </Link>
      </div>
    );
  }

  const rewardSol = (survey.rewardPerResponseLamports / 1e9).toFixed(4);
  const remainingSol = (survey.stats.remainingPoolLamports / 1e9).toFixed(4);
  const exhausted = survey.stats.poolExhausted;
  const notLive = survey.status === "pending_funding";

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-pulse/30 bg-pulse/10 p-8 text-center">
        <p className="mb-2 text-lg font-medium text-reward">Survey submitted!</p>
        <p className="mb-4 text-sm text-muted">{rewardSol} SOL has been sent to your wallet.</p>
        {explorerUrl ? (
          <a
            href={explorerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-reward underline hover:text-pulse"
          >
            View transaction on Solscan →
          </a>
        ) : null}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="mb-6">
        <h1 className="mb-1 text-2xl font-bold">{survey.title}</h1>
        {survey.description ? <p className="text-sm text-muted">{survey.description}</p> : null}
        <div className="mt-3 flex flex-wrap gap-2 text-sm">
          <span className="rounded-full border border-pulse/30 bg-pulse/10 px-3 py-1 text-reward">
            Reward: {rewardSol} SOL
          </span>
          <span className="rounded-full border border-line bg-ink/[0.03] px-3 py-1 text-muted">
            {survey.stats.spotsRemaining} spot{survey.stats.spotsRemaining === 1 ? "" : "s"} left
          </span>
          <span className="rounded-full border border-line bg-ink/[0.03] px-3 py-1 text-muted">
            Pool: {remainingSol} SOL remaining
          </span>
        </div>
      </div>

      {notLive ? (
        <div className="rounded-2xl border border-amber-400/25 bg-amber-400/10 px-4 py-8 text-center">
          <p className="mb-1 font-medium text-amber-200">Not live yet</p>
          <p className="text-sm text-muted">
            The creator still needs to fund the reward pool from their wallet. Check back soon.
          </p>
        </div>
      ) : exhausted ? (
        <div className="rounded-2xl border border-rose-400/25 bg-rose-400/10 px-4 py-8 text-center">
          <p className="mb-1 font-medium text-rose-200">Reward pool full</p>
          <p className="text-sm text-muted">
            This survey is no longer accepting paid responses. Thanks for checking in.
          </p>
        </div>
      ) : !connected ? (
        <ConnectWalletPanel
          description="Choose Phantom or Solflare. After connecting, the survey questions will unlock."
        />
      ) : (
        <>
          {survey.questions.map((q) => (
            <QuestionInput
              key={q.id}
              question={q}
              value={answers[q.id]}
              onChange={(v) => setAnswer(q.id, v)}
            />
          ))}

          {message && status === "error" ? <p className="text-sm text-rose-400">{message}</p> : null}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full rounded-xl bg-pulse py-3.5 font-medium text-white transition-all hover:bg-pulse-deep disabled:cursor-not-allowed disabled:opacity-50"
          >
            {status === "loading" ? "Submitting..." : "Submit & get reward"}
          </button>
        </>
      )}
    </form>
  );
}

function QuestionInput({
  question,
  value,
  onChange,
}: {
  question: SurveyQuestion;
  value: string | string[] | undefined;
  onChange: (v: string | string[]) => void;
}) {
  if (question.type === "text") {
    return (
      <div>
        <label className="mb-2 block text-sm font-medium text-muted">
          {question.text}
          {question.required ? " *" : ""}
        </label>
        <input
          type="text"
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          required={question.required}
          className="w-full rounded-xl border border-line bg-raised px-4 py-3 text-ink placeholder-muted focus:outline-none focus:ring-2 focus:ring-pulse/40"
          placeholder="Your answer"
        />
      </div>
    );
  }

  if (question.type === "single") {
    const opts = (question.options ?? []).filter(Boolean);
    return (
      <div>
        <label className="mb-2 block text-sm font-medium text-muted">
          {question.text}
          {question.required ? " *" : ""}
        </label>
        <div className="space-y-2">
          {opts.map((opt) => (
            <label
              key={opt}
              className="flex cursor-pointer items-center gap-3 rounded-xl border border-line p-3 transition-colors hover:border-reward/25"
            >
              <input
                type="radio"
                name={question.id}
                value={opt}
                checked={(value as string) === opt}
                onChange={() => onChange(opt)}
                required={question.required}
                className="accent-pulse"
              />
              <span>{opt}</span>
            </label>
          ))}
        </div>
      </div>
    );
  }

  if (question.type === "multiple") {
    const opts = (question.options ?? []).filter(Boolean);
    const selected = (Array.isArray(value) ? value : []) as string[];
    return (
      <div>
        <label className="mb-2 block text-sm font-medium text-muted">
          {question.text}
          {question.required ? " *" : ""}
        </label>
        <div className="space-y-2">
          {opts.map((opt) => (
            <label
              key={opt}
              className="flex cursor-pointer items-center gap-3 rounded-xl border border-line p-3 transition-colors hover:border-reward/25"
            >
              <input
                type="checkbox"
                value={opt}
                checked={selected.includes(opt)}
                onChange={(e) => {
                  const next = e.target.checked ? [...selected, opt] : selected.filter((s) => s !== opt);
                  onChange(next);
                }}
                className="accent-pulse rounded"
              />
              <span>{opt}</span>
            </label>
          ))}
        </div>
      </div>
    );
  }

  return null;
}

export default function SurveyPage() {
  const params = useParams();
  const id = params?.id as string;

  if (!id) {
    return (
      <PageShell width="narrow">
        <p className="py-12 text-center text-sm text-muted">Invalid survey link.</p>
      </PageShell>
    );
  }

  return (
    <PageShell width="narrow">
      <RevealOnScroll>
        <ClientOnly>
          <div className="rounded-xl border border-line bg-raised/80 p-4 backdrop-blur-sm sm:rounded-2xl sm:p-8">
            <SurveyFormInner surveyId={id} />
          </div>
        </ClientOnly>
      </RevealOnScroll>
      <RevealOnScroll delay={120}>
        <p className="mt-8 text-center text-sm text-muted">
          <Link href="/" className="text-reward/90 hover:text-reward">
            ← Back to home
          </Link>
        </p>
      </RevealOnScroll>
    </PageShell>
  );
}
