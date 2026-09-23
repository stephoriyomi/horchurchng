"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { YoutubeVideoCard } from "@/components/cards/YoutubeVideoCard";
import type { YoutubeVideo } from "@/lib/youtube";

export function YoutubeArchive({ videos }: { videos: YoutubeVideo[] }) {
  const [query, setQuery] = useState("");

  const results = query.trim()
    ? videos.filter((v) => v.title.toLowerCase().includes(query.toLowerCase()))
    : videos;

  return (
    <section className="py-16 bg-off-white" aria-labelledby="archive-heading">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h2 id="archive-heading" className="font-display font-bold text-2xl text-off-black">
            All Messages
          </h2>
          <div>
            <label htmlFor="video-search" className="sr-only">
              Search messages
            </label>
            <input
              id="video-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search messages…"
              className="w-full sm:w-80 px-4 py-2.5 rounded-xl border border-warm-gray-200 bg-white text-off-black text-sm placeholder:text-warm-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
            />
          </div>
        </div>

        {results.length === 0 ? (
          <p className="text-warm-gray-500 text-center py-16">
            No messages match &ldquo;{query}&rdquo;. Try a different search.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {results.map((v) => (
              <YoutubeVideoCard key={v.videoId} {...v} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
