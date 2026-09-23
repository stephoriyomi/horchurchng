import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EventCard } from "@/components/cards/EventCard";
import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";
import { getEvents, getUpcomingEvents } from "@/lib/content";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Upcoming and past events at House of Rest International in Lagos. Community nights, intensives, special services, and more.",
};

export default function EventsPage() {
  const upcoming = getUpcomingEvents(10);
  const all = getEvents();
  const past = all.filter(
    (e) => new Date(e.startDate).getTime() < Date.now(),
  );

  return (
    <>
      {/* ── Hero ── */}
      <section className="pt-32 pb-20 bg-off-black" aria-label="Events">
        <Container>
          <AnimatedSection>
            <p className="text-accent-gold text-xs font-semibold uppercase tracking-label mb-5">
              What&apos;s On
            </p>
            <h1 className="font-display text-display-lg md:text-display-xl text-white mb-6 max-w-2xl">
              Events worth showing up for.
            </h1>
            <p className="text-warm-gray-300 text-xl max-w-xl leading-relaxed">
              Community nights, intensives, special services, and more.
            </p>
          </AnimatedSection>
        </Container>
      </section>

      {/* ── Upcoming ── */}
      <section className="py-20 bg-off-white" aria-labelledby="upcoming-heading">
        <Container>
          <AnimatedSection className="mb-10">
            <SectionHeading
              id="upcoming-heading"
              label="Coming Up"
              heading="Upcoming Events"
              align="left"
            />
          </AnimatedSection>

          {upcoming.length === 0 ? (
            <AnimatedSection>
              <p className="text-warm-gray-500 py-8">
                No upcoming events right now. Check back soon.
              </p>
            </AnimatedSection>
          ) : (
            <AnimatedSection stagger className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {upcoming.map((event) => (
                <AnimatedItem key={event.slug}>
                  <EventCard {...event} />
                </AnimatedItem>
              ))}
            </AnimatedSection>
          )}
        </Container>
      </section>

      {/* ── Past ── */}
      {past.length > 0 && (
        <section className="py-16 bg-warm-gray-100" aria-labelledby="past-heading">
          <Container>
            <AnimatedSection className="mb-8">
              <h2 id="past-heading" className="font-display font-bold text-2xl text-warm-gray-400">
                Past Events
              </h2>
            </AnimatedSection>
            <AnimatedSection stagger className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {past.map((event) => (
                <AnimatedItem key={event.slug}>
                  <div className="opacity-60">
                    <EventCard {...event} />
                  </div>
                </AnimatedItem>
              ))}
            </AnimatedSection>
          </Container>
        </section>
      )}
    </>
  );
}
