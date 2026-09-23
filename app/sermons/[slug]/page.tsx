import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { VideoEmbed } from "@/components/media/VideoEmbed";
import { SermonCard } from "@/components/cards/SermonCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { getSermons, getMdxBody } from "@/lib/content";
import site from "@/config/site.json";

export function generateStaticParams() {
  return getSermons().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const sermon = getSermons().find((s) => s.slug === slug);
  if (!sermon) return { title: "Message Not Found" };

  return {
    title: sermon.title,
    description: sermon.excerpt,
    openGraph: {
      title: sermon.title,
      description: sermon.excerpt,
      type: "video.other",
    },
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-NG", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function SermonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sermons = getSermons();
  const sermon = sermons.find((s) => s.slug === slug);
  if (!sermon) notFound();

  const body = getMdxBody("sermons", slug);
  const { content: notes } = body
    ? await compileMDX({ source: body })
    : { content: null };

  const related = sermons.filter((s) => s.slug !== slug).slice(0, 3);

  const videoJsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: sermon.title,
    description: sermon.excerpt ?? "",
    uploadDate: new Date(sermon.date).toISOString(),
    embedUrl: sermon.videoUrl,
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
  };

  return (
    <>
      <JsonLd data={videoJsonLd} />

      {/* ── Video ── */}
      <section className="pt-20 bg-off-black" aria-label={sermon.title}>
        <VideoEmbed url={sermon.videoUrl} title={sermon.title} />
      </section>

      {/* ── Details ── */}
      <section className="py-16 bg-off-white">
        <Container>
          <div className="grid lg:grid-cols-[1fr,340px] gap-12">
            {/* Main */}
            <div>
              {sermon.tags && sermon.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {sermon.tags.map((tag) => (
                    <Badge key={tag} variant="neutral">{tag}</Badge>
                  ))}
                </div>
              )}

              <h1 className="font-display text-display-xs md:text-display-sm font-bold text-off-black mb-3">
                {sermon.title}
              </h1>

              <p className="text-warm-gray-500 mb-1">{sermon.speaker}</p>
              <p className="text-sm text-warm-gray-400 mb-1">
                {formatDate(sermon.date)}
                {sermon.duration && ` · ${sermon.duration}`}
              </p>
              <p className="text-sm text-accent-teal font-medium mb-8">{sermon.scripture}</p>

              {notes && (
                <div className="prose max-w-none text-warm-gray-700">
                  {notes}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside aria-label="Sermon details">
              <div className="bg-warm-gray-100 rounded-xl p-6 mb-6">
                <h2 className="font-semibold text-off-black mb-4">Details</h2>
                <dl className="space-y-3 text-sm">
                  <div>
                    <dt className="text-xs uppercase tracking-label text-warm-gray-400 mb-0.5">Speaker</dt>
                    <dd className="font-medium text-off-black">{sermon.speaker}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-label text-warm-gray-400 mb-0.5">Date</dt>
                    <dd className="font-medium text-off-black">{formatDate(sermon.date)}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-label text-warm-gray-400 mb-0.5">Scripture</dt>
                    <dd className="font-medium text-off-black">{sermon.scripture}</dd>
                  </div>
                  {sermon.duration && (
                    <div>
                      <dt className="text-xs uppercase tracking-label text-warm-gray-400 mb-0.5">Length</dt>
                      <dd className="font-medium text-off-black">{sermon.duration}</dd>
                    </div>
                  )}
                </dl>
              </div>

              <div className="bg-warm-gray-100 rounded-xl p-6">
                <p className="font-semibold text-off-black mb-3">Next steps</p>
                <div className="space-y-3">
                  <Button href="/visit" variant="primary" size="sm" className="w-full justify-center">
                    Plan Your Visit
                  </Button>
                  <Button href="/prayer-request" variant="outline" size="sm" className="w-full justify-center">
                    Send a Prayer Request
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* ── Related ── */}
      {related.length > 0 && (
        <section className="py-16 bg-warm-gray-100" aria-labelledby="related-heading">
          <Container>
            <h2 id="related-heading" className="font-display font-bold text-2xl text-off-black mb-8">
              More Messages
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((s) => (
                <SermonCard key={s.slug} {...s} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
