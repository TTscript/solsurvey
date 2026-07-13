export function SurveyRespondentPreview() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.1] bg-gradient-to-br from-[#1a1f27] to-[#0f1218]">
      <div className="border-b border-white/[0.08] bg-[#9945ff]/[0.08] px-5 py-3">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#c4b5fd]">
          Respondent view
        </p>
        <p className="mt-0.5 text-[11px] text-[#848e9c]">What someone sees after opening your link</p>
      </div>

      <div className="space-y-4 p-5 sm:p-6">
        <div>
          <div className="mb-2 h-2.5 w-2/3 rounded bg-white/12" />
          <div className="h-2 w-1/2 rounded bg-white/[0.06]" />
        </div>

        <div className="rounded-xl border border-[#f0b90b]/25 bg-[#f0b90b]/[0.06] px-3.5 py-2.5">
          <p className="text-[11px] font-medium uppercase tracking-wider text-[#848e9c]">Reward</p>
          <p className="font-mono text-sm font-semibold text-[#f0b90b]">0.0100 SOL · on completion</p>
        </div>

        <div className="space-y-2">
          <div className="rounded-lg border border-white/10 bg-black/25 px-3 py-2.5">
            <p className="mb-1.5 text-[11px] text-[#848e9c]">Q1 · Short text</p>
            <div className="h-8 rounded-md border border-dashed border-white/15 bg-white/[0.03]" />
          </div>
          <div className="rounded-lg border border-[#9945ff]/30 bg-[#9945ff]/[0.05] px-3 py-2.5">
            <p className="mb-2 text-[11px] text-[#848e9c]">Q2 · Single choice</p>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full border-2 border-[#9945ff] bg-[#9945ff]/30" />
              <span className="h-2 w-24 rounded bg-white/10" />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-white/[0.08] pt-4 text-xs">
          <span className="text-[#848e9c]">Pool remaining</span>
          <span className="font-mono font-medium text-[#f0b90b]">0.42 SOL</span>
        </div>

        <div className="flex items-center gap-2 rounded-lg bg-[#12161c] px-3 py-2 text-[11px] text-[#848e9c]">
          <svg className="h-4 w-4 shrink-0 text-[#9945ff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0H3" />
          </svg>
          Connect wallet → answer → submit → payout
        </div>
      </div>
    </div>
  );
}
