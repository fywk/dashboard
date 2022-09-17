import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Oxanium:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="bg-gray-950 text-gray-400">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
