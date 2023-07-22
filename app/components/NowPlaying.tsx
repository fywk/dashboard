"use client";

import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";
import useSWR from "swr";
import TimeAgo from "timeago-react";

import dayjs from "@/lib/utils/dayjs";
import fetcher from "@/lib/utils/fetcher";
import { siteConfig as site } from "@/lib/utils/site-config";

import EqualizerIcon from "./icons/EqualizerIcon";
import HeartIcon from "./icons/HeartIcon";

import type { RecentTrack } from "@/lib/types/lastfm";

export default function NowPlaying() {
  const [imageURL, setImageURL] = useState<string>();
  const { data, isLoading, error } = useSWR<RecentTrack, Error>(
    "/api/music/recent-track",
    fetcher,
    {
      refreshInterval: 30_000, // refresh every 30 seconds
    },
  );

  useEffect(() => {
    data && setImageURL(data.track.image);
  }, [data]);

  if (!data || isLoading) {
    return (
      <div
        className="grid grid-cols-[4rem_1fr_2.25rem] items-center gap-2.5 overflow-hidden rounded-md border border-primary/55 p-2 @xs/now-playing:gap-[0.6875rem] @[21.25rem]/now-playing:grid-cols-[4.5rem_1fr_2.25rem] @sm/now-playing:grid-cols-[5rem_1fr_2.25rem] @[340px]/now-playing:gap-3"
        title={error && "Failed to load"}
      >
        <div className="aspect-square rounded bg-gray-900 ring-1 ring-gray-900"></div>
        <div className="flex flex-col gap-y-2 @[340px]/now-playing:gap-y-[9px]">
          <div className="h-2.5 w-1/2 rounded bg-gray-900 @[340px]/now-playing:h-3"></div>
          <div className="h-3 w-full rounded bg-gray-900 @[340px]/now-playing:h-3.5"></div>
          <div className="h-2.5 w-3/4 rounded bg-gray-900 @[340px]/now-playing:h-3"></div>
        </div>
        <div className="text-transparent">
          <HeartIcon isFilled={false} />
        </div>
      </div>
    );
  }

  const track = data.track;

  let dateTime = "";
  let humanizedDateTime = "";

  if (track.timestamp) {
    const timestamp = dayjs.unix(track.timestamp).utc();
    dateTime = timestamp.format();
    humanizedDateTime = timestamp.format(site.dateFormat);
  }

  return (
    <div className="grid grid-cols-[4rem_1fr_2.25rem] items-center gap-2.5 overflow-hidden rounded-md border border-primary/55 p-2 @xs/now-playing:gap-[0.6875rem] @[21.25rem]/now-playing:grid-cols-[4.5rem_1fr_2.25rem] @sm/now-playing:grid-cols-[5rem_1fr_2.25rem] @[340px]/now-playing:gap-3">
      <div
        className="relative aspect-square overflow-hidden rounded bg-gray-900 ring-1 ring-gray-800/75"
        id="track-album-art"
      >
        {imageURL && (
          <Image
            src={imageURL}
            width={300}
            height={300}
            alt=""
            onError={() => setImageURL("/images/album-error.jpg")}
            loading="eager"
            unoptimized
          />
        )}
      </div>
      <div className="flex flex-col gap-y-1.5 overflow-hidden tracking-tight">
        <p
          className="flex items-center gap-x-[3px] text-[13px] font-medium !leading-none text-[#1ed760] @[340px]/now-playing:gap-x-1 @[340px]/now-playing:text-sm"
          id="track-status"
        >
          {track.timestamp ? (
            <TimeAgo datetime={dateTime} title={humanizedDateTime} />
          ) : (
            <>
              <EqualizerIcon />
              Now playing
            </>
          )}
        </p>
        <h4
          className="truncate text-sm font-medium !leading-none text-gray-100 @[340px]/now-playing:text-[15px]"
          title={track.name}
          id="track-name"
        >
          {track.name}
        </h4>
        <p
          className="truncate text-[13px] !leading-none @[340px]/now-playing:text-sm"
          title={`${track.artist} — ${track.album}`}
          id="track-artist-and-album-name"
        >
          {`${track.artist} — ${track.album}`}
        </p>
      </div>
      <div className={clsx(track.loved ? "text-[#1ed760]" : "text-gray-500")}>
        <HeartIcon isFilled={track.loved} />
      </div>
    </div>
  );
}
