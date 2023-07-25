import { z } from "zod";

import { generateEndpoint } from "@/lib/utils/lastfm";

import type { LastfmParams, Limit, Period, TopTracks, TotalStats } from "@/lib/types/lastfm";

const TopTracksSchema = z.object({
  toptracks: z.object({
    track: z.array(
      z.object({
        name: z.string(),
        artist: z.object({
          name: z.string(),
        }),
      }),
    ),
    "@attr": z.object({ total: z.string() }),
  }),
});

/**
 * @param period - The time period over which to retrieve top tracks for.
 * @param limit - The number of tracks to fetch.
 */
export async function getTopTracks(period: Period, limit: Limit): Promise<TopTracks | null> {
  const params: LastfmParams = {
    method: "user.gettoptracks",
    period,
    limit,
  };

  const response = await fetch(generateEndpoint(params), { cache: "no-store" });
  const result = TopTracksSchema.safeParse(await response.json());

  if (!result.success) return null;

  const { toptracks } = result.data;
  const tracks: TopTracks = toptracks.track.map((track) => ({
    name: track.name,
    artist: track.artist.name,
  }));

  return tracks;
}

/**
 * @param period - The time period over which to retrieve top tracks for.
 */
export async function getTotalTracks(period: Period): Promise<TotalStats | null> {
  const params: LastfmParams = {
    method: "user.gettoptracks",
    period,
    limit: 1,
  };

  const response = await fetch(generateEndpoint(params), { cache: "no-store" });
  const result = TopTracksSchema.safeParse(await response.json());

  if (!result.success) return null;

  const { toptracks } = result.data;

  return { total: toptracks["@attr"].total };
}
