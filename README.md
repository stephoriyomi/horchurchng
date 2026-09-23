# House of Rest International

Production website for House of Rest International (HORI) — a Lagos-based church targeting people who have never tried church, walked away from it, or been hurt by it.

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router, React 19) |
| Styling | Tailwind CSS v4 (CSS-first, no config file) |
| Fonts | Inter (body) · Playfair Display (headings) via `next/font/google` |
| Animation | Framer Motion 11 |
| Content | MDX files + gray-matter frontmatter |
| Forms | React Hook Form v7 + Zod + Server Actions |
| Package manager | pnpm v11 |

## Prerequisites

- Node.js 20+
- pnpm 11+ (`npm install -g pnpm`)

## Quick start

```bash
git clone <repo-url> house-of-rest-international
cd house-of-rest-international
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | What it does |
|---|---|
| `pnpm dev` | Dev server with Turbopack |
| `pnpm build` | Production build |
| `pnpm start` | Serve the production build locally |
| `pnpm lint` | ESLint (Next.js ruleset) |
| `pnpm type-check` | TypeScript — no emit |
| `pnpm format` | Prettier — write in place |

## Project structure

```
/
├── app/                    # Next.js App Router pages & layouts
│   ├── layout.tsx          # Root layout — fonts, header, footer, metadata
│   ├── page.tsx            # Homepage
│   ├── about/              # About page
│   ├── visit/              # Plan a visit
│   ├── watch/              # Watch sermons (search UI)
│   ├── sermons/[slug]/     # Individual sermon
│   ├── ministries/         # Ministries listing
│   ├── ministries/[slug]/  # Individual ministry
│   ├── events/             # Events listing
│   ├── events/[slug]/      # Individual event
│   ├── blog/               # Blog listing
│   ├── blog/[slug]/        # Individual blog post
│   ├── give/               # Giving page
│   ├── contact/            # Contact form
│   ├── prayer-request/     # Prayer request form
│   ├── new/                # First-time visitor landing page (SEM)
│   ├── actions/            # Server actions (contact.ts, prayer.ts)
│   ├── sitemap.ts          # Dynamic XML sitemap
│   ├── robots.ts           # robots.txt
│   ├── manifest.ts         # PWA manifest
│   ├── icon.tsx            # Favicon (generated)
│   ├── apple-icon.tsx      # Apple touch icon (generated)
│   └── opengraph-image.tsx # Default OG image (generated)
│
├── components/
│   ├── cards/              # BlogCard, SermonCard, EventCard, MinistryCard, StaffCard
│   ├── forms/              # FormField, ContactForm, PrayerRequestForm
│   ├── hero/               # HeroSection
│   ├── intro/              # SplashIntro (animated first-visit overlay)
│   ├── layout/             # Header, Footer
│   ├── media/              # VideoEmbed
│   ├── sections/           # Homepage sections, SermonArchive
│   ├── seo/                # JsonLd
│   └── ui/                 # AnimatedSection, Badge, Button, Container, SectionHeading
│
├── config/                 # Static JSON config (edit these, not the code)
│   ├── site.json           # Name, URL, social links, contact details
│   ├── services.json       # Service times and directions URL
│   ├── staff.json          # Staff/leadership list
│   └── ministries.json     # Ministry metadata (schedule, accent colour)
│
├── content/                # MDX content files (frontmatter + body)
│   ├── sermons/            # One .mdx per sermon
│   ├── blog/               # One .mdx per blog post
│   ├── events/             # One .mdx per event
│   └── ministries/         # One .mdx per ministry
│
├── lib/
│   ├── content.ts          # Server-side content readers (getSermons, getBlogPosts, …)
│   ├── motion.ts           # Shared Framer Motion variants
│   └── schemas.ts          # Shared Zod schemas (ContactSchema, PrayerSchema)
│
└── public/
    └── images/             # Static images (currently empty — see TODO.md)
```

## Adding content

### Sermon

Create `content/sermons/<slug>.mdx`:

```mdx
---
title: "Your Sermon Title"
speaker: "Speaker Name"
date: "2026-06-01"
scripture: "John 3:16"
videoUrl: "https://www.youtube.com/watch?v=VIDEO_ID"
duration: "45 min"
excerpt: "One-sentence summary shown on cards."
tags: ["Grace", "Identity"]
---

Full sermon notes or description in MDX here.
```

### Blog post

Create `content/blog/<slug>.mdx`:

```mdx
---
title: "Post Title"
author: "Author Name"
date: "2026-06-01"
excerpt: "One-sentence summary."
tags: ["Faith", "Doubt"]
---

Post body in MDX here.
```

### Event

Create `content/events/<slug>.mdx`:

```mdx
---
title: "Event Name"
startDate: "2026-06-15T09:00:00"
endDate: "2026-06-15T12:00:00"
location: "Main Auditorium, Lagos Island"
excerpt: "Short description."
registerUrl: "https://paystack.com/..."
---

Event details in MDX here.
```

`registerUrl` is optional. If omitted, the sidebar shows a "Get More Info" link to `/contact`.

### Ministry

Update `config/ministries.json` to add or edit a ministry, then create `content/ministries/<slug>.mdx` for its body copy.

## Config files

### `config/site.json`

Primary site identity. Update before launch:

```json
{
  "name": "House of Rest International",
  "shortName": "HORI",
  "tagline": "...",
  "description": "...",
  "url": "https://houseofresti.org",
  "social": { "instagram": "...", "youtube": "...", ... },
  "contact": {
    "email": "hello@houseofresti.org",
    "phone": "+234-...",
    "address": "Full street address"
  }
}
```

### `config/services.json`

Service times and Google Maps directions URL.

### `config/staff.json`

Leadership team. Each entry: `id`, `name`, `role`, `bio`, `order` (sort order).

## Environment variables

None are required to run the site. When you wire up a real email provider for forms (see `TODO.md`), you will need:

```env
# .env.local
RESEND_API_KEY=re_...          # or SENDGRID_API_KEY / SMTP_* etc.
PRAYER_TEAM_EMAIL=prayer@houseofresti.org
CONTACT_RECIPIENT_EMAIL=hello@houseofresti.org
```

Create `.env.local` at the project root. Never commit it.

## Design system

Visit `/design-system` in dev to browse the colour palette, type scale, button variants, and animation tokens. The route is excluded from `robots.txt` and not linked from the main navigation.

Design tokens live in `app/globals.css` inside the `@theme {}` block.
