import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { getEvents, getMdxBody } from "@/lib/content";
import site from "@/config/site.json";

export function generateStaticParams() {
  return getEvents().map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = getEvents().find((e) => e.slug === slug);
  if (!event) return { title: "Event Not Found" };
  return {
    title: event.title,
    description: event.excerpt,
  };
}

function formatEventDate(dateStr: string) {
  const d = new Date(dateStr);
  return {
    full: d.toLocaleDateString("en-NG", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    time: d.toLocaleTimeString("en-NG", { hour: "numeric", minute: "2-digit" }),
    month: d.toLocaleDateString("en-NG", { month: "short" }).toUpperCase(),
    day: d.getDate(),
  };
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const events = getEvents();
  const event = events.find((e) => e.slug === slug);
  if (!event) notFound();

  const body = getMdxBody("events", slug);
  const { content } = body
    ? await compileMDX({ source: body })
    : { content: null };

  const start = formatEventDate(event.startDate);

  const eventJsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    startDate: event.startDate,
    endDate: event.endDate ?? event.startDate,
    description: event.excerpt,
    location: {
      "@type": "Place",
      name: event.location,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Lagos",
        addressCountry: "NG",
      },
    },
    organizer: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
  };

  return (
    <>
      <JsonLd data={eventJsonLd} />

      {/* ── Hero ── */}
      <section className="pt-32 pb-16 bg-off-black" aria-label={event.title}>
        <Container>
          <AnimatedSection>
            <Link
              href="/events"
              className="text-warm-gray-400 hover:text-white text-sm font-medium mb-8 inline-flex items-center gap-1 transition-colors"
            >
              ← All Events
            </Link>

            {/* Large date block */}
            <div className="flex items-start gap-6 mb-6">
              <div className="shrink-0 w-20 h-20 rounded-2xl bg-primary flex flex-col items-center justify-center text-white">
                <span className="text-xs font-bold uppercase leading-none">{start.month}</span>
                <span className="text-3xl font-bold leading-tight">{start.day}</span>
              </div>
              <div>
                <h1 className="font-display text-display-sm md:text-display-md text-white mb-2">
                  {event.title}
                </h1>
                <p className="text-warm-gray-300">
                  {start.full} · {start.time}
                </p>
                <p className="text-warm-gray-400 text-sm mt-1">{event.location}</p>
              </div>
            </div>

            <p className="text-warm-gray-300 text-lg max-w-xl leading-relaxed">
              {event.excerpt}
            </p>
          </AnimatedSection>
        </Container>
      </section>

      {/* ── Details ── */}
      <section className="py-20 bg-off-white">
        <Container>
          <div className="grid lg:grid-cols-[1fr,300px] gap-12">
            <div>
              {content ? (
                <div className="prose max-w-none text-warm-gray-700">{content}</div>
              ) : (
                <p className="text-warm-gray-500">Event details coming soon.</p>
              )}
            </div>

            <aside>
              <div className="bg-warm-gray-100 rounded-xl p-6 sticky top-24">
                <h2 className="font-semibold text-off-black mb-4">Event Details</h2>
                <dl className="space-y-4 text-sm mb-6">
                  <div>
                    <dt className="text-xs uppercase tracking-label text-warm-gray-400 mb-0.5">Date</dt>
                    <dd className="font-medium text-off-black">{start.full}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-label text-warm-gray-400 mb-0.5">Time</dt>
                    <dd className="font-medium text-off-black">{start.time}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-label text-warm-gray-400 mb-0.5">Location</dt>
                    <dd className="font-medium text-off-black">{event.location}</dd>
                  </div>
                </dl>

                {event.registerUrl ? (
                  <Button
                    href={event.registerUrl}
                    variant="primary"
                    size="md"
                    className="w-full justify-center"
                  >
                    Register Now
                  </Button>
                ) : (
                  <Button
                    href="/contact"
                    variant="outline"
                    size="md"
                    className="w-full justify-center"
                  >
                    Get More Info
                  </Button>
                )}
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
