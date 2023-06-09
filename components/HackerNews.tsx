import { Suspense } from "react";

import dayjs from "@/lib/utils/dayjs";
import { getStoryItem, getTopStories } from "@/lib/utils/hackernews";
import { pluralize } from "@/lib/utils/pluralize";

import Section from "./Section";

const MAX_STORIES_COUNT = 8;
const HN_BASE_URL = "https://news.ycombinator.com";

const Story = async ({ storyID }: { storyID: number }) => {
  const story = await getStoryItem(storyID);

  const hnItemURL = `${HN_BASE_URL}/item?id=${storyID}`;
  const humanizedTimestamp = dayjs.unix(story.time ?? 0).utc().format(); // prettier-ignore
  const timeSincePosted = dayjs.unix(story.time ?? 0).fromNow();

  return (
    <li className="flex flex-col gap-y-px tracking-tight @2xl/quadrant:gap-y-0.5">
      <h4>
        <a
          href={story.url ?? hnItemURL}
          target="_blank"
          className="line-clamp-2 w-fit text-[13px]/[1.125rem] font-medium text-gray-100 @2xl/quadrant:text-sm"
        >
          {story.title}
        </a>
      </h4>
      <div className="flex items-center text-[11px]/4 @2xl/quadrant:text-xs">
        <p className="text-primary after:px-0.5 after:text-gray-600 after:content-['｜']">
          {pluralize(story.score ?? 0, "point")}
        </p>
        <p
          className="text-secondary after:px-0.5 after:text-gray-600 after:content-['｜']"
          title={humanizedTimestamp}
        >
          {timeSincePosted}
        </p>
        <a
          href={hnItemURL}
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
  const stories = await getTopStories(MAX_STORIES_COUNT);

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
      <ol className="grid h-full max-h-[514px] min-h-[458px] grid-cols-1 justify-between gap-y-2.5">
        <Suspense>
          {/* @ts-expect-error Server Component */}
          <TopStories />
        </Suspense>
      </ol>
    </Section>
  );
};

export default HackerNews;
