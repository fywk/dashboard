import Image from "next/image";
import { Suspense } from "react";

import { getTopAlbums } from "@/lib/services/lastfm";

function TopAlbumsSkeleton() {
  return [...Array<undefined>(6)].map((_, i) => (
    <div
      className="flex items-center gap-x-2.5 pr-2.5 @1.5xl/section:gap-x-3 @1.5xl/section:pr-3"
      key={i}
    >
      <div className="aspect-square basis-[30%] rounded bg-gray-900 ring-1 ring-gray-900"></div>
      <div className="flex basis-[70%] flex-col gap-y-1.5 @1.5xl/section:gap-y-[7px]">
        <div className="h-2.5 w-full rounded bg-gray-900 @xl/section:h-[11px] @1.5xl/section:h-3"></div>
        <div className="h-2 w-1/2 rounded bg-gray-900 @xl/section:h-[9px] @1.5xl/section:h-2.5"></div>
      </div>
    </div>
  ));
}

async function TopAlbums() {
  const data = await getTopAlbums("3month");

  if (!data) {
    return <TopAlbumsSkeleton />;
  }

  return data.map((album) => (
    <div
      className="flex items-center gap-x-2.5 pr-2.5 @1.5xl/section:gap-x-3 @1.5xl/section:pr-3"
      key={album.name}
    >
      <div className="aspect-square basis-[30%] overflow-hidden rounded bg-gray-900 ring-1 ring-gray-800/75">
        <Image src={album.image} width={300} height={300} alt="" />
      </div>
      <div className="flex basis-[70%] flex-col overflow-hidden tracking-tight @xl/section:gap-y-px">
        <h4
          className="truncate text-xs font-medium text-gray-100 @xl/section:text-[13px] @1.5xl/section:text-sm"
          title={`${album.artist} – ${album.name}`}
        >
          {album.name}
        </h4>
        <p className="text-[10px] @xl/section:text-[11px] @1.5xl/section:text-xs">
          {`${album.playcount} plays`}
        </p>
      </div>
    </div>
  ));
}

export default function TopAlbumsGrid() {
  return (
    <div className="grid grid-cols-2 gap-2.5 @xl/section:grid-cols-3 @xl/section:gap-3 @1.5xl/section:gap-x-4 @1.5xl/section:gap-y-3.5">
      <Suspense fallback={<TopAlbumsSkeleton />}>
        <TopAlbums />
      </Suspense>
    </div>
  );
}
