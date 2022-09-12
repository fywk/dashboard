import type { NextPage } from "next";
import Head from "next/head";

import Music from "../components/widgets/Music";
import Profile from "../components/widgets/Profile";
import Time from "../components/widgets/Time";
import Weather from "../components/widgets/Weather";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dashboard – Francis Yeong</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
      </Head>
      <div className="mx-auto grid min-h-[calc(100vh-32px)] max-w-[1920px] grid-cols-1 gap-x-10 gap-y-8 px-4 py-8 sm:px-6 md:px-8 [@media(min-width:1440px)]:grid-cols-2">
        <Profile />
        <Music />
        <Weather />
        <Time />
      </div>
    </>
  );
};

export default Home;
