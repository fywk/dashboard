"use client";

import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";
import useSWR from "swr";
import TimeAgo from "timeago-react";

import { RecentTrack } from "@/types/lastfm";
import fetcher from "@/utils/fetcher";

const EqualizerIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      id="equalizer"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <rect
        className="eq-bar eq-bar--1"
        x="4"
        y="4"
        width="3.7"
        height="8"
      ></rect>
      <rect
        className="eq-bar eq-bar--2"
        x="10.2"
        y="4"
        width="3.7"
        height="16"
      ></rect>
      <rect
        className="eq-bar eq-bar--3"
        x="16.3"
        y="4"
        width="3.7"
        height="11"
      ></rect>
    </svg>
  );
};

const NowPlaying = () => {
  const [imageURL, setImageURL] = useState("");
  const { data, isLoading } = useSWR<RecentTrack>(
    "/api/music/recent-track",
    fetcher,
    {
      refreshInterval: 30_000, // 30 seconds in milliseconds
    }
  );

  useEffect(() => {
    data && setImageURL(data.track.image);
  }, [data]);

  if (!data || isLoading) {
    return (
      <div className="flex items-center gap-2.5 overflow-hidden rounded-md border border-primary/60 p-2 @xs/now-playing:gap-[0.6875rem] @[340px]/now-playing:gap-3">
        <div className="aspect-square min-w-[3.5rem] max-w-[4.5rem] basis-1/4 rounded bg-gray-900 ring-1 ring-gray-900"></div>
        <div className="grow space-y-2 @[340px]/now-playing:space-y-[9px]">
          <div className="h-2.5 w-1/2 rounded bg-gray-900 @[340px]/now-playing:h-3"></div>
          <div className="h-3 w-full rounded bg-gray-900 @[340px]/now-playing:h-3.5"></div>
          <div className="h-2.5 w-3/4 rounded bg-gray-900 @[340px]/now-playing:h-3"></div>
        </div>
        <div className="w-9 text-lg font-medium text-transparent @[340px]/now-playing:w-10 @[340px]/now-playing:text-xl">
          {"♡"}
        </div>
      </div>
    );
  }

  const track = data.track;

  return (
    <div className="flex items-center gap-2.5 overflow-hidden rounded-md border border-primary/60 p-2 @xs/now-playing:gap-[0.6875rem] @[340px]/now-playing:gap-3">
      <div
        className="relative aspect-square min-w-[3.5rem] max-w-[4.5rem] basis-1/4 overflow-hidden rounded bg-gray-900 ring-1 ring-gray-800/75"
        id="track-album-art"
      >
        <Image
          src={imageURL}
          width={300}
          height={300}
          alt=""
          priority
          unoptimized
          onError={() => setImageURL("/images/album-error.jpg")}
        />
      </div>
      <div className="grow overflow-hidden tracking-tight">
        <p
          className="flex items-center gap-x-[3px] text-[13px] font-medium text-[#1ed760] @[340px]/now-playing:gap-x-1 @[340px]/now-playing:text-sm"
          id="track-status"
        >
          {track.timestamp ? (
            <TimeAgo datetime={Number(track.timestamp) * 1000} />
          ) : (
            <>
              <EqualizerIcon className="h-[13px] w-[13px] @[340px]/now-playing:h-15px @[340px]/now-playing:w-15px" />
              Now playing
            </>
          )}
        </p>
        <h4
          className="truncate text-sm font-medium text-gray-100 @[340px]/now-playing:text-[15px]"
          title={track.name}
          id="track-name"
        >
          {track.name}
        </h4>
        <p
          className="truncate text-[13px] @[340px]/now-playing:text-sm"
          title={`${track.artist} — ${track.album}`}
          id="track-artist-and-album-title"
        >
          {`${track.artist} — ${track.album}`}
        </p>
      </div>
      <div
        className={clsx(
          "w-9 text-lg font-medium @[340px]/now-playing:w-10 @[340px]/now-playing:text-xl",
          track.loved ? "text-[#1ed760]" : "text-gray-500"
        )}
      >
        {track.loved ? "♥" : "♡"}
      </div>
    </div>
  );
};

export default NowPlaying;
