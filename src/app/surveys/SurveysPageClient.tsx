"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useWallet } from "@solana/wallet-adapter-react";
import { PageShell } from "@/components/PageShell";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { SurveyCard } from "@/components/SurveyCard";
import { ConnectWalletPanel } from "@/components/ConnectWalletPanel";
import type { SurveyListItem } from "@/lib/types";

export default function SurveysPageClient() {
  const { publicKey, connected } = useWallet();
  const [openSurveys, setOpenSurveys] = useState<SurveyListItem[]>([]);
  const [mySurveys, setMySurveys] = useState<SurveyListItem[]>([]);
  const [loadingMine, setLoadingMine] = useState(false);

  useEffect(() => {
    fetch("/api/surveys")
      .then((r) => r.json())
      .then((data) => setOpenSurveys(data.surveys ?? []))
      .catch(() => setOpenSurveys([]));
  }, []);

  useEffect(() => {
    if (!connected || !publicKey) {
      setMySurveys([]);
      setLoadingMine(false);
      return;
    }

    setLoadingMine(true);
    fetch(`/api/surveys?creator=${encodeURIComponent(publicKey.toBase58())}`)
      .then((r) => r.json())
      .then((data) => setMySurveys(data.surveys ?? []))
      .catch(() => setMySurveys([]))
      .finally(() => setLoadingMine(false));
  }, [connected, publicKey]);

  const liveOpen = openSurveys.filter((s) => !s.stats.poolExhausted);
  const liveFull = openSurveys.filter((s) => s.stats.poolExhausted);

  return (
    <PageShell
      title="Surveys"
      description="Browse live rewarded surveys—or connect your wallet to see ones you created."
    >
      {connected && publicKey ? (
        <RevealOnScroll delay={80}>
          <section className="mb-8 sm:mb-10">
            <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-ink sm:text-xl">Your surveys</h2>
                <p className="mt-1 text-sm text-muted">
                  Published from wallet{" "}
                  <span className="font-mono text-reward">
                    {publicKey.toBase58().slice(0, 4)}…{publicKey.toBase58().slice(-4)}
                  </span>
                </p>
              </div>
              <Link
                href="/builder"
                className="inline-flex min-h-10 items-center justify-center rounded-xl bg-pulse px-4 text-sm font-semibold text-white hover:bg-pulse-deep"
              >
                New survey
              </Link>
            </div>

            {loadingMine ? (
              <p className="text-sm text-muted">Loading your surveys…</p>
            ) : mySurveys.length === 0 ? (
              <div className="rounded-xl border border-dashed border-line-strong px-4 py-10 text-center">
                <p className="mb-2 text-sm text-muted">You haven&apos;t published any surveys yet.</p>
                <Link href="/builder" className="text-sm font-medium text-reward hover:text-pulse">
                  Create your first survey →
                </Link>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {mySurveys.map((survey, i) => (
                  <RevealOnScroll key={survey.id} delay={i * 60}>
                    <SurveyCard survey={survey} variant="mine" />
                  </RevealOnScroll>
                ))}
              </div>
            )}
            <p className="mt-4 text-xs text-muted">
              Private results links are shown once in the builder after funding—save them when you publish.
            </p>
          </section>
        </RevealOnScroll>
      ) : (
        <RevealOnScroll delay={80}>
          <div className="mb-8 sm:mb-10">
            <ConnectWalletPanel
              stepLabel="Creators"
              title="See your surveys"
              description="Connect the same wallet you used in the builder to list surveys you created."
            />
          </div>
        </RevealOnScroll>
      )}

      <RevealOnScroll delay={160}>
        <section>
          <h2 className="mb-4 text-lg font-bold text-ink sm:text-xl">Open surveys</h2>

          {openSurveys.length === 0 ? (
            <div className="rounded-xl border border-dashed border-line-strong px-4 py-12 text-center">
              <p className="mb-2 text-sm text-muted">No live surveys yet.</p>
              <Link href="/builder" className="text-sm font-medium text-reward hover:text-pulse">
                Be the first to publish →
              </Link>
            </div>
          ) : (
            <>
              {liveOpen.length > 0 ? (
                <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {liveOpen.map((survey, i) => (
                    <RevealOnScroll key={survey.id} delay={i * 50}>
                      <SurveyCard survey={survey} />
                    </RevealOnScroll>
                  ))}
                </div>
              ) : null}

              {liveFull.length > 0 ? (
                <>
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted">
                    Recently filled
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {liveFull.map((survey, i) => (
                      <RevealOnScroll key={survey.id} delay={i * 50}>
                        <SurveyCard survey={survey} />
                      </RevealOnScroll>
                    ))}
                  </div>
                </>
              ) : null}
            </>
          )}
        </section>
      </RevealOnScroll>
    </PageShell>
  );
}
