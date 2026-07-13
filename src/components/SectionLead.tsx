import type { ReactNode } from "react";

type Props = {
  title: ReactNode;
  description?: string;
  className?: string;
};

export function SectionLead({ title, description, className = "" }: Props) {
  return (
    <header
      className={`mb-8 border-l-2 border-[#f0b90b]/60 pl-4 sm:mb-10 sm:pl-6 ${className}`.trim()}
    >
      <h1 className="text-2xl font-bold tracking-tight text-white sm:text-4xl">{title}</h1>
      {description ? (
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#848e9c] sm:text-lg">
          {description}
        </p>
      ) : null}
    </header>
  );
}
