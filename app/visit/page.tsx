import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";
import { JsonLd } from "@/components/seo/JsonLd";
import services from "@/config/services.json";
import site from "@/config/site.json";

export const metadata: Metadata = {
  title: "Plan a Visit",
  description:
    "Everything you need to know before your first Sunday at House of Rest International in Lagos — service times, location, parking, and what to expect.",
};

const steps = [
  {
    n: "01",
    heading: "Arrive",
    body: "Doors open 20 minutes before service. You'll be greeted at the entrance — no need to know anyone or do anything. Just come in.",
  },
  {
    n: "02",
    heading: "Worship",
    body: "We start with music — real, honest music that doesn't require you to feel anything you don't feel. Sing along or just listen.",
  },
  {
    n: "03",
    heading: "The Message",
    body: "The teaching is practical, direct, and aimed at real life. We don't avoid hard questions — we lean into them.",
  },
  {
    n: "04",
    heading: "Community",
    body: "After service, stay for coffee. Meet people. This is when the real connections happen — nobody will pressure you, but everyone will be glad you stayed.",
  },
];

const faqs = [
  {
    q: "What should I wear?",
    a: "Whatever you're comfortable in. You'll see everything from casual to traditional. No dress code, no judgment.",
  },
  {
    q: "Do I need to bring a Bible?",
    a: "No. Everything referenced in the message will be on-screen. Bring one if you want — or use your phone.",
  },
  {
    q: "What about my kids?",
    a: "HORI Kids runs during every service for ages 0–12. It's safe, age-appropriate, and they'll have a great time. You can check them in when you arrive.",
  },
  {
    q: "Will I be singled out as a visitor?",
    a: "No. We never ask visitors to stand up or identify themselves. You can be completely anonymous if you prefer.",
  },
  {
    q: "How long is the service?",
    a: "About 90 minutes — worship, a message, and a brief close. We start and end on time.",
  },
];

