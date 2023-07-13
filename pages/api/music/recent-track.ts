import { getRecentTracks } from "@/utils/lastfm";

export const config = {
  runtime: "edge",
};

export default async function handler() {
  const recentTrack = await getRecentTracks();

  return new Response(JSON.stringify(recentTrack), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}
