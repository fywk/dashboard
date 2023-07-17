import { z } from "zod";

import { generateURL } from "./generateURL";

import type { LastfmParams, Limit, RecentTrack, Timestamp } from "@/lib/types/lastfm";

const RecentTracksSchema = z.object({
  recenttracks: z.object({
    track: z
      .array(
        z.object({
          artist: z.object({ name: z.string() }),
          date: z.optional(z.object({ uts: z.string() })),
          name: z.string(),
          image: z.array(z.object({ "#text": z.string().url() })).length(4),
          album: z.object({ "#text": z.string() }),
          loved: z.enum(["0", "1"]),
        })
      )
      .nonempty(),
    "@attr": z.object({ total: z.string() }),
  }),
});

/**
 * @param from - Only fetch results after this time, in Unix timestamp format (seconds, 10-digit).
 * @param limit - The number of results to fetch. Defaults to 1. Maximum is 10.
 */
export async function getRecentTracks(
  from?: Timestamp,
  limit: Limit = 1
): Promise<RecentTrack | null> {
  const params: LastfmParams = {
    method: "user.getrecenttracks",
    limit,
    from,
    extended: "1",
  };

  const response = await fetch(generateURL(params));
  const result = RecentTracksSchema.safeParse(await response.json());

  if (!result.success) return null;

  const { recenttracks } = result.data;
  const firstTrack = recenttracks.track.at(0);

  if (!firstTrack) return null;

  const { artist, image, album, name, loved } = firstTrack;
  const timestamp = firstTrack.date !== undefined && +firstTrack.date.uts;
  const track: RecentTrack["track"] = {
    name,
    artist: artist.name,
    album: album["#text"],
    image: image.at(3)?.["#text"] ?? "/images/album-error.jpg",
    ...(timestamp && { timestamp }),
    loved: loved === "1",
  };

  const total: RecentTrack["total"] = recenttracks["@attr"].total;

  return { track, total };
}
