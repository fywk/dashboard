import { z } from "zod";

import { generateEndpoint } from "@/lib/utils/lastfm";

import type { LastfmParams, Limit, Period, TopAlbums, TotalStats } from "@/lib/types/lastfm";

const TopAlbumsSchema = z.object({
  topalbums: z.object({
    album: z.array(
      z.object({
        artist: z.object({ name: z.string() }),
        image: z.array(z.object({ "#text": z.string().url() })).length(4),
        playcount: z.string(),
        name: z.string(),
      }),
    ),
    "@attr": z.object({ total: z.string() }),
  }),
});

/**
 * @param period - The time period over which to retrieve top albums for.
 * @param limit - The number of albums to fetch.
 */
export async function getTopAlbums(period: Period, limit: Limit): Promise<TopAlbums | null> {
  const params: LastfmParams = {
    method: "user.gettopalbums",
    period,
    limit,
  };

  const response = await fetch(generateEndpoint(params), { cache: "no-store" });
  const result = TopAlbumsSchema.safeParse(await response.json());

  if (!result.success) return null;

  const { topalbums } = result.data;
  const albums: TopAlbums = topalbums.album.map((album) => ({
    name: album.name,
    artist: album.artist.name,
    image: album.image.at(3)?.["#text"] ?? "/images/album-error.jpg",
    playcount: album.playcount,
  }));

  return albums;
}

/**
 * @param period - The time period over which to retrieve top albums for.
 */
export async function getTotalAlbums(period: Period): Promise<TotalStats | null> {
  const params: LastfmParams = {
    method: "user.gettopalbums",
    period,
    limit: 1,
  };

  const response = await fetch(generateEndpoint(params), { cache: "no-store" });
  const result = TopAlbumsSchema.safeParse(await response.json());

  if (!result.success) return null;

  const { topalbums } = result.data;

  return { total: topalbums["@attr"].total };
}
