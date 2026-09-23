import Link from "next/link";

interface Ministry {
  id: string;
  name: string;
  slug: string;
  summary: string;
  schedule: string;
  accentColor: string;
}

const colorMap: Record<string, string> = {
  primary:       "bg-primary",
  "primary-light": "bg-primary-light",
  "accent-gold": "bg-accent-gold",
  "accent-amber": "bg-accent-amber",
  "accent-teal": "bg-accent-teal",
  "accent-green": "bg-accent-green",
};

export function MinistryCard({ name, slug, summary, schedule, accentColor }: Ministry) {
  const accentCls = colorMap[accentColor] ?? "bg-primary";

  return (
    <Link
      href={`/ministries/${slug}`}
      className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5"
    >
      {/* Color bar */}
      <div className={`${accentCls} h-1.5 w-full`} aria-hidden />

      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-display font-bold text-xl text-off-black mb-2 group-hover:text-primary transition-colors">
          {name}
        </h3>
        <p className="text-warm-gray-600 text-sm leading-relaxed mb-4 flex-1">
          {summary}
        </p>
        <div className="flex items-center justify-between">
          <p className="text-xs text-warm-gray-400 font-medium">{schedule}</p>
          <span
            className="text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            aria-hidden
          >
            Learn more →
          </span>
        </div>
      </div>
    </Link>
  );
}
