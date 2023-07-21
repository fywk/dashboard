import { z } from "zod";

import { generateEndpoint } from "@/lib/utils/lastfm";

import type { LastfmParams, Limit, Period, TopArtists, TotalStats } from "@/lib/types/lastfm";

const TopArtistsSchema = z.object({
  topartists: z.object({
    artist: z
      .array(
        z.object({
          name: z.string(),
          playcount: z.string(),
        }),
      )
      .nonempty(),
    "@attr": z.object({ total: z.string() }),
  }),
});

/**
 * @param period - The time period over which to retrieve top artists for.
 * @param limit - The number of results to fetch. Defaults to 6. Maximum is 10.
 */
export async function getTopArtists(period: Period, limit: Limit = 6): Promise<TopArtists | null> {
  const params: LastfmParams = {
    method: "user.gettopartists",
    period,
    limit,
  };

  const response = await fetch(generateEndpoint(params), { cache: "no-store" });
  const result = TopArtistsSchema.safeParse(await response.json());

  if (!result.success) return null;

  const { topartists } = result.data;
  const artists: TopArtists = topartists.artist.map((artist) => ({
    name: artist.name,
    playcount: artist.playcount,
  }));

  return artists;
}

/**
 * @param period - The time period over which to retrieve top artists for.
 */
export async function getTotalArtists(period: Period): Promise<TotalStats | null> {
  const params: LastfmParams = {
    method: "user.gettopartists",
    period,
    limit: 1,
  };

  const response = await fetch(generateEndpoint(params), { cache: "no-store" });
  const result = TopArtistsSchema.safeParse(await response.json());

  if (!result.success) return null;

  const { topartists } = result.data;

  return { total: topartists["@attr"].total };
}
