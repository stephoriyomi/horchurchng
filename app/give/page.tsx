import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import site from "@/config/site.json";

export const metadata: Metadata = {
  title: "Give",
  description:
    "Support the mission of House of Rest International. Every gift helps us reach more people and serve our community in Lagos.",
};

const givingMethods = [
  {
    id: "online",
    title: "Give online",
    description:
      "Fast, secure, and available 24/7. Use your card or bank transfer through our giving portal.",
    cta: "Give now",
    href: "https://paystack.com", // TODO: replace with live Paystack/Flutterwave link
    isExternal: true,
    isPrimary: true,
  },
  {
    id: "bank",
    title: "Bank transfer",
    description:
      "Transfer directly to our account. Please use your name as the reference.",
    cta: null,
    details: [
      { label: "Bank", value: "FCMB" },
      { label: "Account name", value: "House of Rest International Christian Centre" },
      { label: "Account number", value: "8530522017" },
    ],
  },
  {
    id: "in-person",
    title: "In person",
    description: "Offerings and tithes are received during every Sunday service.",
    cta: "Plan a visit",
    href: "/visit",
    isExternal: false,
  },
];

const faq = [
  {
    q: "Is my gift tax-deductible?",
    a: "House of Rest International is a registered religious organisation in Nigeria. Please speak with a tax professional in your jurisdiction to understand your specific deductibility rights.",
  },
  {
    q: "Can I give on behalf of someone else?",
    a: "Yes. Just add a note in the reference field when giving online or via bank transfer.",
  },
  {
    q: "Is online giving secure?",
    a: "Yes. Our giving portal uses industry-standard TLS encryption and we never store your card details.",
  },
  {
    q: "How is the money used?",
    a: "Tithes and offerings support our pastoral staff, facility costs, community outreach, and mission partnerships. A financial summary is shared annually with the congregation.",
  },
];

const giveJsonLd = {
  "@context": "https://schema.org",
  "@type": "DonateAction",
  recipient: {
    "@type": "Church",
    name: site.name,
    url: site.url,
  },
};

export default function GivePage() {
  return (
    <>
      <JsonLd data={giveJsonLd} />

      {/* ── Hero ── */}
      <section className="pt-32 pb-20 bg-accent-gold" aria-label="Give">
        <Container>
          <AnimatedSection>
            <p className="text-off-black/60 text-xs font-semibold uppercase tracking-label mb-5">
              Generosity
            </p>
            <h1 className="font-display text-display-lg md:text-display-xl text-off-black mb-6 max-w-2xl">
              Your generosity makes a difference.
            </h1>
            <p className="text-off-black/70 text-xl max-w-xl leading-relaxed">
              Everything we do — services, community nights, outreach — runs on the generosity of people like you.
            </p>
          </AnimatedSection>
        </Container>
      </section>

      {/* ── Giving methods ── */}
      <section className="py-20 bg-off-white" aria-labelledby="giving-methods-heading">
        <Container>
          <AnimatedSection className="mb-10">
            <h2
              id="giving-methods-heading"
              className="font-display font-bold text-display-xs text-off-black"
            >
              Ways to give
            </h2>
          </AnimatedSection>

          <AnimatedSection stagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {givingMethods.map((method) => (
              <AnimatedItem key={method.id}>
                <div
                  className={`rounded-2xl p-7 h-full flex flex-col ${
                    method.isPrimary
                      ? "bg-primary text-white"
                      : "bg-warm-gray-100 text-off-black"
                  }`}
                >
                  <h3
                    className={`font-semibold text-lg mb-3 ${
                      method.isPrimary ? "text-white" : "text-off-black"
                    }`}
                  >
                    {method.title}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed mb-5 flex-1 ${
                      method.isPrimary ? "text-white/80" : "text-warm-gray-600"
                    }`}
                  >
                    {method.description}
                  </p>

                  {"details" in method && method.details && (
                    <dl className="space-y-1.5 text-sm mb-5">
                      {method.details.map((d) => (
                        <div key={d.label} className="flex justify-between gap-4">
                          <dt className="text-warm-gray-400">{d.label}</dt>
                          <dd className="font-medium text-off-black text-right">{d.value}</dd>
                        </div>
                      ))}
                    </dl>
                  )}

                  {method.cta && method.href && (
                    method.isExternal ? (
                      <a
                        href={method.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors ${
                          method.isPrimary
                            ? "bg-white text-primary hover:bg-off-white"
                            : "bg-primary text-white hover:bg-primary-dark"
                        }`}
                      >
                        {method.cta}
                      </a>
                    ) : (
                      <Link
                        href={method.href}
                        className="inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold bg-primary text-white hover:bg-primary-dark transition-colors"
                      >
                        {method.cta}
                      </Link>
                    )
                  )}
                </div>
              </AnimatedItem>
            ))}
          </AnimatedSection>
        </Container>
      </section>

      {/* ── Security note ── */}
      <section className="py-12 bg-warm-gray-100" aria-label="Security">
        <Container className="max-w-2xl text-center">
          <AnimatedSection>
            <p className="text-sm text-warm-gray-500 leading-relaxed">
              <span className="font-medium text-warm-gray-700">Secure giving.</span>{" "}
              All online transactions are processed through a PCI-DSS compliant payment gateway. We never store your card details. Look for the padlock in your browser&apos;s address bar.
            </p>
          </AnimatedSection>
        </Container>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 bg-off-white" aria-labelledby="give-faq-heading">
        <Container className="max-w-2xl">
          <AnimatedSection className="mb-10">
            <h2
              id="give-faq-heading"
              className="font-display font-bold text-display-xs text-off-black"
            >
              Common questions
            </h2>
          </AnimatedSection>

          <AnimatedSection stagger className="space-y-6">
            {faq.map((item) => (
              <AnimatedItem key={item.q}>
                <div className="border-b border-warm-gray-200 pb-6">
                  <h3 className="font-semibold text-off-black mb-2">{item.q}</h3>
                  <p className="text-warm-gray-600 text-sm leading-relaxed">{item.a}</p>
                </div>
              </AnimatedItem>
            ))}
          </AnimatedSection>

          <AnimatedSection className="mt-12 text-center">
            <p className="text-warm-gray-500 text-sm mb-4">
              Still have questions about giving?
            </p>
            <Button href="/contact" variant="outline" size="md">
              Get in touch
            </Button>
          </AnimatedSection>
        </Container>
      </section>
    </>
  );
}
