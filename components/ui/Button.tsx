import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "outline-light" | "ghost";
type Size = "sm" | "md" | "lg";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-dark focus-visible:ring-primary",
  secondary:
    "bg-accent-gold text-off-black hover:bg-accent-amber focus-visible:ring-accent-gold",
  outline:
    "border-2 border-off-black text-off-black hover:bg-off-black hover:text-off-white focus-visible:ring-off-black",
  "outline-light":
    "border-2 border-white text-white hover:bg-white hover:text-off-black focus-visible:ring-white",
  ghost: "text-off-black hover:bg-warm-gray-100 focus-visible:ring-warm-gray-400",
};

const sizes: Record<Size, string> = {
  sm: "px-5 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export function Button({
  href,
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...rest
}: Props) {
  const cls = [
    "inline-flex items-center justify-center rounded-full font-medium",
    "transition-colors duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    variants[variant],
    sizes[size],
    className,
  ].join(" ");

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
