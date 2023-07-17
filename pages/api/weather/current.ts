import { getCurrentWeather } from "@/lib/services/openweather";

import type { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

export default async function handler(request: NextRequest) {
  const latitude = request.geo?.latitude ?? "3.1415";
  const longitude = request.geo?.longitude ?? "101.6865";

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
