import { Oxanium } from "next/font/google";

import "./globals.css";

import type { Metadata } from "next";

const oxanium = Oxanium({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-oxanium",
});

export const metadata: Metadata = {
  viewport: {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
  },
  icons: {
    icon: [
      { url: "/favicons/favicon.ico", sizes: "48x48" },
      { url: "/favicons/favicon.svg", sizes: "any", type: "image/svg+xml" },
    ],
    apple: "/favicons/apple-touch-icon.png",
  },
  manifest: "/favicons/site.webmanifest",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className={oxanium.variable}>
      <body className="bg-gray-950 text-gray-400">{children}</body>
    </html>
  );
};

export default RootLayout;
