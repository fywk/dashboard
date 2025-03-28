import { app } from "@/lib/app-config";
import dayjs from "@/lib/utils/dayjs";

export default function Header() {
  const appBuildTimestamp = +(process.env.APP_BUILD_TIMESTAMP ?? 0);
  const appBuildDate = dayjs(appBuildTimestamp).utc();

  return (
    <header className="flex items-center justify-between border-y border-primary/25 px-px py-1.5 text-[11px] leading-none! tracking-tight uppercase xs:px-0.5">
      <h1>
        <span className="font-medium text-gray-50">{`${app.title} `}</span>
        <span className="text-primary">V</span>
        <span className="text-secondary">{appBuildDate.format("YYMMDD")}</span>
        <span className="text-gray-500">{appBuildDate.format("[.]HHmm")}</span>
      </h1>
      <nav className="hidden xs:block">
        <ul className="flex divide-x divide-primary/25">
          <li className="pr-2">
            <a href="https://fywk.dev" className="text-gray-100 hover:text-secondary">
              Home
            </a>
          </li>
          <li className="pl-2 text-gray-500" aria-current="page">
            {app.title}
          </li>
        </ul>
      </nav>
    </header>
  );
}
