import type { NextRequest } from "next/server";
import { getTrackTotal, isValidPeriod } from "../../../lib/lastfm";

export const config = {
  runtime: "experimental-edge",
};

export default async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const period = searchParams.get("period");

  if (!isValidPeriod(period)) {
    return new Response("Invalid URL", {
      status: 400,
    });
  }

  const trackTotal = await getTrackTotal(period);

  return new Response(JSON.stringify(trackTotal), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}
