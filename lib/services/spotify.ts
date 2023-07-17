import { z } from "zod";

import { env } from "@/app/env.mjs";

type AccessToken = z.infer<typeof AccessTokenSchema>;

type Image = z.infer<typeof ImageSchema>;

const CLIENT_ID = env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = env.SPOTIFY_REFRESH_TOKEN;

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const SEARCH_ENDPOINT = "https://api.spotify.com/v1/search";

const AccessTokenSchema = z.object({
  access_token: z.string(),
  token_type: z.string(),
  expires_in: z.number(),
});

const ImageSchema = z.object({
  url: z.string().url(),
  width: z.number(),
  height: z.number(),
});

const SearchArtistSchema = z.object({
  artists: z.object({
    items: z
      .array(
        z.object({
          images: z.array(ImageSchema).nonempty(),
        })
      )
      .nonempty(),
  }),
});

async function getAccessToken(): Promise<AccessToken | null> {
  const authToken = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);

  const response = await fetch(TOKEN_ENDPOINT, {
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: REFRESH_TOKEN,
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

export async function getArtistImage(artistName: string): Promise<Image | null> {
  const responseAccessToken = await getAccessToken();

  if (!responseAccessToken) return null;

  const { access_token } = responseAccessToken;

  const responseSearchArtists = await fetch(
    `${SEARCH_ENDPOINT}?q=${artistName}&type=artist&limit=1`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      next: { revalidate: 3600 }, // 1 hour in seconds
    }
  );

  const result = SearchArtistSchema.safeParse(await responseSearchArtists.json());

  if (!result.success) return null;

  const { artists } = result.data;

  const image: Image = {
    url: artists.items[0].images[1].url,
    width: artists.items[0].images[1].width,
    height: artists.items[0].images[1].height,
  };

  return image;
}
