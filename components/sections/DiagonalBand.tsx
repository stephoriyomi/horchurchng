interface DiagonalBandProps {
  leftLabel: string;
  rightLabel: string;
  leftColor?: string;
  rightColor?: string;
}

export function DiagonalBand({
  leftLabel,
  rightLabel,
  leftColor = "#F3B700",
  rightColor = "#FAA300",
}: DiagonalBandProps) {
  return (
    <div className="relative w-full" style={{ height: "clamp(130px, 18vw, 200px)" }}>
      {/* SR-only text — the visual labels below are aria-hidden */}
      <p className="sr-only">{leftLabel} and {rightLabel}</p>

      {/* Left band */}
      <div
        aria-hidden
        className="absolute inset-0 flex items-center overflow-hidden"
        style={{
          clipPath: "polygon(0 0, 100% 20%, 100% 100%, 0 100%)",
          background: leftColor,
        }}
      >
        <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative h-full">
          <span
            className="absolute top-[18%] font-bold text-coza-dark leading-none select-none"
            style={{ fontSize: "clamp(3rem, 8vw, 6.5rem)" }}
          >
            {leftLabel}
          </span>
        </div>
      </div>

      {/* Right band */}
      <div
        aria-hidden
        className="absolute inset-0 flex items-center overflow-hidden"
        style={{
          clipPath: "polygon(0 35%, 100% 0, 100% 100%, 0 100%)",
          background: rightColor,
        }}
      >
        <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative h-full">
          <span
            className="absolute right-4 sm:right-6 lg:right-8 bottom-[18%] font-bold text-coza-dark leading-none select-none"
            style={{ fontSize: "clamp(3rem, 8vw, 6.5rem)" }}
          >
            {rightLabel}
          </span>
        </div>
      </div>
    </div>
  );
}
