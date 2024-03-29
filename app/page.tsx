import { app } from "@/lib/app-config";

import HackerNews from "./components/HackerNews";
import Header from "./components/Header";
import Logo from "./components/Logo";
import Music from "./components/Music";
import Profile from "./components/Profile";
import Time from "./components/Time";
import Weather from "./components/Weather";

import type { Metadata } from "next";

import type { SearchParams } from "@/lib/types/app";

type Props = {
  searchParams: SearchParams;
};

export const metadata: Metadata = {
  title: [app.title, app.user].join(app.titleSeparator),
  description: app.description,
};

export default function Page({ searchParams }: Props) {
  return (
    <div className="mx-auto grid w-full max-w-[800px] grid-cols-[1fr_auto] items-center gap-x-8 gap-y-6 sm:gap-x-9 xl:max-w-none 2xl:gap-x-10">
      <Header />
      <a
        href="/"
        className="flex w-[5.5rem] items-center rounded-[10px] rounded-r-none border-3 border-r-0 border-primary p-1 pr-0 text-primary"
        title="Refresh page"
        aria-label="Refresh page"
      >
        <Logo />
      </a>
      <main className="col-span-full grid grid-cols-1 justify-center gap-x-9 gap-y-7 md:gap-y-8 xl:grid-cols-2 2xl:grid-cols-[52.5%_1fr] 2xl:gap-x-10">
        <div className="@container/quadrant">
          <div className="grid h-full gap-x-9 gap-y-7 @xl/quadrant:grid-cols-[45%_1fr] @1.5xl/quadrant:grid-cols-[42.5%_1fr] @2xl/quadrant:grid-cols-[40%_1fr] @[45rem]/quadrant:grid-cols-[37.5%_1fr] @3xl/quadrant:grid-cols-[35%_1fr] md:gap-y-8 2xl:gap-x-10">
            <Profile />
            <HackerNews />
          </div>
        </div>
        <Music />
        <Weather {...searchParams} />
        <Time />
      </main>
    </div>
  );
}
