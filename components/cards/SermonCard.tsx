import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import type { Sermon } from "@/lib/content";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-NG", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

interface Props extends Sermon {
  featured?: boolean;
}

export function SermonCard({
  slug,
  title,
  speaker,
  date,
  scripture,
  duration,
  excerpt,
  featured = false,
}: Props) {
  if (featured) {
    return (
      <Link
        href={`/sermons/${slug}`}
        className="group grid md:grid-cols-[1.3fr,1fr] gap-0 bg-off-black rounded-2xl overflow-hidden hover:shadow-elevated transition-shadow duration-300"
      >
        {/* Thumbnail */}
        <div className="relative aspect-video md:aspect-auto bg-warm-gray-900 flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background:
                "radial-gradient(ellipse at 40% 60%, var(--color-primary) 0%, transparent 70%)",
            }}
            aria-hidden
          />
          <div className="relative z-10 w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-elevated">
            <svg
              className="w-8 h-8 text-white ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 md:p-10 flex flex-col justify-center">
          <Badge variant="primary" className="mb-5 self-start">
            Latest Message
          </Badge>
          <h3 className="font-display text-display-xs font-bold text-white mb-2 group-hover:text-primary transition-colors duration-200">
            {title}
          </h3>
          <p className="text-warm-gray-300 font-medium mb-1">{speaker}</p>
          <p className="text-sm text-warm-gray-500 mb-1">{scripture}</p>
          <p className="text-sm text-warm-gray-500 mb-5">
            {formatDate(date)}
            {duration && ` · ${duration}`}
          </p>
          {excerpt && (
            <p className="text-warm-gray-400 text-sm leading-relaxed line-clamp-3 mb-6">
              {excerpt}
            </p>
          )}
          <span className="text-primary font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
            Watch Now <span aria-hidden>→</span>
          </span>
        </div>
      </Link>
    );
  }

  return (
    <article className="group bg-white rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300 flex flex-col">
      <div className="relative aspect-video bg-warm-gray-200 flex items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center group-hover:scale-105 transition-transform">
          <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <p className="text-xs text-warm-gray-400 mb-2">{scripture}</p>
        <h3 className="font-display font-bold text-lg text-off-black mb-2 group-hover:text-primary transition-colors line-clamp-2 flex-1">
          {title}
        </h3>
        <p className="text-sm text-warm-gray-500">
          {speaker} · {formatDate(date)}
        </p>
      </div>
    </article>
  );
}
