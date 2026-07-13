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
    <div
      className={`rounded-2xl border border-white/[0.08] bg-[#12161c]/70 px-5 py-8 text-center sm:px-8 ${className}`.trim()}
    >
      <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-[#c4b5fd]">{stepLabel}</p>
      <p className="mb-2 text-lg font-semibold text-white">{title}</p>
      <p className="mb-6 text-sm leading-relaxed text-[#848e9c]">{description}</p>

      <div className="mb-5 flex justify-center">
        <ConnectWalletButton fullWidth />
      </div>

      <div className="mb-4 flex flex-wrap justify-center gap-2">
        {SUPPORTED.map((name) => (
          <span
            key={name}
            className="rounded-full border border-white/10 bg-[#1a1f27]/80 px-3.5 py-1.5 text-xs text-[#b7bdc6]"
          >
            {name}
          </span>
        ))}
      </div>

      {connected && publicKey ? (
        <p className="text-xs text-[#848e9c]">
          Ready to continue with{" "}
          <span className="font-mono text-[#f0b90b]">
            {publicKey.toBase58().slice(0, 4)}…{publicKey.toBase58().slice(-4)}
          </span>
        </p>
      ) : (
        <p className="text-xs text-[#5e6673]">Supports Wallet Standard adapters</p>
      )}
    </div>
  );
}
