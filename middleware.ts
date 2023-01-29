import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export const config = {
  matcher: ["/", "/dashboard", "/api/weather/:path*"],
};

export function middleware(req: NextRequest) {
  const { nextUrl: url, geo } = req;

  // Default values are set since geo object is only available in production
  const city = geo?.city || "Kuala Lumpur";
  const country = geo?.country || "Malaysia";
  const latitude = geo?.latitude || "3.1502";
  const longitude = geo?.longitude || "101.7077";

  url.searchParams.set("city", city);
  url.searchParams.set("country", country);
  url.searchParams.set("latitude", latitude);
  url.searchParams.set("longitude", longitude);

  return NextResponse.rewrite(url);
}
