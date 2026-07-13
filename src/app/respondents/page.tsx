import type { Metadata } from "next";
import Link from "next/link";
import { ContentCard, PageSection } from "@/components/ContentCard";
import { PageShell } from "@/components/PageShell";
import { RevealOnScroll } from "@/components/RevealOnScroll";

export const metadata: Metadata = {
  title: "Respondents",
  description: "Taking a rewarded survey—what you need, step by step, and answers to common questions.",
};

const steps = [
  {
    n: "01",
    title: "Open the survey link",
    body: "You'll see the title, description, and how much SOL you'll earn for completing the form.",
  },
  {
    n: "02",
    title: "Connect your wallet",
    body: "Tap Connect wallet on the survey page, pick Phantom or Solflare, and approve in your extension.",
  },
  {
    n: "03",
    title: "Answer & submit",
    body: "Fill in text or pick options. When you're done, submit—SolSurvey checks your wallet before sending the reward.",
  },
  {
    n: "04",
    title: "Receive SOL",
    body: "On success, SOL arrives in your connected wallet. You may see a Solscan link to confirm the payment.",
  },
] as const;

const items: { q: string; a: string }[] = [
  {
    q: "Do I need SOL to participate?",
    a: "You need a compatible Solana wallet. Transaction fees for the reward are covered by the survey creator. Your wallet may need a small balance and some prior activity to pass verification.",
  },
  {
    q: "When do I get paid?",
    a: "Right after a successful submit. SOL is sent to the wallet you connected, usually within seconds once the network confirms the transfer.",
  },
  {
    q: "What does wallet verification check?",
    a: "SolSurvey looks for signs of a real wallet—like a minimum balance and recent activity—to reduce spam accounts. It's a quality filter, not a guarantee that every person is unique.",
  },
  {
    q: "What question types will I see?",
    a: "Short text, single choice, and multiple choice. Enough for quick pulse surveys without long forms or branching logic.",
  },
  {
    q: "Are my answers public on-chain?",
    a: "No. Your written answers are stored privately by SolSurvey. Only the SOL reward is sent on Solana—you can verify that payment on Solscan.",
  },
  {
    q: "Why was my submission rejected?",
    a: "Common reasons: wallet didn't pass verification, the survey reward pool ran out, or a temporary network issue. Try again with an active wallet, or reach out to whoever shared the survey link.",
  },
];

const wallets = ["Phantom", "Solflare", "Backpack"] as const;

export default function RespondentsPage() {
  return (
    <PageShell
      title="Respondents"
      description="Taking a rewarded survey—what you need, what happens step by step, and answers to common questions."
    >
      <RevealOnScroll delay={80}>
        <PageSection title="How to complete a survey">
          <div className="grid gap-3 sm:grid-cols-2">
            {steps.map(({ n, title, body }, i) => (
              <RevealOnScroll key={n} delay={i * 70}>
                <ContentCard title={`${n} · ${title}`}>
                  <p>{body}</p>
                </ContentCard>
              </RevealOnScroll>
            ))}
          </div>
        </PageSection>
      </RevealOnScroll>

      <RevealOnScroll delay={160}>
        <PageSection title="Compatible wallets">
          <div className="flex flex-wrap gap-2">
            {wallets.map((w) => (
              <span
                key={w}
                className="rounded-full border border-white/10 bg-[#1a1f27]/80 px-3.5 py-1.5 text-sm text-[#b7bdc6]"
              >
                {w}
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm text-[#848e9c]">
            Install a browser wallet extension, connect on the survey page, then answer the questions.
          </p>
        </PageSection>
      </RevealOnScroll>

      <RevealOnScroll delay={240}>
        <PageSection title="FAQ">
          <div className="space-y-3">
            {items.map(({ q, a }, i) => (
              <RevealOnScroll key={q} delay={i * 50}>
                <details className="group rounded-xl border border-white/10 bg-[#12161c]/60 px-4 open:bg-[#1a1f27]/60 sm:px-5">
                  <summary className="cursor-pointer list-none py-4 font-medium text-white [&::-webkit-details-marker]:hidden">
                    <span className="flex items-center justify-between gap-4">
                      {q}
                      <span className="text-[#f0b90b]/80 transition group-open:rotate-180">▼</span>
                    </span>
                  </summary>
                  <p className="border-t border-white/[0.06] pb-4 pt-3 text-sm leading-relaxed text-[#848e9c]">
                    {a}
                  </p>
                </details>
              </RevealOnScroll>
            ))}
          </div>
        </PageSection>
      </RevealOnScroll>

      <RevealOnScroll delay={320}>
        <ContentCard title="Privacy note">
          <p>
            Your wallet address is used for verification and payout. Text answers are kept private and are not published
            on Solana. Only participate if you trust whoever shared the survey link.
          </p>
        </ContentCard>
      </RevealOnScroll>

      <RevealOnScroll delay={400}>
        <p className="mt-8 text-sm text-[#5e6673] sm:mt-10">
          <Link href="/surveys" className="font-medium text-[#f0b90b] hover:text-[#fcd535]">
            Browse open surveys
          </Link>
          {" · "}
          Running surveys?{" "}
          <Link href="/builder" className="font-medium text-[#f0b90b] hover:text-[#fcd535]">
            Open the builder
          </Link>
          {" · "}
          <Link href="/reward-flow" className="font-medium text-[#f0b90b] hover:text-[#fcd535]">
            Reward flow
          </Link>
          {" · "}
          <Link href="/operators" className="font-medium text-[#f0b90b] hover:text-[#fcd535]">
            Creator guide
          </Link>
        </p>
      </RevealOnScroll>
    </PageShell>
  );
}
