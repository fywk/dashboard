import { env } from "@/app/env.mjs";

import type { LastfmParams } from "@/lib/types/lastfm";

const API_KEY = env.LASTFM_API_KEY;
const USERNAME = env.LASTFM_USERNAME;

const API_ROOT = "https://ws.audioscrobbler.com/2.0/";

export function generateURL(params: LastfmParams): string {
  const stringifyParams = Object.entries(params)
    .map(([key, val]) => typeof val !== "undefined" && `${key}=${val}`)
    .join("&");

  return `${API_ROOT}?${stringifyParams}&user=${USERNAME}&api_key=${API_KEY}&format=json`;
}
