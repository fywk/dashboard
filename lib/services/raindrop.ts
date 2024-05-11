import { z } from "zod";

import { env } from "@/app/env.mjs";

import type { NumericRange } from "../types/utility";

type Limit = NumericRange<1, 50>;

type Bookmarks = z.infer<typeof BookmarksSchema>;

const apiEndpoint = "https://api.raindrop.io/rest/v1";
const bearerToken = env.RAINDROP_BEARER_TOKEN;
const collectionId = env.RAINDROP_COLLECTION_ID ?? 0;

const BookmarksSchema = z.object({
  items: z.array(
    z.object({
      _id: z.number(),
      link: z.string(),
      title: z.string(),
      type: z.enum(["article", "image", "link", "video"]),
      tags: z.array(z.string()),
      created: z.string(),
    }),
  ),
});

export async function getBookmarks(limit: Limit): Promise<Bookmarks | null> {
  const response = await fetch(`${apiEndpoint}/raindrops/${collectionId}?perpage=${limit}`, {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
    next: { revalidate: 3600 }, // 1 hour in seconds
  });
  const result = BookmarksSchema.safeParse(await response.json());

  if (!result.success) return null;

  return result.data;
}
