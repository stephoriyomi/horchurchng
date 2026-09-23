import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import site from "@/config/site.json";

export const metadata: Metadata = {
  title: "New Here? Start Here.",
  description:
    "Visiting House of Rest International for the first time? Here's everything you need to know — what to expect, where we are, and why this might be exactly where you belong.",
};

const steps = [
  {
    number: "01",
    heading: "Show up as you are",
    body: "No dress code. No performance. No background knowledge required. Just come.",
  },
  {
    number: "02",
    heading: "Find your seat",
    body: "Doors open 20 minutes before service. Our team will greet you and help you find a seat — no pressure to sit anywhere in particular.",
  },
  {
    number: "03",
    heading: "Experience the service",
    body: "About an hour of music, a message, and time to reflect. We don't pass a plate — you give if and when you choose to.",
  },
  {
    number: "04",
    heading: "Say hi — or don't",
    body: "After service, our welcome team is around if you want to chat. You're also completely free to slip out — no guilt.",
  },
];

const questions = [
  {
    q: "Do I have to believe anything specific to come?",
    a: "No. Doubt, questions, and skepticism are all welcome here. We'd rather have an honest conversation than a pretend one.",
  },
  {
    q: "What if I had a bad experience at a church before?",
    a: "We hear that a lot. We can't speak for other places, but we can tell you that here, your experience matters. Come with your guard up if you need to — we understand.",
  },
  {
    q: "Will I be put on the spot?",
    a: "Never. We won't ask you to stand up, introduce yourself, or raise a hand. Come, observe, and take your time.",
  },
  {
    q: "Is there something for my kids?",
    a: "Yes — we have a dedicated kids programme running during the main service for ages 0–12. Safe, supervised, and genuinely fun.",
  },
];

const newVisitorJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "New Here — House of Rest International",
  description: metadata.description,
  url: `${site.url}/new`,
  isPartOf: {
    "@type": "WebSite",
    name: site.name,
    url: site.url,
  },
};

export default function NewPage() {
  return (
    <>
      <JsonLd data={newVisitorJsonLd} />

      {/* ── Hero ── */}
      <section className="pt-32 pb-24 bg-off-black" aria-label="New visitors">
        <Container>
          <AnimatedSection>
            <p className="text-accent-gold text-xs font-semibold uppercase tracking-label mb-5">
              First time?
            </p>
            <h1 className="font-display text-display-lg md:text-display-xl text-white mb-6 max-w-3xl leading-tight">
              You&apos;ve been burned before. We get it. Come anyway.
            </h1>
            <p className="text-warm-gray-300 text-xl max-w-xl leading-relaxed mb-10">
              House of Rest was built for exactly this — people who are done with religion but not done with looking. No pressure. No performance. Just a room full of honest people.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button href="/visit" variant="primary" size="lg">
                Plan your visit
              </Button>
              <Button href="/about" variant="outline-light" size="lg">
                About us
              </Button>
            </div>
          </AnimatedSection>
        </Container>
      </section>

      {/* ── What to expect ── */}
      <section className="py-20 bg-off-white" aria-labelledby="what-to-expect-heading">
        <Container>
          <AnimatedSection className="mb-12">
            <h2
              id="what-to-expect-heading"
              className="font-display font-bold text-display-xs text-off-black"
            >
              What to expect on your first Sunday
            </h2>
          </AnimatedSection>

          <AnimatedSection stagger className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {steps.map((step) => (
              <AnimatedItem key={step.number}>
                <div className="bg-warm-gray-100 rounded-2xl p-7">
                  <span className="text-xs font-bold text-primary tracking-label block mb-3">
                    {step.number}
                  </span>
                  <h3 className="font-semibold text-off-black text-lg mb-2">{step.heading}</h3>
                  <p className="text-warm-gray-600 text-sm leading-relaxed">{step.body}</p>
                </div>
              </AnimatedItem>
            ))}
          </AnimatedSection>
        </Container>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 bg-warm-gray-100" aria-labelledby="new-faq-heading">
        <Container className="max-w-2xl">
          <AnimatedSection className="mb-10">
            <h2
              id="new-faq-heading"
              className="font-display font-bold text-display-xs text-off-black"
            >
              Questions we actually get asked
            </h2>
          </AnimatedSection>

          <AnimatedSection stagger className="space-y-6">
            {questions.map((item) => (
              <AnimatedItem key={item.q}>
                <div className="border-b border-warm-gray-200 pb-6">
                  <h3 className="font-semibold text-off-black mb-2">{item.q}</h3>
                  <p className="text-warm-gray-600 text-sm leading-relaxed">{item.a}</p>
                </div>
              </AnimatedItem>
            ))}
          </AnimatedSection>
        </Container>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-20 bg-primary" aria-label="Visit CTA">
        <Container className="max-w-2xl text-center">
          <AnimatedSection>
            <h2 className="font-display font-bold text-display-sm text-white mb-4">
              Ready to check it out?
            </h2>
            <p className="text-white/80 text-lg leading-relaxed mb-8">
              Service is every Sunday at 9:00 AM. No registration needed — just show up. If you want a heads-up about parking or seating, reach out and we&apos;ll sort you out.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button href="/visit" variant="secondary" size="lg">
                Get directions & details
              </Button>
              <Button href="/contact" variant="outline-light" size="lg">
                Send us a message
              </Button>
            </div>
          </AnimatedSection>
        </Container>
      </section>
    </>
  );
}
