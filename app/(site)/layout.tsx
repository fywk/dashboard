const SiteRootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-gray-400">{children}</body>
    </html>
  );
};

export default SiteRootLayout;
