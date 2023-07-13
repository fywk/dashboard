import { z } from "zod";

import { generateURL } from "./generateURL";

import type {
  Album,
  LastfmParams,
  Limit,
  Period,
  TopAlbums,
  TotalStats,
} from "@/lib/types/lastfm";

const TopAlbumsSchema = z.object({
  topalbums: z.object({
    album: z.array(
      z.object({
        artist: z.object({ name: z.string() }),
        image: z.array(z.object({ "#text": z.string().url() })),
        playcount: z.string(),
        name: z.string(),
      })
    ),
    "@attr": z.object({ total: z.string() }),
  }),
});

/**
 * @param period - The time period over which to retrieve top albums for.
 * @param limit - The number of results to fetch. Defaults to 6. Maximum is 10.
 */
export async function getTopAlbums(
  period: Period,
  limit: Limit = 6
): Promise<TopAlbums> {
  const params: LastfmParams = {
    method: "user.gettopalbums",
    period,
    limit,
  };

  const res = await fetch(generateURL(params), { cache: "no-store" });
  const { topalbums } = TopAlbumsSchema.parse(await res.json());

  const albums: TopAlbums = topalbums.album.map(
    (album): Album => ({
      name: album.name,
      artist: album.artist.name,
      image: album.image.at(3)?.["#text"] ?? "/images/album-error.jpg",
      playcount: album.playcount,
    })
  );

  return albums;
}

/**
 * @param period - The time period over which to retrieve top albums for.
 */
export async function getTotalAlbums(period: Period): Promise<TotalStats> {
  const params: LastfmParams = {
    method: "user.gettopalbums",
    period,
    limit: 1,
  };

  const res = await fetch(generateURL(params), { cache: "no-store" });
  const { topalbums } = TopAlbumsSchema.parse(await res.json());

  return { total: topalbums["@attr"].total };
}
