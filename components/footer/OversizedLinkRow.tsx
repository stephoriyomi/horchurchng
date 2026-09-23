"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { overshoot } from "@/lib/motion";

interface OversizedLinkRowProps {
  label: string;
  href: string;
  images?: string[];
}

export function OversizedLinkRow({ label, href, images = [] }: OversizedLinkRowProps) {
  const prefersReduced = useReducedMotion();

  /*
   * Single `active` state covers mouse hover, keyboard focus, and touch tap.
   * CSS :hover is unreliable for this multi-state case; React state handles all three.
   */
  const [active, setActive] = useState(false);

  const activate = () => setActive(true);
  const deactivate = () => setActive(false);

  return (
    <Link
      href={href}
      className="group relative flex items-center h-16 sm:h-20 md:h-32 w-full border-t border-coza-dark/10 cursor-pointer overflow-visible focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-coza-dark"
      style={{ perspective: "1000px" }}
      onMouseEnter={activate}
      onMouseLeave={deactivate}
      onFocus={activate}
      onBlur={deactivate}
      onTouchStart={activate}
      onTouchEnd={deactivate}
      onTouchCancel={deactivate}
    >
      {/* ── Pink wipe band ── */}
      <div
        aria-hidden
        className="absolute inset-0 bg-accent-pink pointer-events-none"
        style={{
          clipPath: "polygon(0 0, 100% 40%, 100% 100%, 0 100%)",
          transform: active ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left center",
          transition: prefersReduced
            ? "none"
            : "transform 300ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />

      {/* ── Label + arrow ── */}
      <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <span
          className="font-bold tracking-tight leading-none text-coza-dark select-none"
          style={{ fontSize: "clamp(2rem, 6vw, 7.5rem)" }}
        >
          {label}
        </span>

        {/* Arrow slides in on hover */}
        <span
          aria-hidden
          className="font-bold text-coza-dark"
          style={{
            fontSize: "clamp(1.25rem, 3vw, 3rem)",
            opacity: active ? 1 : 0,
            transform: active ? "translateX(0)" : "translateX(12px)",
            transition: prefersReduced ? "none" : "opacity 250ms ease-out, transform 250ms ease-out",
          }}
        >
          →
        </span>
      </div>

      {/*
       * ── Desktop image collage ──
       * Only rendered on lg+ screens (CSS hidden/block).
       * Three small images stagger in with overshoot easing.
       * Decorative only — all aria-hidden.
       */}
      {images.length > 0 && (
        <div
          aria-hidden
          className="hidden lg:block absolute top-1/2 -translate-y-1/2 pointer-events-none z-20"
          style={{ left: "45%" }}
        >
          <AnimatePresence>
            {active &&
              images.map((src, i) => (
                <motion.div
                  key={src}
                  initial={{ opacity: 0, y: 14, scale: 0.88 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.2 } }}
                  transition={{
                    delay: (i + 1) * 0.05,
                    duration: 0.45,
                    ease: [...overshoot] as [number, number, number, number],
                  }}
                  className="absolute rounded-xl overflow-hidden shadow-2xl bg-coza-elevated"
                  style={{
                    width: 92,
                    height: 70,
                    left: i * 38,
                    top: i * -11,
                    zIndex: i,
                  }}
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    className="object-cover"
                    loading="lazy"
                  />
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      )}
    </Link>
  );
}
