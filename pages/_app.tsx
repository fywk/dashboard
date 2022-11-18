import "../styles/globals.css";

import Head from "next/head";

import { Oxanium } from "@next/font/google";

import type { AppProps } from "next/app";

const oxanium = Oxanium({
  display: "swap",
  variable: "--font-oxanium",
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <link rel="icon" href="/favicons/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicons/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicons/apple-touch-icon.png" />
        <link rel="manifest" href="/favicons/site.webmanifest" />
      </Head>
      <main className={oxanium.variable}>
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default MyApp;
