export interface YoutubeVideo {
  videoId: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnail: string;
  url: string;
  embedUrl: string;
}

const CHANNEL_ID = "UCU0GWC8R4S0boQy7sE3rucQ";

export async function getLatestYoutubeVideos(limit = 12): Promise<YoutubeVideo[]> {
  try {
    const res = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return [];
    const xml = await res.text();
    return parseRSSFeed(xml).slice(0, limit);
  } catch {
    return [];
  }
}

function parseRSSFeed(xml: string): YoutubeVideo[] {
  const entries = xml.split("<entry>").slice(1);
  return entries
    .map((entry) => {
      const videoId = extract(entry, /<yt:videoId>([^<]+)<\/yt:videoId>/);
      const title = decode(extract(entry, /<title>([^<]+)<\/title>/));
      const publishedAt = extract(entry, /<published>([^<]+)<\/published>/);
      const thumbnail = extract(entry, /media:thumbnail url="([^"]+)"/);
      const description = decode(
        extract(entry, /<media:description>([\s\S]*?)<\/media:description>/),
      );
      if (!videoId) return null;
      return {
        videoId,
        title,
        description,
        publishedAt,
        thumbnail,
        url: `https://www.youtube.com/watch?v=${videoId}`,
        embedUrl: `https://www.youtube.com/embed/${videoId}`,
      };
    })
    .filter((v): v is YoutubeVideo => v !== null);
}

function extract(str: string, re: RegExp): string {
  return (str.match(re) || [])[1] ?? "";
}

function decode(str: string): string {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}
