import "./dashboard.css";

import { Oxanium } from "next/font/google";

const oxanium = Oxanium({
  subsets: ["latin"],
  variable: "--font-oxanium",
});

const DashboardRootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className={oxanium.variable}>
      <body className="bg-gray-950 text-gray-400">{children}</body>
    </html>
  );
};

export default DashboardRootLayout;
