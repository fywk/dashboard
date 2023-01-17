import type { NextRequest } from "next/server";
import { getArtistTotal, isValidPeriod } from "../../../lib/lastfm";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const period = searchParams.get("period");

  if (!isValidPeriod(period)) {
    return new Response("Invalid URL", {
      status: 400,
    });
  }

  const artistTotal = await getArtistTotal(period);

  return new Response(JSON.stringify(artistTotal), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}
