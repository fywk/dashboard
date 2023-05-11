import Image from "next/image";
import { Suspense } from "react";

import { getTopAlbums } from "@/utils/lastfm";

const TopAlbumsPlaceholder = () => {
  return (
    <>
      {[...Array(6)].map((_, i) => (
        <div
          className="flex items-center gap-x-2.5 overflow-hidden rounded pr-2.5 sm:gap-x-3 sm:pr-3"
          key={i}
        >
          <div className="aspect-square basis-[30%] bg-gray-900"></div>
          <div className="basis-[70%] space-y-1.5 sm:space-y-[7px]">
            <div className="h-2.5 w-full rounded bg-gray-900 sm:h-3"></div>
            <div className="h-2 w-1/2 rounded bg-gray-900 sm:h-2.5"></div>
          </div>
        </div>
      ))}
    </>
  );
};

const TopAlbums = async () => {
  const data = await getTopAlbums("3month");

  return (
    <>
      {data.map((album) => (
        <div
          className="flex items-center gap-x-2.5 overflow-hidden rounded bg-gray-900 pr-2.5 ring-1 ring-gray-800/75 sm:gap-x-3 sm:pr-3"
          key={album.name}
        >
          <div className="aspect-square basis-[30%]">
            <Image src={album.image} width={300} height={300} alt="" />
          </div>
          <div className="basis-[70%] overflow-hidden tracking-tight sm:space-y-px">
            <h4
              className="truncate text-xs font-medium text-gray-100 sm:text-sm"
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
    </>
  );
};

const TopAlbumsGrid = () => {
  return (
    <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-3 md:gap-x-4 md:gap-y-3.5">
      <Suspense fallback={<TopAlbumsPlaceholder />}>
        {/* @ts-expect-error Server Component */}
        <TopAlbums />
      </Suspense>
    </div>
  );
};

export default TopAlbumsGrid;
