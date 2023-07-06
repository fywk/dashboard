import pluralize from "pluralize";
import { Suspense } from "react";

import dayjs from "@/lib/utils/dayjs";
import { getStoryItem, getTopStories } from "@/lib/utils/hackernews";

import Section from "./Section";

const MAX_STORIES_COUNT = 8;
const HN_BASE_URL = "https://news.ycombinator.com";

const Story = async ({ storyID }: { storyID: number }) => {
  const story = await getStoryItem(storyID);

  const hnItemURL = `${HN_BASE_URL}/item?id=${storyID}`;
  const points = story.score ?? 0;
  const humanizedTimestamp = dayjs.unix(story.time ?? 0).utc().format(); // prettier-ignore
  const timeSincePosted = dayjs.unix(story.time ?? 0).fromNow();
  const comments = story.descendants ?? 0;

  return (
    <li className="flex flex-col gap-y-0.5 tracking-tight @1.5xl/quadrant:gap-y-1">
      <h4>
        <a
          href={story.url ?? hnItemURL}
          target="_blank"
          className="line-clamp-2 w-fit text-[13px]/4 font-medium text-gray-100 @1.5xl/quadrant:text-sm/[18px]"
        >
          {story.title}
        </a>
      </h4>
      <div className="flex items-center text-[11px]/4 @1.5xl/quadrant:text-xs">
        <p className="text-primary after:px-1.5 after:text-gray-600 after:content-['/']">
          {pluralize("point", points, true)}
        </p>
        <p
          className="text-secondary after:px-1.5 after:text-gray-600 after:content-['/']"
          title={humanizedTimestamp}
        >
          {timeSincePosted}
        </p>
        <a
          href={hnItemURL}
          className="w-fit decoration-from-font hover:underline"
          target="_blank"
        >
          {pluralize("comment", comments, true)}
        </a>
      </div>
    </li>
  );
};

const StorySkeleton = () => {
  return (
    <li className="flex flex-col gap-y-2">
      <div className="h-2.5 w-full rounded bg-gray-900"></div>
      <div className="h-2.5 w-3/4 rounded bg-gray-900"></div>
      <div className="h-2 w-1/2 rounded bg-gray-900"></div>
    </li>
  );
};

const TopStories = async () => {
  const stories = await getTopStories(MAX_STORIES_COUNT);

  return stories?.map((story) => (
    <Suspense fallback={<StorySkeleton />} key={story}>
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
      <ol className="flex h-full min-h-[480px] flex-col justify-between gap-y-1.5 @1.5xl/quadrant:gap-y-2 xl:min-h-full">
        <Suspense>
          <TopStories />
        </Suspense>
      </ol>
    </Section>
  );
};

export default HackerNews;