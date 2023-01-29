/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    fontLoaders: [
      { loader: "@next/font/google", options: { subsets: ["latin"] } },
    ],
  },
  images: {
    domains: ["lastfm.freetls.fastly.net", "i.scdn.co"],
    formats: ["image/avif", "image/webp"],
  },
  reactStrictMode: true,
  rewrites: async function () {
    return [
      {
        source: "/",
        destination: "/dashboard",
      },
    ];
  },
};

module.exports = nextConfig;
