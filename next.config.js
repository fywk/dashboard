/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    fontLoaders: [
      { loader: "@next/font/google", options: { subsets: ["latin"] } },
    ],
  },
  images: {
    domains: ["lastfm.freetls.fastly.net", "i.scdn.co"],
    formats: ["image/avif", "image/webp"],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
