import { IconBlockquote, IconLink, IconPhoto, IconVideo } from "@tabler/icons-react";
import { Suspense } from "react";

import { MAX_BOOKMARKS_COUNT, PLACEHOLDER_CHARACTER } from "@/lib/app-constants";
import { getBookmarks } from "@/lib/services/raindrop";
import dayjs from "@/lib/utils/dayjs";

import Section from "./Section";

function BookmarkItemSkeleton() {
  return (
    <li>
      <div className="grid grid-cols-[auto_1fr] items-center gap-x-1.5">
        <div className="flex h-9 w-12 items-center justify-center bg-gray-900"></div>
        <div className="flex flex-col gap-y-0.5 text-gray-900 @[52rem]/quadrant:gap-y-1">
          <div className="text-[13.5px]/tight @2xl/quadrant:text-sm/snug">
            {PLACEHOLDER_CHARACTER.repeat(20)}
          </div>
          <div className="flex items-center text-[11px]/4 tracking-tight @2xl/quadrant:text-xs">
            <div>{PLACEHOLDER_CHARACTER.repeat(4)}</div>
            <div className="before:px-1.5 before:text-gray-800 before:content-['/']">
              {PLACEHOLDER_CHARACTER.repeat(4)}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

function BookmarkItemsSkeleton() {
  return [...Array<undefined>(MAX_BOOKMARKS_COUNT)].map((_, index) => (
    <BookmarkItemSkeleton key={index} />
  ));
}

async function BookmarkItems() {
  const bookmarks = await getBookmarks(MAX_BOOKMARKS_COUNT);

  if (!bookmarks) return <BookmarkItemsSkeleton />;

  return bookmarks.items.map((bookmark) => (
    <li className="group" key={bookmark._id}>
      <div className="grid grid-cols-[auto_1fr] items-center gap-x-1.5">
        <div
          className="flex h-9 w-12 items-center justify-center transition-colors group-odd:group-hover:text-secondary group-even:group-hover:text-primary"
          title={bookmark.type.charAt(0).toUpperCase() + bookmark.type.slice(1)}
        >
          {bookmark.type === "article" && <IconBlockquote className="size-6" stroke={1.75} />}
          {bookmark.type === "image" && <IconPhoto className="size-6" stroke={1.75} />}
          {bookmark.type === "link" && <IconLink className="size-6" stroke={1.75} />}
          {bookmark.type === "video" && <IconVideo className="size-6" stroke={1.75} />}
        </div>
        <a
          href={bookmark.link}
          className="flex flex-col gap-y-0.5 @[52rem]/quadrant:gap-y-1"
          target="_blank"
        >
          <h4
            className="line-clamp-1 w-fit text-[13.5px]/tight font-medium text-balance text-gray-100 @2xl/quadrant:text-sm/snug"
            title={bookmark.title}
          >
            {bookmark.title}
          </h4>
          <div className="flex items-center text-[11px]/4 tracking-tight @2xl/quadrant:text-xs">
            <time
              className="group-odd:text-primary group-even:text-secondary"
              dateTime={bookmark.created}
            >
              {dayjs(bookmark.created).format("D MMM YYYY")}
            </time>
            {bookmark.tags.length > 0 && (
              <p className="before:px-1.5 before:text-gray-500 before:content-['/']">
                {`#${bookmark.tags[0]}`}
              </p>
            )}
          </div>
        </a>
      </div>
    </li>
  ));
}

export default function Bookmarks() {
  return (
    <Section
      title="Bookmarks"
      customClasses="order-first [--border-accent-color:var(--color-secondary)] @xl/quadrant:order-last @xl/quadrant:[--border-accent-color:var(--color-primary)]"
    >
      <ol className="flex h-full min-h-120 flex-col justify-between gap-y-1.5 md:min-h-124 xl:min-h-full">
        <Suspense fallback={<BookmarkItemsSkeleton />}>
          <BookmarkItems />
        </Suspense>
      </ol>
    </Section>
  );
}
