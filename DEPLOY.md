# Deployment Guide

## Recommended: Vercel

Vercel is the fastest path to production and handles everything (builds, CDN, edge functions, preview deployments per branch) with zero configuration for Next.js.

### Steps

1. Push the repo to GitHub, GitLab, or Bitbucket.
2. Go to [vercel.com](https://vercel.com) → New Project → Import the repo.
3. Vercel auto-detects Next.js. Leave all build settings at their defaults.
4. Set environment variables (see below) in Project Settings → Environment Variables.
5. Click Deploy.

Every push to `main` triggers a production deployment. Every pull request gets an isolated preview URL.

### Custom domain

In Vercel: Project → Settings → Domains → Add domain → follow the DNS instructions.

Recommended DNS records for `houseofresti.org`:

```
Type  Name    Value
A     @       76.76.21.21
CNAME www     cname.vercel-dns.com
```

HTTPS and HSTS are provisioned automatically.

## Environment variables

Set these in Vercel's dashboard (or in `.env.local` for local dev). Never commit secrets.

| Variable | Required | Purpose |
|---|---|---|
| `RESEND_API_KEY` | When email is wired up | Transactional email via Resend |
| `CONTACT_RECIPIENT_EMAIL` | When email is wired up | Where contact form submissions go |
| `PRAYER_TEAM_EMAIL` | When email is wired up | Where prayer requests go |

The site runs fully without any env vars — forms will only log to the server console until an email provider is integrated.

## Alternative: Self-hosted Node

```bash
pnpm build
pnpm start          # starts on port 3000
```

Use a process manager (PM2 recommended) and a reverse proxy (nginx or Caddy) in front:

```nginx
server {
  listen 80;
  server_name houseofresti.org www.houseofresti.org;
  return 301 https://$host$request_uri;
}

server {
  listen 443 ssl;
  server_name houseofresti.org www.houseofresti.org;

  ssl_certificate     /etc/letsencrypt/live/houseofresti.org/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/houseofresti.org/privkey.pem;

  location / {
    proxy_pass http://localhost:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

## Pre-launch checklist

### Content
- [ ] Replace all placeholder staff in `config/staff.json` with real names, roles, and bios
- [ ] Update `config/site.json` — real phone number, address, and social URLs
- [ ] Update bank account details on `/give` (`app/give/page.tsx`)
- [ ] Add real sermon video URLs to `content/sermons/*.mdx`
- [ ] Add real event dates for upcoming services
- [ ] Review all blog post content — remove or replace placeholder posts
- [ ] Update directions URL in `config/services.json` with real Google Maps link

### Images
- [ ] Add `public/images/og-default.jpg` (1200×630 fallback OG image for browsers that don't support `ImageResponse`)
- [ ] Add staff photos (optional — the site degrades gracefully to initials avatars)

### Integrations
- [ ] Wire up a payment processor on `/give` — replace the `https://paystack.com` placeholder
- [ ] Wire up email in `app/actions/contact.ts` and `app/actions/prayer.ts`
- [ ] Set `CONTACT_RECIPIENT_EMAIL` and `PRAYER_TEAM_EMAIL` in Vercel dashboard

### Analytics (choose one)
- [ ] Vercel Analytics (zero-config if hosting on Vercel)
- [ ] Plausible (`pnpm add @plausible/tracker`) — privacy-first, recommended
- [ ] Google Analytics 4 (add to layout.tsx via `next/third-parties/google`)

### Final checks
- [ ] Run `pnpm build` locally — zero errors before pushing
- [ ] Confirm `site.url` in `config/site.json` matches the production domain (used in sitemap and JSON-LD)
- [ ] Test contact form end-to-end in production
- [ ] Test prayer request form
- [ ] Check `/sitemap.xml` renders correctly in production
- [ ] Verify OG images with [opengraph.xyz](https://www.opengraph.xyz) or Twitter Card Validator
- [ ] Test on a real mobile device (not just devtools)
- [ ] Confirm the splash intro fires on first visit and not on repeat visits
- [ ] Remove `/design-system` route or add auth if you want it private in production

## Security headers

`next.config.ts` already sets:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`

A Content Security Policy (CSP) is not set — adding one is recommended before launch but requires careful tuning to allow YouTube embeds, Google Fonts, and Framer Motion inline styles.
