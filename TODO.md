# TODO — Handoff List

Items that are explicitly placeholder or deferred. Each has the file(s) to edit and enough context to act without re-reading the whole codebase.

---

## Must-do before launch

### Real contact details
**Files:** `config/site.json`

Replace:
- `"phone": "+234-000-000-0000"` → real number
- `"address": "123 Broad Street, Lagos Island"` → real address
- All social URLs → real handles (or remove unused ones)

---

### Payment processor
**File:** `app/give/page.tsx`, `givingMethods[0].href`

Currently links to `https://paystack.com` (Paystack homepage). Replace with:
- A real Paystack payment page URL, or
- A Flutterwave payment link, or
- Any other hosted payment page

No code changes needed beyond swapping the URL. The "Give now" button is already wired.

---

### Bank account details
**File:** `app/give/page.tsx`, `givingMethods[1].details`

Replace the placeholder account number (`0000000000`) and bank name with real details.

---

### Email delivery for forms
**Files:** `app/actions/contact.ts`, `app/actions/prayer.ts`

Both currently `console.log` submissions. Replace with a real email provider.

Recommended: [Resend](https://resend.com) (simple API, generous free tier).

```bash
pnpm add resend
```

In `app/actions/contact.ts`, replace the `console.log` block:

```typescript
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: "noreply@houseofresti.org",
  to: process.env.CONTACT_RECIPIENT_EMAIL!,
  subject: `[Contact] ${result.data.subject} — ${result.data.name}`,
  text: `Name: ${result.data.name}\nEmail: ${result.data.email}\nPhone: ${result.data.phone ?? "—"}\n\n${result.data.message}`,
});
```

Same pattern for `app/actions/prayer.ts` → `PRAYER_TEAM_EMAIL`.

---

### Staff data
**File:** `config/staff.json`

Three placeholder entries (senior-pastor, worship-pastor, youth-pastor). Replace with real names, roles, and bios. The `order` field controls display order.

Staff photos are optional — the `StaffCard` component degrades to an initials avatar. To add photos: place images in `public/images/staff/` and add `"photo": "/images/staff/name.jpg"` to each entry, then update `components/cards/StaffCard.tsx` to render `<Image>` when the field is present.

---

### Service directions URL
**File:** `config/services.json`, `directionsUrl`

Replace with a real Google Maps link to the venue.

---

### Real sermon videos
**Files:** `content/sermons/*.mdx`

`videoUrl` fields currently contain YouTube placeholder URLs. Replace with real YouTube or Vimeo watch URLs. The `VideoEmbed` component handles both formats automatically.

---

## Should do before launch

### Default OG image fallback
**File:** `public/images/og-default.jpg`

The `app/opengraph-image.tsx` generates the default OG image dynamically. Some link previewers (notably WhatsApp) cache a static image at first visit — having `public/images/og-default.jpg` ensures they get something. Size: 1200×630.

`config/site.json` → `"ogImage": "/images/og-default.jpg"` already points to this path.

---

### Analytics
Nothing is wired up. Choose one:

**Vercel Analytics** (if hosting on Vercel):
```bash
pnpm add @vercel/analytics
```
Add `<Analytics />` to `app/layout.tsx`.

**Plausible** (privacy-first, no cookies):
```bash
pnpm add @plausible/next
```
Wrap layout with `<PlausibleProvider domain="houseofresti.org">`.

**Google Analytics 4:**
Use `next/third-parties/google` — no extra package needed:
```typescript
import { GoogleAnalytics } from "next/third-parties/google";
// Add <GoogleAnalytics gaId="G-XXXXXXX" /> inside RootLayout
```

---

### `/design-system` route in production
**File:** `app/design-system/page.tsx`

Currently excluded from `robots.txt` but still publicly accessible at `/design-system`. Options:
- Delete the route before launch (safest), or
- Add a middleware check to restrict it to internal IPs / dev only

---

## Nice to have

### Content Security Policy (CSP)
**File:** `next.config.ts`

Security headers are in place but no CSP. A CSP needs careful tuning to allow:
- YouTube iframes (`frame-src https://www.youtube.com https://www.youtube-nocookie.com`)
- Google Fonts (`style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`)
- Framer Motion (`script-src 'self' 'unsafe-inline'` or use nonces)

Start with a report-only CSP (`Content-Security-Policy-Report-Only`) to audit violations before enforcing.

---

### Error monitoring
No error monitoring is set up. [Sentry](https://sentry.io) integrates with Next.js in ~10 minutes:

```bash
npx @sentry/wizard@latest -i nextjs
```

---

### Image optimisation for staff / content photos
`next/image` is imported in `ResponsiveImage` but nothing in `public/images/` yet. When real photos are added, use `<Image>` components with appropriate `sizes` props for responsive serving. The build is already configured for AVIF + WebP output.

---

### Sermon search improvements
`components/sections/SermonArchive.tsx` filters client-side on title, speaker, scripture, and tags. This works well for up to ~100 sermons. Beyond that, consider moving to a server-side search (Algolia, Meilisearch, or Postgres full-text).

---

### Pagination
Blog and sermon listing pages show all content at once. If the archive grows beyond ~20 items, add pagination or infinite scroll. The `getBlogPosts()` and `getSermons()` functions in `lib/content.ts` can accept offset/limit arguments.

---

### Email capture / newsletter
No email list integration. When needed, add a `<form>` pointing to a Mailchimp / ConvertKit / Beehiiv endpoint in the Footer or as a homepage section.

---

## Won't do (by design)

- **Payment processor backend** — `/give` links out to a hosted payment page. No card data ever touches this server.
- **User accounts / login** — out of scope.
- **CMS admin panel** — content is managed via MDX files in the repo. If the team needs a GUI, consider Contentlayer + Sanity or Tina CMS as a future layer.
