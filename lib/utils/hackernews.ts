type Story = {
  id: number;
  deleted?: boolean;
  type: string;
  by?: string;
  time?: number;
  text?: string;
  dead?: boolean;
  kids?: number[];
  url?: string;
  score?: number;
  title?: string;
  descendants?: number;
};

const API_ROOT = "https://hacker-news.firebaseio.com/v0";

export async function getTopStories(limit: number): Promise<number[]> {
  const res = await fetch(
    `${API_ROOT}/topstories.json?orderBy="$key"&limitToFirst=${limit}`,
    {
      cache: "no-store",
    }
  );

  return res.json() as unknown as number[];
}

export async function getStoryItem(id: number): Promise<Story> {
  const res = await fetch(`${API_ROOT}/item/${id}.json`, { cache: "no-store" });

  return res.json() as unknown as Story;
}
