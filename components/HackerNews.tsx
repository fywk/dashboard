import { Suspense } from "react";

import dayjs from "@/lib/utils/dayjs";
import { getStoryItem, getTopStories } from "@/lib/utils/hackernews";
import { pluralize } from "@/lib/utils/pluralize";

import Section from "./Section";

const MAX_NEWS_AMOUNT = 8;
const HN_BASE_URL = "https://news.ycombinator.com";

const Story = async ({ storyID }: { storyID: number }) => {
  const story = await getStoryItem(storyID);

  const hnItemPage = `${HN_BASE_URL}/item?id=${storyID}`;

  return (
    <li className="flex flex-col gap-y-0.5 tracking-tight">
      <h4>
        <a
          href={story.url ?? hnItemPage}
          target="_blank"
          className="line-clamp-2 w-fit text-sm font-medium text-gray-100"
        >
          {story.title}
        </a>
      </h4>
      <div className="flex items-center text-xs">
        <p className="text-primary after:px-1 after:text-gray-600 after:content-['/']">
          {pluralize(story.score ?? 0, "point")}
        </p>
        <p className="text-secondary after:px-1 after:text-gray-600 after:content-['/']">
          {dayjs.unix(story.time ?? 0).fromNow()}
        </p>
        <a
          href={hnItemPage}
          className="w-fit decoration-from-font hover:underline"
          target="_blank"
        >
          {pluralize(story.descendants ?? 0, "comment")}
        </a>
      </div>
    </li>
  );
};

const StorySkeleton = () => {
  return (
    <li className="flex flex-col gap-y-2">
      <div className="h-3 w-full rounded-full bg-gray-900"></div>
      <div className="h-3 w-3/4 rounded-full bg-gray-900"></div>
    </li>
  );
};

const TopStories = async () => {
  const stories = await getTopStories(MAX_NEWS_AMOUNT);

  return stories?.map((story) => (
    <Suspense fallback={<StorySkeleton />} key={story}>
      {/* @ts-expect-error Server Component */}
      <Story storyID={story} />
    </Suspense>
  ));
};

const HackerNews = () => {
  return (
    <Section
      title={
        <a href={HN_BASE_URL} target="_blank">
          Hacker News
        </a>
      }
      customClasses="order-last @xl/quadrant:order-first"
    >
      <ol className="grid h-full max-h-[514px] min-h-[416px] list-inside list-decimal grid-cols-1 justify-between gap-y-2">
        <Suspense>
          {/* @ts-expect-error Server Component */}
          <TopStories />
        </Suspense>
      </ol>
    </Section>
  );
};

export default HackerNews;
