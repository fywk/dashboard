import { geolocation } from "@vercel/functions";

import { app } from "@/lib/app-config";
import { getWeatherForecast } from "@/lib/services/openweather";

import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const latitude = geolocation(request).latitude ?? app.location.latitude;
  const longitude = geolocation(request).longitude ?? app.location.longitude;

  const weatherForecast = await getWeatherForecast(latitude, longitude);

  if (!weatherForecast) {
    return Response.json({ error: "An error occurred while trying to fetch." }, { status: 400 });
  }

  return Response.json(weatherForecast);
}
