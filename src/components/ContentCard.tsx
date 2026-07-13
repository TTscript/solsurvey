import type { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
  className?: string;
};

export function ContentCard({ title, children, className = "" }: Props) {
  return (
    <div
      className={`rounded-xl border border-white/[0.08] bg-[#12161c]/60 p-4 sm:rounded-2xl sm:p-6 ${className}`.trim()}
    >
      <h2 className="mb-3 font-semibold text-white">{title}</h2>
      <div className="text-sm leading-relaxed text-[#848e9c]">{children}</div>
    </div>
  );
}

type SectionProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

export function PageSection({ eyebrow, title, description, children, className = "" }: SectionProps) {
  return (
    <section className={`mb-8 sm:mb-10 ${className}`.trim()}>
      {eyebrow ? (
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#c4b5fd]">{eyebrow}</p>
      ) : null}
      <h2 className="mb-2 text-xl font-bold text-white sm:text-2xl">{title}</h2>
      {description ? <p className="mb-6 max-w-2xl text-sm leading-relaxed text-[#848e9c] sm:text-base">{description}</p> : null}
      {children}
    </section>
  );
}
