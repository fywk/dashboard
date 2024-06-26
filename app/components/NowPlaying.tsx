"use client";

import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";
import useSWR from "swr";
import TimeAgo from "timeago-react";

import { app } from "@/lib/app-config";
import { PLACEHOLDER_CHARACTER } from "@/lib/app-constants";
import dayjs from "@/lib/utils/dayjs";
import fetcher from "@/lib/utils/fetcher";

import EqualizerIcon from "./icons/EqualizerIcon";
import HeartIcon from "./icons/HeartIcon";

import type { RecentTrack } from "@/lib/types/lastfm";

export default function NowPlaying() {
  const [imageURL, setImageURL] = useState<string>();
  const { data: track, isLoading } = useSWR<RecentTrack, Error>(
    "/api/music/recent-track",
    fetcher,
    {
      refreshInterval: 30_000, // refresh every 30 seconds
    },
  );

  useEffect(() => {
    track && setImageURL(track.image);
  }, [track]);

  if (!track || isLoading) {
    return (
      <div className="grid grid-cols-[4rem_1fr_2.25rem] items-center gap-2.5 overflow-hidden rounded-md border border-primary/55 p-2 @xs/now-playing:gap-[.6875rem] @[21.25rem]/now-playing:grid-cols-[4.5rem_1fr_2.25rem] @sm/now-playing:grid-cols-[5rem_1fr_2.25rem] @[340px]/now-playing:gap-3">
        <div className="aspect-square rounded bg-gray-900 ring-1 ring-gray-900"></div>
        <div className="flex flex-col gap-y-1.5 text-gray-900">
          <div className="text-[13px] !leading-none @[340px]/now-playing:text-sm">
            {PLACEHOLDER_CHARACTER.repeat(6)}
          </div>
          <div className="text-sm !leading-none @[340px]/now-playing:text-[15px]">
            {PLACEHOLDER_CHARACTER.repeat(12)}
          </div>
          <div className="text-[13px] !leading-none @[340px]/now-playing:text-sm">
            {PLACEHOLDER_CHARACTER.repeat(9)}
          </div>
        </div>
        <div className="text-transparent">
          <HeartIcon isFilled={false} />
        </div>
      </div>
    );
  }

  let dateTime = "";
  let humanizedDateTime = "";

  if (track.timestamp) {
    const timestamp = dayjs.unix(track.timestamp).utc();
    dateTime = timestamp.format();
    humanizedDateTime = timestamp.format(app.defaultDateFormat);
  }

  return (
    <div className="grid grid-cols-[4rem_1fr_2.25rem] items-center gap-2.5 overflow-hidden rounded-md border border-primary/55 p-2 @xs/now-playing:gap-[.6875rem] @[21.25rem]/now-playing:grid-cols-[4.5rem_1fr_2.25rem] @sm/now-playing:grid-cols-[5rem_1fr_2.25rem] @[340px]/now-playing:gap-3">
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
