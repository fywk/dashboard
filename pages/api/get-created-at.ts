import type { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  const url = process.env.NEXT_PUBLIC_VERCEL_URL ?? process.env.SITE_BASE_URL;
  const res = await fetch(`https://api.vercel.com/v6/deployments/${url}`, {
    headers: {
      Authorization: `Bearer ${process.env.VERCEL_ACCESS_TOKEN}`,
    },
  });

  const deployment = await res.json();
  const createdAt = deployment.createdAt;

  return new Response(JSON.stringify(createdAt), {
    status: 200,
    headers: {
      "content-type": "application/json",
      "cache-control": "public, s-maxage=1200, stale-while-revalidate=600",
    },
  });
}
