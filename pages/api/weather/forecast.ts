import { getWeatherForecast } from "@/utils/openweather";

import type { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const latitude = searchParams.get("latitude")!;
  const longitude = searchParams.get("longitude")!;

  const forecast = await getWeatherForecast(latitude, longitude);

  return new Response(JSON.stringify(forecast), {
    status: 200,
    headers: {
      "content-type": "application/json",
      "cache-control": "public, s-maxage=3600, stale-while-revalidate=1800",
    },
  });
}
