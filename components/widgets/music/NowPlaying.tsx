import clsx from "clsx";
import Image from "next/future/image";
import TimeAgo from "timeago-react";

import { RecentTrack } from "../../../lib/types/lastfm";

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

const NowPlaying = ({ track }: { track?: RecentTrack["track"] }) => {
  if (!track) {
    return (
      <div className="flex items-center gap-3 overflow-hidden rounded-md border border-primary/50 p-2 sm:gap-3.5 md:border-secondary/50">
        <div className="aspect-square basis-1/4 rounded bg-gray-900"></div>
        <div className="basis-3/4 space-y-2 sm:space-y-2.5">
          <div className="h-2.5 w-1/2 rounded bg-gray-900 sm:h-3"></div>
          <div className="h-3 w-full rounded bg-gray-900 sm:h-3.5"></div>
          <div className="h-2.5 w-3/4 rounded bg-gray-900 sm:h-3"></div>
        </div>
        <div className="mr-3 text-xl font-medium text-transparent sm:mr-4">
          {"♡"}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 overflow-hidden rounded-md border border-primary/50 p-2 sm:gap-3.5 md:border-secondary/50">
      <div
        className="relative aspect-square basis-1/4 overflow-hidden rounded ring-1 ring-gray-900"
        id="track-album-art"
      >
        <Image
          src={track.image}
          width={174}
          height={174}
          alt=""
          priority
          unoptimized
        />
      </div>
      <div className="basis-3/4 overflow-hidden tracking-tight">
        <p
          className="flex items-center gap-x-1 text-[13px] font-medium text-[#1ed760] sm:text-sm"
          id="track-status"
        >
          {track.timestamp ? (
            <TimeAgo datetime={Number(track.timestamp) * 1000} />
          ) : (
            <>
              <EqualizerIcon className="h-3 w-3 sm:h-4 sm:w-4" />
              Now playing
            </>
          )}
        </p>
        <h4
          className="truncate text-sm font-semibold text-gray-100 sm:text-[15px]"
          id="track-name"
        >
          {track.name}
        </h4>
        <p
          className="truncate text-[13px] sm:text-sm"
          id="track-artist-and-album-title"
        >
          {`${track.artist} — ${track.album}`}
        </p>
      </div>
      <div
        className={clsx(
          "mr-3 text-xl font-medium sm:mr-4",
          track.loved ? "text-[#1ed760]" : "text-gray-500"
        )}
      >
        {track.loved ? "♥" : "♡"}
      </div>
    </div>
  );
};

export default NowPlaying;
