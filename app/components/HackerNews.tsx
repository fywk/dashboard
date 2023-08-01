import pluralize from "pluralize";
import { Suspense } from "react";

import { app } from "@/lib/app-config";
import { MAX_STORIES_COUNT } from "@/lib/app-constants";
import { getStoryItem, getTopStories } from "@/lib/services/hacker-news";
import dayjs from "@/lib/utils/dayjs";

import Section from "./Section";

const hackerNewsURL = "https://news.ycombinator.com";

function StorySkeleton() {
  return (
    <li className="flex flex-col gap-y-2">
      <div className="h-2.5 w-full rounded bg-gray-900"></div>
      <div className="h-2.5 w-3/4 rounded bg-gray-900"></div>
      <div className="h-2 w-1/2 rounded bg-gray-900"></div>
    </li>
  );
}

async function Story({ storyID }: { storyID: number }) {
  const story = await getStoryItem(storyID);

  if (!story) {
    return <StorySkeleton />;
  }

  const itemURL = `${hackerNewsURL}/item?id=${storyID}`;
  const points = story.score ?? 0;
  const publishedTime = dayjs.unix(story.time ?? 0).utc();
  const isoDate = publishedTime.format();
  const humanizedDate = publishedTime.format(app.defaultDateFormat);
  const relativeTimeSincePosted = dayjs.unix(story.time ?? 0).fromNow();
  const comments = story.descendants ?? 0;

  return (
    <li className="flex flex-col gap-y-0.5 @1.5xl/quadrant:gap-y-1">
      <h4>
        <a
          href={story.url ?? hnItemURL}
          className="line-clamp-2 w-fit text-[13px]/4 font-medium text-gray-100 [text-wrap:balance] @1.5xl/quadrant:text-sm/[18px]"
          title={story.title}
          target="_blank"
        >
          {story.title}
        </a>
      </h4>
      <div className="flex items-center text-[11px]/4 tracking-tight @1.5xl/quadrant:text-xs">
        <p className="text-primary after:px-1.5 after:text-gray-600 after:content-['/']">
          {pluralize("point", points, true)}
        </p>
        <time
          className="text-secondary after:px-1.5 after:text-gray-600 after:content-['/']"
          title={humanizedDate}
          dateTime={isoDate}
        >
          {relativeTimeSincePosted}
        </time>
        <a href={itemURL} className="decoration-from-font hover:underline" target="_blank">
          {pluralize("comment", comments, true)}
        </a>
      </div>
    </li>
  );
}

async function TopStories({ data }: { data: Promise<number[] | null> }) {
  const stories = await data;

  if (!stories) {
    return <StorySkeleton />;
  }

  return stories.map((storyID) => (
    <Suspense fallback={<StorySkeleton />} key={storyID}>
      <Story storyID={storyID} />
    </Suspense>
  ));
}

export default function HackerNews() {
  const stories = getTopStories(MAX_STORIES_COUNT);

  return (
    <Section
      title={
        <a href={hackerNewsURL} target="_blank">
          Hacker News
        </a>
      }
      customClasses="order-last @xl/quadrant:order-first"
    >
      <ol className="flex h-full min-h-[480px] flex-col justify-between gap-y-1.5 @1.5xl/quadrant:gap-y-2 xl:min-h-full">
        <Suspense>
          <TopStories data={stories} />
        </Suspense>
      </ol>
    </Section>
  );
}
