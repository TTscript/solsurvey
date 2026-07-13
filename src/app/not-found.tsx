import Link from "next/link";
import { MainContainer } from "@/components/MainContainer";
import { PAGE_PADDING } from "@/components/PageShell";
import { RevealOnScroll } from "@/components/RevealOnScroll";

export default function NotFound() {
  return (
    <MainContainer className={PAGE_PADDING}>
      <RevealOnScroll>
        <div className="mx-auto max-w-lg text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#c4b5fd]">404</p>
          <h1 className="mb-3 text-2xl font-bold text-white sm:text-4xl">Page not found</h1>
          <p className="mb-8 text-sm leading-relaxed text-[#848e9c] sm:text-base">
            This page doesn&apos;t exist or may have moved. Head back and launch a rewarded survey instead.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#f0b90b] px-5 py-2.5 text-sm font-semibold text-[#0b0e11] hover:bg-[#fcd535]"
            >
              Home
            </Link>
            <Link
              href="/builder"
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/15 px-5 py-2.5 text-sm font-medium text-zinc-300 hover:bg-white/5"
            >
              Open builder
            </Link>
          </div>
        </div>
      </RevealOnScroll>
    </MainContainer>
  );
}
