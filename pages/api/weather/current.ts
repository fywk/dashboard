import { geolocation } from "@vercel/functions";

import { app } from "@/lib/app-config";
import { getCurrentWeather } from "@/lib/services/openweather";

import type { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

export default async function handler(request: NextRequest) {
  const latitude = geolocation(request)?.latitude ?? app.location.latitude;
  const longitude = geolocation(request)?.longitude ?? app.location.longitude;

  const currentWeather = await getCurrentWeather(latitude, longitude);

  if (!currentWeather) {
    return new Response(JSON.stringify({ error: "An error occurred while trying to fetch." }), {
      status: 400,
      headers: {
        "content-type": "application/json",
      },
    });
  }

  return new Response(JSON.stringify(currentWeather), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}
