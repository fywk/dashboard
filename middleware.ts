import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/", "/dashboard", "/api/weather/:path*"],
};

export function middleware(req: NextRequest) {
  const { nextUrl: url, geo } = req;

  // Default values are set since geo object is only available in production
  const city = geo?.city || "Kuala Lumpur";
  const country = geo?.country || "Malaysia";
  const lat = geo?.latitude || "3.1502";
  const long = geo?.longitude || "101.7077";

  url.searchParams.set("city", city);
  url.searchParams.set("country", country);
  url.searchParams.set("latitude", lat);
  url.searchParams.set("longitude", long);

  return NextResponse.rewrite(url);
}
