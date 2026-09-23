import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Design System",
  robots: { index: false, follow: false },
};

/* ── Colour catalog ─────────────────────────────────────────────────────── */

const brandColors = [
  { name: "Primary",       hex: "#d83234", cls: "bg-primary" },
  { name: "Primary Dark",  hex: "#b52628", cls: "bg-primary-dark" },
  { name: "Primary Light", hex: "#e85557", cls: "bg-primary-light" },
];

const accentColors = [
  { name: "Gold",   hex: "#f3b700", cls: "bg-accent-gold",  dark: false },
  { name: "Amber",  hex: "#faa300", cls: "bg-accent-amber", dark: false },
  { name: "Teal",   hex: "#114b5f", cls: "bg-accent-teal",  dark: true  },
  { name: "Green",  hex: "#1a936f", cls: "bg-accent-green", dark: true  },
];

/* ── COZA color catalog ─────────────────────────────────────────────────── */

const cozaSurfaces = [
  { name: "coza-dark",         label: "--bg-dark",          hex: "#1E1E1E", cls: "bg-coza-dark",         dark: true  },
  { name: "coza-elevated",     label: "--bg-elevated",      hex: "#2C2C2C", cls: "bg-coza-elevated",     dark: true  },
  { name: "coza-cream",        label: "--bg-cream",         hex: "#E9E3DD", cls: "bg-coza-cream",        dark: false },
  { name: "coza-cream-shadow", label: "--bg-cream-shadow",  hex: "#d4c9bb", cls: "bg-coza-cream-shadow", dark: false },
  { name: "coza-fg-light",     label: "--fg-light",         hex: "#E1E1E1", cls: "bg-coza-fg-light",     dark: false },
];

const cozaAccents = [
  { name: "accent-pink",   label: "CTA / Section bands", hex: "#F7A4FD", cls: "bg-accent-pink",   dark: false },
  { name: "accent-blue",   label: "Secondary band",      hex: "#4DABFF", cls: "bg-accent-blue",   dark: false },
  { name: "accent-indigo", label: "Saturated section bg", hex: "#1B21EF", cls: "bg-accent-indigo", dark: true  },
  { name: "accent-violet", label: "Footer / hover",       hex: "#7381F6", cls: "bg-accent-violet", dark: true  },
];

const neutrals = [
  { name: "off-white",      hex: "#faf8f5", cls: "bg-off-white",      dark: false },
  { name: "warm-gray-100",  hex: "#f5f2ee", cls: "bg-warm-gray-100",  dark: false },
  { name: "warm-gray-200",  hex: "#e8e3dd", cls: "bg-warm-gray-200",  dark: false },
  { name: "warm-gray-300",  hex: "#d4cdc5", cls: "bg-warm-gray-300",  dark: false },
  { name: "warm-gray-400",  hex: "#b5ada3", cls: "bg-warm-gray-400",  dark: false },
  { name: "warm-gray-500",  hex: "#8a8078", cls: "bg-warm-gray-500",  dark: true  },
  { name: "warm-gray-600",  hex: "#6b6159", cls: "bg-warm-gray-600",  dark: true  },
  { name: "warm-gray-700",  hex: "#504842", cls: "bg-warm-gray-700",  dark: true  },
  { name: "warm-gray-800",  hex: "#352e29", cls: "bg-warm-gray-800",  dark: true  },
  { name: "off-black",      hex: "#1a1714", cls: "bg-off-black",      dark: true  },
];

/* ── Helpers ─────────────────────────────────────────────────────────────── */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="py-16 border-b border-warm-gray-200">
      <Container>
        <p className="text-xs font-semibold uppercase tracking-label text-warm-gray-400 mb-8">
          {title}
        </p>
        {children}
      </Container>
    </section>
  );
}

