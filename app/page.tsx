import Music from "@/components/Music";
import Profile from "@/components/Profile";
import Time from "@/components/Time";
import Weather from "@/components/Weather";
import { siteConfig } from "@/lib/utils/site-config";

import type { Metadata, NextPage } from "next";

import type { SearchParams } from "@/types/misc";

type Props = {
  searchParams: SearchParams;
};

export const metadata: Metadata = {
  title: `Dashboard ${siteConfig.titleSeparator} ${siteConfig.title}`,
};

const DashboardPage: NextPage<Props> = ({ searchParams }) => {
  return (
    <div
      className="mx-auto grid min-h-[100dvh] max-w-[1680px] grid-cols-1 content-between gap-y-8 py-8"
      id="content"
    >
      <main className="grid grid-cols-[repeat(1,minmax(0,800px))] justify-center gap-x-9 gap-y-7 md:gap-y-8 min-[1280px]:grid-cols-[repeat(2,minmax(0,800px))] min-[1440px]:grid-cols-[52.5%_1fr] min-[1440px]:gap-x-10">
        <Profile />
        <Music />
        <Weather {...searchParams} />
        <Time />
      </main>
    </div>
  );
};

export default DashboardPage;
