"use client";

import { WalletProvider } from "@/components/WalletProvider";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <WalletProvider>
      <div className="ss-shell flex min-h-screen flex-col text-ink">
        <SiteHeader />
        <div className="relative z-[1] flex flex-1 flex-col">{children}</div>
        <SiteFooter />
      </div>
    </WalletProvider>
  );
}
