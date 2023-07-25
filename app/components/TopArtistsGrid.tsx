import Image from "next/image";
import { Suspense } from "react";

import { getTopArtists } from "@/lib/services/lastfm";
import { getArtistImage } from "@/lib/services/spotify";

import type { Period } from "@/lib/types/lastfm";

const MAX_ARTISTS_COUNT = 6;

async function ArtistAvatar({ name }: { name: string }) {
  const artistImage = await getArtistImage(name);

  if (!artistImage) return null;

  const { url, width, height } = artistImage;

  return (
    <Image src={url} className="h-full w-full object-cover" width={width} height={height} alt="" />
  );
}

function TopArtistsSkeleton({ count = MAX_ARTISTS_COUNT }: { count?: number }) {
  return [...Array<undefined>(count)].map((_, i) => (
    <div
      className="grid min-w-[80px] grid-cols-1 gap-y-2 p-2 @xl/section:gap-y-2.5 @xl/section:p-2.5 @1.5xl/section:gap-y-3 @1.5xl/section:p-3 xs:min-w-[96px]"
      key={i}
    >
      <div className="aspect-square overflow-hidden rounded-full bg-gray-900 ring-1 ring-gray-900"></div>
      <div className="flex flex-col items-center gap-y-1.5 pb-1 pt-[3px] @xl/section:gap-y-[7px] @1.5xl/section:pt-1">
        <div className="h-2.5 w-full rounded bg-gray-900 @xl/section:h-[11px] @1.5xl/section:h-3"></div>
        <div className="h-2 w-1/2 rounded bg-gray-900 @xl/section:h-[9px] @1.5xl/section:h-2.5"></div>
      </div>
    </div>
  ));
}

async function TopArtists({ period }: { period: Period }) {
  const data = await getTopArtists(period, MAX_ARTISTS_COUNT);

  if (!data || data.length === 0) {
    return <TopArtistsSkeleton />;
  }

  return (
    <>
      {data.map((artist) => (
        <div
          className="grid min-w-[80px] grid-cols-1 gap-y-2 p-2 @xl/section:gap-y-2.5 @xl/section:p-2.5 @1.5xl/section:gap-y-3 @1.5xl/section:p-3 xs:min-w-[96px]"
          key={artist.name.replace(/ /g, "_")} // replace spaces with underscores
        >
          <div className="aspect-square overflow-hidden rounded-full bg-gray-900 ring-1 ring-gray-800/75">
            <Suspense fallback="">
              <ArtistAvatar name={artist.name} />
            </Suspense>
          </div>
          <div className="flex flex-col text-center tracking-tight @xl/section:gap-y-px">
            <h4
              className="truncate text-xs font-medium text-gray-100 @xl/section:text-[13px] @1.5xl/section:text-sm"
              title={artist.name}
            >
              {artist.name}
            </h4>
            <p className="text-[10px] @xl/section:text-[11px] @1.5xl/section:text-xs">{`${artist.playcount} plays`}</p>
          </div>
        </div>
      ))}
      {data.length < MAX_ARTISTS_COUNT && (
        <TopArtistsSkeleton count={MAX_ARTISTS_COUNT - data.length} />
      )}
    </>
  );
}

export default function TopArtistGrid({ period }: { period: Period }) {
  return (
    <div className="grid w-full auto-cols-[1fr] grid-flow-col gap-x-2 overflow-x-auto @xl/section:gap-x-2.5 @1.5xl/section:gap-x-3">
      <Suspense fallback={<TopArtistsSkeleton />}>
        <TopArtists period={period} />
      </Suspense>
    </div>
  );
}
