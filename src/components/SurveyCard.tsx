import Link from "next/link";
import type { SurveyListItem, SurveyStatus } from "@/lib/types";

function formatSol(lamports: number) {
  return (lamports / 1e9).toFixed(4);
}

function statusBadge(status: SurveyStatus, exhausted: boolean) {
  if (status === "pending_funding") {
    return (
      <span className="rounded-full border border-amber-700/20 bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-800">
        Awaiting fund
      </span>
    );
  }
  if (exhausted) {
    return (
      <span className="rounded-full border border-rose-700/20 bg-rose-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-rose-800">
        Pool full
      </span>
    );
  }
  return (
    <span className="rounded-full border border-pulse/30 bg-pulse-soft px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-pulse-deep">
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
    <article className="hover-lift flex h-full flex-col rounded-xl border border-line bg-raised/80 p-4 sm:rounded-2xl sm:p-5">
      <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
        <h2 className="min-w-0 flex-1 text-base font-semibold text-ink sm:text-lg">{survey.title}</h2>
        {statusBadge(survey.status, survey.stats.poolExhausted)}
      </div>

      {survey.description ? (
        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-ink-soft">{survey.description}</p>
      ) : (
        <p className="mb-4 text-sm text-muted">No description</p>
      )}

      <dl className="mb-4 grid grid-cols-2 gap-2 text-xs sm:text-sm">
        <div className="rounded-lg border border-line bg-paper/80 px-3 py-2">
          <dt className="text-muted">Reward</dt>
          <dd className="font-mono font-medium text-reward">{rewardSol} SOL</dd>
        </div>
        <div className="rounded-lg border border-line bg-paper/80 px-3 py-2">
          <dt className="text-muted">Spots left</dt>
          <dd className="font-medium text-ink">{survey.stats.spotsRemaining}</dd>
        </div>
        <div className="rounded-lg border border-line bg-paper/80 px-3 py-2">
          <dt className="text-muted">Questions</dt>
          <dd className="text-ink-soft">{survey.questionCount}</dd>
        </div>
        <div className="rounded-lg border border-line bg-paper/80 px-3 py-2">
          <dt className="text-muted">Responses</dt>
          <dd className="text-ink-soft">{survey.stats.paidResponses}</dd>
        </div>
      </dl>

      <div className="mt-auto flex flex-wrap gap-3 pt-1 text-sm">
        {canTake ? (
          <Link href={`/survey/${survey.id}`} className="font-medium text-pulse-deep hover:text-pulse">
            Take survey →
          </Link>
        ) : survey.status === "active" ? (
          <span className="text-muted">No spots left</span>
        ) : (
          <span className="text-muted">Not open yet</span>
        )}
        {variant === "mine" && survey.status === "pending_funding" ? (
          <Link href={`/builder?resume=${survey.id}`} className="text-ink-soft hover:text-ink">
            Complete funding →
          </Link>
        ) : null}
      </div>
    </article>
  );
}
