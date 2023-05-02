import { Metadata, NextPage } from "next";

import Music from "@/components/Music";
import Profile from "@/components/Profile";
import Time from "@/components/Time";
import Weather from "@/components/Weather";
import { siteConfig } from "@/lib/utils/site-config";
import { SearchParams } from "@/types/misc";

type Props = {
  searchParams: SearchParams;
};

export const metadata: Metadata = {
  title: `Dashboard ${siteConfig.titleSeparator} ${siteConfig.title}`,
};

const DashboardPage: NextPage<Props> = ({ searchParams }) => {
  return (
    <main
      className="mx-auto grid w-full max-w-[1920px] grid-cols-1 gap-x-9 gap-y-7 py-8 md:gap-y-8 min-[1280px]:grid-cols-2 min-[1440px]:grid-cols-[52.5%_auto] min-[1440px]:gap-x-10 min-[1680px]:grid-cols-[55%_auto]"
      id="content"
    >
      <Profile />
      <Music />
      <Weather {...searchParams} />
      <Time />
    </main>
  );
};

export default DashboardPage;
