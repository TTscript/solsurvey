import type { Metadata } from "next";
import Link from "next/link";
import { ContentCard, PageSection } from "@/components/ContentCard";
import { PageShell } from "@/components/PageShell";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { SurveyRespondentPreview } from "@/components/SurveyRespondentPreview";

export const metadata: Metadata = {
  title: "Reward flow",
  description: "How SolSurvey works—from building a survey to paying SOL when someone submits.",
};

const pipeline = [
  {
    phase: "Compose",
    title: "Build your survey",
    body: "Add a title, description, and questions. Set the reward per response and total pool—SolSurvey uses both to know how many paid completions you can afford.",
    details: [
      "Short text, single choice, and multi-select supported.",
      "Pool ÷ per-response reward = maximum paid responses.",
      "A clear description helps people decide before they connect a wallet.",
    ],
  },
  {
    phase: "Distribute",
    title: "Share the link",
    body: "After publish you get a URL anyone can open. Respondents see the reward upfront and connect a wallet before answering.",
    details: [
      "No account signup—just a Solana wallet.",
      "Reward amount is visible on the survey page.",
      "Share in communities, newsletters, or direct messages.",
    ],
  },
  {
    phase: "Verify",
    title: "Wallet check",
    body: "Before paying out, SolSurvey confirms the wallet looks real—enough balance and some on-chain history—to reduce spam and empty accounts.",
    details: [
      "A practical quality filter, not a perfect identity check.",
      "If verification fails, the respondent sees a clear message.",
      "Helps you get thoughtful answers, not drive-by clicks.",
    ],
  },
  {
    phase: "Settle",
    title: "Pay on submit",
    body: "When someone submits successfully, their answers are saved and SOL is sent to their wallet. They may get a link to confirm the payment on Solscan.",
    details: [
      "Payout happens automatically—no manual transfers.",
      "Each completion uses one reward from your pool.",
      "Respondents usually receive SOL within seconds.",
    ],
  },
] as const;

const recorded = [
  { label: "Survey answers", value: "Saved securely so you can review feedback" },
  { label: "SOL reward", value: "Sent to the respondent's wallet on Solana" },
  { label: "Payment receipt", value: "Solscan link to verify the transfer" },
] as const;

export default function RewardFlowPage() {
  return (
    <PageShell
      title="Reward flow"
      description="Four steps from draft to payout—what happens when you share a rewarded survey link."
    >
      <div className="mb-8 grid gap-8 sm:mb-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-10 lg:items-start">
        <div className="order-2 space-y-0 lg:order-1">
          {pipeline.map((step, i) => (
            <RevealOnScroll key={step.phase} delay={i * 80}>
              <div className="relative flex gap-5 pb-10 last:pb-0 sm:gap-8">
                {i < pipeline.length - 1 ? (
                  <span
                    className="absolute left-[1.125rem] top-10 bottom-0 w-px bg-gradient-to-b from-[#f0b90b]/40 to-transparent sm:left-[1.25rem]"
                    aria-hidden
                  />
                ) : null}
                <div className="relative z-[1] flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#9945ff]/35 bg-[#9945ff]/10 text-[10px] font-bold uppercase tracking-wider text-[#c4b5fd] sm:h-10 sm:w-10">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="min-w-0 pt-0.5">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-[#f0b90b]">
                    {step.phase}
                  </p>
                  <h2 className="mb-2 text-lg font-semibold text-white sm:text-xl">{step.title}</h2>
                  <p className="mb-3 leading-relaxed text-[#848e9c]">{step.body}</p>
                  <ul className="space-y-1.5">
                    {step.details.map((d) => (
                      <li key={d} className="flex gap-2 text-sm text-[#b7bdc6]">
                        <span className="text-[#9945ff]">·</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delay={40}>
          <div className="order-1 lg:order-2 lg:sticky lg:top-24">
            <SurveyRespondentPreview />
          </div>
        </RevealOnScroll>
      </div>

      <RevealOnScroll delay={360}>
        <PageSection
          eyebrow="Transparency"
          title="What gets recorded"
          description="Your feedback stays private; the reward is what respondents see on-chain."
        >
          <div className="grid gap-3 sm:grid-cols-3">
            {recorded.map(({ label, value }, i) => (
              <RevealOnScroll key={label} delay={i * 60}>
                <ContentCard title={label}>
                  <p>{value}</p>
                </ContentCard>
              </RevealOnScroll>
            ))}
          </div>
        </PageSection>
      </RevealOnScroll>

      <RevealOnScroll delay={440}>
        <PageSection title="When payouts stop">
          <ContentCard title="Pool runs out">
            <p>
              Each completed survey uses one reward from your pool. When the remaining balance is less than one payout,
              new paid responses pause. Create a new survey with a fresh pool—or size the pool larger upfront in the{" "}
              <Link href="/builder" className="text-[#f0b90b] hover:text-[#fcd535]">
                builder
              </Link>
              .
            </p>
          </ContentCard>
        </PageSection>
      </RevealOnScroll>

      <RevealOnScroll delay={520}>
        <div className="flex flex-col gap-3 rounded-xl border border-[#9945ff]/20 bg-gradient-to-br from-[#9945ff]/[0.08] to-transparent p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <p className="font-semibold text-white">Ready to launch?</p>
          <p className="mt-1 text-sm text-[#848e9c]">Start with one question and a small pool—you can always run another.</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Link
            href="/builder"
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#f0b90b] px-5 py-2.5 text-sm font-semibold text-[#0b0e11] transition hover:bg-[#fcd535]"
          >
            Open builder
          </Link>
          <Link
            href="/operators"
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/15 px-5 py-2.5 text-sm font-medium text-zinc-300 transition hover:bg-white/5"
          >
            Creator guide
          </Link>
        </div>
        </div>
      </RevealOnScroll>
    </PageShell>
  );
}
