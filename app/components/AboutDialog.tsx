import { IconX } from "@tabler/icons-react";
import clsx from "clsx";

import { APP_DEV_START_YEAR } from "@/lib/app-constants";
import dayjs from "@/lib/utils/dayjs";

import packageJSON from "../../package.json";
import Logo from "./Logo";

type Props = {
  dialogRef: React.RefObject<HTMLDialogElement>;
};

// Remove the leading caret (^) and tilde (~) notations from the version string
function getCleanVersionNumber(packageVersion: string): string {
  return packageVersion.replace(/^[\^~]/, "");
}

export default function AboutDialog({ dialogRef }: Props) {
  const { react, next } = packageJSON.dependencies;
  const reactVersion = getCleanVersionNumber(react);
  const nextjsVersion = getCleanVersionNumber(next);
  const appBuildTimestamp = +(process.env.APP_BUILD_TIMESTAMP ?? 0);
  const appVersion = "V" + dayjs(appBuildTimestamp).utc().format("YYMMDD[.]HHmm");
  const commitSHA = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA?.slice(0, 7);
  const appEnvironment = process.env.NEXT_PUBLIC_VERCEL_ENV ?? process.env.NODE_ENV;
  const appBuildYear = dayjs(appBuildTimestamp).utc().format("YYYY");

  return (
    <dialog
      className="w-full max-w-[17.5rem] -translate-y-[5vh] rounded-[10px] border border-neutral-500/75 bg-neutral-800/75 backdrop-blur-xl [&::backdrop]:touch-none [&::backdrop]:bg-transparent"
      ref={dialogRef}
    >
      <form className="group flex w-fit items-center gap-x-2 p-[7px]" method="dialog">
        <button
          className="flex aspect-square size-3 cursor-default items-center justify-center rounded-full bg-[#ff6159] text-[#4d0000]"
          title="Close"
        >
          <span className="sr-only">Close</span>
          <IconX className="hidden size-2.5 stroke-[2.75] group-hover:block" />
        </button>
        <button
          className="aspect-square size-3 rounded-full bg-gray-600/75"
          disabled
          aria-hidden
        ></button>
        <button
          className="aspect-square size-3 rounded-full bg-gray-600/75"
          disabled
          aria-hidden
        ></button>
      </form>
      <div
        className="group flex flex-col items-center px-4 pb-8 text-gray-400 focus:outline-none"
        tabIndex={0}
      >
        <div className="mb-20 mt-24 flex w-[5.5rem] scale-125 items-center rounded-[10px] rounded-r-none border-3 border-r-0 border-primary p-1 pr-0 text-primary">
          <Logo />
        </div>
        <div className="flex flex-col items-center">
          <div className="flex flex-col gap-y-1.5 text-center">
            <h2 className="text-[1.375rem]/none font-bold text-gray-200">Dashboard</h2>
            <p className="text-[10px]/none text-neutral-500/85">{appVersion}</p>
          </div>
          <div className="grid grid-cols-2 gap-x-2.5 py-5 text-[11px]">
            <span className="text-right text-gray-100">React</span>
            <span>{reactVersion}</span>
            <span className="text-right text-gray-100">Next.js</span>
            <span>{nextjsVersion}</span>
            <span className="text-right text-gray-100">Build commit</span>
            <span className={clsx("uppercase", commitSHA && "font-mono")}>
              {commitSHA ?? "---"}
            </span>
            <span className="text-right text-gray-100">Environment</span>
            <span className="capitalize">{appEnvironment}</span>
          </div>
          <a
            href="https://github.com/fywk/dashboard"
            className="mb-4 flex h-5 items-center justify-center rounded-[5px] border border-gray-500 bg-neutral-500/75 px-[9px] pb-px text-[13px]/none tracking-tight text-gray-100 ring-secondary/55 focus:outline-none focus:ring-[3px] group-focus:ring-[3px]"
            target="_blank"
            autoFocus
          >
            View Source
          </a>
          <div className="flex flex-col gap-y-[3px] text-center text-[11px]/none text-gray-500/95">
            <span>In development</span>
            <span>{`from ${APP_DEV_START_YEAR.toString()} to ${appBuildYear}.`}</span>
            <span>End of Line.</span>
          </div>
        </div>
      </div>
    </dialog>
  );
}
