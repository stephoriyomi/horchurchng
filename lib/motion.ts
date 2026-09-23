import { type Variants } from "framer-motion";

/* ── Existing primitives (unchanged) ──────────────────────────────────────── */

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4 },
  },
};

export const staggerChildren: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.25, ease: "easeInOut" },
};

export const sectionReveal = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, margin: "-60px" },
} as const;

/* ── COZA motion primitives ───────────────────────────────────────────────── */

export const wordReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: i * 0.06 },
  }),
};

export const stagger = (children = 0.08): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: children } },
});

/** Shared viewport config for all COZA section reveals */
export const inView = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, margin: "-10% 0px" },
} as const;

/** The signature COZA overshoot easing — footer image reveals */
export const overshoot = [0.34, 1.56, 0.64, 1] as const;
