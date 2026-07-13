export const mainNav = [
  { href: "/builder", label: "Builder", hint: "Draft questions & reward pool" },
  { href: "/surveys", label: "Surveys", hint: "Browse live rewarded surveys" },
  { href: "/reward-flow", label: "Reward flow", hint: "From link to on-chain payout" },
  { href: "/operators", label: "Creators", hint: "Launch & manage rewarded surveys" },
  { href: "/respondents", label: "Respondents", hint: "Wallet, rewards & eligibility" },
] as const;

export const legalNav = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
] as const;

export function isNavActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}
