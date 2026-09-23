import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ContactForm } from "@/components/forms/ContactForm";
import { JsonLd } from "@/components/seo/JsonLd";
import site from "@/config/site.json";
import services from "@/config/services.json";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with House of Rest International. We'd love to hear from you — whether you have a question, want to plan a visit, or just want to say hello.",
};

const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "Church",
  name: site.name,
  url: site.url,
  telephone: site.contact.phone,
  email: site.contact.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.contact.address,
    addressLocality: "Lagos",
    addressCountry: "NG",
  },
};

export default function ContactPage() {
  const service = services[0];

  return (
    <>
      <JsonLd data={contactJsonLd} />

      {/* ── Hero ── */}
      <section className="pt-32 pb-20 bg-off-black" aria-label="Contact">
        <Container>
          <AnimatedSection>
            <p className="text-accent-gold text-xs font-semibold uppercase tracking-label mb-5">
              Get in Touch
            </p>
            <h1 className="font-display text-display-lg md:text-display-xl text-white mb-6 max-w-2xl">
              We&apos;d love to hear from you.
            </h1>
            <p className="text-warm-gray-300 text-xl max-w-xl leading-relaxed">
              Questions, prayer, or just a hello — we&apos;re here.
            </p>
          </AnimatedSection>
        </Container>
      </section>

      {/* ── Form + Info ── */}
      <section className="py-20 bg-off-white" aria-labelledby="contact-form-heading">
        <Container>
          <div className="grid lg:grid-cols-[1fr,380px] gap-16">
            {/* Form */}
            <div>
              <h2
                id="contact-form-heading"
                className="font-display font-bold text-display-xs text-off-black mb-8"
              >
                Send us a message
              </h2>
              <ContactForm />
            </div>

            {/* Side info */}
            <aside className="space-y-8">
              <div>
                <h3 className="font-semibold text-off-black mb-3">Visit us</h3>
                <address className="not-italic text-warm-gray-600 text-sm leading-relaxed">
                  {site.contact.address}
                  <br />
                  Lagos, Nigeria
                </address>
                {service?.directionsUrl && (
                  <a
                    href={service.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary-dark text-sm font-medium mt-2 inline-block transition-colors"
                  >
                    Get directions →
                  </a>
                )}
              </div>

              <div>
                <h3 className="font-semibold text-off-black mb-3">Service times</h3>
                <p className="text-warm-gray-600 text-sm">Sunday · 9:00 AM</p>
              </div>

              <div>
                <h3 className="font-semibold text-off-black mb-3">Email & phone</h3>
                <ul className="space-y-1 text-sm">
                  <li>
                    <a
                      href={`mailto:${site.contact.email}`}
                      className="text-primary hover:text-primary-dark transition-colors font-medium"
                    >
                      {site.contact.email}
                    </a>
                  </li>
                  {site.contact.phone && (
                    <li>
                      <a
                        href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
                        className="text-warm-gray-600 hover:text-off-black transition-colors"
                      >
                        {site.contact.phone}
                      </a>
                    </li>
                  )}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-off-black mb-3">Follow us</h3>
                <ul className="space-y-1 text-sm">
                  {site.social.instagram && (
                    <li>
                      <a
                        href={site.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-warm-gray-600 hover:text-off-black transition-colors"
                      >
                        Instagram
                      </a>
                    </li>
                  )}
                  {site.social.youtube && (
                    <li>
                      <a
                        href={site.social.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-warm-gray-600 hover:text-off-black transition-colors"
                      >
                        YouTube
                      </a>
                    </li>
                  )}
                  {site.social.facebook && (
                    <li>
                      <a
                        href={site.social.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-warm-gray-600 hover:text-off-black transition-colors"
                      >
                        Facebook
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
