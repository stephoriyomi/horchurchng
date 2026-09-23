import Link from "next/link";
import type { ChurchEvent } from "@/lib/content";

function formatEventDate(dateStr: string) {
  const d = new Date(dateStr);
  return {
    month: d.toLocaleDateString("en-NG", { month: "short" }).toUpperCase(),
    day: d.getDate(),
    full: d.toLocaleDateString("en-NG", {
      weekday: "long",
      month: "long",
      day: "numeric",
    }),
    time: d.toLocaleTimeString("en-NG", { hour: "numeric", minute: "2-digit" }),
  };
}

export function EventCard({ slug, title, startDate, location, excerpt }: ChurchEvent) {
  const date = formatEventDate(startDate);

  return (
    <article className="group flex gap-5 bg-white rounded-xl p-5 shadow-card hover:shadow-card-hover transition-shadow duration-300">
      {/* Date block */}
      <div
        className="shrink-0 w-14 h-14 rounded-xl bg-primary flex flex-col items-center justify-center text-white"
        aria-hidden
      >
        <span className="text-[10px] font-bold uppercase leading-none">{date.month}</span>
        <span className="text-xl font-bold leading-tight">{date.day}</span>
      </div>

      {/* Content */}
      <div className="min-w-0 flex flex-col">
        <h3 className="font-semibold text-off-black mb-1 group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="text-sm text-warm-gray-500 mb-1">
          {date.full} · {date.time}
        </p>
        <p className="text-sm text-warm-gray-500 mb-2 truncate">{location}</p>
        {excerpt && (
          <p className="text-sm text-warm-gray-600 line-clamp-2 mb-3">{excerpt}</p>
        )}
        <Link
          href={`/events/${slug}`}
          className="text-sm font-semibold text-primary hover:text-primary-dark transition-colors self-start"
        >
          Learn More →
        </Link>
      </div>
    </article>
  );
}