export default function VisitPage() {
  const service = services[0];

  const placeJsonLd = {
    "@context": "https://schema.org",
    "@type": "Church",
    name: site.name,
    url: site.url,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lagos",
      addressCountry: "NG",
    },
    openingHoursSpecification: services.map((s) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: s.day,
      opens: "09:00",
      closes: "10:30",
      description: s.name,
    })),
  };

  return (
    <>
      <JsonLd data={placeJsonLd} />

      {/* ── Hero ── */}
      <section className="pt-32 pb-16 bg-primary text-white" aria-label="Plan a visit">
        <Container>
          <AnimatedSection>
            <p className="text-white/70 text-xs font-semibold uppercase tracking-label mb-5">
              Plan a Visit
            </p>
            <h1 className="font-display text-display-lg md:text-display-xl mb-6 max-w-2xl">
              We&apos;re glad you&apos;re thinking about coming.
            </h1>
            <p className="text-white/80 text-xl max-w-xl leading-relaxed">
              No preparation required. No dress code. No insider knowledge. Just show up.
            </p>
          </AnimatedSection>
        </Container>
      </section>

      {/* ── Service Details ── */}
      {service && (
        <section className="py-16 bg-off-white" aria-labelledby="service-details-heading">
          <Container>
            <AnimatedSection>
              <SectionHeading
                id="service-details-heading"
                label="When & Where"
                heading="Join us this Sunday."
                align="center"
                className="mb-12"
              />
            </AnimatedSection>

            <AnimatedSection stagger className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {[
                { label: "Day & Time", value: `${service.day}s at ${service.time}` },
                { label: "Location", value: service.location },
                { label: "City", value: `${service.address.city}, ${service.address.country}` },
              ].map(({ label, value }) => (
                <AnimatedItem key={label}>
                  <div className="text-center p-6 bg-warm-gray-100 rounded-xl">
                    <p className="text-xs font-semibold uppercase tracking-label text-warm-gray-400 mb-2">
                      {label}
                    </p>
                    <p className="font-display font-bold text-xl text-off-black">{value}</p>
                  </div>
                </AnimatedItem>
              ))}
            </AnimatedSection>

            <AnimatedSection className="mt-8 text-center">
              <a
                href={service.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-dark transition-colors"
              >
                Get Directions
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </AnimatedSection>
          </Container>
        </section>
      )}

      {/* ── What to Expect ── */}
      <section className="py-24 bg-off-black" aria-labelledby="expect-heading">
        <Container>
          <AnimatedSection className="mb-12">
            <SectionHeading
              id="expect-heading"
              label="What to Expect"
              heading="Here's how Sunday works."
              light
              align="center"
            />
          </AnimatedSection>

          <AnimatedSection stagger className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {steps.map((step) => (
              <AnimatedItem key={step.n}>
                <div className="flex gap-5 p-6 border border-warm-gray-800 rounded-xl hover:border-warm-gray-600 transition-colors">
                  <span className="text-primary font-mono font-bold text-sm shrink-0 mt-1">
                    {step.n}
                  </span>
                  <div>
                    <h3 className="font-display font-bold text-xl text-white mb-2">{step.heading}</h3>
                    <p className="text-warm-gray-400 text-sm leading-relaxed">{step.body}</p>
                  </div>
                </div>
              </AnimatedItem>
            ))}
          </AnimatedSection>
        </Container>
      </section>

      {/* ── Kids ── */}
      <section className="py-24 bg-warm-gray-100" aria-labelledby="kids-heading">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <AnimatedSection>
              <SectionHeading
                id="kids-heading"
                label="HORI Kids"
                heading="Your kids are covered."
                subheading="HORI Kids runs during every service — a safe, age-appropriate environment for children ages 0–12 where they discover how loved they are."
                align="center"
                className="mb-8"
              />
              <Button href="/ministries/kids" variant="outline" size="md">
                About HORI Kids
              </Button>
            </AnimatedSection>
          </div>
        </Container>
      </section>

      {/* ── Map placeholder ── */}
      <section className="py-24 bg-off-white" aria-labelledby="location-heading">
        <Container>
          <AnimatedSection className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading
                id="location-heading"
                label="Location"
                heading="Find us in Lagos."
                align="left"
                className="mb-6"
              />
              {service && (
                <address className="not-italic text-warm-gray-600 space-y-1 mb-6">
                  <p className="font-semibold text-off-black">{service.location}</p>
                  <p>{service.address.city}, {service.address.country}</p>
                </address>
              )}
              <a
                href={service?.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold text-primary hover:text-primary-dark transition-colors"
              >
                Open in Google Maps →
              </a>
            </div>
            <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-warm-gray-200 flex flex-col items-center justify-center gap-2 text-warm-gray-400">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              <p className="text-sm font-medium">Lagos, Nigeria</p>
            </div>
          </AnimatedSection>
        </Container>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 bg-warm-gray-100" aria-labelledby="faq-heading">
        <Container className="max-w-3xl">
          <AnimatedSection className="mb-10">
            <SectionHeading
              id="faq-heading"
              label="FAQ"
              heading="Common questions."
              align="center"
            />
          </AnimatedSection>

          <AnimatedSection stagger className="space-y-4">
            {faqs.map((faq) => (
              <AnimatedItem key={faq.q}>
                <details className="group bg-white rounded-xl border border-warm-gray-200 overflow-hidden">
                  <summary className="flex items-center justify-between px-6 py-4 cursor-pointer font-semibold text-off-black list-none hover:text-primary transition-colors">
                    {faq.q}
                    <svg
                      className="w-5 h-5 text-warm-gray-400 transition-transform group-open:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="px-6 pb-5 text-warm-gray-600 text-sm leading-relaxed">{faq.a}</p>
                </details>
              </AnimatedItem>
            ))}
          </AnimatedSection>

          <AnimatedSection className="mt-10 text-center">
            <p className="text-warm-gray-500 mb-4">Still have a question?</p>
            <Button href="/contact" variant="outline" size="md">
              Get in Touch
            </Button>
          </AnimatedSection>
        </Container>
      </section>
    </>
  );
}
