import { Metadata } from "next";

import { siteConfig } from "@/lib/utils/site-config";

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s ${siteConfig.titleSeparator} ${siteConfig.title}`,
  },
};

const SiteRootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-gray-400">{children}</body>
    </html>
  );
};

export default SiteRootLayout;
