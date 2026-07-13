"use client";

import { WalletProvider } from "@/components/WalletProvider";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <WalletProvider>
      <div className="flex min-h-screen flex-col bg-[#0b0e11] text-white">
        <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
          <div className="absolute inset-0 bg-[#0b0e11]" />
          <div
            className="absolute left-1/2 top-0 h-[28rem] w-[min(100%,52rem)] -translate-x-1/2 opacity-30 blur-[120px]"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(153,69,255,0.28) 0%, rgba(240,185,11,0.06) 45%, transparent 72%)",
            }}
          />
          <div className="absolute -right-[20%] bottom-0 h-[50vh] w-[50vw] bg-gradient-to-tl from-[#f0b90b]/[0.04] via-transparent to-transparent" />
          <div
            className="absolute inset-0 opacity-[0.18]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
              backgroundSize: "72px 72px",
            }}
          />
        </div>
        <SiteHeader />
        <div className="relative z-[1] flex flex-1 flex-col">{children}</div>
        <SiteFooter />
      </div>
    </WalletProvider>
  );
}
