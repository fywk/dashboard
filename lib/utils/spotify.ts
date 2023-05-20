import { env } from "@/lib/env.mjs";

import type { ArtistImage } from "@/types/spotify";

const CLIENT_ID = env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = env.SPOTIFY_REFRESH_TOKEN;

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const SEARCH_ENDPOINT = "https://api.spotify.com/v1/search";

const getAccessToken = async () => {
  const authToken = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);

  const response = await fetch(TOKEN_ENDPOINT, {
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: REFRESH_TOKEN!,
    }),
    cache: "no-store",
    headers: {
      Authorization: `Basic ${authToken}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST",
  });

  return response.json();
};

export const getArtistImage = async (
  artist_name: string
): Promise<ArtistImage> => {
  const { access_token } = await getAccessToken();

  const response = await fetch(
    `${SEARCH_ENDPOINT}?q=${artist_name}&type=artist&limit=1`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      next: { revalidate: 3600 }, // 1 hour in seconds
    }
  );

  const { artists } = await response.json();

  const image: ArtistImage = {
    url: artists.items[0].images[1].url,
    width: artists.items[0].images[1].width,
    height: artists.items[0].images[1].height,
  };

  return image;
};
