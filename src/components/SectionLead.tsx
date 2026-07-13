import type { ReactNode } from "react";

type Props = {
  title: ReactNode;
  description?: string;
  className?: string;
};

export function SectionLead({ title, description, className = "" }: Props) {
  return (
    <header className={`mb-8 border-l-2 border-pulse pl-4 sm:mb-10 sm:pl-6 ${className}`.trim()}>
      <h1 className="ss-display text-3xl tracking-tight text-ink sm:text-4xl">{title}</h1>
      {description ? (
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft sm:text-lg">{description}</p>
      ) : null}
    </header>
  );
}
