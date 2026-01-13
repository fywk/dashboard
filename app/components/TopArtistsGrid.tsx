import Image from "next/image";
import { Suspense } from "react";

import { MAX_ARTISTS_COUNT, PLACEHOLDER_CHARACTER } from "@/lib/app-constants";
import { getTopArtists } from "@/lib/services/lastfm";
import { getArtistImage } from "@/lib/services/spotify";

import type { Period } from "@/lib/types/lastfm";

async function ArtistAvatar({ name }: { name: string }) {
  const artistImage = await getArtistImage(name);

  if (!artistImage) return null;

  const { url, width, height } = artistImage;

  return (
    <Image src={url} alt="" width={width} height={height} className="size-full object-cover" />
  );
}

function TopArtistsSkeleton({ count = MAX_ARTISTS_COUNT }: { count?: number }) {
  return [...Array<undefined>(count)].map((_, i) => (
    <div
      className="flex flex-col gap-y-2 py-2 @xl/section:gap-y-2.5 @xl/section:py-2.5 @[39rem]/section:gap-y-3 @[39rem]/section:py-3"
      key={i}
    >
      <div className="mx-auto aspect-square w-[85%] max-w-21 rounded-full bg-gray-900 ring-1 ring-gray-900 @2xl/section:max-w-24"></div>
      <div className="flex flex-col text-center text-gray-900 @xl/section:gap-y-px">
        <div className="text-xs @xl/section:text-[13px] @[39rem]/section:text-sm">
          {PLACEHOLDER_CHARACTER.repeat(6)}
        </div>
        <div className="text-[10px] @xl/section:text-[11px] @[39rem]/section:text-xs">
          {PLACEHOLDER_CHARACTER.repeat(4)}
        </div>
      </div>
    </div>
  ));
}

async function TopArtists({ period }: { period: Period }) {
  const artists = await getTopArtists(period, MAX_ARTISTS_COUNT);

  if (!artists || artists.length === 0) {
    return <TopArtistsSkeleton />;
  }

  return (
    <>
      {artists.map((artist) => (
        <div
          className="flex flex-col gap-y-2 py-2 @xl/section:gap-y-2.5 @xl/section:py-2.5 @[39rem]/section:gap-y-3 @[39rem]/section:py-3"
          key={artist.name.replace(/ /g, "_")} // replace spaces with underscores
        >
          <div className="mx-auto aspect-square w-[85%] max-w-21 overflow-hidden rounded-full bg-gray-900 ring-1 ring-gray-800/75 @2xl/section:max-w-24">
            <Suspense fallback="">
              <ArtistAvatar name={artist.name} />
            </Suspense>
          </div>
          <div className="flex flex-col text-center tracking-tight @xl/section:gap-y-px">
            <h4
              className="truncate text-xs font-medium text-gray-100 @xl/section:text-[13px] @[39rem]/section:text-sm"
              title={artist.name}
            >
              {artist.name}
            </h4>
            <p className="text-[10px] @xl/section:text-[11px] @[39rem]/section:text-xs">{`${artist.playcount} plays`}</p>
          </div>
        </div>
      ))}
      {artists.length < MAX_ARTISTS_COUNT && (
        <TopArtistsSkeleton count={MAX_ARTISTS_COUNT - artists.length} />
      )}
    </>
  );
}

export default function TopArtistGrid({ period }: { period: Period }) {
  return (
    <div className="grid w-full auto-rows-[0] grid-cols-4 grid-rows-1 gap-x-3 overflow-y-hidden @lg/section:grid-cols-5 @xl/section:gap-x-3.75 @[39rem]/section:grid-cols-6 @[39rem]/section:gap-x-4.5">
      <Suspense fallback={<TopArtistsSkeleton />}>
        <TopArtists period={period} />
      </Suspense>
    </div>
  );
}
