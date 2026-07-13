import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { PageSection } from "@/components/ContentCard";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of use for SolSurvey—rewarded surveys with Solana wallet verification.",
};

export default function TermsPage() {
  return (
    <PageShell
      title="Terms"
      description="Plain-language terms for using SolSurvey as a creator or respondent."
    >
      <RevealOnScroll delay={80}>
        <PageSection title="Service">
          <p className="text-sm leading-relaxed text-[#b7bdc6]">
            SolSurvey lets creators publish rewarded questionnaires and pay respondents in SOL on successful submit.
            The service is provided as-is. Network conditions, wallet compatibility, and funding availability can affect
            payouts.
          </p>
        </PageSection>
      </RevealOnScroll>

      <RevealOnScroll delay={160}>
        <PageSection title="Creators">
          <ul className="space-y-3 text-sm leading-relaxed text-[#b7bdc6]">
            <li>You are responsible for survey content, distribution, and sizing your reward pool.</li>
            <li>Reward pools are configured at publish time. When the pool is full, paid responses stop.</li>
            <li>Keep your private results link secure—it grants access to submitted answers.</li>
          </ul>
        </PageSection>
      </RevealOnScroll>

      <RevealOnScroll delay={240}>
        <PageSection title="Respondents">
          <ul className="space-y-3 text-sm leading-relaxed text-[#b7bdc6]">
            <li>Rewards are sent to the wallet you connect. One paid response per wallet per survey.</li>
            <li>Wallet verification may reject empty or inactive accounts.</li>
            <li>Only complete surveys from publishers you trust.</li>
          </ul>
        </PageSection>
      </RevealOnScroll>

      <RevealOnScroll delay={320}>
        <PageSection title="Limitation of liability">
          <p className="text-sm leading-relaxed text-[#b7bdc6]">
            SolSurvey is not a market-research panel, investment product, or financial advisor. Use at your own risk.
            We are not liable for lost funds due to misconfigured pools, insufficient vault funding, or user error.
          </p>
        </PageSection>
      </RevealOnScroll>
    </PageShell>
  );
}
