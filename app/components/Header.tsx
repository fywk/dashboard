import dayjs from "@/lib/utils/dayjs";
import { siteConfig as site } from "@/lib/utils/site-config";

const Header = () => {
  const appCreatedAt = Number(process.env.APP_START_TIME ?? 0);
  const versionYYMMDD = dayjs(appCreatedAt).utc().format("YYMMDD");
  const versionHHmm = dayjs(appCreatedAt).utc().format("HHmm");

  return (
    <header className="flex items-center justify-between border-y border-primary/25 px-px py-1.5 text-[11px] uppercase !leading-none tracking-tight xs:px-0.5">
      <h2>
        <span className="font-medium text-gray-50">{site.title}</span>
        <span className="text-primary">{" V"}</span>
        <span className="text-secondary">{versionYYMMDD}</span>
        <span className="text-gray-500">{`.${versionHHmm}`}</span>
      </h2>
      <nav className="hidden xs:block">
        <ul className="flex divide-x divide-primary/25">
          <li className="pr-2">
            <a
              href={site.homeURL}
              className="text-gray-100 hover:text-secondary"
            >
              Home
            </a>
          </li>
          <li className="pl-2 text-gray-500" aria-current="page">
            {site.title}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
