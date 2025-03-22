import { IconMicrophone2, IconMusic, IconPlayerPlay, IconVinyl } from "@tabler/icons-react";
import { Suspense } from "react";

import {
  getTotalAlbums,
  getTotalArtists,
  getTotalPlays,
  getTotalTracks,
} from "@/lib/services/lastfm";
import dayjs from "@/lib/utils/dayjs";
import { convertPeriodToDays } from "@/lib/utils/lastfm";

import type { Period, TotalStats } from "@/lib/types/lastfm";

type CategoryProps = {
  title: "Plays" | "Albums" | "Artists" | "Tracks";
  icon: React.ReactNode;
  children: React.ReactNode;
};

const placeholderString = "---";

async function Total({ data }: { data: Promise<TotalStats | null> }): Promise<string> {
  const result = await data;
  return result?.total ?? placeholderString;
}

function Category({ title, icon, children }: CategoryProps) {
  return (
    <div className="flex w-full flex-col items-center justify-center text-sm leading-5 font-medium tracking-tight odd:text-secondary even:text-primary @lg/section:odd:text-primary @lg/section:even:text-secondary @[39rem]/section:text-[15px]">
      {icon}
      <span className="mt-0.75 @[39rem]/section:mt-1">{title}</span>
      <span>{children}</span>
    </div>
  );
}

export default function Statistics({ period }: { period: Period }) {
  let playsData: Promise<TotalStats | null>;

  if (period === "overall") {
    playsData = getTotalPlays();
  } else {
    const periodInSeconds = dayjs.duration(convertPeriodToDays(period), "days").asSeconds(); // convert period to seconds (e.g. 7day = 604,800 seconds)
    const unixTimestamp = Math.floor(Date.now() / 1000); // get the current Unix timestamp in seconds format (10-digit)
    const beginningTimestamp = unixTimestamp - periodInSeconds;

    playsData = getTotalPlays(beginningTimestamp);
  }

  const tracksData = getTotalTracks(period);
  const albumsData = getTotalAlbums(period);
  const artistsData = getTotalArtists(period);

  return (
    <div className="flex w-full items-center justify-between py-1">
      <Category
        title="Plays"
        icon={<IconPlayerPlay className="size-7.5 @[39rem]/section:size-8" stroke={1.75} />}
      >
        <Suspense fallback={placeholderString}>
          <Total data={playsData} />
        </Suspense>
      </Category>
      <Category
        title="Tracks"
        icon={<IconMusic className="size-7.5 @[39rem]/section:size-8" stroke={1.5} />}
      >
        <Suspense fallback={placeholderString}>
          <Total data={tracksData} />
        </Suspense>
      </Category>
      <Category
        title="Albums"
        icon={<IconVinyl className="size-7.5 @[39rem]/section:size-8" stroke={1.5} />}
      >
        <Suspense fallback={placeholderString}>
          <Total data={albumsData} />
        </Suspense>
      </Category>
      <Category
        title="Artists"
        icon={<IconMicrophone2 className="size-7.5 @[39rem]/section:size-8" stroke={1.5} />}
      >
        <Suspense fallback={placeholderString}>
          <Total data={artistsData} />
        </Suspense>
      </Category>
    </div>
  );
}
