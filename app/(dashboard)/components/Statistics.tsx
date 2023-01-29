import { Suspense } from "react";

import { RecentTrack, TotalStats } from "@/types/lastfm";
import {
  getRecentTrack,
  getTotalAlbums,
  getTotalArtists,
  getTotalTracks
} from "@/utils/lastfm";
import {
  IconMicrophone2,
  IconMusic,
  IconPlayerPlay,
  IconVinyl
} from "@tabler/icons";

const TotalPlays = async ({ promise }: { promise: Promise<RecentTrack> }) => {
  const plays = await promise;
  return plays.total;
};

const TotalTracks = async ({ promise }: { promise: Promise<TotalStats> }) => {
  const tracks = await promise;
  return tracks.total;
};

const TotalAlbums = async ({ promise }: { promise: Promise<TotalStats> }) => {
  const albums = await promise;
  return albums.total;
};

const TotalArtists = async ({ promise }: { promise: Promise<TotalStats> }) => {
  const artists = await promise;
  return artists.total;
};

const Category = ({
  title,
  icon,
  children,
}: {
  title: "Plays" | "Albums" | "Artists" | "Tracks";
  icon?: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex w-full flex-col items-center justify-center text-[15px] font-medium leading-5 tracking-tight odd:text-secondary even:text-primary md:odd:text-primary md:even:text-secondary">
      {icon}
      <span className="mt-1">{title}</span>
      <span>{children}</span>
    </div>
  );
};

const Statistics = () => {
  const ONE_WEEK_IN_SECONDS = 604_800;
  const unixTimestamp = Math.floor(Date.now() / 1000); // current Unix timestamp (seconds, 10-digit)
  const timestamp7DaysAgo = unixTimestamp - ONE_WEEK_IN_SECONDS;

  const playsData = getRecentTrack(timestamp7DaysAgo);
  const tracksData = getTotalTracks("7day");
  const albumsData = getTotalAlbums("7day");
  const artistsData = getTotalArtists("7day");

  return (
    <div className="flex w-full items-center justify-between py-1">
      <Category
        title="Plays"
        icon={
          <IconPlayerPlay className="h-7.5 w-7.5 sm:h-8 sm:w-8" stroke={1.75} />
        }
      >
        <Suspense fallback="---">
          {/* @ts-expect-error Server Component */}
          <TotalPlays promise={playsData} />
        </Suspense>
      </Category>
      <Category
        title="Tracks"
        icon={<IconMusic className="h-7.5 w-7.5 sm:h-8 sm:w-8" stroke={1.5} />}
      >
        <Suspense fallback="---">
          {/* @ts-expect-error Server Component */}
          <TotalTracks promise={tracksData} />
        </Suspense>
      </Category>
      <Category
        title="Albums"
        icon={<IconVinyl className="h-7.5 w-7.5 sm:h-8 sm:w-8" stroke={1.5} />}
      >
        <Suspense fallback="---">
          {/* @ts-expect-error Server Component */}
          <TotalAlbums promise={albumsData} />
        </Suspense>
      </Category>
      <Category
        title="Artists"
        icon={
          <IconMicrophone2 className="h-7.5 w-7.5 sm:h-8 sm:w-8" stroke={1.5} />
        }
      >
        <Suspense fallback="---">
          {/* @ts-expect-error Server Component */}
          <TotalArtists promise={artistsData} />
        </Suspense>
      </Category>
    </div>
  );
};

export default Statistics;
