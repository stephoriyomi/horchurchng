import Image from "next/image";
import type { YoutubeVideo } from "@/lib/youtube";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-NG", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

interface Props extends YoutubeVideo {
  featured?: boolean;
}

export function YoutubeVideoCard({
  title,
  publishedAt,
  thumbnail,
  url,
  embedUrl,
  description,
  featured = false,
}: Props) {
  if (featured) {
    return (
      <div className="bg-warm-gray-900 rounded-2xl overflow-hidden">
        <div className="aspect-video">
          <iframe
            src={embedUrl}
            title={title}
            loading="lazy"
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
        <div className="p-8 md:p-10">
          <p className="text-warm-gray-500 text-sm mb-3">{formatDate(publishedAt)}</p>
          <h3 className="font-display text-display-xs font-bold text-white mb-3 leading-tight">
            {title}
          </h3>
          {description && (
            <p className="text-warm-gray-400 text-sm leading-relaxed line-clamp-3">
              {description}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300"
    >
      <div className="relative aspect-video bg-warm-gray-200 overflow-hidden">
        {thumbnail ? (
          <>
            <Image
              src={thumbnail}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              unoptimized
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-white/0 group-hover:bg-white/90 flex items-center justify-center transition-all duration-300 scale-75 group-hover:scale-100">
                <svg
                  className="w-5 h-5 text-off-black ml-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center group-hover:scale-105 transition-transform">
              <svg
                className="w-5 h-5 text-white ml-0.5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <p className="text-xs text-warm-gray-400 mb-2">{formatDate(publishedAt)}</p>
        <h3 className="font-display font-bold text-lg text-off-black group-hover:text-primary transition-colors line-clamp-2 flex-1">
          {title}
        </h3>
      </div>
    </a>
  );
}
