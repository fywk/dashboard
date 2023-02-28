import "./dashboard.css";

import { Metadata } from "next";
import { Oxanium } from "next/font/google";

import { siteConfig } from "@/lib/utils/site-config";

const oxanium = Oxanium({
  subsets: ["latin"],
  variable: "--font-oxanium",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s ${siteConfig.titleSeparator} ${siteConfig.title}`,
  },
};

const DashboardRootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className={oxanium.variable}>
      <body className="bg-gray-950 text-gray-400">{children}</body>
    </html>
  );
};

export default DashboardRootLayout;
