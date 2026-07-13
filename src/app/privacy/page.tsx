import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { PageSection } from "@/components/ContentCard";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How SolSurvey handles wallet addresses, survey answers, and reward payouts.",
};

export default function PrivacyPage() {
  return (
    <PageShell
      title="Privacy"
      description="What we collect, what stays private, and what lands on Solana."
    >
      <RevealOnScroll delay={80}>
        <PageSection title="What we collect">
          <ul className="space-y-3 text-sm leading-relaxed text-[#b7bdc6]">
            <li>Your Solana wallet address when you connect to take or fund a survey.</li>
            <li>Survey answers you submit through a rewarded form.</li>
            <li>Basic technical logs needed to run the service (errors, rate limits).</li>
          </ul>
        </PageSection>
      </RevealOnScroll>

      <RevealOnScroll delay={160}>
        <PageSection title="What is not public on-chain">
          <p className="text-sm leading-relaxed text-[#b7bdc6]">
            Your written survey answers are stored privately by SolSurvey. They are not published to Solana. Only SOL
            reward transfers appear on-chain and can be viewed on a block explorer.
          </p>
        </PageSection>
      </RevealOnScroll>

      <RevealOnScroll delay={240}>
        <PageSection title="Wallet verification">
          <p className="text-sm leading-relaxed text-[#b7bdc6]">
            We may check wallet balance and recent activity to reduce spam. We do not sell wallet data or use it for
            advertising profiles.
          </p>
        </PageSection>
      </RevealOnScroll>

      <RevealOnScroll delay={320}>
        <PageSection title="Your choices">
          <p className="text-sm leading-relaxed text-[#b7bdc6]">
            You choose whether to connect a wallet and complete a survey. Survey creators receive responses tied to
            wallet addresses for payout and duplicate prevention. Only participate if you trust the survey publisher.
          </p>
        </PageSection>
      </RevealOnScroll>
    </PageShell>
  );
}
