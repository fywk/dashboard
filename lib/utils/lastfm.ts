import { env } from "@/app/env.mjs";

import type { LastfmParams, Period } from "@/lib/types/lastfm";

/**
 * Generates Last.fm API endpoint from `LastfmParams`.
 */
export function generateEndpoint(params: LastfmParams): string {
  const apiRoot = "https://ws.audioscrobbler.com/2.0/";
  const apiKey = env.LASTFM_API_KEY;
  const username = env.LASTFM_USERNAME;

  const paramsQueryString = Object.entries(params)
    .filter(([, val]) => val !== undefined)
    .map(
      ([key, val]) =>
        val !== undefined &&
        (typeof val === "number" ? `${key}=${val.toString()}` : `${key}=${val}`),
    )
    .join("&");

  return `${apiRoot}?${paramsQueryString}&user=${username}&api_key=${apiKey}&format=json`;
}

export function humanizePeriod(period: Period): string {
  switch (period) {
    case "overall":
      return "All time";
    default:
      return `Last ${convertPeriodToDays(period).toString()} days`;
  }
}

export function convertPeriodToDays(period: Period): number {
  switch (period) {
    case "overall":
      return Infinity;
    case "7day":
      return 7;
    case "1month":
      return 30;
    case "3month":
      return 90;
    case "6month":
      return 180;
    case "12month":
      return 365;
  }
}
