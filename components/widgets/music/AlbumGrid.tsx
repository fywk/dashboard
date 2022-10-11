import Image from "next/future/image";
import useSWR from "swr";

import fetcher from "../../../lib/fetcher";
import { TopAlbums } from "../../../lib/types/lastfm";

const AlbumGrid = () => {
  const { data } = useSWR<TopAlbums>(
    "/api/music/top-albums?period=3month",
    fetcher,
    {
      refreshInterval: 3_600_000, // 1 hour in milliseconds
    }
  );

  if (!data) {
    return (
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-3 md:gap-y-3.5 md:gap-x-4">
        {[...Array(6)].map((_, i) => (
          <div
            className="flex items-center gap-x-2.5 overflow-hidden rounded pr-2.5 sm:gap-x-3 sm:pr-3"
            key={i}
          >
            <div className="aspect-square basis-[30%] bg-gray-900"></div>
            <div className="basis-[70%] space-y-1.5 sm:space-y-2">
              <div className="h-2.5 w-full rounded bg-gray-900 sm:h-3"></div>
              <div className="h-2 w-1/2 rounded bg-gray-900 sm:h-2.5"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-3 md:gap-y-3.5 md:gap-x-4">
      {data?.map((album) => (
        <div
          className="flex items-center gap-x-2.5 overflow-hidden rounded bg-gray-900 pr-2.5 ring-1 ring-gray-800/75 sm:gap-x-3 sm:pr-3"
          key={album.name}
        >
          <div className="aspect-square basis-[30%]">
            <Image src={album.image} width={174} height={174} alt="" />
          </div>
          <div className="basis-[70%] overflow-hidden tracking-tight sm:space-y-0.5">
            <h4
              className="truncate text-xs font-semibold text-gray-100 sm:text-sm"
              title={`${album.artist} – ${album.name}`}
            >
              {album.name}
            </h4>
            <p className="text-[10px] sm:text-xs">
              {`${album.playcount} plays`}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlbumGrid;
