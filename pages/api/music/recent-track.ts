import { getRecentTracks } from "@/utils/lastfm";

export const config = {
  runtime: "edge",
};

export default async function handler() {
  const recentTrack = await getRecentTracks();

  if (recentTrack === undefined) {
    return new Response(JSON.stringify({ error: "An error occurred while trying to fetch." }), {
      status: 400,
      headers: {
        "content-type": "application/json",
      },
    });
  }

  return new Response(JSON.stringify(recentTrack), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}
