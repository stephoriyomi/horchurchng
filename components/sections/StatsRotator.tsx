"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { fadeUp, inView } from "@/lib/motion";
import homepage from "@/config/homepage.json";

const ROTATE_MS = 4000;

/* Slide-and-fade used for each rotating panel */
const slideVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -16,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

export function StatsRotator() {
  const prefersReduced = useReducedMotion();
  const stats = homepage.stats;
  const [idx, setIdx] = useState(0);
  const current = stats[idx];
  const pausedRef = useRef(false);

  /* Auto-rotate — disabled under reduced motion; paused on hover / focus-within */
  useEffect(() => {
    if (prefersReduced) return;
    const timer = setInterval(() => {
      if (!pausedRef.current) setIdx((i) => (i + 1) % stats.length);
    }, ROTATE_MS);
    return () => clearInterval(timer);
  }, [prefersReduced, stats.length]);

  return (
    <section
      className="bg-coza-cream min-h-screen py-16 md:py-24 flex flex-col"
      aria-label="Our impact"
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
      onFocus={() => { pausedRef.current = true; }}
      onBlur={(e) => {
        /* Only unpause when focus leaves the section entirely */
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          pausedRef.current = false;
        }
      }}
    >
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col flex-1">

        {/* Top label */}
        <motion.p
          {...(prefersReduced ? {} : inView)}
          variants={prefersReduced ? undefined : fadeUp}
          className="font-libre-baskerville text-center text-coza-dark/40 text-base md:text-lg mb-14 md:mb-20"
        >
          {homepage.statsLabel}
        </motion.p>

        {/* ── Three-column rotating grid ── */}
        <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-10 lg:gap-12 items-center flex-1">

          {/* Left — rotating headline */}
          <div className="order-2 lg:order-1 flex items-center lg:justify-end">
            <AnimatePresence mode="wait">
              <motion.h2
                key={`headline-${idx}`}
                variants={prefersReduced ? undefined : slideVariant}
                initial={prefersReduced ? false : "hidden"}
                animate="visible"
                exit={prefersReduced ? undefined : "exit"}
                className="font-bold text-coza-dark leading-[1.05] tracking-tight lg:text-right"
                style={{ fontSize: "clamp(1.75rem, 3.5vw, 3rem)" }}
              >
                {current.headline}
              </motion.h2>
            </AnimatePresence>
          </div>

          {/* Center — number + image + dots */}
          <div className="order-1 lg:order-2 flex flex-col items-center gap-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={`center-${idx}`}
                variants={prefersReduced ? undefined : slideVariant}
                initial={prefersReduced ? false : "hidden"}
                animate="visible"
                exit={prefersReduced ? undefined : "exit"}
                className="flex flex-col items-center gap-5"
              >
                {/* Image */}
                <div className="relative rounded-3xl overflow-hidden w-[280px] sm:w-[340px] h-[200px] sm:h-[250px] bg-coza-elevated">
                  {current.image ? (
                    <Image
                      src={current.image}
                      alt={current.headline}
                      fill
                      className="object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-coza-cream-shadow to-coza-elevated" />
                  )}
                </div>

                {/* Stat number */}
                <div
                  className="flex items-start leading-none"
                  aria-label={`${current.number}${current.suffix}`}
                >
                  <span
                    className="font-bold text-accent-pink leading-none"
                    style={{ fontSize: "clamp(80px, 16vw, 160px)" }}
                    aria-hidden
                  >
                    {current.number}
                  </span>
                  <span
                    className="font-bold text-accent-pink leading-none mt-1"
                    style={{ fontSize: "clamp(40px, 8vw, 80px)" }}
                    aria-hidden
                  >
                    {current.suffix}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dot nav */}
            <div
              className="flex gap-2"
              role="tablist"
              aria-label="Navigate statistics"
            >
              {stats.map((s, i) => (
                <button
                  key={s.headline}
                  role="tab"
                  aria-selected={i === idx}
                  aria-label={s.headline}
                  onClick={() => setIdx(i)}
                  className={[
                    "w-2 h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-pink focus-visible:ring-offset-2 focus-visible:ring-offset-coza-cream",
                    i === idx
                      ? "bg-accent-pink scale-125"
                      : "bg-coza-dark/20 hover:bg-coza-dark/40",
                  ].join(" ")}
                />
              ))}
            </div>
          </div>

          {/* Right — rotating body */}
          <div className="order-3 flex items-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={`body-${idx}`}
                variants={prefersReduced ? undefined : slideVariant}
                initial={prefersReduced ? false : "hidden"}
                animate="visible"
                exit={prefersReduced ? undefined : "exit"}
                className="font-libre-baskerville text-coza-dark/55 text-base md:text-lg leading-relaxed max-w-[320px]"
              >
                {current.body}
              </motion.p>
            </AnimatePresence>
          </div>

        </div>

        {/* Connect CTA — fades in on scroll */}
        <motion.div
          {...(prefersReduced ? {} : inView)}
          variants={prefersReduced ? undefined : fadeUp}
          className="flex justify-center mt-16 md:mt-20"
        >
          <Link
            href="/new"
            className="group relative overflow-hidden bg-coza-dark text-coza-cream font-bold uppercase text-sm tracking-wider px-8 py-4 rounded-lg inline-flex items-center hover:bg-coza-dark/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coza-dark focus-visible:ring-offset-2 focus-visible:ring-offset-coza-cream"
          >
            Connect With Us
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
