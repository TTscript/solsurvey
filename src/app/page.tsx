import Image from "next/image";
import Link from "next/link";
import { HeroProductStage } from "@/components/HeroProductStage";
import { MainContainer } from "@/components/MainContainer";
import { PAGE_PADDING } from "@/components/PageShell";
import { RevealOnScroll } from "@/components/RevealOnScroll";

const steps = [
  { n: "01", title: "Build", body: "Draft questions and set the reward per response." },
  { n: "02", title: "Fund", body: "Send the SOL pool from your wallet to activate." },
  { n: "03", title: "Share", body: "One public link — no emails, no gift cards." },
  { n: "04", title: "Pay", body: "On submit, the vault pays the respondent instantly." },
] as const;

const reasons = [
  {
    title: "Better signal",
    body: "A small SOL reward nudges thoughtful answers instead of drive-by clicks.",
  },
  {
    title: "No payout desk",
    body: "Set the pool once — transfers fire automatically when someone submits.",
  },
  {
    title: "Wallet as ID",
    body: "Lightweight verification without emails, gift cards, or manual CSVs.",
  },
] as const;

export default function Home() {
  return (
    <>
      {/* Hero — brand masthead + product stage (not stock dashboard) */}
      <section className="relative isolate overflow-hidden border-b border-line">
        <MainContainer className="py-10 sm:py-14 lg:py-16">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="text-center lg:col-span-6 lg:text-left">
              <p className="animate-hero-in ss-section-label mb-4">
                <span className="inline-flex items-center gap-2">
                  <span className="animate-pulse-dot size-1.5 rounded-full bg-pulse" />
                  Solana surveys
                </span>
              </p>
              <h1 className="animate-hero-in animate-hero-delay-1 ss-display mb-4 text-[clamp(2.75rem,10vw,5.5rem)] text-ink">
                SolSurvey
              </h1>
              <p className="animate-hero-in animate-hero-delay-2 mx-auto mb-3 max-w-md text-balance text-xl font-semibold tracking-tight text-ink sm:text-2xl lg:mx-0">
                Rewarded feedback, paid on submit.
              </p>
              <p className="animate-hero-in animate-hero-delay-2 mx-auto mb-8 max-w-md text-sm leading-relaxed text-ink-soft sm:text-base lg:mx-0">
                Questionnaire + SOL pool + one link. Respondents connect a wallet and get paid when they finish.
              </p>
              <div className="animate-hero-in animate-hero-delay-3 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
                <Link
                  href="/builder"
                  className="ss-btn-primary inline-flex w-full items-center justify-center rounded-xl px-6 py-3.5 text-sm font-semibold sm:w-auto"
                >
                  Launch builder
                </Link>
                <Link
                  href="/surveys"
                  className="ss-btn-ghost inline-flex w-full items-center justify-center rounded-xl px-6 py-3.5 text-sm font-semibold sm:w-auto"
                >
                  Browse surveys
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <HeroProductStage />
            </div>
          </div>
        </MainContainer>
      </section>

      {/* Atmosphere — full-bleed editorial photo */}
      <section className="relative isolate min-h-[42vh] overflow-hidden sm:min-h-[48vh]">
        <Image
          src="/images/hero.jpg"
          alt=""
          fill
          priority
          className="object-cover object-[center_40%]"
          sizes="100vw"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-paper/20 via-transparent to-paper/85"
        />
        <div className="absolute inset-x-0 bottom-0 z-10 px-4 pb-8 sm:px-6 sm:pb-10 lg:px-8">
          <p className="mx-auto max-w-6xl text-balance text-lg font-semibold tracking-tight text-ink sm:text-2xl">
            Real answers. On-chain receipts.
          </p>
        </div>
      </section>

      <MainContainer className={PAGE_PADDING}>
        <RevealOnScroll>
          <section className="mb-14 sm:mb-16">
            <p className="ss-section-label mb-3 text-center">Why teams use it</p>
            <h2 className="ss-display mb-8 text-center text-3xl text-ink sm:text-4xl">
              Signal over noise
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {reasons.map(({ title, body }, i) => (
                <RevealOnScroll key={title} delay={i * 90}>
                  <div className="hover-lift h-full rounded-2xl border border-line bg-raised/80 p-5 sm:p-6">
                    <p className="mb-3 font-mono text-xs font-bold text-pulse">0{i + 1}</p>
                    <h3 className="mb-2 text-lg font-bold text-ink">{title}</h3>
                    <p className="text-sm leading-relaxed text-ink-soft">{body}</p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </section>
        </RevealOnScroll>

        <RevealOnScroll>
          <section className="mb-14 sm:mb-16">
            <p className="ss-section-label mb-3 text-center">Flow</p>
            <h2 className="ss-display mb-8 text-center text-3xl text-ink sm:text-4xl">
              Four steps to a live pool
            </h2>
            <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map(({ n, title, body }, i) => (
                <RevealOnScroll key={title} delay={i * 70}>
                  <li className="rounded-2xl border border-line bg-raised/70 p-5">
                    <span className="mb-3 block font-mono text-xs font-bold text-pulse">{n}</span>
                    <h3 className="mb-1.5 font-bold text-ink">{title}</h3>
                    <p className="text-sm leading-relaxed text-ink-soft">{body}</p>
                  </li>
                </RevealOnScroll>
              ))}
            </ol>
          </section>
        </RevealOnScroll>

        <RevealOnScroll>
          <section className="rounded-2xl border border-line bg-ink px-5 py-8 text-center sm:px-10 sm:py-10">
            <h2 className="ss-display mb-3 text-3xl text-raised sm:text-4xl">Ready to launch?</h2>
            <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-white/65 sm:text-base">
              Draft in the builder, fund the pool, share one link. Private results stay behind your manage token.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/builder"
                className="ss-btn-primary inline-flex min-h-11 items-center justify-center rounded-xl px-6 py-2.5 text-sm font-semibold"
              >
                Launch builder
              </Link>
              <Link
                href="/reward-flow"
                className="inline-flex min-h-11 items-center justify-center text-sm font-medium text-white/70 transition hover:text-white"
              >
                See reward flow →
              </Link>
            </div>
          </section>
        </RevealOnScroll>
      </MainContainer>
    </>
  );
}
