import type { Metadata } from "next";
import { SplashIntro } from "@/components/intro/SplashIntro";
import { HeroVerseScale } from "@/components/sections/HeroVerseScale";
import { MissionTwoColumn } from "@/components/sections/MissionTwoColumn";
import { DiagonalBand } from "@/components/sections/DiagonalBand";
import { PastorFeature } from "@/components/sections/PastorFeature";
import { LocationsIndigo } from "@/components/sections/LocationsIndigo";
import { MinistriesScroller } from "@/components/sections/MinistriesScroller";
import { StatsRotator } from "@/components/sections/StatsRotator";
import homepage from "@/config/homepage.json";
import { getLatestYoutubeVideos } from "@/lib/youtube";

export const metadata: Metadata = {
  title: "House of Rest International — A Church for Everyone in Lagos",
  description:
    "House of Rest International is a welcoming church in Lagos, Nigeria — for anyone who has never tried church or been hurt by one. Join us every Sunday.",
  openGraph: {
    title: "House of Rest International",
    description:
      "A church for non-church people and disgruntled church goers. Come exactly as you are.",
  },
};

export default async function HomePage() {
  const videos = await getLatestYoutubeVideos(1);
  const heroVideoId = videos[0]?.videoId ?? null;

  return (
    <>
      {/* Cinematic intro — client-only, skips on reduced motion + repeat visits */}
      <SplashIntro />

      {/* 1. Hero — cream background, watermark, scroll-driven video scale */}
      <HeroVerseScale videoId={heroVideoId} />

      {/* 2. Mission statement — dark, two-column editorial */}
      <MissionTwoColumn />

      {/* 3. Diagonal band — identity words as clip-path divider */}
      <DiagonalBand
        leftLabel={homepage.identity.left}
        rightLabel={homepage.identity.right}
      />

      {/* 4. Pastor feature — full-bleed photo, content anchored bottom-left */}
      <PastorFeature />

      {/* 5. Locations — indigo block, city list with word-reveal */}
      <LocationsIndigo />

      {/* 6. Ministries — horizontal snap-scroll carousel */}
      <MinistriesScroller />

      {/* 7. Stats rotator — cream, three-column AnimatePresence carousel */}
      <StatsRotator />
    </>
  );
}
