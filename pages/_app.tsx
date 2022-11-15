import "../styles/globals.css";

import { Oxanium } from "@next/font/google";

import type { AppProps } from "next/app";

const oxanium = Oxanium({
  variable: "--font-oxanium",
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={`${oxanium.variable}`}>
      <Component {...pageProps} />
    </main>
  );
}

export default MyApp;
