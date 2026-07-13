export function SurveyRespondentPreview() {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-raised shadow-[0_18px_40px_rgba(14,23,32,0.08)]">
      <div className="border-b border-line bg-pulse-soft/50 px-5 py-3">
        <p className="ss-section-label">Respondent view</p>
        <p className="mt-0.5 text-[11px] text-muted">What someone sees after opening your link</p>
      </div>

      <div className="space-y-4 p-5 sm:p-6">
        <div>
          <div className="mb-2 h-2.5 w-2/3 rounded bg-ink/15" />
          <div className="h-2 w-1/2 rounded bg-ink/[0.07]" />
        </div>

        <div className="rounded-xl border border-reward/25 bg-reward-soft px-3.5 py-2.5">
          <p className="text-[11px] font-medium uppercase tracking-wider text-muted">Reward</p>
          <p className="font-mono text-sm font-semibold text-reward">0.0100 SOL · on completion</p>
        </div>

        <div className="space-y-2">
          <div className="rounded-lg border border-line bg-paper/70 px-3 py-2.5">
            <p className="mb-1.5 text-[11px] text-muted">Q1 · Short text</p>
            <div className="h-8 rounded-md border border-dashed border-line-strong bg-raised/80" />
          </div>
          <div className="rounded-lg border border-pulse/30 bg-pulse-soft/50 px-3 py-2.5">
            <p className="mb-2 text-[11px] text-muted">Q2 · Single choice</p>
            <div className="flex items-center gap-2">
              <span className="size-3 rounded-full border-2 border-pulse bg-pulse/30" />
              <span className="h-2 w-24 rounded bg-ink/10" />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-line pt-4 text-xs">
          <span className="text-muted">Pool remaining</span>
          <span className="font-mono font-medium text-reward">0.42 SOL</span>
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
