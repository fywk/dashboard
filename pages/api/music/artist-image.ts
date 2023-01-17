import type { NextRequest } from "next/server";
import { getArtistImage } from "../../../lib/spotify";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");

  if (!name) {
    return new Response("Invalid URL", {
      status: 400,
    });
  }

  const imageURL = await getArtistImage(name);

  return new Response(JSON.stringify(imageURL), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}
