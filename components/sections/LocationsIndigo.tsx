"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, stagger, inView } from "@/lib/motion";
import homepage from "@/config/homepage.json";

/* Per-word fade-up: used on each word span inside the city h2 elements */
const wordFadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export function LocationsIndigo() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      className="bg-accent-indigo min-h-screen overflow-hidden py-20 md:py-28"
      aria-label="Our locations"
    >
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* ── Left: city list with nested word-reveal ── */}
          {/*
           * Outer stagger staggers the <h2> groups;
           * each <h2> has its own stagger for the word <span>s inside.
           */}
          <motion.div
            {...(prefersReduced ? {} : inView)}
            variants={prefersReduced ? undefined : stagger(0.12)}
          >
            {homepage.locations.map((city) => (
              <motion.h2
                key={city}
                /* This motion.h2 staggers its child word spans */
                variants={prefersReduced ? undefined : stagger(0.07)}
                className="font-bold leading-[0.85] tracking-tight text-accent-pink block"
                style={{ fontSize: "clamp(3.5rem, 12vw, 7.5rem)" }}
              >
                {city.split(" ").map((word, wi) => (
                  <motion.span
                    key={wi}
                    variants={prefersReduced ? undefined : wordFadeUp}
                    className="inline-block"
                    /* non-breaking thin-space between words */
                    style={{ marginRight: "0.25em" }}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h2>
            ))}
          </motion.div>

          {/* ── Right: headline, body, map placeholder ── */}
          <motion.div
            {...(prefersReduced ? {} : inView)}
            variants={prefersReduced ? undefined : stagger(0.1)}
            className="lg:pt-20"
          >
            <motion.h3
              variants={prefersReduced ? undefined : fadeUp}
              className="font-bold text-white leading-[1.1] tracking-tight mb-6"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              {homepage.locationsHeadline}
            </motion.h3>

            <motion.p
              variants={prefersReduced ? undefined : fadeUp}
              className="text-white/55 text-base md:text-lg leading-relaxed max-w-[420px] mb-8"
            >
              {homepage.locationsBody}
            </motion.p>

            <motion.div
              variants={prefersReduced ? undefined : fadeUp}
              className="rounded-2xl overflow-hidden w-full aspect-video relative"
            >
              <Image
                src="/images/alagomeji.png"
                alt="Alagomeji, Lagos — House of Rest International location"
                fill
                className="object-cover"
              />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
