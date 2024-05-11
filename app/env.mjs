import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    LASTFM_USERNAME: z.string().min(1),
    LASTFM_API_KEY: z.string().min(1),
    SPOTIFY_CLIENT_ID: z.string().min(1),
    SPOTIFY_CLIENT_SECRET: z.string().min(1),
    SPOTIFY_REFRESH_TOKEN: z.string().min(1),
    OPENWEATHER_API_KEY: z.string().min(1),
    RAINDROP_BEARER_TOKEN: z.string().min(1),
    RAINDROP_COLLECTION_ID: z.string().optional(),
  },
  experimental__runtimeEnv: {},
});
