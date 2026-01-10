import { getRecentTracks } from "@/lib/services/lastfm";

export const config = {
  runtime: "edge",
};

export default async function handler() {
  const recentTracks = await getRecentTracks();

  if (!recentTracks) {
    return new Response(JSON.stringify({ error: "An error occurred while trying to fetch." }), {
      status: 400,
      headers: {
        "content-type": "application/json",
      },
    });
  }

  return new Response(JSON.stringify(recentTracks.at(0)), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}
