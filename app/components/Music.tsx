import clsx from "clsx";

import { humanizePeriod } from "@/lib/utils/lastfm";

import NowPlaying from "./NowPlaying";
import Section from "./Section";
import Statistics from "./Statistics";
import TopAlbumsGrid from "./TopAlbumsGrid";
import TopArtistsGrid from "./TopArtistsGrid";

import type { Period } from "@/lib/types/lastfm";

type Category = "statistics" | "topArtists" | "topAlbums";

export default function Music() {
  const subtitleStyle = clsx("mb-2 text-sm text-gray-600 @1.5xl/section:text-base");

  const period = {
    statistics: "7day",
    topArtists: "1month",
    topAlbums: "3month",
  } satisfies Record<Category, Period>;

  return (
    <Section title="Music" accentColor="secondary">
      <div className="grid grid-cols-1 gap-3.5 @lg/section:grid-cols-2 @lg/section:gap-x-7 @xl/section:gap-x-7.5 @1.5xl/section:gap-x-8 @2xl/section:gap-x-9">
        <section className="grid grid-rows-[auto_1fr] @container/now-playing @lg/section:order-2">
          <h3 className={subtitleStyle}>Recently Played</h3>
          <NowPlaying />
        </section>
        <section className="grid grid-rows-[auto_1fr] @lg/section:order-1">
          <h3 className={subtitleStyle}>
            Statistics <small className="pl-0.5">{humanizePeriod(period.statistics)}</small>
          </h3>
          <Statistics period={period.statistics} />
        </section>
        <section className="@lg/section:order-3 @lg/section:col-span-full">
          <h3 className={subtitleStyle}>
            Top Artists <small className="pl-0.5">{humanizePeriod(period.topArtists)}</small>
          </h3>
          <TopArtistsGrid period={period.topArtists} />
        </section>
        <section className="w-full @lg/section:order-5 @lg/section:col-span-full">
          <h3 className={subtitleStyle}>
            Top Albums <small className="pl-0.5">{humanizePeriod(period.topAlbums)}</small>
          </h3>
          <TopAlbumsGrid period={period.topAlbums} />
        </section>
      </div>
    </Section>
  );
}
