import Link from "next/link";
import { MainContainer } from "@/components/MainContainer";
import { PAGE_PADDING } from "@/components/PageShell";
import { RevealOnScroll } from "@/components/RevealOnScroll";

export default function NotFound() {
  return (
    <MainContainer className={PAGE_PADDING}>
      <RevealOnScroll>
        <div className="mx-auto max-w-lg text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-pulse-deep">404</p>
          <h1 className="mb-3 text-2xl font-bold text-ink sm:text-4xl">Page not found</h1>
          <p className="mb-8 text-sm leading-relaxed text-muted sm:text-base">
            This page doesn&apos;t exist or may have moved. Head back and launch a rewarded survey instead.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-pulse px-5 py-2.5 text-sm font-semibold text-white hover:bg-pulse-deep"
            >
              Home
            </Link>
            <Link
              href="/builder"
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-line-strong px-5 py-2.5 text-sm font-medium text-ink-soft hover:bg-ink/[0.04]"
            >
              Open builder
            </Link>
          </div>
        </div>
      </RevealOnScroll>
    </MainContainer>
  );
}
