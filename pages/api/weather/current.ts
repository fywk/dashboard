import { getCurrentWeather } from "@/utils/openweather";

import type { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const latitude = searchParams.get("latitude")!;
  const longitude = searchParams.get("longitude")!;

  const weather = await getCurrentWeather(latitude, longitude);

  return new Response(JSON.stringify(weather), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}
