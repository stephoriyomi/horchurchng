interface Props {
  url: string;
  title: string;
  className?: string;
}

function toEmbedUrl(url: string): string {
  const ytWatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  if (ytWatch) return `https://www.youtube.com/embed/${ytWatch[1]}`;
  if (url.includes("youtube.com/embed/")) return url;

  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;

  return url;
}

export function VideoEmbed({ url, title, className = "" }: Props) {
  const isPlaceholder = !url || url.includes("placeholder");

  return (
    <div className={`aspect-video bg-warm-gray-900 rounded-xl overflow-hidden ${className}`}>
      {isPlaceholder ? (
        <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-warm-gray-500">
          <div className="w-16 h-16 rounded-full bg-warm-gray-800 flex items-center justify-center">
            <svg className="w-7 h-7 ml-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <p className="text-sm">Video coming soon</p>
        </div>
      ) : (
        <iframe
          src={toEmbedUrl(url)}
          title={title}
          loading="lazy"
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      )}
    </div>
  );
}
