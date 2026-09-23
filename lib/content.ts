import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentRoot = path.join(process.cwd(), "content");

function readDir(dir: string): string[] {
  const full = path.join(contentRoot, dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith(".mdx"))
    .sort();
}

function parseMdx<T>(filePath: string): { slug: string; data: T } {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data } = matter(raw);
  const slug = path.basename(filePath, ".mdx");
  return { slug, data: data as T };
}

/* ── Sermons ──────────────────────────────────────────────────────────── */

export interface Sermon {
  slug: string;
  title: string;
  speaker: string;
  date: string;
  scripture: string;
  videoUrl: string;
  duration: string;
  excerpt: string;
  coverImage?: string;
  tags?: string[];
}

export function getSermons(): Sermon[] {
  return readDir("sermons")
    .map((f) => {
      const { slug, data } = parseMdx<Omit<Sermon, "slug">>(
        path.join(contentRoot, "sermons", f),
      );
      return { slug, ...data };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getLatestSermon(): Sermon | null {
  return getSermons()[0] ?? null;
}

export function getSermonBySlug(slug: string): Sermon | null {
  return getSermons().find((s) => s.slug === slug) ?? null;
}

/* ── Events ───────────────────────────────────────────────────────────── */

export interface ChurchEvent {
  slug: string;
  title: string;
  startDate: string;
  endDate?: string;
  location: string;
  registerUrl?: string;
  excerpt: string;
  coverImage?: string;
  tags?: string[];
}

export function getEvents(): ChurchEvent[] {
  return readDir("events")
    .map((f) => {
      const { slug, data } = parseMdx<Omit<ChurchEvent, "slug">>(
        path.join(contentRoot, "events", f),
      );
      return { slug, ...data };
    })
    .sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
    );
}

export function getUpcomingEvents(limit = 3): ChurchEvent[] {
  const now = Date.now();
  return getEvents()
    .filter((e) => new Date(e.startDate).getTime() >= now)
    .slice(0, limit);
}

/* ── Blog ─────────────────────────────────────────────────────────────── */

export interface BlogPost {
  slug: string;
  title: string;
  author: string;
  date: string;
  excerpt: string;
  coverImage?: string;
  tags?: string[];
}

export function getBlogPosts(): BlogPost[] {
  return readDir("blog")
    .map((f) => {
      const { slug, data } = parseMdx<Omit<BlogPost, "slug">>(
        path.join(contentRoot, "blog", f),
      );
      return { slug, ...data };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getLatestBlogPosts(limit = 3): BlogPost[] {
  return getBlogPosts().slice(0, limit);
}

/* ── MDX body ─────────────────────────────────────────────────────────── */

/** Returns the raw MDX body (after the frontmatter) for a given content file. */
export function getMdxBody(dir: string, slug: string): string | null {
  const filePath = path.join(contentRoot, dir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { content } = matter(raw);
  return content.trim() || null;
}
