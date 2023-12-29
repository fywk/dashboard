import { Oxanium } from "next/font/google";

import type { Metadata, Viewport } from "next";

import "./globals.css";

const oxanium = Oxanium({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-oxanium",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: "/favicons/favicon.ico", sizes: "48x48" },
      { url: "/favicons/favicon.svg", sizes: "any", type: "image/svg+xml" },
    ],
    apple: "/favicons/apple-touch-icon.png",
  },
  manifest: "/favicons/site.webmanifest",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={oxanium.variable}>
      <body className="bg-gray-950 text-gray-400">
        <div className="mx-auto flex min-h-dvh max-w-[1680px] items-center py-8" id="root">
          {children}
        </div>
      </body>
    </html>
  );
}
