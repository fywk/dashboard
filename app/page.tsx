import { siteConfig as site } from "@/lib/utils/site-config";

import HackerNews from "./components/HackerNews";
import Music from "./components/Music";
import Profile from "./components/Profile";
import Time from "./components/Time";
import Weather from "./components/Weather";

import type { Metadata, NextPage } from "next";

import type { SearchParams } from "@/types/misc";

type Props = {
  searchParams: SearchParams;
};

export const metadata: Metadata = {
  title: ["Dashboard", site.title].join(site.titleSeparator),
};

const DashboardPage: NextPage<Props> = ({ searchParams }) => {
  return (
    <div
      className="mx-auto grid min-h-[100dvh] max-w-[1680px] grid-cols-1 content-between gap-y-8 py-8"
      id="content"
    >
      <main className="grid grid-cols-[repeat(1,minmax(0,800px))] justify-center gap-x-9 gap-y-7 md:gap-y-8 xl:grid-cols-[repeat(2,minmax(0,800px))] min-[1440px]:grid-cols-[52.5%_1fr] min-[1440px]:gap-x-10">
        <div className="@container/quadrant">
          <div className="grid h-full gap-x-9 gap-y-7 @xl/quadrant:grid-cols-[45%_1fr] @1.5xl/quadrant:grid-cols-[42.5%_1fr] @2xl/quadrant:grid-cols-[40%_1fr] @2xl:gap-x-10 @[45rem]/quadrant:grid-cols-[37.5%_1fr] @3xl/quadrant:grid-cols-[35%_1fr] md:gap-y-8">
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
};

export default DashboardPage;
