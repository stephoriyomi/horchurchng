import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { YoutubeVideoCard } from "@/components/cards/YoutubeVideoCard";
import { YoutubeArchive } from "@/components/sections/YoutubeArchive";
import { getLatestYoutubeVideos } from "@/lib/youtube";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Messages",
  description:
    "Watch sermons and messages from House of Rest International. New messages every Sunday — available to stream any time.",
};

export default async function WatchPage() {
  const videos = await getLatestYoutubeVideos(12);
  const [latest, ...archive] = videos;

  return (
    <>
      <section className="pt-32 pb-16 bg-off-black" aria-labelledby="watch-heading">
        <Container>
          <AnimatedSection className="mb-10">
            <SectionHeading
              id="watch-heading"
              label="Latest Message"
              heading="This Week"
              light
              align="left"
            />
          </AnimatedSection>

          {latest ? (
            <AnimatedSection>
              <YoutubeVideoCard {...latest} featured />
            </AnimatedSection>
          ) : (
            <AnimatedSection>
              <p className="text-warm-gray-400">Messages loading — check back shortly.</p>
            </AnimatedSection>
          )}

          <AnimatedSection className="mt-8">
            <Link
              href="https://www.youtube.com/@horchurchng"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-warm-gray-400 hover:text-white text-sm font-medium transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z" />
              </svg>
              Subscribe on YouTube
            </Link>
          </AnimatedSection>
        </Container>
      </section>

      {archive.length > 0 && <YoutubeArchive videos={archive} />}

      {/* Spotify podcast */}
      <section className="bg-coza-dark py-16 md:py-24" aria-label="Listen on Spotify">
        <Container>
          <AnimatedSection className="mb-10">
            <SectionHeading
              label="Podcast"
              heading="Listen on Spotify"
              light
              align="left"
            />
          </AnimatedSection>
          <AnimatedSection>
            <iframe
              src="https://open.spotify.com/embed/show/6KlsD8A5AjHKgX9EPvZYMp?utm_source=generator"
              width="100%"
              height="352"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="House of Rest International on Spotify"
              className="rounded-2xl"
            />
            <div className="mt-6">
              <a
                href="https://open.spotify.com/show/6KlsD8A5AjHKgX9EPvZYMp"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-coza-fg-light/50 hover:text-white text-sm font-medium transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                </svg>
                Open in Spotify
              </a>
            </div>
          </AnimatedSection>
        </Container>
      </section>
    </>
  );
}
