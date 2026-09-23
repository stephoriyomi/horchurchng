"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, stagger, inView } from "@/lib/motion";
import homepage from "@/config/homepage.json";

export function MissionTwoColumn() {
  const prefersReduced = useReducedMotion();

  return (
    <section className="bg-coza-dark pt-24 md:pt-36" aria-label="Our mission">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          {...(prefersReduced ? {} : inView)}
          variants={prefersReduced ? undefined : stagger(0.14)}
          className="grid md:grid-cols-2 gap-8 lg:gap-16 pb-24 md:pb-48"
        >
          {/* Left — Headline */}
          <motion.h2
            variants={prefersReduced ? undefined : fadeUp}
            className="font-bold leading-[0.85] tracking-tight text-white"
            style={{ fontSize: "clamp(2.75rem, 7vw, 7.5rem)" }}
          >
            {homepage.mission.heading}
          </motion.h2>

          {/* Right — Body, bottom-aligned on desktop */}
          <motion.div
            variants={prefersReduced ? undefined : fadeUp}
            className="flex items-end"
          >
            <p className="text-coza-fg-light/60 text-base md:text-lg leading-relaxed max-w-[380px]">
              {homepage.mission.body}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
