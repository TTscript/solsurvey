"use client";

import { useState } from "react";
import Link from "next/link";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import type { SurveyQuestion } from "@/lib/types";
import { ContentCard } from "@/components/ContentCard";
import { ConnectWalletPanel } from "@/components/ConnectWalletPanel";
import { PageShell } from "@/components/PageShell";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { fundSurveyPool, lamportsFromSol } from "@/lib/fund-pool";

const QUESTION_TYPES: { value: SurveyQuestion["type"]; label: string; hint: string }[] = [
  { value: "text", label: "Short text", hint: "Open-ended feedback" },
  { value: "single", label: "Single choice", hint: "Pick one option" },
  { value: "multiple", label: "Multiple choice", hint: "Select all that apply" },
];

const BUILDER_TIPS = [
  "Connect your wallet first—you fund the reward pool from it on publish.",
  "Keep surveys short—3–6 questions convert better than long forms.",
  "Total pool ÷ reward per response = max paid completions.",
  "Save your private results link after publish.",
] as const;

export default function BuilderPage() {
  const { connection } = useConnection();
  const { publicKey, connected, sendTransaction } = useWallet();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState<SurveyQuestion[]>([
    { id: "q0", type: "text", text: "", required: true },
  ]);
  const [rewardPerResponseSol, setRewardPerResponseSol] = useState("0.01");
  const [totalRewardPoolSol, setTotalRewardPoolSol] = useState("0.1");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [surveyId, setSurveyId] = useState<string | null>(null);
  const [resultsUrl, setResultsUrl] = useState<string | null>(null);

  const rewardNum = parseFloat(rewardPerResponseSol) || 0;
  const poolNum = parseFloat(totalRewardPoolSol) || 0;
  const maxPaidResponses = rewardNum > 0 ? Math.floor(poolNum / rewardNum) : 0;

  function addQuestion() {
    setQuestions((q) => [
      ...q,
      {
        id: `q${q.length}`,
        type: "text" as const,
        text: "",
        required: true,
      },
    ]);
  }

  function removeQuestion(i: number) {
    setQuestions((q) => q.filter((_, j) => j !== i));
  }

  function updateQuestion(i: number, updates: Partial<SurveyQuestion>) {
    setQuestions((q) => q.map((item, j) => (j === i ? { ...item, ...updates } : item)));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!connected || !publicKey) {
      setStatus("error");
      setMessage("Connect your wallet before publishing.");
      return;
    }

    if (!sendTransaction) {
      setStatus("error");
      setMessage("Your wallet cannot send transactions in this browser.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const createRes = await fetch("/api/surveys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          questions,
          rewardPerResponseSol: rewardNum || 0.01,
          totalRewardPoolSol: poolNum || 0.1,
          createdBy: publicKey.toBase58(),
        }),
      });

      const createData = await createRes.json();
      if (!createRes.ok) {
        throw new Error(createData.error || "Failed to create survey");
      }

      const vaultPublicKey = createData.vaultPublicKey as string | undefined;
      if (!vaultPublicKey) {
        throw new Error("Payout wallet is not configured on the server.");
      }

      setMessage("Approve the SOL transfer in your wallet to fund the reward pool…");

      const signature = await fundSurveyPool(
        connection,
        publicKey,
        sendTransaction,
        vaultPublicKey,
        lamportsFromSol(poolNum || 0.1),
      );

      const fundRes = await fetch(`/api/surveys/${createData.survey.id}/fund`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          walletAddress: publicKey.toBase58(),
          signature,
        }),
      });

      const fundData = await fundRes.json();
      if (!fundRes.ok) {
        throw new Error(fundData.error || "Could not verify pool funding");
      }

      setStatus("success");
      setSurveyId(createData.survey.id);
      setResultsUrl(createData.resultsUrl ?? null);
      setMessage("Pool funded from your wallet. Your survey is live!");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  const appUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3002";
  const surveyUrl = surveyId ? `${appUrl}/survey/${surveyId}` : "";

  return (
    <PageShell
      title="Survey builder"
      description="Connect your wallet, compose questions, and fund a SOL pool on publish. Respondents get paid from your deposit."
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,18rem)] lg:gap-10 lg:items-start">
        <RevealOnScroll delay={80}>
          <div>
            {!connected ? (
              <div className="mb-8">
                <ConnectWalletPanel
                  stepLabel="Creator"
                  title="Connect to publish"
                  description="Your wallet funds the reward pool and identifies you as the survey creator."
                />
              </div>
            ) : null}

            {status === "success" && surveyId ? (
              <div className="mb-8 rounded-2xl border border-[#f0b90b]/30 bg-[#f0b90b]/10 p-5 sm:p-6">
                <p className="mb-1 font-semibold text-[#f0b90b]">Survey live</p>
                <p className="mb-4 text-sm text-[#b7bdc6]">{message}</p>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#848e9c]">Respondent link</p>
                <div className="mb-4 flex flex-col gap-2 sm:flex-row">
                  <input
                    readOnly
                    value={surveyUrl}
                    className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-mono text-white"
                  />
                  <button
                    type="button"
                    onClick={() => navigator.clipboard.writeText(surveyUrl)}
                    className="shrink-0 rounded-xl border border-[#f0b90b]/25 bg-[#f0b90b]/10 px-4 py-2.5 text-sm font-medium text-[#f0b90b] transition-colors hover:bg-[#f0b90b]/20"
                  >
                    Copy link
                  </button>
                </div>
                {resultsUrl ? (
                  <>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#848e9c]">
                      Private results link
                    </p>
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <input
                        readOnly
                        value={resultsUrl}
                        className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-mono text-white"
                      />
                      <button
                        type="button"
                        onClick={() => navigator.clipboard.writeText(resultsUrl)}
                        className="shrink-0 rounded-xl border border-[#9945ff]/25 bg-[#9945ff]/10 px-4 py-2.5 text-sm font-medium text-[#c4b5fd] transition-colors hover:bg-[#9945ff]/20"
                      >
                        Copy results
                      </button>
                    </div>
                    <p className="mt-3 text-xs text-[#5e6673]">
                      Bookmark this link to view responses and pool spend. Do not share it publicly.
                    </p>
                  </>
                ) : null}
                <div className="mt-4 flex flex-wrap gap-4 text-sm">
                  <Link href={`/survey/${surveyId}`} className="font-medium text-[#f0b90b] hover:text-[#fcd535]">
                    Preview as respondent →
                  </Link>
                  {resultsUrl ? (
                    <Link href={resultsUrl} className="font-medium text-[#c4b5fd] hover:text-white">
                      View results →
                    </Link>
                  ) : null}
                </div>
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-10">
              <fieldset className="space-y-5" disabled={!connected}>
                <legend className="mb-1 text-sm font-semibold uppercase tracking-wider text-[#848e9c]">
                  1 · Basics
                </legend>
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#b7bdc6]">Survey title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full rounded-xl border border-white/10 bg-[#12161c] px-4 py-3 text-white placeholder-[#5e6673] focus:outline-none focus:ring-2 focus:ring-[#f0b90b]/40 disabled:opacity-50"
                    placeholder="e.g. Beta feature feedback"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#b7bdc6]">
                    Description <span className="text-[#5e6673]">(optional)</span>
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className="w-full resize-none rounded-xl border border-white/10 bg-[#12161c] px-4 py-3 text-white placeholder-[#5e6673] focus:outline-none focus:ring-2 focus:ring-[#f0b90b]/40 disabled:opacity-50"
                    placeholder="Tell respondents why their input matters and how long it takes."
                  />
                </div>
              </fieldset>

              <fieldset className="space-y-4" disabled={!connected}>
                <div className="flex items-center justify-between gap-3">
                  <legend className="text-sm font-semibold uppercase tracking-wider text-[#848e9c]">
                    2 · Questions ({questions.length})
                  </legend>
                  <button
                    type="button"
                    onClick={addQuestion}
                    className="text-sm font-medium text-[#f0b90b] hover:text-[#fcd535] disabled:opacity-50"
                    disabled={!connected}
                  >
                    + Add question
                  </button>
                </div>
                <div className="space-y-4">
                  {questions.map((q, i) => (
                    <div key={q.id} className="rounded-xl border border-white/10 bg-[#12161c]/60 p-4">
                      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs font-medium text-[#5e6673]">Question {i + 1}</span>
                        {questions.length > 1 ? (
                          <button
                            type="button"
                            onClick={() => removeQuestion(i)}
                            className="text-xs text-rose-400 hover:text-rose-300"
                          >
                            Remove
                          </button>
                        ) : null}
                      </div>
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <select
                          value={q.type}
                          onChange={(e) =>
                            updateQuestion(i, {
                              type: e.target.value as SurveyQuestion["type"],
                              options: e.target.value !== "text" ? [""] : undefined,
                            })
                          }
                          className="min-w-0 flex-1 rounded-lg border border-white/10 bg-[#0b0e11] px-3 py-2 text-sm text-white sm:flex-none"
                        >
                          {QUESTION_TYPES.map((t) => (
                            <option key={t.value} value={t.value}>
                              {t.label}
                            </option>
                          ))}
                        </select>
                        <span className="text-xs text-[#5e6673]">
                          {QUESTION_TYPES.find((t) => t.value === q.type)?.hint}
                        </span>
                      </div>
                      <input
                        type="text"
                        value={q.text}
                        onChange={(e) => updateQuestion(i, { text: e.target.value })}
                        required
                        className="mb-2 w-full rounded-lg border border-white/10 bg-[#0b0e11] px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#f0b90b]/30"
                        placeholder="Question text"
                      />
                      {(q.type === "single" || q.type === "multiple") && (
                        <div className="mt-2 space-y-1.5">
                          {(q.options ?? []).map((opt, oi) => (
                            <input
                              key={oi}
                              type="text"
                              value={opt}
                              onChange={(e) => {
                                const opts = [...(q.options ?? [])];
                                opts[oi] = e.target.value;
                                updateQuestion(i, { options: opts });
                              }}
                              className="w-full rounded-lg border border-white/10 bg-[#0b0e11] px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#f0b90b]/30"
                              placeholder={`Option ${oi + 1}`}
                            />
                          ))}
                          <button
                            type="button"
                            onClick={() => {
                              const opts = [...(q.options ?? []), ""];
                              updateQuestion(i, { options: opts });
                            }}
                            className="text-xs text-[#f0b90b] hover:text-[#fcd535]"
                          >
                            + Add option
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </fieldset>

              <fieldset className="space-y-4" disabled={!connected}>
                <legend className="mb-1 text-sm font-semibold uppercase tracking-wider text-[#848e9c]">
                  3 · Reward pool
                </legend>
                <p className="text-sm text-[#848e9c]">
                  On publish you&apos;ll send this amount from your connected wallet to fund respondent payouts.
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#b7bdc6]">
                      Reward per response (SOL)
                    </label>
                    <input
                      type="number"
                      step="0.001"
                      min="0.001"
                      value={rewardPerResponseSol}
                      onChange={(e) => setRewardPerResponseSol(e.target.value)}
                      required
                      className="w-full rounded-xl border border-white/10 bg-[#12161c] px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#f0b90b]/40"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#b7bdc6]">
                      Total reward pool (SOL)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0.01"
                      value={totalRewardPoolSol}
                      onChange={(e) => setTotalRewardPoolSol(e.target.value)}
                      required
                      className="w-full rounded-xl border border-white/10 bg-[#12161c] px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#f0b90b]/40"
                    />
                  </div>
                </div>
                {maxPaidResponses > 0 ? (
                  <p className="rounded-lg border border-[#9945ff]/20 bg-[#9945ff]/[0.06] px-3 py-2 text-sm text-[#c4b5fd]">
                    You&apos;ll transfer <strong className="text-white">{poolNum.toFixed(4)} SOL</strong> to fund up to{" "}
                    <strong className="text-white">{maxPaidResponses}</strong> paid{" "}
                    {maxPaidResponses === 1 ? "response" : "responses"}.
                  </p>
                ) : null}
              </fieldset>

              {message && status !== "success" ? (
                <p className={`text-sm ${status === "loading" ? "text-[#848e9c]" : "text-rose-400"}`}>{message}</p>
              ) : null}

              <button
                type="submit"
                disabled={status === "loading" || !connected}
                className="w-full rounded-xl bg-[#f0b90b] py-3.5 font-semibold text-[#0b0e11] shadow-lg shadow-[#f0b90b]/15 transition hover:bg-[#fcd535] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {!connected
                  ? "Connect wallet to publish"
                  : status === "loading"
                    ? "Funding pool…"
                    : `Publish & fund ${poolNum.toFixed(4)} SOL`}
              </button>
            </form>
          </div>
        </RevealOnScroll>

        <aside className="space-y-4 lg:sticky lg:top-24">
          <RevealOnScroll delay={120}>
            <ContentCard title="How funding works">
              <ol className="space-y-2.5 text-sm">
                <li className="flex gap-2">
                  <span className="text-[#f0b90b]">1.</span>
                  <span>Connect your wallet as the survey creator.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#f0b90b]">2.</span>
                  <span>Publish sends your pool SOL to the SolSurvey payout wallet.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#f0b90b]">3.</span>
                  <span>Respondents receive rewards from that deposit on submit.</span>
                </li>
              </ol>
            </ContentCard>
          </RevealOnScroll>

          <RevealOnScroll delay={200}>
            <ContentCard title="Pool math">
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between gap-3 border-b border-white/[0.06] pb-2">
                  <dt className="text-[#848e9c]">Per response</dt>
                  <dd className="font-mono text-[#f0b90b]">{rewardNum.toFixed(4)} SOL</dd>
                </div>
                <div className="flex justify-between gap-3 border-b border-white/[0.06] pb-2">
                  <dt className="text-[#848e9c]">You fund</dt>
                  <dd className="font-mono text-white">{poolNum.toFixed(4)} SOL</dd>
                </div>
                <div className="flex justify-between gap-3 pt-1">
                  <dt className="text-[#848e9c]">Max payouts</dt>
                  <dd className="font-mono font-medium text-white">
                    {maxPaidResponses > 0 ? maxPaidResponses : "—"}
                  </dd>
                </div>
              </dl>
            </ContentCard>
          </RevealOnScroll>

          <RevealOnScroll delay={280}>
            <ContentCard title="Builder tips">
              <ul className="space-y-2.5">
                {BUILDER_TIPS.map((tip) => (
                  <li key={tip} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f0b90b]" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </ContentCard>
          </RevealOnScroll>
        </aside>
      </div>
    </PageShell>
  );
}
