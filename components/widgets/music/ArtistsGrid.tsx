import Image from "next/future/image";
import useSWR from "swr";

import fetcher from "../../../lib/fetcher";
import { TopArtists } from "../../../lib/types/lastfm";
import { ArtistImage } from "../../../lib/types/spotify";

const Avatar = ({ name }: { name: string }) => {
  const { data } = useSWR<ArtistImage>(
    `api/music/artist-image?name=${name}`,
    fetcher,
    {
      refreshInterval: 3_600_000, // 1 hour in milliseconds
    }
  );

  if (!data) return null;

  return (
    <Image
      src={data?.url}
      className="h-full w-full object-cover"
      width={data?.width}
      height={data?.height}
      alt=""
      unoptimized
    />
  );
};

const ArtistsGrid = () => {
  const { data } = useSWR<TopArtists>(
    "api/music/top-artists?period=1month",
    fetcher,
    {
      refreshInterval: 3_600_000, // 1 hour in milliseconds
    }
  );

  if (!data) {
    return (
      <div className="grid w-full grid-cols-4 gap-2 sm:gap-2.5 md:grid-cols-6 md:gap-3">
        {[...Array(6)].map((_, i) => (
          <div
            className="grid grid-cols-1 gap-y-2 p-2 sm:gap-y-2.5 sm:p-2.5 md:gap-y-3 md:p-3 [&:nth-last-child(-n+2)]:hidden md:[&:nth-last-child(-n+2)]:grid"
            key={i}
          >
            <div className="aspect-square overflow-hidden rounded-full bg-gray-900"></div>
            <div className="flex flex-col items-center space-y-1.5 pt-[3px] pb-1 sm:space-y-2 sm:pt-1">
              <div className="h-2.5 w-full rounded bg-gray-900 sm:h-3"></div>
              <div className="h-2 w-1/2 rounded bg-gray-900 sm:h-2.5"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid w-full grid-cols-4 gap-2 sm:gap-2.5 md:grid-cols-6 md:gap-3">
      {data?.map((artist) => (
        <div
          className="grid grid-cols-1 gap-y-2 p-2 sm:gap-y-2.5 sm:p-2.5 md:gap-y-3 md:p-3 [&:nth-last-child(-n+2)]:hidden md:[&:nth-last-child(-n+2)]:grid"
          key={artist.name}
        >
          <div className="aspect-square overflow-hidden rounded-full bg-gray-900 ring-1 ring-gray-900">
            <Avatar name={artist.name} />
          </div>
          <div className="text-center tracking-tight sm:space-y-0.5">
            <h4 className="truncate text-xs font-semibold text-gray-100 sm:text-sm">
              {artist.name}
            </h4>
            <p className="text-[10px] sm:text-xs">{`${artist.playcount} plays`}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArtistsGrid;
