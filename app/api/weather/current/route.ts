import { geolocation } from "@vercel/functions";

import { app } from "@/lib/app-config";
import { getCurrentWeather } from "@/lib/services/openweather";

import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const latitude = geolocation(request).latitude ?? app.location.latitude;
  const longitude = geolocation(request).longitude ?? app.location.longitude;

  const currentWeather = await getCurrentWeather(latitude, longitude);

  if (!currentWeather) {
    return Response.json({ error: "An error occurred while trying to fetch." }, { status: 400 });
  }

  return Response.json(currentWeather);
}
