import { RevealOnScroll } from "@/components/RevealOnScroll";

const stats = [
  { value: "<1s", label: "Payout on submit" },
  { value: "3", label: "Question types" },
  { value: "1", label: "Link to share" },
  { value: "SOL", label: "Rewards on-chain" },
] as const;

export function StatsStrip() {
  return (
    <section className="-mx-4 mb-12 border-y border-white/[0.06] bg-[#12161c]/60 sm:-mx-6 sm:mb-16 lg:-mx-8">
      <div className="grid grid-cols-2 divide-x divide-y divide-white/[0.06] md:grid-cols-4 md:divide-y-0">
        {stats.map(({ value, label }, i) => (
          <RevealOnScroll key={label} delay={i * 90}>
            <div className="px-3 py-6 text-center sm:px-6 sm:py-8 md:py-10">
              <p className="text-xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">{value}</p>
              <p className="mt-1.5 text-[10px] font-medium uppercase leading-snug tracking-wider text-[#848e9c] sm:mt-2 sm:text-[11px]">
                {label}
              </p>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
