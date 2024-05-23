import { IconX } from "@tabler/icons-react";
import clsx from "clsx";

import dayjs from "@/lib/utils/dayjs";

import packageJSON from "../../package.json";
import Logo from "./Logo";

type Props = {
  dialogRef: React.RefObject<HTMLDialogElement>;
};

export default function AboutDialog({ dialogRef }: Props) {
  const appCreatedAt = +(process.env.APP_START_TIME ?? 0);
  const appVersion = "V" + dayjs(appCreatedAt).utc().format("YYMMDD[.]HHmm");
  const appEnv = process.env.NEXT_PUBLIC_VERCEL_ENV ?? process.env.NODE_ENV;
  const commitSHA = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA?.slice(0, 7);
  const reactVersion = packageJSON.dependencies.react.replace(/^[\^~]/, "");
  const nextjsVersion = packageJSON.dependencies.next.replace(/^[\^~]/, "");

  return (
    <dialog
      className="w-full max-w-[17rem] -translate-y-[5vh] rounded-lg border border-gray-600 bg-gray-800/90 backdrop-blur-lg [&::backdrop]:touch-none [&::backdrop]:bg-transparent"
      ref={dialogRef}
    >
      <form className="flex items-center gap-x-1.5 p-2" method="dialog">
        <button
          className="group flex aspect-square size-3 cursor-default items-center justify-center rounded-full bg-red-500"
          title="Close"
        >
          <span className="sr-only">Close</span>
          <IconX className="hidden size-2.5 group-hover:block" />
        </button>
        <button
          className="aspect-square size-3 rounded-full bg-gray-700"
          disabled
          aria-hidden
        ></button>
        <button
          className="aspect-square size-3 rounded-full bg-gray-700"
          disabled
          aria-hidden
        ></button>
      </form>
      <div className="flex flex-col items-center px-4 pb-8 text-gray-400">
        <div className="mb-14 mt-[4.5rem] flex w-[5.5rem] scale-125 items-center rounded-[10px] rounded-r-none border-3 border-r-0 border-primary p-1 pr-0 text-primary">
          <Logo />
        </div>
        <div className="flex flex-col items-center gap-y-2.5">
          <div className="text-center">
            <h2 className="text-[1.375rem]/7 font-bold text-gray-300">Dashboard</h2>
            <p className="text-[11px] text-gray-500">{appVersion}</p>
          </div>
          <div className="grid grid-cols-2 gap-x-2.5 py-2 text-[11px]">
            <p className="text-right text-gray-100">Environment</p>
            <p className="capitalize">{appEnv}</p>
            <p className="text-right text-gray-100">Latest commit</p>
            <p className={clsx("uppercase", commitSHA && "font-mono")}>{commitSHA ?? "---"}</p>
            <p className="text-right text-gray-100">React</p>
            <p>{reactVersion}</p>
            <p className="text-right text-gray-100">Next.js</p>
            <p>{nextjsVersion}</p>
          </div>
          <a
            href="https://github.com/fywk/dashboard"
            className="rounded border border-gray-500 bg-gray-600 px-2.5 py-1 text-[13px]/none text-gray-100 ring-secondary focus:outline-none focus:ring-1"
            target="_blank"
            autoFocus
          >
            View Source
          </a>
          <p className="text-[11px] text-gray-500">End of Line.</p>
        </div>
      </div>
    </dialog>
  );
}
