import Image from "next/image";
import Link from "next/link";
import { HeroIllustration } from "@/components/HeroIllustration";
import { MainContainer } from "@/components/MainContainer";
import { PAGE_PADDING } from "@/components/PageShell";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { StatsStrip } from "@/components/StatsStrip";

const steps = ["Build", "Fund pool", "Share link", "Pay on submit"] as const;

const pillars = [
  "Wallet-verified respondents",
  "SOL on submit",
  "On-chain receipts",
] as const;

const highlights = [
  {
    title: "Better signal",
    body: "A small SOL reward nudges thoughtful answers instead of drive-by clicks.",
  },
  {
    title: "No payout desk",
    body: "Set the pool once—transfers fire automatically when someone submits.",
  },
  {
    title: "Wallet as ID",
    body: "Lightweight verification without emails, gift cards, or manual CSVs.",
  },
] as const;

const audiences = [
  {
    title: "Running surveys",
    body: "Draft questions, fund a pool, and share one public link.",
    href: "/operators",
    label: "Creator guide",
  },
  {
    title: "For respondents",
    body: "See the reward upfront, connect a wallet, answer, and receive SOL.",
    href: "/respondents",
    label: "Respondent FAQ",
  },
] as const;

const LANDING_IMAGE =
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80";

export default function Home() {
  return (
    <MainContainer className={PAGE_PADDING}>
      <section className="relative mb-10 sm:mb-14">
        <div
          className="animate-glow-drift pointer-events-none absolute left-1/2 top-0 h-[16rem] w-[min(100%,36rem)] opacity-35 blur-[100px] sm:h-[20rem]"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(153,69,255,0.28) 0%, rgba(240,185,11,0.07) 55%, transparent 72%)",
          }}
        />
        <div className="relative grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="order-2 text-center lg:order-1 lg:col-span-7 lg:text-left">
            <p className="animate-hero-in mb-3 text-xs font-semibold uppercase tracking-wider text-[#c4b5fd]">
              Solana surveys
            </p>
            <h1 className="animate-hero-in animate-hero-delay-1 mb-4 text-balance text-[1.75rem] font-bold leading-tight tracking-tight text-white sm:mb-5 sm:text-5xl lg:text-[3rem] lg:leading-[1.1]">
              Rewarded feedback,{" "}
              <span className="animate-text-shimmer bg-gradient-to-r from-[#9945ff] via-[#f0b90b] to-[#9945ff] bg-clip-text text-transparent">
                paid instantly.
              </span>
            </h1>
            <p className="animate-hero-in animate-hero-delay-2 mx-auto mb-6 max-w-md text-sm leading-relaxed text-[#848e9c] sm:mb-8 sm:text-base lg:mx-0">
              Questionnaire + SOL pool + one link. Payout when someone submits.
            </p>
            <div className="animate-hero-in animate-hero-delay-3 flex flex-col gap-3 sm:flex-row sm:justify-start">
              <Link
                href="/builder"
                className="hover-lift inline-flex w-full items-center justify-center rounded-xl bg-[#f0b90b] px-6 py-3.5 text-sm font-semibold text-[#0b0e11] transition hover:bg-[#fcd535] sm:w-auto"
              >
                Launch builder
              </Link>
              <Link
                href="/surveys"
                className="hover-lift inline-flex w-full items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-white transition hover:border-[#9945ff]/40 hover:bg-[#9945ff]/10 sm:w-auto"
              >
                Browse surveys
              </Link>
            </div>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-5">
            <HeroIllustration />
          </div>
        </div>
      </section>

      <StatsStrip />

      <RevealOnScroll>
        <section className="mx-auto mb-10 max-w-4xl sm:mb-14">
          <div className="mb-5 text-center sm:mb-6">
            <h2 className="mb-2 text-lg font-bold text-white sm:text-2xl">From answers to insight</h2>
            <p className="mx-auto max-w-lg text-sm leading-relaxed text-[#848e9c]">
              Qualitative responses with verifiable payouts—not just the loudest voice in the thread.
            </p>
          </div>
          <figure className="hover-lift relative overflow-hidden rounded-xl border border-white/[0.1] shadow-2xl shadow-black/40 sm:rounded-2xl">
            <div className="relative aspect-[4/3] w-full sm:aspect-[16/9]">
              <Image
                src={LANDING_IMAGE}
                alt="Analytics dashboard with charts and survey metrics"
                fill
                className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                sizes="(max-width: 896px) 100vw, 896px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e11] via-[#0b0e11]/25 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 px-4 py-4 text-center sm:px-8 sm:py-6">
                <p className="text-xs font-medium text-white sm:text-base">
                  Track responses, pool spend, and SOL payouts from your private results link.
                </p>
              </figcaption>
            </div>
          </figure>
        </section>
      </RevealOnScroll>

      <RevealOnScroll>
        <section className="mb-10 sm:mb-12">
          <h2 className="mb-5 text-center text-lg font-bold text-white sm:mb-8 sm:text-xl">
            Why teams use it
          </h2>
          <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
            {highlights.map(({ title, body }, i) => (
              <RevealOnScroll key={title} delay={i * 90}>
                <div className="hover-lift h-full rounded-xl border border-white/[0.08] bg-[#12161c]/60 p-4 sm:rounded-2xl sm:p-6">
                  <h3 className="mb-1.5 font-semibold text-white sm:mb-2">{title}</h3>
                  <p className="text-sm leading-relaxed text-[#848e9c]">{body}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </section>
      </RevealOnScroll>

      <RevealOnScroll>
        <section className="mb-10 sm:mb-12">
          <ol className="mx-auto flex max-w-md flex-col gap-2 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-5 sm:gap-y-2">
            {steps.map((step, i) => (
              <RevealOnScroll key={step} delay={i * 70}>
                <li className="flex items-center gap-3 text-sm sm:gap-5">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#9945ff]/15 text-xs font-bold text-[#c4b5fd] sm:hidden">
                    {i + 1}
                  </span>
                  {i > 0 ? (
                    <span className="hidden text-[#2b3139] sm:inline" aria-hidden>
                      →
                    </span>
                  ) : null}
                  <span className={i === steps.length - 1 ? "font-medium text-[#f0b90b]" : "text-zinc-300"}>
                    {step}
                  </span>
                </li>
              </RevealOnScroll>
            ))}
          </ol>
        </section>
      </RevealOnScroll>

      <RevealOnScroll>
        <section className="mb-10 grid gap-3 sm:mb-12 sm:grid-cols-2 sm:gap-5">
          {audiences.map(({ title, body, href, label }, i) => (
            <RevealOnScroll key={title} delay={i * 100}>
              <div className="hover-lift h-full rounded-xl border border-white/[0.08] bg-[#12161c]/50 p-4 sm:rounded-2xl sm:p-6">
                <h3 className="mb-1.5 font-semibold text-white sm:mb-2">{title}</h3>
                <p className="mb-3 text-sm leading-relaxed text-[#848e9c] sm:mb-4">{body}</p>
                <Link href={href} className="text-sm font-medium text-[#f0b90b] transition hover:text-[#fcd535]">
                  {label} →
                </Link>
              </div>
            </RevealOnScroll>
          ))}
        </section>
      </RevealOnScroll>

      <RevealOnScroll>
        <section className="rounded-xl border border-white/[0.08] bg-[#12161c]/50 px-4 py-5 sm:rounded-2xl sm:px-8 sm:py-6">
          <ul className="grid gap-3 sm:grid-cols-3 sm:gap-6">
            {pillars.map((line, i) => (
              <RevealOnScroll key={line} delay={i * 80}>
                <li className="flex items-center gap-3 text-sm text-[#b7bdc6]">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#f0b90b]" />
                  {line}
                </li>
              </RevealOnScroll>
            ))}
          </ul>
          <div className="mt-5 flex flex-col gap-2.5 border-t border-white/[0.06] pt-5 sm:mt-6 sm:flex-row sm:items-center sm:justify-center sm:gap-3 sm:pt-6">
            <Link
              href="/builder"
              className="hover-lift inline-flex min-h-11 items-center justify-center rounded-xl bg-[#f0b90b] px-5 py-2.5 text-sm font-semibold text-[#0b0e11] transition hover:bg-[#fcd535]"
            >
              Launch builder
            </Link>
            <Link
              href="/reward-flow"
              className="inline-flex min-h-11 items-center justify-center text-sm text-[#848e9c] transition hover:text-[#f0b90b]"
            >
              See reward flow →
            </Link>
          </div>
        </section>
      </RevealOnScroll>
    </MainContainer>
  );
}
