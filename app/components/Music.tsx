import clsx from "clsx";

import { humanizePeriod } from "@/lib/utils/lastfm";

import NowPlaying from "./NowPlaying";
import Section from "./Section";
import Statistics from "./Statistics";
import TopAlbumsGrid from "./TopAlbumsGrid";
import TopArtistsGrid from "./TopArtistsGrid";

import type { Period } from "@/lib/types/lastfm";

type Category = "statistics" | "artists" | "albums";

export default function Music() {
  const SUBTITLE_STYLE = clsx("mb-2 text-sm text-gray-600 @1.5xl/section:text-base");

  const timeRange = {
    statistics: "7day",
    artists: "1month",
    albums: "3month",
  } satisfies Record<Category, Period>;

  return (
    <Section title="Music" accentColor="secondary">
      <div className="grid grid-cols-1 gap-3.5 @lg/section:grid-cols-2 @lg/section:gap-x-7 @xl/section:gap-x-7.5 @1.5xl/section:gap-x-8 @2xl/section:gap-x-9">
        <div className="grid grid-rows-[auto_1fr] @container/now-playing @lg/section:order-2">
          <h3 className={SUBTITLE_STYLE}>Recently Played</h3>
          <NowPlaying />
        </div>
        <div className="grid grid-rows-[auto_1fr] @lg/section:order-1">
          <h3 className={SUBTITLE_STYLE}>
            Statistics <small className="pl-0.5">{humanizePeriod(timeRange.statistics)}</small>
          </h3>
          <Statistics period={timeRange.statistics} />
        </div>
        <div className="@lg/section:order-3 @lg/section:col-span-full">
          <h3 className={SUBTITLE_STYLE}>
            Top Artists <small className="pl-0.5">{humanizePeriod(timeRange.artists)}</small>
          </h3>
          <TopArtistsGrid period={timeRange.artists} />
        </div>
        <div className="w-full @lg/section:order-5 @lg/section:col-span-full">
          <h3 className={SUBTITLE_STYLE}>
            Top Albums <small className="pl-0.5">{humanizePeriod(timeRange.albums)}</small>
          </h3>
          <TopAlbumsGrid period={timeRange.albums} />
        </div>
      </div>
    </Section>
  );
}
