import pluralize from "pluralize";
import { Suspense } from "react";

import { app } from "@/lib/app-config";
import { MAX_STORIES_COUNT, PLACEHOLDER_CHARACTER } from "@/lib/app-constants";
import { getStoryItem, getTopStories } from "@/lib/services/hacker-news";
import dayjs from "@/lib/utils/dayjs";

import Section from "./Section";

const hackerNewsURL = "https://news.ycombinator.com";

function StorySkeleton() {
  return (
    <li className="flex flex-col gap-y-0.5 text-gray-900 @[52rem]/quadrant:gap-y-1">
      <div className="break-all text-[13.5px]/tight @2xl/quadrant:text-sm/snug">
        {PLACEHOLDER_CHARACTER.repeat(35)}
      </div>
      <div className="flex items-center text-[11px]/4 @2xl/quadrant:text-xs">
        <div className="after:px-1.5 after:text-gray-800 after:content-['/']">
          {PLACEHOLDER_CHARACTER.repeat(4)}
        </div>
        <div className="after:px-1.5 after:text-gray-800 after:content-['/']">
          {PLACEHOLDER_CHARACTER.repeat(4)}
        </div>
        <div>{PLACEHOLDER_CHARACTER.repeat(4)}</div>
      </div>
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
  const publicationTime = dayjs.unix(story.time ?? 0);
  const pubDateISO = publicationTime.utc().format();
  const pubDateHumanized = publicationTime.utc().format(app.defaultDateFormat);
  const relativeTimeSincePublished = publicationTime.fromNow();
  const comments = story.descendants ?? 0;

  return (
    <li className="flex flex-col gap-y-0.5 @[52rem]/quadrant:gap-y-1">
      <h4>
        <a
          href={story.url ?? itemURL}
          className="line-clamp-2 w-fit text-[13.5px]/tight font-medium text-gray-100 [text-wrap:balance] @2xl/quadrant:text-sm/snug"
          title={story.title}
          target="_blank"
        >
          {story.title}
        </a>
      </h4>
      <div className="flex items-center text-[11px]/4 tracking-tight @2xl/quadrant:text-xs">
        <p className="text-primary after:px-1.5 after:text-gray-500 after:content-['/']">
          {pluralize("point", points, true)}
        </p>
        <time
          className="text-secondary after:px-1.5 after:text-gray-500 after:content-['/']"
          title={pubDateHumanized}
          dateTime={pubDateISO}
        >
          {relativeTimeSincePublished}
        </time>
        <a href={itemURL} className="decoration-from-font hover:underline" target="_blank">
          {pluralize("comment", comments, true)}
        </a>
      </div>
    </li>
  );
}

function TopStoriesSkeleton() {
  return [...Array<undefined>(MAX_STORIES_COUNT)].map((_, i) => <StorySkeleton key={i} />);
}

async function TopStories({ data }: { data: Promise<number[] | null> }) {
  const stories = await data;

  if (!stories) {
    return <TopStoriesSkeleton />;
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
      <ol className="flex h-full min-h-[30rem] flex-col justify-between gap-y-1.5 md:min-h-[31rem] xl:min-h-full">
        <Suspense fallback={<TopStoriesSkeleton />}>
          <TopStories data={stories} />
        </Suspense>
      </ol>
    </Section>
  );
}
