import Image from "next/image";
import { Suspense } from "react";

import { MAX_ALBUMS_COUNT, PLACEHOLDER_CHARACTER } from "@/lib/app-constants";
import { getTopAlbums } from "@/lib/services/lastfm";

import type { Period } from "@/lib/types/lastfm";

function TopAlbumsSkeleton({ count = MAX_ALBUMS_COUNT }: { count?: number }) {
  return [...Array<undefined>(count)].map((_, i) => (
    <div
      className="flex items-center gap-x-2.5 pr-2.5 @1.5xl/section:gap-x-3 @1.5xl/section:pr-3"
      key={i}
    >
      <div className="aspect-square basis-[30%] rounded bg-gray-900 ring-1 ring-gray-900"></div>
      <div className="flex basis-[70%] flex-col overflow-hidden text-gray-900 @xl/section:gap-y-px">
        <div className="text-xs @xl/section:text-[13px] @1.5xl/section:text-sm">
          {PLACEHOLDER_CHARACTER.repeat(10)}
        </div>
        <div className="text-[10px] @xl/section:text-[11px] @1.5xl/section:text-xs">
          {PLACEHOLDER_CHARACTER.repeat(5)}
        </div>
      </div>
    </div>
  ));
}

async function TopAlbums({ period }: { period: Period }) {
  const albums = await getTopAlbums(period, MAX_ALBUMS_COUNT);

  if (!albums || albums.length === 0) {
    return <TopAlbumsSkeleton />;
  }

  return (
    <>
      {albums.map((album) => (
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
      ))}
      {albums.length < MAX_ALBUMS_COUNT && (
        <TopAlbumsSkeleton count={MAX_ALBUMS_COUNT - albums.length} />
      )}
    </>
  );
}

export default function TopAlbumsGrid({ period }: { period: Period }) {
  return (
    <div className="grid grid-cols-2 gap-2.5 @xl/section:grid-cols-3 @xl/section:gap-3 @1.5xl/section:gap-x-4 @1.5xl/section:gap-y-3.5">
      <Suspense fallback={<TopAlbumsSkeleton />}>
        <TopAlbums period={period} />
      </Suspense>
    </div>
  );
}
