import type { NextRequest } from "next/server";
import { getTopAlbums, isValidPeriod } from "../../../lib/lastfm";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const period = searchParams.get("period");
  const limit = searchParams.get("limit");

  if (
    !isValidPeriod(period) ||
    (limit && isNaN(Number(limit))) ||
    (limit && Number(limit) < 1)
  ) {
    return new Response("Invalid URL", {
      status: 400,
    });
  }

  const topAlbums = !limit
    ? await getTopAlbums(period)
    : await getTopAlbums(period, Number(limit));

  return new Response(JSON.stringify(topAlbums), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}
