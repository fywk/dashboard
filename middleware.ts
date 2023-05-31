import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - favicon.ico (favicon file)
     * - assets (static assets)
     */
    "/((?!api|_next/static|favicon.ico|assets).*)",
  ],
};

export function middleware(request: NextRequest) {
  const { nextUrl: url, geo } = request;

  // Default values are set since geo object is only available in production
  const city = geo?.city ?? "Kuala Lumpur";
  const country = geo?.country ?? "Malaysia";

  url.searchParams.set("city", city);
  url.searchParams.set("country", country);

  return NextResponse.rewrite(url);
}
