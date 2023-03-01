import "./globals.css";

import { Metadata } from "next";

import { siteConfig } from "@/lib/utils/site-config";

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s ${siteConfig.titleSeparator} ${siteConfig.title}`,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
  },
  icons: {
    icon: [
      { url: "/favicons/favicon.ico", sizes: "any" },
      { url: "/favicons/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/favicons/apple-touch-icon.png",
  },
  manifest: "/favicons/site.webmanifest",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default RootLayout;
