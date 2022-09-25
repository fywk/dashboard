/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["lastfm.freetls.fastly.net", "i.scdn.co"],
    formats: ["image/avif", "image/webp"],
  },
  reactStrictMode: true,
  swcMinify: false,
};

module.exports = nextConfig;
