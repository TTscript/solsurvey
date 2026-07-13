import Link from "next/link";
import { legalNav, mainNav } from "@/lib/site-nav";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 mt-auto border-t border-white/[0.06] bg-[#080a0d] pb-[env(safe-area-inset-bottom,0px)]">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
          <div className="max-w-xs">
            <p className="mb-2 font-semibold tracking-tight text-white">
              Sol<span className="text-[#f0b90b]">Survey</span>
            </p>
            <p className="text-sm leading-relaxed text-[#848e9c]">
              Wallet-verified surveys with SOL micropayments on submit.
            </p>
          </div>
          <nav className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm sm:flex sm:flex-wrap sm:gap-x-5" aria-label="Footer">
            {mainNav.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-[#b7bdc6] transition-colors hover:text-[#f0b90b]"
              >
                {label}
              </Link>
            ))}
            {legalNav.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-[#b7bdc6] transition-colors hover:text-[#f0b90b]"
              >
                {label}
              </Link>
            ))}
            <a
              href="https://solana.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#b7bdc6] transition-colors hover:text-[#f0b90b]"
            >
              Solana
            </a>
          </nav>
        </div>
        <p className="mt-6 border-t border-white/[0.06] pt-5 text-xs leading-relaxed text-[#5e6673] sm:mt-8 sm:pt-6">
          © {year} SolSurvey
          <span className="mt-1 block sm:mt-0 sm:inline">
            <span className="hidden sm:inline"> · </span>
            Verify wallets · Pay on submit · Track results privately
          </span>
        </p>
      </div>
    </footer>
  );
}
