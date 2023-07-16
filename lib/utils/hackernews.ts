import { z } from "zod";

import type { NumericRange } from "../types/utility";

type Limit = NumericRange<1, 8>;

type Story = z.infer<typeof StorySchema>;

const API_ROOT = "https://hacker-news.firebaseio.com/v0";

const TopStoriesSchema = z.array(z.number()).nonempty();

const StorySchema = z.object({
  descendants: z.number().optional(),
  id: z.number(),
  score: z.number().optional(),
  time: z.number().optional(),
  title: z.string().optional(),
  url: z.string().url().optional(),
});

/**
 * @param limit - The number of items to fetch. Positive integer only, in the range of 1-8 inclusive.
 */
export async function getTopStories(limit: Limit): Promise<number[] | null> {
  const response = await fetch(
    `${API_ROOT}/topstories.json?orderBy="$key"&limitToFirst=${limit}`,
    {
      cache: "no-store",
    }
  );
  const result = TopStoriesSchema.safeParse(await response.json());

  if (!result.success) return null;

  return result.data;
}

/**
 * @param id - Hacker News unique item ID
 */
export async function getStoryItem(id: number): Promise<Story | null> {
  const response = await fetch(`${API_ROOT}/item/${id}.json`, {
    cache: "no-store",
  });
  const result = StorySchema.safeParse(await response.json());

  if (!result.success) return null;

  return result.data;
}
