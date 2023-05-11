"use client";

import { useEffect, useState } from "react";
import useSWRImmutable from "swr/immutable";

import fetcher from "@/lib/utils/fetcher";
import { pluralize } from "@/lib/utils/pluralize";
import dayjs from "@/utils/dayjs";

import Section from "./Section";

const UptimeString = ({ content }: { content: string }) => {
  return (
    <p
      className="-mt-px text-[11px] font-medium !leading-none sm:-mt-0.5 sm:text-xs md:-mt-[3px] md:text-sm"
      title="Time since last build"
    >
      <span className="text-secondary">Uptime</span>
      {content && <span className="text-gray-300">{content}</span>}
    </p>
  );
};

const City = ({
  name,
  abbr,
  time,
}: {
  name: string;
  abbr: string;
  time: string;
}) => {
  return (
    <div className="w-full py-1 sm:py-1.5">
      <div className="-mx-0.5 bg-gray-950 py-0.5 text-center text-[8px]/[10px] sm:pb-px sm:text-[10px]/[13px] md:pt-1 md:text-xs/[15px]">
        <p className="uppercase">
          <span className="sm:hidden">{abbr}</span>
          <span className="hidden tracking-tight sm:inline">{name}</span>
        </p>
        <p className="font-oxanium font-medium text-gray-100 md:text-sm">
          {time}
        </p>
      </div>
    </div>
  );
};

const Time = () => {
  const INITIAL_TIME = "00:00:00";
  const TIME_FORMAT = "HH:mm:ss";

  const { data } = useSWRImmutable<number>("/api/get-created-at", fetcher);

  const createdAt = data && data;

  const [uptime, setUptime] = useState("");
  const [utc, setUTC] = useState(INITIAL_TIME);
  const [local, setLocal] = useState(INITIAL_TIME);
  const [los_angeles, setLosAngeles] = useState(INITIAL_TIME);
  const [new_york_city, setNewYorkCity] = useState(INITIAL_TIME);
  const [london, setLondon] = useState(INITIAL_TIME);
  const [singapore, setSingapore] = useState(INITIAL_TIME);
  const [dubai, setDubai] = useState(INITIAL_TIME);
  const [sydney, setSydney] = useState(INITIAL_TIME);

  useEffect(() => {
    const interval = setInterval(() => {
      const UTC = dayjs().utc();
      const diffSinceCreated = UTC.diff(createdAt);
      const durationSinceCreated = dayjs.duration(diffSinceCreated);
      const d = durationSinceCreated
        ? Math.floor(durationSinceCreated.asDays())
        : 0;
      const totalDays = d >= 0 && pluralize(d, "day");
      const totalHours = pluralize(durationSinceCreated.hours(), "hour");
      const totalMinutes = pluralize(durationSinceCreated.minutes(), "min");

      setUptime(`${totalDays}, ${totalHours}, ${totalMinutes}`);
      setUTC(UTC.format(TIME_FORMAT));
      setLocal(UTC.local().format(TIME_FORMAT));
      setLosAngeles(dayjs().tz("America/Los_Angeles").format(TIME_FORMAT));
      setNewYorkCity(dayjs().tz("America/New_York").format(TIME_FORMAT));
      setLondon(dayjs().tz("Europe/London").format(TIME_FORMAT));
      setDubai(dayjs().tz("Asia/Dubai").format(TIME_FORMAT));
      setSingapore(dayjs().tz("Asia/Singapore").format(TIME_FORMAT));
      setSydney(dayjs().tz("Australia/Sydney").format(TIME_FORMAT));
    }, 1000);

    return () => clearInterval(interval);
  }, [createdAt]);

  return (
    <Section
      title="Time"
      subtitle={uptime && <UptimeString content={`: ${uptime}`} />}
      accentColor="secondary"
    >
      <div className="-mt-2 grid grid-cols-2 gap-x-4 gap-y-2 sm:-mt-0.5 sm:gap-x-4.5 sm:gap-y-2.5 md:gap-x-5 md:gap-y-3">
        <div className="w-full space-y-0.5 md:space-y-1">
          <span className="rounded-sm px-1 text-[10px] font-bold leading-3 tracking-tighter text-primary ring-1 ring-primary md:text-xs">
            LOCAL
          </span>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 400 85.5"
            preserveAspectRatio="xMinYMin meet"
          >
            <foreignObject
              width="100%"
              height="100%"
              xmlns="http://www.w3.org/1999/xhtml"
            >
              <h2 className="font-oxanium text-8xl text-gray-100">{local}</h2>
            </foreignObject>
          </svg>
        </div>
        <div className="w-full space-y-0.5 md:space-y-1">
          <span className="rounded-sm px-1 text-[10px] font-bold leading-3 tracking-tighter text-secondary ring-1 ring-secondary md:text-xs">
            UTC
          </span>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 400 85.5"
            preserveAspectRatio="xMinYMin meet"
          >
            <foreignObject
              width="100%"
              height="100%"
              xmlns="http://www.w3.org/1999/xhtml"
            >
              <h2 className="font-oxanium text-8xl text-gray-500">{utc}</h2>
            </foreignObject>
          </svg>
        </div>
        <div className="col-span-full flex justify-evenly divide-x divide-primary/60 rounded-sm border border-primary/60">
          <City name="Los Angeles" abbr="LA" time={los_angeles} />
          <City name="New York City" abbr="NYC" time={new_york_city} />
          <City name="London" abbr="LON" time={london} />
          <City name="Dubai" abbr="DUB" time={dubai} />
          <City name="Singapore" abbr="SIN" time={singapore} />
          <City name="Sydney" abbr="SYD" time={sydney} />
        </div>
      </div>
    </Section>
  );
};

export default Time;
