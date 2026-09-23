"use client";

import Link from "next/link";

type Variant = "pink" | "ghost" | "dark";

interface SlideLetterButtonProps {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
  "aria-label"?: string;
  "aria-expanded"?: boolean;
  "aria-controls"?: string;
}

const variantClasses: Record<Variant, string> = {
  pink:  "bg-accent-pink text-coza-dark hover:bg-accent-pink/90 focus-visible:ring-coza-dark focus-visible:ring-offset-accent-pink",
  ghost: "bg-white/20 text-white border border-white/30 hover:bg-white/30 focus-visible:ring-white focus-visible:ring-offset-transparent",
  dark:  "bg-coza-elevated text-coza-fg-light hover:bg-white/10 focus-visible:ring-accent-pink focus-visible:ring-offset-coza-dark",
};

export function SlideLetterButton({
  label,
  href,
  onClick,
  variant = "pink",
  className = "",
  "aria-label": ariaLabel,
  "aria-expanded": ariaExpanded,
  "aria-controls": ariaControls,
}: SlideLetterButtonProps) {
  const base = [
    "group relative overflow-hidden",
    "font-bold text-sm tracking-wider",
    "px-4 sm:px-6 py-2 sm:py-3 rounded-lg h-[44px]",
    "inline-flex items-center transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    variantClasses[variant],
    className,
  ].join(" ");

  const inner = (
    <span className="relative overflow-hidden inline-flex leading-none select-none">
      <span className="block translate-y-0 skew-y-0 transition duration-500 group-hover:-translate-y-[160%] group-hover:skew-y-12">
        {label}
      </span>
      <span
        className="absolute block translate-y-[164%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0"
        aria-hidden
      >
        {label}
      </span>
    </span>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={base}
        aria-label={ariaLabel}
      >
        {inner}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={base}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
    >
      {inner}
    </button>
  );
}
