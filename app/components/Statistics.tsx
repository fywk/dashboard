import { IconMicrophone2, IconMusic, IconPlayerPlay, IconVinyl } from "@tabler/icons-react";
import { Suspense } from "react";

import {
  getRecentTracks,
  getTotalAlbums,
  getTotalArtists,
  getTotalTracks,
} from "@/lib/services/lastfm";

import type { RecentTrack, TotalStats } from "@/lib/types/lastfm";

type Data<T extends RecentTrack | TotalStats> = {
  data: Promise<T | null>;
};

async function Total<T extends RecentTrack | TotalStats>({ data }: Data<T>): Promise<string> {
  const result = await data;
  return result?.total ?? "---";
}

function Category({
  title,
  icon,
  children,
}: {
  title: "Plays" | "Albums" | "Artists" | "Tracks";
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full flex-col items-center justify-center text-sm font-medium leading-5 tracking-tight odd:text-secondary even:text-primary @lg/section:odd:text-primary @lg/section:even:text-secondary @1.5xl/section:text-[15px]">
      {icon}
      <span className="mt-[3px] @1.5xl/section:mt-1">{title}</span>
      <span>{children}</span>
    </div>
  );
}

export default function Statistics() {
  const ONE_WEEK_IN_SECONDS = 604_800;
  const unixTimestamp = Math.floor(Date.now() / 1000); // get the current Unix timestamp in seconds format (10-digit)
  const timestampOf7DaysAgo = unixTimestamp - ONE_WEEK_IN_SECONDS;

  const playsData = getRecentTracks(timestampOf7DaysAgo);
  const tracksData = getTotalTracks("7day");
  const albumsData = getTotalAlbums("7day");
  const artistsData = getTotalArtists("7day");

  return (
    <div className="flex w-full items-center justify-between py-1">
      <Category
        title="Plays"
        icon={
          <IconPlayerPlay
            className="h-7.5 w-7.5 @1.5xl/section:h-8 @1.5xl/section:w-8"
            stroke={1.75}
          />
        }
      >
        <Suspense fallback="---">
          <Total data={playsData} />
        </Suspense>
      </Category>
      <Category
        title="Tracks"
        icon={
          <IconMusic className="h-7.5 w-7.5 @1.5xl/section:h-8 @1.5xl/section:w-8" stroke={1.5} />
        }
      >
        <Suspense fallback="---">
          <Total data={tracksData} />
        </Suspense>
      </Category>
      <Category
        title="Albums"
        icon={
          <IconVinyl className="h-7.5 w-7.5 @1.5xl/section:h-8 @1.5xl/section:w-8" stroke={1.5} />
        }
      >
        <Suspense fallback="---">
          <Total data={albumsData} />
        </Suspense>
      </Category>
      <Category
        title="Artists"
        icon={
          <IconMicrophone2
            className="h-7.5 w-7.5 @1.5xl/section:h-8 @1.5xl/section:w-8"
            stroke={1.5}
          />
        }
      >
        <Suspense fallback="---">
          <Total data={artistsData} />
        </Suspense>
      </Category>
    </div>
  );
}
