import { NextPage } from "next";

import { SearchParams } from "../../../lib/types/misc";
import Music from "../components/Music";
import Profile from "../components/Profile";
import Time from "../components/Time";
import Weather from "../components/Weather";

type Props = {
  searchParams: SearchParams;
};

const DashboardPage: NextPage<Props> = ({ searchParams }) => {
  return (
    <div className="mx-auto grid w-full max-w-[1920px] grid-cols-1 gap-x-10 gap-y-7 px-4 py-8 sm:px-6 md:gap-y-8 md:px-8 min-[1440px]:grid-cols-[55%_auto]">
      <Profile />
      <Music />
      <Weather {...searchParams} />
      <Time />
    </div>
  );
};

export default DashboardPage;
