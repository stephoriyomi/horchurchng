import type { ReactNode } from "react";

type Variant = "primary" | "gold" | "teal" | "green" | "neutral";

interface Props {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}

const variants: Record<Variant, string> = {
  primary: "bg-primary/10 text-primary",
  gold:    "bg-accent-gold/20 text-warm-gray-800",
  teal:    "bg-accent-teal/15 text-accent-teal",
  green:   "bg-accent-green/15 text-accent-green",
  neutral: "bg-warm-gray-200 text-warm-gray-700",
};

export function Badge({ children, variant = "neutral", className = "" }: Props) {
  return (
    <span
      className={[
        "inline-flex items-center px-3 py-1 rounded-full",
        "text-xs font-semibold uppercase tracking-label",
        variants[variant],
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}
