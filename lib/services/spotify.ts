import { z } from "zod";

import { env } from "@/app/env.mjs";
import topArtists from "@/lib/data/artists.json";

type AccessToken = z.infer<typeof AccessTokenSchema>;

type Image = z.infer<typeof ImageSchema>;

const tokenEndpoint = "https://accounts.spotify.com/api/token";
const apiEndpoint = "https://api.spotify.com/v1";
const clientID = env.SPOTIFY_CLIENT_ID;
const clientSecret = env.SPOTIFY_CLIENT_SECRET;
const refreshToken = env.SPOTIFY_REFRESH_TOKEN;

const AccessTokenSchema = z.object({
  access_token: z.string(),
  token_type: z.string(),
  expires_in: z.number(),
});

const ImageSchema = z.object({
  url: z.url(),
  width: z.number(),
  height: z.number(),
});

const GetArtistSchema = z.object({
  images: z.array(ImageSchema).nonempty(),
});

const SearchArtistSchema = z.object({
  artists: z.object({
    items: z
      .array(
        z.object({
          images: z.array(ImageSchema).nonempty(),
        }),
      )
      .nonempty(),
  }),
});

async function getAccessToken(): Promise<AccessToken | null> {
  const authToken = btoa(`${clientID}:${clientSecret}`);

  const response = await fetch(tokenEndpoint, {
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
    cache: "no-store",
    headers: {
      Authorization: `Basic ${authToken}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST",
  });
  const result = AccessTokenSchema.safeParse(await response.json());

  if (!result.success) return null;

  return result.data;
}

/**
 * Precomputed lookup table for fast artist name → Spotify ID resolution from
 * the top artists list.
 *
 * Artist names are normalized to lowercase to allow case-insensitive lookups.
 */
const artistIDMap = new Map<string, string>(
  topArtists.map((artist) => [artist.name.toLowerCase(), artist.id]),
);

/**
 * Fetches an artist image from the Spotify Web API.
 *
 * Resolution strategy:
 * 1. Attempt to retrieve the artist's Spotify ID from the predefined list (local lookup).
 * 2. If an ID is found, get the artist's image via the "Get Artist" API.
 * 3. If no ID is found, fall back to the Spotify Search API.
 */
export async function getArtistImage(artistName: string): Promise<Image | null> {
  const artistSpotifyID = artistIDMap.get(artistName.toLowerCase()) ?? null;

  const responseAccessToken = await getAccessToken();

  if (!responseAccessToken) return null;

  const { access_token } = responseAccessToken;

  if (artistSpotifyID) {
    const getArtistResponse = await fetch(`${apiEndpoint}/artists/${artistSpotifyID}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      next: { revalidate: 3600 }, // 1 hour in seconds
    });

    const result = GetArtistSchema.safeParse(await getArtistResponse.json());

    if (!result.success) return null;

    const { images } = result.data;

    return images[1];
  } else {
    const searchArtistsResponse = await fetch(
      `${apiEndpoint}/search?q=${artistName.toLowerCase()}&type=artist&limit=2`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        next: { revalidate: 3600 }, // 1 hour in seconds
      },
    );

    const result = SearchArtistSchema.safeParse(await searchArtistsResponse.json());

    if (!result.success) return null;

    const { artists } = result.data;

    const image: Image = {
      url: artists.items[0].images[1].url,
      width: artists.items[0].images[1].width, // 320
      height: artists.items[0].images[1].height, // 320
    };

    return image;
  }
}
