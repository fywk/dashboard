import type { NextRequest } from "next/server";
import { getRecentTrack } from "../../../lib/lastfm";

export const config = {
  runtime: "experimental-edge",
};

export default async function handler(req: NextRequest) {
  const SECONDS_IN_WEEK = 604_800;
  const unixTimestamp = Math.floor(Date.now() / 1000); // Current UNIX timestamp in seconds
  const _7DaysAgo = unixTimestamp - SECONDS_IN_WEEK;

  const recentTrack = await getRecentTrack(_7DaysAgo);

  return new Response(JSON.stringify(recentTrack), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}
