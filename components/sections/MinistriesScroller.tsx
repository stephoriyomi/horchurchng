"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, stagger, inView } from "@/lib/motion";
import homepage from "@/config/homepage.json";

export function MinistriesScroller() {
  const prefersReduced = useReducedMotion();
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!scrollRef.current) return;
    const amount = Math.round(scrollRef.current.clientWidth * 0.65);
    if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollRef.current.scrollBy({ left: -amount, behavior: "smooth" });
    }
  };

  return (
    <section className="bg-coza-dark py-16 md:py-24" aria-label="Ministries">

      {/* ── Heading row ── */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 md:mb-16">
        <motion.div
          {...(prefersReduced ? {} : inView)}
          variants={prefersReduced ? undefined : stagger(0.1)}
          className="grid md:grid-cols-2 gap-8 items-end"
        >
          <motion.h2
            variants={prefersReduced ? undefined : fadeUp}
            className="font-bold text-white leading-[0.85] tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)" }}
          >
            Find your experience
          </motion.h2>

          <motion.div
            variants={prefersReduced ? undefined : fadeUp}
            className="flex flex-col gap-5 md:items-end"
          >
            <p className="text-coza-fg-light/50 text-base leading-relaxed max-w-[340px]">
              A ministry for every season of life. Find where you belong.
            </p>
            <Link
              href="/ministries"
              className="self-start md:self-end group relative overflow-hidden bg-accent-pink text-coza-dark font-bold uppercase text-sm tracking-wider px-6 py-3 rounded-lg inline-flex items-center hover:bg-accent-pink/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coza-dark focus-visible:ring-offset-2 focus-visible:ring-offset-accent-pink"
            >
              View All Ministries
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Horizontal scroller ── */}
      <div className="relative">
        <div
          ref={scrollRef}
          role="list"
          aria-label="Ministry cards — use arrow keys to scroll"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          className="flex gap-5 overflow-x-auto scrollbar-hide pl-4 sm:pl-6 lg:pl-8 pr-16 pb-4 snap-x snap-mandatory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-pink focus-visible:rounded-sm"
        >
          {homepage.ministries.map((ministry) => (
            <Link
              key={ministry.num}
              href={ministry.href}
              role="listitem"
              className="group flex-shrink-0 w-[75vw] sm:w-[52vw] lg:w-[32vw] snap-start flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-pink focus-visible:ring-offset-4 focus-visible:ring-offset-coza-dark rounded-2xl"
            >
              {/* Image */}
              <div className="relative h-[380px] sm:h-[430px] lg:h-[480px] overflow-hidden rounded-2xl bg-coza-elevated mb-5 flex-shrink-0">
                {ministry.image ? (
                  <Image
                    src={ministry.image}
                    alt={ministry.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-coza-elevated to-coza-dark flex items-end p-6">
                    <span
                      className="font-black text-coza-dark/10 leading-none select-none"
                      style={{ fontSize: "clamp(5rem, 12vw, 9rem)" }}
                      aria-hidden
                    >
                      {ministry.num}
                    </span>
                  </div>
                )}
              </div>

              {/* Meta */}
              <p className="text-xs font-semibold tracking-[0.18em] text-coza-fg-light/30 mb-2 uppercase">
                {ministry.num}
              </p>
              <h3 className="font-bold text-white leading-tight tracking-tight group-hover:text-accent-pink transition-colors"
                style={{ fontSize: "clamp(1.75rem, 3.5vw, 3rem)" }}
              >
                {ministry.title}
              </h3>
              <p className="font-libre-baskerville italic text-coza-fg-light/40 mt-1 text-lg">
                {ministry.subtitle}
              </p>
            </Link>
          ))}
        </div>

        {/* Right-edge fade-out */}
        <div
          aria-hidden
          className="absolute right-0 top-0 bottom-4 w-28 bg-gradient-to-l from-coza-dark to-transparent pointer-events-none z-10"
        />
      </div>
    </section>
  );
}
