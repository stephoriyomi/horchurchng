import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import services from "@/config/services.json";

export function PlanYourVisit() {
  const service = services[0];

  return (
    <section className="py-24 bg-warm-gray-100" aria-labelledby="visit-heading">
      <Container>
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text column */}
          <AnimatedSection>
            <SectionHeading
              id="visit-heading"
              label="Plan a Visit"
              heading="We'd love to see you Sunday."
              subheading="No need to dress up, bring a Bible, or know anyone. Just come."
              align="left"
              className="mb-8"
            />

            <ul className="space-y-4 mb-8" aria-label="What to expect">
              {[
                { label: "Service Time", value: `${service?.day}s at ${service?.time}` },
                { label: "Location",     value: `${service?.address.city}, ${service?.address.country}` },
                { label: "Kids",         value: "HORI Kids runs during every service" },
                { label: "Duration",     value: "About 90 minutes" },
              ].map(({ label, value }) => (
                <li key={label} className="flex items-start gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" aria-hidden />
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-label text-warm-gray-500 block mb-0.5">
                      {label}
                    </span>
                    <span className="text-off-black font-medium">{value}</span>
                  </div>
                </li>
              ))}
            </ul>

            <Button href="/visit" variant="primary" size="md">
              Full Visitor Guide →
            </Button>
          </AnimatedSection>

          {/* Map / visual column */}
          <AnimatedSection>
            <div className="rounded-2xl overflow-hidden shadow-elevated aspect-[4/3] bg-warm-gray-200 relative">
              {/* Map placeholder — swap for an actual embed in production */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-warm-gray-400">
                <svg
                  className="w-10 h-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
                <p className="text-sm font-medium">{service?.address.city}, {service?.address.country}</p>
                <a
                  href={service?.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-primary hover:text-primary-dark transition-colors"
                >
                  Open in Maps →
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </Container>
    </section>
  );
}
