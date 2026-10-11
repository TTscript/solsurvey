"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { ConnectWalletButton } from "@/components/ConnectWalletButton";

const SUPPORTED = ["Phantom", "Solflare"] as const;

type Props = {
  className?: string;
  title?: string;
  description?: string;
  stepLabel?: string;
};

export function ConnectWalletPanel({
  className = "",
  title = "Connect your wallet",
  description = "Choose Phantom or Solflare. After connecting, you can continue.",
  stepLabel = "Step 1",
}: Props) {
  const { publicKey, connected } = useWallet();

  return (
    <div className={`rounded-2xl border border-line bg-raised/80 px-5 py-8 text-center sm:px-8 ${className}`.trim()}>
      <p className="ss-section-label mb-1">{stepLabel}</p>
      <p className="mb-2 text-lg font-semibold text-ink">{title}</p>
      <p className="mb-6 text-sm leading-relaxed text-ink-soft">{description}</p>

      <div className="mb-5 flex justify-center">
        <ConnectWalletButton fullWidth />
      </div>

      <div className="mb-4 flex flex-wrap justify-center gap-2">
        {SUPPORTED.map((name) => (
          <span
            key={name}
            className="rounded-full border border-line bg-paper px-3.5 py-1.5 text-xs text-ink-soft"
          >
            {name}
          </span>
        ))}
      </div>

      {connected && publicKey ? (
        <p className="text-xs text-muted">
          Ready to continue with{" "}
          <span className="font-mono text-pulse-deep">
            {publicKey.toBase58().slice(0, 4)}…{publicKey.toBase58().slice(-4)}
          </span>
        </p>
      ) : (
        <p className="text-xs text-muted">Supports Wallet Standard adapters</p>
      )}
    </div>
  );
}
