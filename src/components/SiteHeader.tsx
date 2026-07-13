"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { isNavActive, legalNav, mainNav } from "@/lib/site-nav";

const MOBILE_HEADER_OFFSET = "3.5rem";

function BurgerIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-3.5 w-[1.125rem]" aria-hidden>
      <span
        className={`absolute left-0 block h-0.5 w-[1.125rem] rounded-full bg-current transition-all duration-200 ${
          open ? "top-[6px] rotate-45" : "top-0"
        }`}
      />
      <span
        className={`absolute left-0 top-[6px] block h-0.5 w-[1.125rem] rounded-full bg-current transition-all duration-200 ${
          open ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"
        }`}
      />
      <span
        className={`absolute left-0 block h-0.5 w-[1.125rem] rounded-full bg-current transition-all duration-200 ${
          open ? "top-[6px] -rotate-45" : "top-3"
        }`}
      />
    </span>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen((open) => !open);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#0b0e11]/95 backdrop-blur-xl pt-[env(safe-area-inset-top,0px)]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between gap-3 md:h-16">
            <Link href="/" className="flex min-w-0 items-center gap-2" onClick={closeMenu}>
              <Image
                src="/icon.svg"
                width={32}
                height={32}
                className="size-8 shrink-0 rounded-lg md:size-9"
                alt=""
                unoptimized
              />
              <div className="min-w-0">
                <span className="block truncate text-base font-semibold tracking-tight md:text-lg">
                  Sol<span className="text-[#f0b90b]">Survey</span>
                </span>
                <span className="hidden text-[11px] text-[#5e6673] md:block">
                  Incentivized questionnaires on Solana
                </span>
              </div>
            </Link>

            <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
              {mainNav.map(({ href, label }, i) => {
                const active = isNavActive(pathname, href);
                return (
                  <span key={href} className="flex items-center">
                    {i > 0 ? (
                      <span className="mx-2 text-[#2b3139] select-none" aria-hidden>
                        /
                      </span>
                    ) : null}
                    <Link
                      href={href}
                      className={`border-b-2 pb-0.5 text-sm transition-colors ${
                        active
                          ? "border-[#f0b90b] font-medium text-white"
                          : "border-transparent text-[#848e9c] hover:border-white/20 hover:text-zinc-200"
                      }`}
                    >
                      {label}
                    </Link>
                  </span>
                );
              })}
            </nav>

            <div className="flex shrink-0 items-center gap-2">
              <Link
                href="/builder"
                className="hidden min-h-10 items-center justify-center rounded-xl bg-[#f0b90b] px-4 text-sm font-semibold text-[#0b0e11] transition hover:bg-[#fcd535] lg:inline-flex"
              >
                Launch builder
              </Link>
              <button
                type="button"
                className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border transition lg:hidden ${
                  menuOpen
                    ? "border-[#f0b90b]/35 bg-[#f0b90b]/10 text-[#f0b90b]"
                    : "border-white/10 bg-white/[0.04] text-zinc-200 hover:bg-white/[0.07]"
                }`}
                aria-expanded={menuOpen}
                aria-controls="mobile-nav"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                onClick={toggleMenu}
              >
                <BurgerIcon open={menuOpen} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[60] lg:hidden ${menuOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!menuOpen}
        style={{ top: `calc(${MOBILE_HEADER_OFFSET} + env(safe-area-inset-top, 0px))` }}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-black/75 backdrop-blur-[2px] transition-opacity duration-300 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
          aria-label="Close menu"
          tabIndex={menuOpen ? 0 : -1}
          onClick={closeMenu}
        />

        <nav
          id="mobile-nav"
          className={`absolute inset-y-0 right-0 flex w-full max-w-[20rem] flex-col border-l border-white/10 bg-[#0f1218] shadow-2xl transition-transform duration-300 ease-out ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          aria-label="Mobile"
          aria-hidden={!menuOpen}
        >
          <div className="flex items-center justify-between border-b border-white/[0.08] px-4 py-3.5">
            <span className="text-sm font-semibold text-white">Navigate</span>
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-white/[0.05] hover:text-white"
              aria-label="Close menu"
              tabIndex={menuOpen ? 0 : -1}
              onClick={closeMenu}
            >
              <BurgerIcon open />
            </button>
          </div>

          <ul className="flex-1 space-y-1 overflow-y-auto overscroll-contain px-3 py-3">
            <li>
              <Link
                href="/"
                onClick={closeMenu}
                tabIndex={menuOpen ? 0 : -1}
                className={`flex min-h-12 items-center gap-3 rounded-xl border px-3.5 py-3 transition active:scale-[0.99] ${
                  pathname === "/"
                    ? "border-[#f0b90b]/30 bg-[#f0b90b]/10"
                    : "border-transparent hover:border-white/[0.06] hover:bg-white/[0.03]"
                }`}
              >
                <span
                  className={`h-7 w-1 shrink-0 rounded-full ${pathname === "/" ? "bg-[#f0b90b]" : "bg-white/10"}`}
                  aria-hidden
                />
                <span className="min-w-0">
                  <span className={`block text-[15px] font-medium ${pathname === "/" ? "text-[#f0b90b]" : "text-white"}`}>
                    Home
                  </span>
                  <span className="block text-xs leading-snug text-[#848e9c]">Landing & overview</span>
                </span>
              </Link>
            </li>
            {mainNav.map(({ href, label, hint }) => {
              const active = isNavActive(pathname, href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={closeMenu}
                    tabIndex={menuOpen ? 0 : -1}
                    className={`flex min-h-12 items-center gap-3 rounded-xl border px-3.5 py-3 transition active:scale-[0.99] ${
                      active
                        ? "border-[#f0b90b]/30 bg-[#f0b90b]/10"
                        : "border-transparent hover:border-white/[0.06] hover:bg-white/[0.03]"
                    }`}
                  >
                    <span
                      className={`h-7 w-1 shrink-0 rounded-full ${active ? "bg-[#f0b90b]" : "bg-white/10"}`}
                      aria-hidden
                    />
                    <span className="min-w-0">
                      <span className={`block text-[15px] font-medium ${active ? "text-[#f0b90b]" : "text-white"}`}>
                        {label}
                      </span>
                      <span className="block text-xs leading-snug text-[#848e9c]">{hint}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="shrink-0 border-t border-white/[0.08] bg-[#0b0e11]/80 px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <Link
              href="/builder"
              onClick={closeMenu}
              tabIndex={menuOpen ? 0 : -1}
              className="flex min-h-11 items-center justify-center rounded-xl bg-[#f0b90b] px-4 text-sm font-semibold text-[#0b0e11] transition hover:bg-[#fcd535]"
            >
              Launch builder
            </Link>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 pt-1 text-xs">
              {legalNav.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={closeMenu}
                  tabIndex={menuOpen ? 0 : -1}
                  className="text-[#848e9c] transition hover:text-[#f0b90b]"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
