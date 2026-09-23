"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, stagger, inView } from "@/lib/motion";
import homepage from "@/config/homepage.json";

export function PastorFeature() {
  const prefersReduced = useReducedMotion();
  const { pastor } = homepage;

  return (
    <section
      className="relative min-h-dvh flex flex-col overflow-hidden"
      aria-label={pastor.eyebrow}
    >
      {/* Background */}
      <div className="absolute inset-0">
        {pastor.imageUrl ? (
          <Image
            src={pastor.imageUrl}
            alt=""
            fill
            className="object-cover object-top"
            loading="lazy"
          />
        ) : (
          /* Gradient placeholder until image asset is added */
          <div className="absolute inset-0 bg-gradient-to-br from-[#2a2018] via-coza-dark to-[#0d0d14]" />
        )}
        {/* Overlay — lighter near top, heavier at bottom for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
      </div>

      {/* Content — anchored bottom-left */}
      <div className="relative z-10 flex flex-col justify-end flex-1 max-w-screen-2xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
        <motion.div
          {...(prefersReduced ? {} : inView)}
          variants={prefersReduced ? undefined : stagger(0.1)}
          className="max-w-2xl"
        >
          <motion.p
            variants={prefersReduced ? undefined : fadeUp}
            className="font-libre-baskerville text-white/60 text-lg md:text-xl mb-4"
          >
            {pastor.eyebrow}
          </motion.p>

          <motion.h2
            variants={prefersReduced ? undefined : fadeUp}
            className="font-bold text-white leading-[1.0] tracking-tight mb-2"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            {pastor.headline}
          </motion.h2>

          {pastor.subheadline && (
            <motion.p
              variants={prefersReduced ? undefined : fadeUp}
              className="font-libre-baskerville italic text-white/40 text-xl md:text-2xl mb-8"
            >
              {pastor.subheadline}
            </motion.p>
          )}

          <motion.div
            variants={prefersReduced ? undefined : fadeUp}
            className="flex flex-wrap gap-3 mt-8"
          >
            <Link
              href={pastor.ctaPrimary.href}
              className="group relative overflow-hidden bg-accent-pink text-coza-dark font-bold uppercase text-sm tracking-wider px-6 py-3 rounded-lg inline-flex items-center hover:bg-accent-pink/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-pink focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              {pastor.ctaPrimary.label}
            </Link>
            <Link
              href={pastor.ctaSecondary.href}
              className="bg-white/20 text-white font-bold uppercase text-sm tracking-wider px-6 py-3 rounded-lg inline-flex items-center hover:bg-white/30 transition-colors border border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              {pastor.ctaSecondary.label}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
