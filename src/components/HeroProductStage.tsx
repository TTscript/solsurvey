/** Live product mock: questionnaire sheet + SOL payout receipt. */
export function HeroProductStage() {
  return (
    <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-pulse/10 blur-2xl sm:-inset-10"
      />

      {/* Form sheet */}
      <div className="animate-sheet-in ss-surface relative z-10 origin-bottom -rotate-1 rounded-2xl p-5 shadow-[0_24px_60px_rgba(14,23,32,0.12)] sm:p-6">
        <div className="mb-5 flex items-start justify-between gap-3">
          <div>
            <p className="ss-section-label mb-1.5">Live survey</p>
            <p className="text-lg font-bold tracking-tight text-ink sm:text-xl">Product feedback</p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-pulse-soft px-2.5 py-1 text-[11px] font-semibold text-pulse-deep">
            <span className="animate-pulse-dot size-1.5 rounded-full bg-pulse" />
            0.01 SOL
          </span>
        </div>

        <div className="space-y-3">
          <div className="rounded-xl border border-line bg-paper/70 px-3.5 py-3">
            <p className="mb-2 text-xs font-medium text-muted">1. What almost made you leave?</p>
            <div className="h-8 rounded-lg border border-dashed border-line-strong bg-raised/80" />
          </div>
          <div className="rounded-xl border border-pulse/35 bg-pulse-soft/60 px-3.5 py-3">
            <p className="mb-2.5 text-xs font-medium text-ink-soft">2. Would you recommend us?</p>
            <div className="flex flex-wrap gap-2">
              {["Yes", "Maybe", "No"].map((opt, i) => (
                <span
                  key={opt}
                  className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium ${
                    i === 0
                      ? "border-pulse bg-raised text-pulse-deep"
                      : "border-line bg-raised/60 text-muted"
                  }`}
                >
                  {i === 0 ? (
                    <svg className="size-3.5 text-pulse" viewBox="0 0 16 16" fill="none" aria-hidden>
                      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
                      <circle cx="8" cy="8" r="3" fill="currentColor" />
                    </svg>
                  ) : (
                    <span className="size-3.5 rounded-full border border-line-strong" />
                  )}
                  {opt}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-line pt-4 text-xs">
          <span className="text-muted">3 spots left</span>
          <span className="font-semibold text-pulse-deep">Submit & get paid</span>
        </div>
      </div>

      {/* Payout receipt */}
      <div className="animate-receipt-in ss-surface absolute -bottom-3 -right-1 z-20 w-[11.5rem] rotate-[2.5deg] rounded-xl p-3.5 shadow-[0_18px_40px_rgba(14,23,32,0.14)] sm:-right-3 sm:bottom-2 sm:w-[13rem] sm:p-4">
        <div className="mb-2 flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-full bg-pulse text-white">
            <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
              <path className="animate-check-draw" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </span>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted">Payout</p>
            <p className="font-mono text-sm font-bold text-reward">+0.0100 SOL</p>
          </div>
        </div>
        <p className="truncate font-mono text-[10px] text-muted">sig · 4nK…m2Qx</p>
      </div>
    </div>
  );
}
