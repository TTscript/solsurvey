"use client";

import { useState, useEffect } from "react";

export function ClientOnly({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="rounded-2xl border border-line bg-ink/[0.03] w-full min-h-[12rem] flex items-center justify-center">
        <span className="text-muted text-sm">Loading...</span>
      </div>
    );
  }

  return <>{children}</>;
}
