import { getCurrentWeather } from "@/utils/openweather";

import type { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

export default async function handler(request: NextRequest) {
  const latitude = request.geo?.latitude ?? "3.1415";
  const longitude = request.geo?.longitude ?? "101.6865";

  const weather = await getCurrentWeather(latitude, longitude);

  return new Response(JSON.stringify(weather), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}
