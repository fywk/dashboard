import { NextResponse } from "next/server";

import { app } from "./lib/app-config";

import type { NextRequest } from "next/server";

export const config = {
  matcher: ["/"],
};

export function middleware(request: NextRequest) {
  const { nextUrl: url, geo } = request;

  // Default values are set since the geo object is only available in production
  const city = geo?.city ?? app.location.city;
  const country = geo?.country ?? app.location.country;
  const latitude = geo?.latitude ?? app.location.latitude;
  const longitude = geo?.longitude ?? app.location.longitude;

  url.searchParams.set("city", city);
  url.searchParams.set("country", country);
  url.searchParams.set("latitude", latitude);
  url.searchParams.set("longitude", longitude);

  return NextResponse.rewrite(url);
}
