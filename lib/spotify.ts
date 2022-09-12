import { ArtistImage } from "./types/spotify";

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const SEARCH_ENDPOINT = "https://api.spotify.com/v1/search";

const getAccessToken = async () => {
  const authToken = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);

  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      "Authorization": `Basic ${authToken}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: REFRESH_TOKEN!,
    }),
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
    }
  );

  const { artists } = await response.json();

  const image: ArtistImage = {
    url: artists.items[0].images[2].url,
    width: artists.items[0].images[2].width,
    height: artists.items[0].images[2].height,
  };

  return image;
};
