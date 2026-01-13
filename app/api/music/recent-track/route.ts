import { getRecentTracks } from "@/lib/services/lastfm";

export async function GET() {
  const recentTracks = await getRecentTracks();

  if (!recentTracks) {
    return Response.json({ error: "An error occurred while trying to fetch." }, { status: 400 });
  }

  return Response.json(recentTracks.at(0));
}
