import Link from "next/link";
import type { SurveyListItem, SurveyStatus } from "@/lib/types";

function formatSol(lamports: number) {
  return (lamports / 1e9).toFixed(4);
}

function statusBadge(status: SurveyStatus, exhausted: boolean) {
  if (status === "pending_funding") {
    return (
      <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-200">
        Awaiting fund
      </span>
    );
  }
  if (exhausted) {
    return (
      <span className="rounded-full border border-rose-400/30 bg-rose-400/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-rose-300">
        Pool full
      </span>
    );
  }
  return (
    <span className="rounded-full border border-[#f0b90b]/30 bg-[#f0b90b]/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#f0b90b]">
      Live
    </span>
  );
}

type Props = {
  survey: SurveyListItem;
  variant?: "browse" | "mine";
};

export function SurveyCard({ survey, variant = "browse" }: Props) {
  const rewardSol = formatSol(survey.rewardPerResponseLamports);
  const canTake = survey.status === "active" && !survey.stats.poolExhausted;

  return (
    <article className="hover-lift flex h-full flex-col rounded-xl border border-white/[0.08] bg-[#12161c]/60 p-4 sm:rounded-2xl sm:p-5">
      <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
        <h2 className="min-w-0 flex-1 text-base font-semibold text-white sm:text-lg">{survey.title}</h2>
        {statusBadge(survey.status, survey.stats.poolExhausted)}
      </div>

      {survey.description ? (
        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-[#848e9c]">{survey.description}</p>
      ) : (
        <p className="mb-4 text-sm text-[#5e6673]">No description</p>
      )}

      <dl className="mb-4 grid grid-cols-2 gap-2 text-xs sm:text-sm">
        <div className="rounded-lg border border-white/[0.06] bg-[#0b0e11]/50 px-3 py-2">
          <dt className="text-[#5e6673]">Reward</dt>
          <dd className="font-mono font-medium text-[#f0b90b]">{rewardSol} SOL</dd>
        </div>
        <div className="rounded-lg border border-white/[0.06] bg-[#0b0e11]/50 px-3 py-2">
          <dt className="text-[#5e6673]">Spots left</dt>
          <dd className="font-medium text-white">{survey.stats.spotsRemaining}</dd>
        </div>
        <div className="rounded-lg border border-white/[0.06] bg-[#0b0e11]/50 px-3 py-2">
          <dt className="text-[#5e6673]">Questions</dt>
          <dd className="text-[#b7bdc6]">{survey.questionCount}</dd>
        </div>
        <div className="rounded-lg border border-white/[0.06] bg-[#0b0e11]/50 px-3 py-2">
          <dt className="text-[#5e6673]">Responses</dt>
          <dd className="text-[#b7bdc6]">{survey.stats.paidResponses}</dd>
        </div>
      </dl>

      <div className="mt-auto flex flex-wrap gap-3 pt-1 text-sm">
        {canTake ? (
          <Link href={`/survey/${survey.id}`} className="font-medium text-[#f0b90b] hover:text-[#fcd535]">
            Take survey →
          </Link>
        ) : survey.status === "active" ? (
          <span className="text-[#848e9c]">No spots left</span>
        ) : (
          <span className="text-[#848e9c]">Not open yet</span>
        )}
        {variant === "mine" && survey.status === "pending_funding" ? (
          <Link href="/builder" className="text-[#c4b5fd] hover:text-white">
            Complete funding →
          </Link>
        ) : null}
      </div>
    </article>
  );
}
