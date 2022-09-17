import useSWR from "swr";

import {
  IconMicrophone2,
  IconMusic,
  IconPlayerPlay,
  IconVinyl
} from "@tabler/icons";

import fetcher from "../../../lib/fetcher";
import { TotalStats } from "../../../lib/types/lastfm";

const Category = ({
  title,
  value,
  icon,
}: {
  title: "Plays" | "Albums" | "Artists" | "Tracks";
  value: number;
  icon?: React.ReactNode;
}) => {
  return (
    <div className="flex w-full flex-col items-center justify-center text-sm font-semibold tracking-tight odd:text-secondary even:text-primary sm:text-[15px]">
      {icon}
      <span className="mt-1">{title}</span>
      <span>{value > 0 ? value : "---"}</span>
    </div>
  );
};

const Statistics = ({ totalPlays }: { totalPlays: string }) => {
  const tracks = useSWR<TotalStats>(
    "api/music/track-total?period=7day",
    fetcher,
    {
      refreshInterval: 600_000, // 10 minutes in milliseconds
    }
  );
  const albums = useSWR<TotalStats>(
    "api/music/album-total?period=7day",
    fetcher,
    {
      refreshInterval: 600_000, // 10 minutes in milliseconds
    }
  );
  const artists = useSWR<TotalStats>(
    "api/music/artist-total?period=7day",
    fetcher,
    {
      refreshInterval: 600_000, // 10 minutes in milliseconds
    }
  );

  return (
    <div className="flex w-full items-center justify-between py-1">
      <Category
        title="Plays"
        value={Number(totalPlays)}
        icon={
          <IconPlayerPlay className="h-7.5 w-7.5 sm:h-8 sm:w-8" stroke={2} />
        }
      />
      <Category
        title="Tracks"
        value={Number(tracks.data?.total)}
        icon={<IconMusic className="h-7.5 w-7.5 sm:h-8 sm:w-8" stroke={1.75} />}
      />
      <Category
        title="Albums"
        value={Number(albums.data?.total)}
        icon={<IconVinyl className="h-7.5 w-7.5 sm:h-8 sm:w-8" stroke={1.75} />}
      />
      <Category
        title="Artists"
        value={Number(artists.data?.total)}
        icon={
          <IconMicrophone2
            className="h-7.5 w-7.5 sm:h-8 sm:w-8"
            stroke={1.75}
          />
        }
      />
    </div>
  );
};

export default Statistics;
