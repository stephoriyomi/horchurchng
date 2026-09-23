import Image from "next/image";

interface LogoProps {
  variant?: "colored" | "white";
  className?: string;
  height?: number;
}

export function Logo({ variant = "colored", className = "", height = 40 }: LogoProps) {
  const src =
    variant === "white"
      ? "/images/logos/logo-white.svg"
      : "/images/logos/logo-colored.svg";

  const aspectRatio = 8192 / 2133.8;
  const width = Math.round(height * aspectRatio);

  return (
    <Image
      src={src}
      alt="House of Rest International"
      width={width}
      height={height}
      className={className}
      priority
    />
  );
}
