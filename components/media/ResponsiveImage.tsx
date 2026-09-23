import Image from "next/image";
import type { ImageProps } from "next/image";

type Aspect = "square" | "video" | "portrait" | "wide" | "cinema";

interface Props extends Omit<ImageProps, "alt"> {
  /** Non-empty alt text is required; pass decorative={true} for purely decorative images */
  alt: string;
  decorative?: boolean;
  /** Wrap in a sized container with this aspect ratio and use fill layout */
  aspect?: Aspect;
}

const aspectClasses: Record<Aspect, string> = {
  square:  "aspect-square",
  video:   "aspect-video",
  portrait: "aspect-[3/4]",
  wide:    "aspect-[16/9]",
  cinema:  "aspect-[21/9]",
};

export function ResponsiveImage({
  alt,
  decorative = false,
  aspect,
  className = "",
  ...props
}: Props) {
  const imgClasses = ["object-cover", className].filter(Boolean).join(" ");

  if (aspect) {
    return (
      <div className={`relative overflow-hidden ${aspectClasses[aspect]}`}>
        <Image
          alt={decorative ? "" : alt}
          fill
          className={imgClasses}
          {...props}
        />
      </div>
    );
  }

  return (
    <Image
      alt={decorative ? "" : alt}
      className={imgClasses}
      {...props}
    />
  );
}
