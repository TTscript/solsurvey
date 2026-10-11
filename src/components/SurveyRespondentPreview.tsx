import type { SurveyQuestion } from "@/lib/types";

const DEMO_QUESTIONS: SurveyQuestion[] = [
  { id: "demo-1", type: "text", text: "What almost stopped you from finishing?", required: true },
  {
    id: "demo-2",
    type: "single",
    text: "How clear was the task?",
    options: ["Clear enough to start"],
  },
];

type Props = {
  title?: string;
  description?: string;
  questions?: SurveyQuestion[];
  rewardSol?: number;
  poolSol?: number;
};

export function SurveyRespondentPreview({
  title,
  description,
  questions,
  rewardSol = 0.01,
  poolSol = 0.42,
}: Props) {
  const live = Boolean(title || description || questions);
  const shownTitle = title?.trim() || (live ? "Untitled survey" : "Beta feature feedback");
  const shownQuestions = (questions ?? DEMO_QUESTIONS).slice(0, 3);
  const reward = Number.isFinite(rewardSol) ? rewardSol : 0;
  const pool = Number.isFinite(poolSol) ? poolSol : 0;

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-raised shadow-[0_18px_40px_rgba(14,23,32,0.08)]">
      <div className="border-b border-line bg-pulse-soft/50 px-5 py-3">
        <p className="ss-section-label">Respondent view</p>
        <p className="mt-0.5 text-[11px] text-muted">
          {live ? "Updates as you draft" : "What someone sees after opening your link"}
        </p>
      </div>

      <div className="space-y-4 p-5 sm:p-6">
        <div>
          <p className="text-base font-semibold leading-snug text-ink">{shownTitle}</p>
          {description?.trim() ? (
            <p className="mt-1 text-sm leading-relaxed text-ink-soft">{description.trim()}</p>
          ) : live ? (
            <p className="mt-1 text-sm text-muted">Add a short description so people know why it matters.</p>
          ) : (
            <p className="mt-1 text-sm text-ink-soft">About four minutes. Paid when you submit.</p>
          )}
        </div>

        <div className="rounded-xl border border-reward/25 bg-reward-soft px-3.5 py-2.5">
          <p className="text-[11px] font-medium uppercase tracking-wider text-muted">Reward</p>
          <p className="font-mono text-sm font-semibold text-reward">
            {reward.toFixed(4)} SOL · on completion
          </p>
        </div>

        <div className="space-y-2">
          {shownQuestions.length === 0 ? (
            <p className="rounded-lg border border-dashed border-line px-3 py-4 text-sm text-muted">
              Questions appear here as you add them.
            </p>
          ) : (
            shownQuestions.map((question, index) => (
              <div
                key={question.id}
                className={`rounded-lg border px-3 py-2.5 ${
                  question.type === "text" ? "border-line bg-paper/70" : "border-pulse/30 bg-pulse-soft/50"
                }`}
              >
                <p className="mb-1.5 text-[11px] text-muted">
                  Q{index + 1} ·{" "}
                  {question.type === "text"
                    ? "Short text"
                    : question.type === "single"
                      ? "Single choice"
                      : "Multiple choice"}
                </p>
                <p className="mb-2 text-sm text-ink">
                  {question.text.trim() || "Question text"}
                </p>
                {question.type === "text" ? (
                  <div className="h-8 rounded-md border border-dashed border-line-strong bg-raised/80" />
                ) : (
                  <ul className="space-y-1.5">
                    {(question.options ?? []).filter((option) => option.trim()).slice(0, 3).map((option, optionIndex) => (
                      <li key={`${question.id}-${optionIndex}`} className="flex items-center gap-2 text-sm text-ink-soft">
                        <span
                          className={`size-3 shrink-0 border-2 border-pulse ${
                            question.type === "single" ? "rounded-full" : "rounded-sm"
                          }`}
                        />
                        {option}
                      </li>
                    ))}
                    {(question.options ?? []).every((option) => !option.trim()) ? (
                      <li className="text-xs text-muted">Add options to preview choices.</li>
                    ) : null}
                  </ul>
                )}
              </div>
            ))
          )}
        </div>

        <div className="flex items-center justify-between border-t border-line pt-4 text-xs">
          <span className="text-muted">Pool remaining</span>
          <span className="font-mono font-medium text-reward">{pool.toFixed(2)} SOL</span>
        </div>

        <div className="flex items-center gap-2 rounded-lg bg-paper px-3 py-2 text-[11px] text-muted">
          <svg className="h-4 w-4 shrink-0 text-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0H3" />
          </svg>
          Connect wallet → answer → submit → payout
        </div>
      </div>
    </div>
  );
}
