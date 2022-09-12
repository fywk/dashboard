import useSWR from "swr";

import fetcher from "../../lib/fetcher";
import { RecentTrack } from "../../lib/types/lastfm";
import Widget from "../Widget";
import AlbumGrid from "./music/AlbumGrid";
import ArtistsGrid from "./music/ArtistsGrid";
import NowPlaying from "./music/NowPlaying";
import Statistics from "./music/Statistics";

const Music = () => {
  const recentTrack = useSWR<RecentTrack>("api/music/recent-track", fetcher, {
    refreshInterval: 30_000, // 30 seconds in milliseconds
  });

  return (
    <Widget title="Music" accentColor="secondary">
      <section className="grid grid-cols-1 gap-6 md:grid-cols-10 md:gap-x-9">
        <div
          className="grid grid-rows-[auto_1fr] md:order-2 md:col-span-5"
          id="recent-track"
        >
          <h3 className="mb-2 font-medium text-gray-500">Recent Track</h3>
          <NowPlaying track={recentTrack.data?.track} />
        </div>
        <div
          className="grid grid-rows-[auto_1fr] md:order-1 md:col-span-5"
          id="music-stats-past-week"
        >
          <h3 className="mb-2 font-medium text-gray-500">
            Statistics <small className="pl-0.5">Last 7 days</small>
          </h3>
          <Statistics totalPlays={String(recentTrack.data?.total)} />
        </div>
        <div className="md:order-3 md:col-span-full">
          <h3 className="mb-2 font-medium text-gray-500">
            Top Artists <small className="pl-0.5">Last 30 days</small>
          </h3>
          <ArtistsGrid />
        </div>
        <div className="w-full md:order-5 md:col-span-full">
          <h3 className="mb-2 font-medium text-gray-500">
            Top Albums <small className="pl-0.5">Last 90 days</small>
          </h3>
          <AlbumGrid />
        </div>
      </section>
    </Widget>
  );
};

export default Music;
