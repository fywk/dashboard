import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    SITE_BASE_URL: z.string().min(1).optional(),
    VERCEL_ACCESS_TOKEN: z.string().min(1),
    LASTFM_USERNAME: z.string().min(1),
    LASTFM_API_KEY: z.string().min(1),
    SPOTIFY_CLIENT_ID: z.string().min(1),
    SPOTIFY_CLIENT_SECRET: z.string().min(1),
    SPOTIFY_REFRESH_TOKEN: z.string().min(1),
    OPENWEATHER_API_KEY: z.string().min(1),
  },
  client: {},
  runtimeEnv: {
    SITE_BASE_URL: process.env.SITE_BASE_URL,
    VERCEL_ACCESS_TOKEN: process.env.VERCEL_ACCESS_TOKEN,
    LASTFM_USERNAME: process.env.LASTFM_USERNAME,
    LASTFM_API_KEY: process.env.LASTFM_API_KEY,
    SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
    SPOTIFY_REFRESH_TOKEN: process.env.SPOTIFY_REFRESH_TOKEN,
    OPENWEATHER_API_KEY: process.env.OPENWEATHER_API_KEY,
  },
});
