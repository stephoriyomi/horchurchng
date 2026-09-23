"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import site from "@/config/site.json";

const navLinks = [
  { label: "Watch", href: "/watch" },
  { label: "About", href: "/about" },
  { label: "Visit", href: "/visit" },
  { label: "Ministries", href: "/ministries" },
  { label: "Events", href: "/events" },
  { label: "Blog", href: "/blog" },
  { label: "Give", href: "/give" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close drawer on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={[
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-off-white/95 backdrop-blur-sm shadow-sm text-off-black"
          : "bg-transparent text-white",
      ].join(" ")}
    >
      <Container>
        <div className="h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="hover:opacity-80 transition-opacity"
            aria-label={`${site.name} — Home`}
          >
            <Logo variant={scrolled ? "colored" : "white"} height={36} />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(pathname, link.href) ? "page" : undefined}
                className={[
                  "text-sm font-medium transition-colors relative",
                  isActive(pathname, link.href)
                    ? "text-primary after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:bg-primary after:rounded-full"
                    : "hover:text-primary",
                ].join(" ")}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/visit"
              className={[
                "hidden md:inline-flex items-center px-5 py-2 rounded-full text-sm font-semibold",
                "bg-primary text-white hover:bg-primary-dark transition-colors",
              ].join(" ")}
            >
              Plan Your Visit
            </Link>

            {/* Hamburger */}
            <button
              className="md:hidden p-2 -mr-2"
              onClick={() => setMobileOpen((o) => !o)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              <span className="block w-6 space-y-1.5" aria-hidden>
                <span
                  className={`block h-0.5 bg-current transition-transform duration-200 origin-center ${
                    mobileOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 bg-current transition-opacity duration-200 ${
                    mobileOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 bg-current transition-transform duration-200 origin-center ${
                    mobileOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="md:hidden bg-off-white text-off-black border-t border-warm-gray-200 overflow-hidden"
          >
            <Container>
              <nav
                className="flex flex-col py-4 gap-1"
                aria-label="Mobile navigation"
              >
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={isActive(pathname, link.href) ? "page" : undefined}
                    className={[
                      "py-3 px-2 text-base font-medium rounded-lg transition-colors",
                      isActive(pathname, link.href)
                        ? "text-primary bg-warm-gray-100"
                        : "hover:bg-warm-gray-100 hover:text-primary",
                    ].join(" ")}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/visit"
                  className="mt-3 text-center py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary-dark transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  Plan Your Visit
                </Link>
              </nav>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
