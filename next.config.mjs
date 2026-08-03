await import("./app/env.mjs");

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    APP_BUILD_TIMESTAMP: Date.now().toString(),
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.scdn.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lastfm.freetls.fastly.net",
        pathname: "/**",
      },
    ],
  },
  reactStrictMode: true,
};

export default nextConfig;