function Swatch({
  name,
  hex,
  cls,
  label,
  dark = true,
}: {
  name: string;
  hex: string;
  cls: string;
  label?: string;
  dark?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className={`${cls} rounded-xl h-16 w-full shadow-card border border-black/5`}
        aria-hidden
      />
      <p className={`text-xs font-semibold ${dark ? "text-off-black" : "text-warm-gray-600"}`}>
        {name}
      </p>
      {label && <p className="text-xs text-warm-gray-400 font-mono">{label}</p>}
      <p className="text-xs text-warm-gray-400 font-mono">{hex}</p>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────────────────────── */

export default function DesignSystemPage() {
  return (
    <>
      {/* ── Page hero ── */}
      <div className="bg-off-black pt-32 pb-20">
        <Container>
          <Badge variant="primary" className="mb-6">
            Internal
          </Badge>
          <h1 className="font-display text-display-lg text-white mb-4">
            Design System
          </h1>
          <p className="text-warm-gray-400 text-xl max-w-xl">
            Tokens, primitives, and components for House of Rest International.
          </p>
        </Container>
      </div>

      {/* ── 1. Colours ── */}
      <Section title="1 — Colour Palette">
        <div className="space-y-10">
          <div>
            <p className="text-sm text-warm-gray-500 mb-4 font-medium">Brand</p>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
              {brandColors.map((c) => (
                <Swatch key={c.name} {...c} dark={false} />
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm text-warm-gray-500 mb-4 font-medium">Accents</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {accentColors.map((c) => (
                <Swatch key={c.name} {...c} />
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm text-warm-gray-500 mb-4 font-medium">Neutrals</p>
            <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-4">
              {neutrals.map((c) => (
                <Swatch key={c.name} {...c} />
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ── 2. Typography ── */}
      <Section title="2 — Typography">
        {/* Display scale — Playfair Display */}
        <div className="mb-14">
          <p className="text-xs text-warm-gray-400 uppercase tracking-label mb-8">
            Display (Playfair Display)
          </p>
          <div className="space-y-2">
            {(
              [
                ["text-display-2xl", "display-2xl", "6.5 rem"],
                ["text-display-xl",  "display-xl",  "5 rem"],
                ["text-display-lg",  "display-lg",  "4 rem"],
                ["text-display-md",  "display-md",  "3.25 rem"],
                ["text-display-sm",  "display-sm",  "2.5 rem"],
                ["text-display-xs",  "display-xs",  "2 rem"],
              ] as const
            ).map(([cls, label, size]) => (
              <div
                key={label}
                className="flex items-baseline gap-6 py-3 border-b border-warm-gray-100"
              >
                <span className="w-28 shrink-0 text-xs text-warm-gray-400 font-mono">
                  {label}
                  <br />
                  <span className="text-warm-gray-300">{size}</span>
                </span>
                <span className={`font-display font-bold ${cls} leading-none`}>
                  House of Rest
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Body scale — Inter */}
        <div>
          <p className="text-xs text-warm-gray-400 uppercase tracking-label mb-8">
            Body (Inter)
          </p>
          <div className="space-y-1">
            {(
              [
                ["text-3xl", "3xl",  "30px"],
                ["text-2xl", "2xl",  "24px"],
                ["text-xl",  "xl",   "20px"],
                ["text-lg",  "lg",   "18px"],
                ["text-base","base", "16px"],
                ["text-sm",  "sm",   "14px"],
                ["text-xs",  "xs",   "12px"],
              ] as const
            ).map(([cls, label, size]) => (
              <div
                key={label}
                className="flex items-baseline gap-6 py-2 border-b border-warm-gray-100"
              >
                <span className="w-28 shrink-0 text-xs text-warm-gray-400 font-mono">
                  {label}
                  <br />
                  <span className="text-warm-gray-300">{size}</span>
                </span>
                <span className={`${cls} text-off-black`}>
                  Creating a Church for Non-Church and Disgruntled Church Goers
                </span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── 3. Buttons ── */}
      <Section title="3 — Buttons">
        <div className="space-y-8">
          <div>
            <p className="text-xs text-warm-gray-400 uppercase tracking-label mb-5">
              Variants
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
          </div>

          <div className="bg-off-black p-6 rounded-xl">
            <p className="text-xs text-warm-gray-500 uppercase tracking-label mb-5">
              On dark backgrounds
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline-light">Outline Light</Button>
            </div>
          </div>

          <div>
            <p className="text-xs text-warm-gray-400 uppercase tracking-label mb-5">
              Sizes
            </p>
            <div className="flex flex-wrap gap-4 items-end">
              <Button size="lg">Large</Button>
              <Button size="md">Medium</Button>
              <Button size="sm">Small</Button>
            </div>
          </div>
        </div>
      </Section>

      {/* ── 4. Badges ── */}
      <Section title="4 — Badges">
        <div className="flex flex-wrap gap-3">
          <Badge variant="primary">Primary</Badge>
          <Badge variant="gold">Gold</Badge>
          <Badge variant="teal">Teal</Badge>
          <Badge variant="green">Green</Badge>
          <Badge variant="neutral">Neutral</Badge>
        </div>
      </Section>

      {/* ── 5. SectionHeading ── */}
      <Section title="5 — Section Heading">
        <div className="space-y-16">
          <SectionHeading
            label="Label text"
            heading="Section heading on light"
            subheading="Supporting subheading text that provides additional context and sits comfortably at text-lg."
            align="center"
          />
          <div className="bg-off-black p-12 rounded-2xl">
            <SectionHeading
              label="Label text"
              heading="Section heading on dark"
              subheading="Supporting subheading text that provides additional context and sits comfortably at text-lg."
              align="center"
              light
            />
          </div>
          <SectionHeading
            label="Left-aligned"
            heading="Left-aligned variant"
            subheading="Used for sections where the content flows left, like a two-column layout."
            align="left"
          />
        </div>
      </Section>

      {/* ── 6. Motion tokens ── */}
      <Section title="6 — Motion Tokens">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              name: "fadeUp",
              spec: "opacity 0→1, y 16→0, 600ms easeOut",
              use: "Section entrances on scroll",
            },
            {
              name: "fadeIn",
              spec: "opacity 0→1, 400ms",
              use: "Overlays, tooltips, inline reveals",
            },
            {
              name: "staggerChildren",
              spec: "0.08s delay between children",
              use: "Card grids, nav lists",
            },
            {
              name: "pageTransition",
              spec: "opacity 0→1, 250ms easeInOut",
              use: "Route changes",
            },
            {
              name: "sectionReveal",
              spec: "once: true, margin: -60px",
              use: "Shared viewport config for all sections",
            },
            {
              name: "ken-burns (CSS)",
              spec: "scale 1→1.06, 12s linear, infinite",
              use: "Intro splash still-image fallback",
            },
          ].map((token) => (
            <div
              key={token.name}
              className="bg-warm-gray-100 rounded-xl p-6 border border-warm-gray-200"
            >
              <p className="font-mono text-sm font-semibold text-off-black mb-1">
                {token.name}
              </p>
              <p className="text-xs text-warm-gray-500 mb-3">{token.spec}</p>
              <p className="text-xs text-accent-teal font-medium">↳ {token.use}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ══════════════════════════════════════════════════════════════════════
          COZA DESIGN LANGUAGE
      ══════════════════════════════════════════════════════════════════════ */}

      {/* ── COZA hero divider ── */}
      <div className="bg-coza-dark py-16">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent-pink mb-4">
            New — COZA Design Language
          </p>
          <h2 className="text-5xl md:text-7xl font-bold text-coza-fg-light leading-[0.85] tracking-tight">
            Bold.<br />Warm.<br />Cinematic.
          </h2>
          <p className="mt-6 text-coza-fg-light/60 text-lg max-w-lg leading-relaxed">
            A visual language extracted from cozaglobal.tv — warm dark surfaces, neon-pink CTAs,
            diagonal clip-path bands, and oversized editorial type.
          </p>
        </Container>
      </div>

      {/* ── COZA C1: Surfaces ── */}
      <Section title="C1 — COZA Surfaces">
        <div className="space-y-10">
          <div>
            <p className="text-sm text-warm-gray-500 mb-4 font-medium">Surfaces</p>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              {cozaSurfaces.map((c) => (
                <Swatch key={c.name} name={c.name} hex={c.hex} cls={c.cls} label={c.label} dark={c.dark} />
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm text-warm-gray-500 mb-4 font-medium">Accents</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {cozaAccents.map((c) => (
                <Swatch key={c.name} name={c.name} hex={c.hex} cls={c.cls} label={c.label} dark={c.dark} />
              ))}
            </div>
          </div>
        </div>

        {/* Live section-background previews */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-coza-dark rounded-2xl p-8 flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent-pink">
              Dark section
            </p>
            <p className="text-coza-fg-light text-2xl font-bold leading-tight">
              Primary heading
            </p>
            <p className="text-coza-fg-light/60 text-sm leading-relaxed">
              Body copy on the dark surface.
            </p>
            <button className="mt-2 self-start bg-accent-pink text-coza-dark font-bold px-5 py-2 rounded-lg text-sm">
              CTA
            </button>
          </div>

          <div className="bg-coza-cream rounded-2xl p-8 flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-coza-dark/50">
              Cream section
            </p>
            <p className="text-coza-dark text-2xl font-bold leading-tight">
              Primary heading
            </p>
            <p className="text-coza-dark/60 text-sm leading-relaxed">
              Body copy on the cream surface.
            </p>
            <button className="mt-2 self-start bg-coza-dark text-coza-cream font-bold px-5 py-2 rounded-lg text-sm">
              CTA
            </button>
          </div>

          <div className="bg-accent-indigo rounded-2xl p-8 flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent-pink">
              Saturated section
            </p>
            <p className="text-white text-2xl font-bold leading-tight">
              Primary heading
            </p>
            <p className="text-white/60 text-sm leading-relaxed">
              Body copy on the indigo surface.
            </p>
            <button className="mt-2 self-start bg-accent-pink text-coza-dark font-bold px-5 py-2 rounded-lg text-sm">
              CTA
            </button>
          </div>
        </div>
      </Section>

      {/* ── COZA C2: Typography ── */}
      <Section title="C2 — COZA Typography">
        {/* Libre Baskerville */}
        <div className="mb-14">
          <p className="text-xs text-warm-gray-400 uppercase tracking-label mb-6">
            Libre Baskerville — editorial / serif
          </p>
          <div className="space-y-3">
            {[
              ["font-libre-baskerville text-3xl font-bold",   "Bold 30px",   "House of Rest International"],
              ["font-libre-baskerville text-2xl font-normal", "Regular 24px","Come exactly as you are."],
              ["font-libre-baskerville text-xl italic",       "Italic 20px", "A church for the quietly searching."],
              ["font-libre-baskerville text-lg font-bold",    "Bold 18px",   "Editorial label text"],
              ["font-libre-baskerville text-base",            "Regular 16px","Supporting body in the editorial voice, used for quotes and subheadings."],
            ].map(([cls, label, sample]) => (
              <div key={label} className="flex items-baseline gap-6 py-3 border-b border-warm-gray-100">
                <span className="w-36 shrink-0 text-xs text-warm-gray-400 font-mono">{label}</span>
                <span className={cls}>{sample}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Cormorant Garamond */}
        <div className="mb-14">
          <p className="text-xs text-warm-gray-400 uppercase tracking-label mb-6">
            Cormorant Garamond — display / intro
          </p>
          <div className="space-y-3">
            {[
              ["font-cormorant-garamond text-6xl font-medium",  "Medium 60px",  "ENTER"],
              ["font-cormorant-garamond text-5xl font-semibold","Semibold 48px", "House of Rest"],
              ["font-cormorant-garamond text-4xl font-light",   "Light 36px",   "Come to me, all who are weary."],
              ["font-cormorant-garamond text-2xl italic",       "Italic 24px",  "Matthew 11:28"],
            ].map(([cls, label, sample]) => (
              <div key={label} className="flex items-baseline gap-6 py-3 border-b border-warm-gray-100">
                <span className="w-36 shrink-0 text-xs text-warm-gray-400 font-mono">{label}</span>
                <span className={cls}>{sample}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Billboard heading demo */}
        <div className="mt-12 bg-coza-cream rounded-2xl p-10 overflow-hidden relative">
          <p className="text-xs uppercase tracking-[0.12em] text-coza-dark/40 mb-6">
            Billboard heading (clamp scale) — on cream
          </p>
          <p
            className="font-bold leading-[0.85] tracking-tight text-coza-cream-shadow mix-blend-multiply opacity-80 uppercase select-none"
            style={{ fontSize: "clamp(3.5rem, 10vw, 7.5rem)" }}
            aria-hidden
          >
            HOUSE OF REST
          </p>
          <p className="mt-4 text-coza-dark/50 text-sm">
            ↑ Outline watermark treatment — outline via color blend, not text-stroke
          </p>
        </div>

        {/* Dark billboard demo */}
        <div className="mt-4 bg-coza-dark rounded-2xl p-10">
          <p className="text-xs uppercase tracking-[0.12em] text-accent-pink/60 mb-6">
            Section headline — on dark
          </p>
          <p
            className="font-bold text-white leading-[0.8] tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}
          >
            We&apos;ve been<br />called to create<br />a church.
          </p>
        </div>
      </Section>

      {/* ── COZA C3: Diagonal band preview ── */}
      <Section title="C3 — Diagonal Band Divider">
        <p className="text-sm text-warm-gray-500 mb-8 max-w-lg">
          Used between major sections. Two accent colors overlap via CSS <code>clip-path</code>.
          Labels are <code>aria-hidden</code>; real headings live nearby for screen readers.
        </p>
        <div className="relative w-full h-[160px] rounded-2xl overflow-hidden">
          <div
            className="absolute inset-0 bg-accent-pink flex items-center"
            style={{ clipPath: "polygon(0 0, 100% 20%, 100% 100%, 0 100%)" }}
            aria-hidden
          >
            <div className="px-8 pt-4">
              <span className="text-5xl sm:text-7xl font-bold text-coza-dark leading-none">Rest</span>
            </div>
          </div>
          <div
            className="absolute inset-0 bg-accent-blue flex items-center justify-end"
            style={{ clipPath: "polygon(0 35%, 100% 0, 100% 100%, 0 100%)" }}
            aria-hidden
          >
            <div className="px-8 pt-8">
              <span className="text-5xl sm:text-7xl font-bold text-coza-dark leading-none">Revival</span>
            </div>
          </div>
        </div>
        <p className="mt-4 text-xs text-warm-gray-400 font-mono">
          polygon(0 0, 100% 20%, 100% 100%, 0 100%) × polygon(0 35%, 100% 0, 100% 100%, 0 100%)
        </p>
      </Section>

      {/* ── COZA C4: Letter-slide button preview ── */}
      <Section title="C4 — Letter-Slide Button (COZA Pill)">
        <p className="text-sm text-warm-gray-500 mb-8 max-w-lg">
          Pink pill CTA with a slide-and-skew hover effect. Hover the buttons below.
        </p>
        <div className="flex flex-wrap gap-4 items-center">
          {/* Static preview — actual interactive version built in Step 2 as SlideLetterButton */}
          {["SEARCH", "MENU", "ENTER", "GIVE"].map((label) => (
            <button
              key={label}
              className="group relative overflow-hidden bg-accent-pink text-coza-dark font-bold px-6 py-3 rounded-lg h-[44px] flex items-center"
            >
              <span className="relative overflow-hidden inline-flex leading-none">
                <span className="block translate-y-0 skew-y-0 transition duration-500 group-hover:translate-y-[-160%] group-hover:skew-y-12">
                  {label}
                </span>
                <span className="absolute block translate-y-[164%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
                  {label}
                </span>
              </span>
            </button>
          ))}

          {/* Ghost variant */}
          <button className="group relative overflow-hidden bg-[#FFFFFF33] text-white font-bold px-6 py-3 rounded-lg h-[44px] flex items-center border border-white/20">
            <span className="relative overflow-hidden inline-flex leading-none">
              <span className="block translate-y-0 skew-y-0 transition duration-500 group-hover:translate-y-[-160%] group-hover:skew-y-12">
                GHOST
              </span>
              <span className="absolute block translate-y-[164%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
                GHOST
              </span>
            </span>
          </button>
        </div>
        <p className="mt-6 text-xs text-warm-gray-400">
          Fully CSS — no JS. Works on touch (tap = hover state). Replaced by{" "}
          <code>SlideLetterButton</code> component in Step 2.
        </p>
      </Section>

      {/* ── COZA C5: Motion tokens ── */}
      <Section title="C5 — COZA Motion Tokens">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: "wordReveal", spec: "opacity 0→1, y 20→0, 500ms, stagger 60ms/word", use: "City list, headlines" },
            { name: "stagger(n)", spec: "staggerChildren: n (default 0.08s)", use: "Any multi-child reveal" },
            { name: "inView",     spec: "once: true, margin: '-10% 0px'",               use: "All section enters" },
            { name: "overshoot",  spec: "cubic-bezier(0.34, 1.56, 0.64, 1)",            use: "Footer image collage" },
            { name: "fadeUp",     spec: "opacity 0→1, y 16→0, 600ms easeOut",           use: "Section entrances" },
            { name: "fadeIn",     spec: "opacity 0→1, 400ms",                           use: "Overlays, tooltips" },
          ].map((token) => (
            <div key={token.name} className="bg-warm-gray-100 rounded-xl p-6 border border-warm-gray-200">
              <p className="font-mono text-sm font-semibold text-off-black mb-1">{token.name}</p>
              <p className="text-xs text-warm-gray-500 mb-3">{token.spec}</p>
              <p className="text-xs text-accent-teal font-medium">↳ {token.use}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── bottom padding ── */}
      <div className="h-24" />
    </>
  );
}
