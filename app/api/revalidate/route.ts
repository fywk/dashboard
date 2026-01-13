/**
 * This is the revalidation route handler for On-Demand Revalidation.
 *
 * @example
 * GET `https://<your-site.com>/api/revalidate?tag=<valid-tag>&secret=<secret-token>`
 */

import { revalidateTag } from "next/cache";

import { env } from "@/app/env.mjs";

import type { NextRequest } from "next/server";

export function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const secret = searchParams.get("secret");
  const tag = searchParams.get("tag");

  if (!secret || !tag)
    return new Response(
      JSON.stringify({
        revalidated: false,
        message: "Missing secret and/or tag parameter",
        now: Date.now(),
      }),
      { status: 400 },
    );

  // Check for secret to confirm this is a valid request
  if (secret !== env.DASHBOARD_BOOKMARKS_REVALIDATION_TOKEN) {
    return new Response(
      JSON.stringify({
        revalidated: false,
        message: "Invalid secret token",
        now: Date.now(),
      }),
      { status: 401 },
    );
  }

  try {
    revalidateTag(tag, "max");
  } catch (error) {
    return new Response(
      JSON.stringify({
        revalidated: false,
        message: (error as Error).message,
        now: Date.now(),
      }),
      { status: 400 },
    );
  }

  return new Response(
    JSON.stringify({
      revalidated: true,
      message: `Successfully revalidated ${tag} tag`,
      now: Date.now(),
    }),
  );
}
