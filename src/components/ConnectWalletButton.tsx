"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

function shortenAddress(address: string) {
  return `${address.slice(0, 4)}…${address.slice(-4)}`;
}

type Props = {
  className?: string;
  fullWidth?: boolean;
};

export function ConnectWalletButton({ className = "", fullWidth = false }: Props) {
  const { publicKey, connected, disconnect, connecting } = useWallet();
  const { setVisible } = useWalletModal();

  const widthClass = fullWidth ? "w-full" : "w-full sm:w-auto";

  if (connected && publicKey) {
    return (
      <div className={`flex flex-col items-center gap-2 sm:flex-row ${fullWidth ? "w-full" : ""} ${className}`.trim()}>
        <button
          type="button"
          onClick={() => setVisible(true)}
          className={`${widthClass} inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-pulse/35 bg-pulse-soft px-5 py-3 text-sm font-medium text-ink transition hover:border-pulse/50`}
        >
          <span className="size-2 rounded-full bg-pulse shadow-[0_0_8px_rgba(15,158,138,0.55)]" aria-hidden />
          <span className="font-mono text-pulse-deep">{shortenAddress(publicKey.toBase58())}</span>
        </button>
        <button
          type="button"
          onClick={() => disconnect()}
          className="text-xs text-muted transition hover:text-ink"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setVisible(true)}
      disabled={connecting}
      className={`ss-btn-primary ${widthClass} inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold disabled:cursor-wait disabled:opacity-70 ${className}`.trim()}
    >
      <WalletIcon />
      {connecting ? "Connecting…" : "Connect wallet"}
    </button>
  );
}

function WalletIcon() {
  return (
    <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0H3"
      />
    </svg>
  );
}
