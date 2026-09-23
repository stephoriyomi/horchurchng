"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import homepage from "@/config/homepage.json";

const SPLASH_KEY = "hori-splash-seen";
const AUTO_DISMISS_MS = 6000;
const ENTER_REVEAL_MS = 1000;

/* Optional video asset — swap in once you have a ≤2MB AVIF/WebM clip */
const VIDEO_SRC: string | null = null;
const VIDEO_POSTER: string | null = null;

export function SplashIntro() {
  const prefersReduced = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [enterReady, setEnterReady] = useState(false);
  const [playing, setPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const enterRef = useRef<HTMLButtonElement>(null);

  /* Show once per session unless reduced-motion is set */
  useEffect(() => {
    if (prefersReduced) return;
    if (typeof sessionStorage === "undefined") return;
    if (sessionStorage.getItem(SPLASH_KEY)) return;
    setVisible(true);
  }, [prefersReduced]);

  const dismiss = useCallback(() => {
    sessionStorage.setItem(SPLASH_KEY, "1");
    setVisible(false);
  }, []);

  /* Auto-dismiss + keyboard/scroll handlers */
  useEffect(() => {
    if (!visible) return;

    const enterTimer = setTimeout(() => {
      setEnterReady(true);
    }, ENTER_REVEAL_MS);

    const autoTimer = setTimeout(dismiss, AUTO_DISMISS_MS);

    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") dismiss(); };
    const onScroll = () => dismiss();

    document.addEventListener("keydown", onKey, { once: true });
    window.addEventListener("scroll", onScroll, { once: true, passive: true });

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(autoTimer);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
    };
  }, [visible, dismiss]);

  /* Focus the Enter button once it's revealed */
  useEffect(() => {
    if (enterReady) enterRef.current?.focus();
  }, [enterReady]);

  /* Sync video play / pause */
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    if (playing) {
      vid.play().catch(() => {});
    } else {
      vid.pause();
    }
  }, [playing]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.75, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-coza-dark overflow-hidden cursor-pointer"
          onClick={dismiss}
          role="dialog"
          aria-label="Welcome to House of Rest International"
          aria-modal="true"
        >

          {/* ── Background: video if available, else animated orbs ── */}
          {VIDEO_SRC ? (
            <video
              ref={videoRef}
              src={VIDEO_SRC}
              poster={VIDEO_POSTER ?? undefined}
              loop
              muted
              playsInline
              autoPlay
              className="absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none"
              aria-hidden
            />
          ) : (
            <div className="absolute inset-0 pointer-events-none" aria-hidden>
              <div
                className="absolute -bottom-[10%] -left-[10%] w-[75%] h-[75%] rounded-full blur-[140px] opacity-25"
                style={{
                  background: "var(--accent-pink)",
                  animationPlayState: playing ? "running" : "paused",
                  animation: "float-1 12s ease-in-out infinite alternate",
                }}
              />
              <div
                className="absolute -top-[10%] -right-[10%] w-[65%] h-[65%] rounded-full blur-[160px] opacity-20"
                style={{
                  background: "var(--accent-indigo)",
                  animationPlayState: playing ? "running" : "paused",
                  animation: "float-2 16s ease-in-out infinite alternate",
                }}
              />
              <div
                className="absolute top-[35%] left-[25%] w-[55%] h-[55%] rounded-full blur-[120px] opacity-10"
                style={{
                  background: "var(--accent-violet)",
                  animationPlayState: playing ? "running" : "paused",
                  animation: "float-1 10s ease-in-out infinite alternate-reverse",
                }}
              />
            </div>
          )}

          {/* Dark vignette over video */}
          {VIDEO_SRC && (
            <div
              className="absolute inset-0 bg-coza-dark/50 pointer-events-none"
              aria-hidden
            />
          )}

          {/* ── Centre content — stopPropagation so inner clicks don't dismiss ── */}
          <div
            className="relative z-10 flex flex-col items-center gap-10 sm:gap-14 px-6 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Caption */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.8, ease: "easeOut" }}
              aria-live="polite"
            >
              <p className="font-libre-baskerville text-sm sm:text-lg xl:text-xl text-coza-fg-light leading-relaxed">
                {homepage.intro.captionLine1}
              </p>
              <p className="font-libre-baskerville text-sm sm:text-lg xl:text-xl text-coza-fg-light leading-relaxed">
                {homepage.intro.captionLine2}
              </p>
            </motion.div>

            {/* Circular ENTER button */}
            <motion.button
              ref={enterRef}
              type="button"
              onClick={dismiss}
              initial={{ opacity: 0, scale: 0.88 }}
              animate={
                enterReady
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.88 }
              }
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="size-[150px] md:size-[175px] rounded-full bg-coza-fg-light text-coza-dark font-cormorant-garamond font-medium text-2xl sm:text-3xl flex items-center justify-center focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent-pink focus-visible:ring-offset-4 focus-visible:ring-offset-coza-dark"
              aria-label="Enter the site"
            >
              Enter
            </motion.button>
          </div>

          {/* ── Bottom row ── */}
          <motion.div
            className="absolute bottom-8 sm:bottom-10 inset-x-0 z-20 flex items-center justify-center px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 0.6 }}
          >
            {/* SKIP INTRO — centred */}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); dismiss(); }}
              className="font-libre-baskerville text-xs sm:text-sm text-coza-fg-light/40 hover:text-coza-fg-light/80 transition-colors underline underline-offset-4 decoration-coza-fg-light/20 hover:decoration-coza-fg-light/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coza-fg-light/40 rounded"
            >
              Skip intro
            </button>

            {/* Pause / play — right-anchored */}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setPlaying((p) => !p); }}
              aria-label={playing ? "Pause background animation" : "Play background animation"}
              aria-pressed={!playing}
              className="absolute right-6 sm:right-10 bg-coza-elevated rounded-full p-2 sm:p-3 text-coza-fg-light/70 hover:text-coza-fg-light hover:bg-coza-fg-light/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coza-fg-light/40"
            >
              {playing ? (
                /* Pause icon */
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                /* Play icon */
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
          </motion.div>

          {/* Hint text — appears late, purely decorative */}
          <motion.p
            className="absolute bottom-24 sm:bottom-28 inset-x-0 text-center text-[11px] text-coza-fg-light/20 z-20 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.5, duration: 0.6 }}
            aria-hidden
          >
            Press Esc or scroll to skip
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
