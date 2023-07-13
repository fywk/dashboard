import { z } from "zod";

import { generateURL } from "./generateURL";

import type {
  LastfmParams,
  Limit,
  Period,
  TopTracks,
  TotalStats,
  Track,
} from "@/lib/types/lastfm";

const TopTracksSchema = z.object({
  toptracks: z.object({
    track: z.array(
      z.object({
        name: z.string(),
        artist: z.object({
          name: z.string(),
        }),
      })
    ),
    "@attr": z.object({ total: z.string() }),
  }),
});

/**
 * @param period - The time period over which to retrieve top tracks for.
 * @param limit - The number of results to fetch. Defaults to 6. Maximum is 10.
 */
export async function getTopTracks(
  period: Period,
  limit: Limit = 6
): Promise<TopTracks> {
  const params: LastfmParams = {
    method: "user.gettoptracks",
    period,
    limit,
  };

  const res = await fetch(generateURL(params), { cache: "no-store" });
  const { toptracks } = TopTracksSchema.parse(await res.json());

  const tracks: TopTracks = toptracks.track.map(
    (track): Track => ({
      name: track.name,
      artist: track.artist.name,
    })
  );

  return tracks;
}

/**
 * @param period - The time period over which to retrieve top tracks for.
 */
export async function getTotalTracks(period: Period): Promise<TotalStats> {
  const params: LastfmParams = {
    method: "user.gettoptracks",
    period,
    limit: 1,
  };

  const res = await fetch(generateURL(params), { cache: "no-store" });
  const { toptracks } = TopTracksSchema.parse(await res.json());

  return { total: toptracks["@attr"].total };
}
