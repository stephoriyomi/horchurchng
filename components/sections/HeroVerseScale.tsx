"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

interface Props {
  videoId: string | null;
}

export function HeroVerseScale({ videoId }: Props) {
  const prefersReduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // All hooks must be called unconditionally — gated via prefersReduced in style
  const scale       = useTransform(scrollYProgress, [0, 0.85], [1, 8]);
  const cardOpacity = useTransform(scrollYProgress, [0.72, 0.92], [1, 0]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);


  return (
    /*
     * Outer container is taller than the viewport so the sticky inner has
     * scroll range to animate through. 250 vh gives ≈ 1.5 × vh of scroll
     * travel for the card-scale effect.
     */
    <section
      ref={containerRef}
      aria-labelledby="hero-heading"
      className="relative bg-coza-cream h-[250vh]"
    >
      {/* ── Sticky viewport ─────────────────────────────────────────────── */}
      <div className="sticky top-0 h-dvh overflow-hidden flex items-center justify-center">

        {/* ── Background ── */}
        <div aria-hidden className="absolute inset-0">
          <Image
            src="/images/Hero Backgrounds/Hero_background_v4.png"
            alt=""
            fill
            className="object-cover object-bottom"
            priority
          />
        </div>

        <h1 id="hero-heading" className="sr-only">House of Rest International</h1>

        {videoId && (
          <motion.div
            className="relative z-10"
            style={prefersReduced ? undefined : { scale, opacity: cardOpacity }}
          >
            <div className="rounded-2xl overflow-hidden w-[320px] shadow-2xl ring-1 ring-white/10">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0&playsinline=1`}
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="Latest message"
                className="w-full aspect-video block"
              />
            </div>
          </motion.div>
        )}

        {/* ── Scroll hint — fades on first scroll ── */}
        <motion.div
          aria-hidden
          className="absolute bottom-8 sm:bottom-10 inset-x-0 flex flex-col items-center gap-2 pointer-events-none"
          style={
            prefersReduced
              ? { opacity: 0 }
              : { opacity: hintOpacity }
          }
        >
          <span className="font-libre-baskerville text-coza-dark/30 text-[11px] tracking-[0.2em] uppercase">
            Scroll
          </span>
          <div className="w-px h-8 bg-coza-dark/20 rounded-full" />
        </motion.div>

      </div>
    </section>
  );
}
