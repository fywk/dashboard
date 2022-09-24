import type { NextRequest } from "next/server";
import { getRecentTrack } from "../../../lib/lastfm";

export const config = {
  runtime: "experimental-edge",
};

export default async function handler(req: NextRequest) {
  const ONE_WEEK_IN_SECONDS = 604_800;
  const unixTimestamp = Math.floor(Date.now() / 1000); // current Unix timestamp (seconds, 10-digit)
  const _7DaysAgo = unixTimestamp - ONE_WEEK_IN_SECONDS;

  const recentTrack = await getRecentTrack(_7DaysAgo);

  return new Response(JSON.stringify(recentTrack), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}
