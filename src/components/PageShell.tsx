import type { ReactNode } from "react";
import { MainContainer } from "@/components/MainContainer";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { SectionLead } from "@/components/SectionLead";

/** Shared vertical padding for inner pages. */
export const PAGE_PADDING = "py-8 sm:py-14 lg:py-16";

/** Shared content width for inner pages. */
export const PAGE_WIDTH = "mx-auto w-full max-w-5xl";

export const PAGE_WIDTH_NARROW = "mx-auto w-full max-w-2xl";

type Props = {
  title?: ReactNode;
  description?: string;
  children: ReactNode;
  width?: "default" | "narrow";
};

export function PageShell({ title, description, children, width = "default" }: Props) {
  const widthClass = width === "narrow" ? PAGE_WIDTH_NARROW : PAGE_WIDTH;

  return (
    <MainContainer className={PAGE_PADDING}>
      <div className={widthClass}>
        {title ? (
          <RevealOnScroll>
            <SectionLead title={title} description={description} />
          </RevealOnScroll>
        ) : null}
        {children}
      </div>
    </MainContainer>
  );
}
