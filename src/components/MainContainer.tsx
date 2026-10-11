import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export function MainContainer({ children, className = "" }: Props) {
  return (
    <main
      className={`relative mx-auto w-full min-w-0 max-w-6xl flex-1 overflow-x-hidden px-4 sm:px-6 lg:px-8 ${className}`.trim()}
    >
      {children}
    </main>
  );
}
