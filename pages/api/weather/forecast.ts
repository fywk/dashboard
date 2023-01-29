import { getWeatherForecast } from "@/utils/openweather";

import type { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const latitude = searchParams.get("latitude")!;
  const longitude = searchParams.get("longitude")!;

  const forecast = await getWeatherForecast(latitude, longitude);

  return new Response(JSON.stringify(forecast));
}
