"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerChildren, sectionReveal } from "@/lib/motion";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  stagger?: boolean;
}

/** Wraps any block in a scroll-triggered fade-up (fires once, respects reduced-motion via Framer). */
export function AnimatedSection({ children, className = "", stagger = false }: Props) {
  return (
    <motion.div
      variants={stagger ? staggerChildren : fadeUp}
      {...sectionReveal}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Individual item inside a StaggerContainer — inherits parent's stagger timing. */
export function AnimatedItem({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={fadeUp} className={className}>
      {children}
    </motion.div>
  );
}
