"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { SlideLetterButton } from "@/components/ui/SlideLetterButton";
import site from "@/config/site.json";

const navLinks = [
  { label: "Watch",      href: "/watch" },
  { label: "About",      href: "/about" },
  { label: "Visit",      href: "/visit" },
  { label: "Ministries", href: "/ministries" },
  { label: "Events",     href: "/events" },
  { label: "Blog",       href: "/blog" },
  { label: "Give",       href: "/give" },
];

export function FloatingHeader() {
  const pathname = usePathname();
  const [isHidden, setIsHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Hide on scroll down, reveal on scroll up
  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      const delta = current - lastScrollY.current;
      if (current < 80) {
        setIsHidden(false);
      } else if (delta > 8) {
        setIsHidden(true);
      } else if (delta < -8) {
        setIsHidden(false);
      }
      lastScrollY.current = current;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeMenu(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const openMenu = useCallback(() => {
    previousFocusRef.current = document.activeElement as HTMLElement;
    setMenuOpen(true);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // Focus first interactive element in the overlay after it animates in
  useEffect(() => {
    if (!menuOpen) return;
    const timer = setTimeout(() => {
      const first = overlayRef.current?.querySelector<HTMLElement>(
        "a[href], button:not([disabled])"
      );
      first?.focus();
    }, 350);
    return () => clearTimeout(timer);
  }, [menuOpen]);

  // Restore focus to whatever triggered the menu open
  useEffect(() => {
    if (menuOpen) return;
    if (!previousFocusRef.current) return;
    previousFocusRef.current.focus();
    previousFocusRef.current = null;
  }, [menuOpen]);

  // Tab key focus trap inside the overlay
  const trapFocus = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab") return;
    const focusable = overlayRef.current?.querySelectorAll<HTMLElement>(
      "a[href], button:not([disabled])"
    );
    if (!focusable || focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }, []);

  const headerVisible = !isHidden || menuOpen;

  return (
    <>
      {/* ── Floating bar ───────────────────────────────────────────────────── */}
      <header
        className="fixed top-0 inset-x-0 z-50 p-4 sm:p-6 pointer-events-none transition-all duration-500 ease-out"
        style={{
          transform: headerVisible ? "translateY(0)" : "translateY(-110%)",
          opacity: headerVisible ? 1 : 0,
        }}
      >
        {/* LEFT — Search */}
        <div className="absolute left-4 sm:left-6 top-4 sm:top-6 pointer-events-auto">
          <SlideLetterButton
            label="SEARCH"
            href="/watch"
            variant="pink"
            aria-label="Search sermons"
          />
        </div>

        {/* CENTER — Logo */}
        <div className="absolute left-1/2 top-4 sm:top-6 -translate-x-1/2 pointer-events-auto">
          <Link
            href="/"
            aria-label={`${site.name} — home`}
            className="block"
          >
            <Image
              src="/images/logos/HoR icon.svg"
              alt={site.name}
              width={36}
              height={26}
              priority
            />
          </Link>
        </div>

        {/* RIGHT — Language + Menu */}
        <div className="absolute right-4 sm:right-6 top-4 sm:top-6 flex items-center gap-2 pointer-events-auto">
          {/* Language toggle — wired up later */}
          <button
            type="button"
            aria-label="Language: English"
            className="w-[44px] h-[44px] rounded-lg bg-coza-elevated/90 text-coza-fg-light text-[10px] font-bold tracking-wider flex items-center justify-center hover:bg-coza-fg-light hover:text-coza-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coza-fg-light focus-visible:ring-offset-2 focus-visible:ring-offset-coza-dark"
          >
            EN
          </button>

          {/* Menu / Close pill — animates between labels */}
          <AnimatePresence mode="wait" initial={false}>
            {menuOpen ? (
              <motion.div
                key="close"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.18 }}
              >
                <SlideLetterButton
                  label="CLOSE"
                  onClick={closeMenu}
                  variant="pink"
                  aria-label="Close navigation menu"
                  aria-expanded={true}
                  aria-controls="nav-overlay"
                />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.18 }}
              >
                <SlideLetterButton
                  label="MENU"
                  onClick={openMenu}
                  variant="pink"
                  aria-label="Open navigation menu"
                  aria-expanded={false}
                  aria-controls="nav-overlay"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* ── Full-screen nav overlay ─────────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={overlayRef}
            id="nav-overlay"
            role="dialog"
            aria-label="Navigation menu"
            aria-modal="true"
            key="nav-overlay"
            onKeyDown={trapFocus}
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)", transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-coza-dark flex flex-col overflow-auto"
          >
            {/* Nav links */}
            <nav
              className="flex-1 flex flex-col justify-center px-6 sm:px-10 lg:px-16 pt-28 pb-10"
              aria-label="Main navigation"
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -32 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.18 + i * 0.055, duration: 0.45, ease: "easeOut" }}
                >
                  <Link
                    href={link.href}
                    aria-current={pathname === link.href ? "page" : undefined}
                    onClick={closeMenu}
                    className="group flex items-baseline gap-5 py-3 border-b border-white/10 hover:border-accent-pink/40 transition-colors"
                  >
                    <span className="text-coza-fg-light/25 text-xs font-semibold tracking-widest tabular-nums w-7 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={[
                        "font-bold tracking-tight leading-none transition-colors",
                        pathname === link.href
                          ? "text-accent-pink"
                          : "text-coza-fg-light group-hover:text-accent-pink",
                      ].join(" ")}
                      style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)" }}
                    >
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Bottom info row */}
            <motion.div
              className="px-6 sm:px-10 lg:px-16 pb-8 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65, duration: 0.4 }}
            >
              <p className="font-libre-baskerville italic text-coza-fg-light/30 text-sm">
                {site.contact.address}
              </p>
              <p className="text-coza-fg-light/30 text-xs tracking-wide">
                {site.contact.email}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
