/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["lastfm.freetls.fastly.net", "i.scdn.co"],
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    appDir: true,
    fontLoaders: [
      { loader: "@next/font/google", options: { subsets: ["latin"] } },
    ],
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "/dashboard",
  //     },
  //     {
  //       source: "//",
  //       destination: "/dashboard",
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
