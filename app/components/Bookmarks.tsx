import { IconArticle, IconLink, IconMovie, IconPhoto } from "@tabler/icons-react";
import { Suspense } from "react";

import { MAX_BOOKMARKS_COUNT } from "@/lib/app-constants";
import { getBookmarks } from "@/lib/services/raindrop";
import dayjs from "@/lib/utils/dayjs";

import Section from "./Section";

async function BookmarkItems() {
  const bookmarks = await getBookmarks(MAX_BOOKMARKS_COUNT);

  if (!bookmarks) return null;

  return bookmarks.items.map((bookmark) => (
    <li className="group" key={bookmark._id}>
      <div className="grid grid-cols-[auto_1fr] items-center gap-x-1.5">
        <div
          className="flex h-9 w-12 items-center justify-center rounded bg-gray-900 group-odd:text-secondary group-even:text-primary @2xl/quadrant:h-[6.5rem] @2xl/quadrant:w-[6.5rem]"
          title={bookmark.type.charAt(0).toUpperCase() + bookmark.type.slice(1)}
        >
          {bookmark.type === "article" && <IconArticle className="size-6 stroke-[1.5]" />}
          {bookmark.type === "image" && <IconPhoto className="size-6 stroke-[1.5]" />}
          {bookmark.type === "link" && <IconLink className="size-6 stroke-[1.5]" />}
          {bookmark.type === "video" && <IconMovie className="size-6 rotate-90 stroke-[1.5]" />}
        </div>
        <a
          href={bookmark.link}
          className="flex flex-col gap-y-0.5 @[52rem]/quadrant:gap-y-1"
          target="_blank"
        >
          <h4
            className="line-clamp-1 w-fit text-balance text-[13.5px]/tight font-medium text-gray-100 @2xl/quadrant:text-sm/snug"
            title={bookmark.title}
          >
            {bookmark.title}
          </h4>
          <div className="flex items-center text-[11px]/4 tracking-tight @2xl/quadrant:text-xs">
            <time
              className="group-odd:text-secondary group-even:text-primary"
              dateTime={bookmark.created}
            >
              {dayjs(bookmark.created).format("D MMM YYYY")}
            </time>
            {bookmark.tags.length > 0 && (
              <p className="before:px-1.5 before:text-gray-500 before:content-['/']">
                {bookmark.tags[0]}
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
      <Suspense fallback="">
        <ol className="flex h-full min-h-[30rem] flex-col justify-between gap-y-1.5 md:min-h-[31rem] xl:min-h-full">
          <BookmarkItems />
        </ol>
      </Suspense>
    </Section>
  );
}
