import type { NextRequest } from "next/server";
import { getCurrentWeather } from "../../../lib/openweather";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const latitude = searchParams.get("latitude")!;
  const longitude = searchParams.get("longitude")!;

  const weather = await getCurrentWeather(latitude, longitude);

  return new Response(JSON.stringify(weather));
}
