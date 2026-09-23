import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { EventCard } from "@/components/cards/EventCard";
import { AnimatedSection, AnimatedItem } from "@/components/ui/AnimatedSection";
import type { ChurchEvent } from "@/lib/content";

export function UpcomingEvents({ events }: { events: ChurchEvent[] }) {
  return (
    <section className="py-24 bg-warm-gray-100" aria-labelledby="events-heading">
      <Container>
        <AnimatedSection className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <SectionHeading
            id="events-heading"
            label="What's coming"
            heading="Upcoming Events"
            align="left"
          />
          <Button href="/events" variant="outline" size="sm" className="shrink-0">
            All Events →
          </Button>
        </AnimatedSection>

        <AnimatedSection stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {events.map((event) => (
            <AnimatedItem key={event.slug}>
              <EventCard {...event} />
            </AnimatedItem>
          ))}
        </AnimatedSection>
      </Container>
    </section>
  );
}
