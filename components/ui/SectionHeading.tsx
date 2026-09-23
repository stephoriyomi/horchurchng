interface Props {
  id?: string;
  label?: string;
  heading: string;
  subheading?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}

export function SectionHeading({
  id,
  label,
  heading,
  subheading,
  align = "center",
  light = false,
  className = "",
}: Props) {
  return (
    <div
      id={id}
      className={[
        align === "center" ? "text-center" : "text-left",
        className,
      ].join(" ")}
    >
      {label && (
        <p
          className={`text-sm font-semibold uppercase tracking-widest mb-3 ${
            light ? "text-accent-gold" : "text-primary"
          }`}
        >
          {label}
        </p>
      )}
      <h2
        className={`font-display text-4xl md:text-5xl font-bold leading-tight ${
          light ? "text-white" : "text-off-black"
        }`}
      >
        {heading}
      </h2>
      {subheading && (
        <p
          className={`mt-4 text-lg max-w-2xl ${
            align === "center" ? "mx-auto" : ""
          } ${light ? "text-warm-gray-300" : "text-warm-gray-600"}`}
        >
          {subheading}
        </p>
      )}
    </div>
  );
}
