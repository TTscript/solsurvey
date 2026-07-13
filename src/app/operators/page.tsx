import type { Metadata } from "next";
import Link from "next/link";
import { ContentCard, PageSection } from "@/components/ContentCard";
import { PageShell } from "@/components/PageShell";
import { RevealOnScroll } from "@/components/RevealOnScroll";

export const metadata: Metadata = {
  title: "Creators",
  description: "Launch rewarded questionnaires—fund a SOL pool, share one link, and pay respondents when they submit.",
};

const howItWorks = [
  {
    title: "Draft & fund",
    body: "Write your questions, set how much SOL each response earns, and choose a total reward pool. SolSurvey handles the rest.",
  },
  {
    title: "Share one link",
    body: "Publish and get a public URL. Post it in Discord, X, email, or anywhere your audience already is.",
  },
  {
    title: "Pay on submit",
    body: "When someone completes the survey, SOL is sent to their wallet automatically. No manual payouts or spreadsheets.",
  },
] as const;

const beforePublish = [
  "Write a clear title and short description so people know what they're answering.",
  "Show the reward upfront—respondents decide faster when they see the payout.",
  "Size your pool: total pool ÷ reward per response = max paid completions.",
  "Keep surveys short. Three to six questions usually get better completion rates.",
  "Share where your audience is active, not just once—reminders help fill the pool.",
  "Save your private results link after publish—it shows responses and pool spend.",
] as const;

const rewardTips = [
  {
    title: "Start small",
    body: "Test with a modest pool and one or two questions. You can always launch another survey with a bigger budget.",
  },
  {
    title: "Match reward to effort",
    body: "A longer form deserves a higher per-response reward. If completion drops, try raising the payout or shortening the survey.",
  },
  {
    title: "Plan capacity",
    body: "The pool is set at publish time. When it runs out, new paid responses stop until you create a new survey.",
  },
] as const;

const goodToKnow = [
  {
    title: "You bring the audience",
    body: "SolSurvey is not a respondent panel. You distribute the link; we handle the form, wallet checks, and payouts.",
  },
  {
    title: "Wallet-verified responses",
    body: "Respondents connect a Solana wallet. Light checks help filter empty accounts—better signal than anonymous clicks.",
  },
  {
    title: "Answers stay private",
    body: "Survey responses are stored securely. Only the SOL reward lands on-chain—your questions and answers do not.",
  },
] as const;

export default function OperatorsPage() {
  return (
    <PageShell
      title="Create surveys"
      description="Launch a rewarded questionnaire in minutes—fund a pool, share a link, and pay respondents when they submit."
    >
      <RevealOnScroll delay={80}>
        <div className="mb-8 space-y-4 leading-relaxed text-[#848e9c] sm:mb-10">
          <p className="text-base text-zinc-300 sm:text-lg">
            SolSurvey turns feedback into a simple flow:{" "}
            <strong className="font-medium text-white">questions, a SOL reward pool, and one shareable link</strong>.
            People connect a wallet, answer, and get paid on submit—no gift cards, no payout desk.
          </p>
          <p>
            Built for teams, communities, and founders who want{" "}
            <strong className="font-medium text-white">real answers with aligned incentives</strong>—product pulses,
            beta feedback, event surveys, and community check-ins.
          </p>
        </div>
      </RevealOnScroll>

      <RevealOnScroll delay={160}>
        <PageSection title="How it works">
          <div className="grid gap-3 sm:grid-cols-3">
            {howItWorks.map(({ title, body }, i) => (
              <RevealOnScroll key={title} delay={i * 60}>
                <ContentCard title={title}>
                  <p>{body}</p>
                </ContentCard>
              </RevealOnScroll>
            ))}
          </div>
        </PageSection>
      </RevealOnScroll>

      <RevealOnScroll delay={240}>
        <PageSection title="Before you publish">
          <ul className="space-y-2.5">
            {beforePublish.map((item) => (
              <li key={item} className="flex gap-3 text-sm text-[#b7bdc6]">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-[#f0b90b]/30 text-[10px] font-bold text-[#f0b90b]">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </PageSection>
      </RevealOnScroll>

      <RevealOnScroll delay={320}>
        <PageSection
          title="Set your reward"
          description="The right payout balances cost with completion—especially for longer forms."
        >
          <div className="grid gap-3 sm:grid-cols-3">
            {rewardTips.map(({ title, body }, i) => (
              <RevealOnScroll key={title} delay={i * 60}>
                <ContentCard title={title}>
                  <p>{body}</p>
                </ContentCard>
              </RevealOnScroll>
            ))}
          </div>
        </PageSection>
      </RevealOnScroll>

      <RevealOnScroll delay={400}>
        <PageSection title="Good to know">
          <div className="grid gap-3 sm:grid-cols-3">
            {goodToKnow.map(({ title, body }, i) => (
              <RevealOnScroll key={title} delay={i * 60}>
                <ContentCard title={title}>
                  <p>{body}</p>
                </ContentCard>
              </RevealOnScroll>
            ))}
          </div>
        </PageSection>
      </RevealOnScroll>

      <RevealOnScroll delay={480}>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/builder"
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#f0b90b] px-5 py-2.5 text-sm font-semibold text-[#0b0e11] transition hover:bg-[#fcd535]"
          >
            Open builder
          </Link>
          <Link
            href="/reward-flow"
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/15 px-5 py-2.5 text-sm font-medium text-zinc-300 transition hover:bg-white/5"
          >
            Reward flow
          </Link>
          <Link
            href="/respondents"
            className="inline-flex min-h-11 items-center justify-center text-sm font-medium text-[#f0b90b] hover:text-[#fcd535]"
          >
            Respondent guide →
          </Link>
        </div>
      </RevealOnScroll>
    </PageShell>
  );
}
