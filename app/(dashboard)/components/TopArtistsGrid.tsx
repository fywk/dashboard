import Image from "next/image";
import { Suspense } from "react";

import { getArtistImage } from "../../../lib/spotify";
import { getTopArtists } from "../../../lib/utils/lastfm";

const ArtistAvatar = async ({ name }: { name: string }) => {
  const data = await getArtistImage(name);

  return (
    <Image
      src={data.url}
      className="h-full w-full object-cover"
      width={Number(data.width)}
      height={Number(data.height)}
      alt=""
    />
  );
};

const TopArtistsSkeleton = () => {
  return (
    <>
      {[...Array(6)].map((_, i) => (
        <div
          className="grid grid-cols-1 gap-y-2 p-2 sm:gap-y-2.5 sm:p-2.5 md:gap-y-3 md:p-3 [&:nth-last-child(-n+2)]:hidden md:[&:nth-last-child(-n+2)]:grid"
          key={i}
        >
          <div className="aspect-square overflow-hidden rounded-full bg-gray-900"></div>
          <div className="flex flex-col items-center space-y-1.5 pt-[3px] pb-1 sm:space-y-[7px] sm:pt-1">
            <div className="h-2.5 w-full rounded bg-gray-900 sm:h-3"></div>
            <div className="h-2 w-1/2 rounded bg-gray-900 sm:h-2.5"></div>
          </div>
        </div>
      ))}
    </>
  );
};

const TopArtists = async () => {
  const data = await getTopArtists("1month");

  return (
    <>
      {data?.map((artist) => (
        <div
          className="grid grid-cols-1 gap-y-2 p-2 sm:gap-y-2.5 sm:p-2.5 md:gap-y-3 md:p-3 [&:nth-last-child(-n+2)]:hidden md:[&:nth-last-child(-n+2)]:grid"
          key={artist.name.replace(/ /g, "_")} // replace spaces with underscores
        >
          <div className="aspect-square overflow-hidden rounded-full bg-gray-900 ring-1 ring-gray-900">
            <Suspense fallback="">
              {/* @ts-expect-error Server Component */}
              <ArtistAvatar name={artist.name} />
            </Suspense>
          </div>
          <div className="text-center tracking-tight sm:space-y-px">
            <h4
              className="truncate text-xs font-medium text-gray-100 sm:text-sm"
              title={artist.name}
            >
              {artist.name}
            </h4>
            <p className="text-[10px] sm:text-xs">{`${artist.playcount} plays`}</p>
          </div>
        </div>
      ))}
    </>
  );
};

const TopArtistGrid = () => {
  return (
    <div className="grid w-full grid-cols-4 gap-2 sm:gap-2.5 md:grid-cols-6 md:gap-3">
      <Suspense fallback={<TopArtistsSkeleton />}>
        {/* @ts-expect-error Server Component */}
        <TopArtists />
      </Suspense>
    </div>
  );
};

export default TopArtistGrid;
