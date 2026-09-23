"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  const prefersReduced = useReducedMotion();

  const anim = (props: object) => (prefersReduced ? {} : props);

  return (
    <section
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-off-black"
      aria-label="Welcome to House of Rest International"
    >
      {/* ── Background: animated gradient orbs ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div
          className="absolute bottom-[-5%] left-[-5%] w-[75%] h-[75%] rounded-full blur-[130px] opacity-20"
          style={{
            background: "var(--color-primary)",
            animation: prefersReduced
              ? "none"
              : "float-1 10s ease-in-out infinite alternate",
          }}
        />
        <div
          className="absolute top-[-10%] right-[-5%] w-[65%] h-[65%] rounded-full blur-[150px] opacity-15"
          style={{
            background: "var(--color-accent-teal)",
            animation: prefersReduced
              ? "none"
              : "float-2 13s ease-in-out infinite alternate",
          }}
        />
        {/* Subtle grain texture overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('/images/noise.png')] bg-repeat" />
      </div>

      {/* ── Hero content ── */}
      <div className="relative z-10 text-center px-4 py-36 max-w-5xl mx-auto w-full">
        <motion.p
          {...anim({ initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.15, duration: 0.7 } })}
          className="text-accent-gold text-xs font-semibold uppercase tracking-label mb-6"
        >
          Lagos, Nigeria
        </motion.p>

        <motion.h1
          {...anim({ initial: { opacity: 0, y: 28 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.35, duration: 0.9, ease: "easeOut" } })}
          className="font-display text-display-md sm:text-display-lg md:text-display-xl text-white leading-none mb-6"
        >
          House of Rest
          <br />
          <span className="text-primary">International</span>
        </motion.h1>

        <motion.p
          {...anim({ initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.75, duration: 0.8 } })}
          className="text-warm-gray-300 text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed"
        >
          A church for non-church people
          <br className="hidden sm:block" />
          and disgruntled church goers.
          <br />
          Come exactly as you are.
        </motion.p>

        <motion.div
          {...anim({ initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { delay: 1.05, duration: 0.7 } })}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button href="/visit" variant="primary" size="lg">
            Plan Your Visit
          </Button>
          <Button href="/watch" variant="outline-light" size="lg">
            Watch Latest Message
          </Button>
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        {...anim({ initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 1.6, duration: 0.8 } })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-warm-gray-600 pointer-events-none"
        aria-hidden
      >
        <span className="text-[10px] uppercase tracking-label">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-warm-gray-600 to-transparent" />
      </motion.div>
    </section>
  );
}
