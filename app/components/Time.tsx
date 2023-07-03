"use client";

import pluralize from "pluralize";
import { useEffect, useState } from "react";

import dayjs from "@/utils/dayjs";

import Section from "./Section";

const UptimeString = ({ content }: { content: string }) => {
  return (
    <p
      className="font-oxanium text-[11px] font-[550] !leading-[1.125] @md/section:text-xs @lg/section:text-[13px] @1.5xl/section:text-sm"
      title="Time since last build"
    >
      <span className="text-primary">Uptime</span>
      {content && <span className="text-gray-300">{`: ${content}`}</span>}
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
    <div className="w-full py-1 @xl/section:-mb-px @xl/section:py-1.5 @2xl/section:py-2">
      <div className="-mx-0.5 space-y-0.5 bg-gray-950 py-0.5 text-center @lg/section:space-y-1 @1.5xl/section:py-1">
        <p className="text-[9px] uppercase !leading-none @lg/section:text-[10px] @1.5xl/section:text-[11px] @[45rem]/section:text-xs">
          <abbr className="@xl/section:hidden">{abbr}</abbr>
          <span className="hidden tracking-tight @xl/section:inline">
            {name}
          </span>
        </p>
        <p className="font-oxanium text-[9px] font-medium !leading-none text-gray-100 @sm/section:text-[10px] @xl/section:text-xs @1.5xl/section:text-sm">
          {time}
        </p>
      </div>
    </div>
  );
};

const Time = () => {
  const INITIAL_TIME = "00:00:00";
  const TIME_FORMAT = "HH:mm:ss";

  const createdAt = Number(process.env.APP_START_TIME);

  const [uptime, setUptime] = useState("");
  const [utc, setUTC] = useState(INITIAL_TIME);
  const [local, setLocal] = useState(INITIAL_TIME);
  const [losAngeles, setLosAngeles] = useState(INITIAL_TIME);
  const [newYorkCity, setNewYorkCity] = useState(INITIAL_TIME);
  const [london, setLondon] = useState(INITIAL_TIME);
  const [singapore, setSingapore] = useState(INITIAL_TIME);
  const [dubai, setDubai] = useState(INITIAL_TIME);
  const [sydney, setSydney] = useState(INITIAL_TIME);

  useEffect(() => {
    const interval = setInterval(() => {
      const dayjsUTC = dayjs().utc();
      const diffSinceCreated = dayjsUTC.diff(createdAt);
      const durationSinceCreated = dayjs.duration(diffSinceCreated);
      const days = Math.floor(durationSinceCreated.asDays());
      const hours = durationSinceCreated.hours(); // 0-23
      const minutes = durationSinceCreated.minutes(); // 0-59
      const totalDays = days >= 1 ? pluralize("day", days, true) : days;
      const totalHours = hours >= 1 ? pluralize("hour", hours, true) : hours;
      const totalMinutes = pluralize("min", minutes, true);

      setUptime(
        [totalDays, totalHours, totalMinutes].filter(Boolean).join(", ")
      );
      setUTC(dayjsUTC.format(TIME_FORMAT));
      setLocal(dayjsUTC.local().format(TIME_FORMAT));
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
      subtitle={uptime && <UptimeString content={uptime} />}
      accentColor="secondary"
    >
      <div className="-mt-[3px] grid grid-cols-2 gap-x-4 gap-y-2.5 @lg/section:gap-y-3 @xl/section:-mt-px @xl/section:gap-x-4.5 @xl/section:gap-y-3.5 @1.5xl/section:gap-x-5">
        <div className="-mb-1 w-full space-y-1 @container @sm/section:-mb-1.5 @sm/section:space-y-1.5 @md/section:-mb-2">
          <span className="rounded-sm px-1 text-[10px] font-bold leading-3 tracking-tighter text-primary ring-1 ring-primary @lg/section:text-[11px] @1.5xl/section:text-xs">
            LOCAL
          </span>
          <h2 className="font-oxanium text-[24cqi]/none text-gray-100">
            {local}
          </h2>
        </div>
        <div className="-mb-1 w-full space-y-1 @container @sm/section:-mb-1.5 @sm/section:space-y-1.5 @md/section:-mb-2">
          <span className="rounded-sm px-1 text-[10px] font-bold leading-3 tracking-tighter text-secondary ring-1 ring-secondary @lg/section:text-[11px] @1.5xl/section:text-xs">
            UTC
          </span>
          <h2 className="font-oxanium text-[24cqi]/none text-gray-500">
            {utc}
          </h2>
        </div>
        <div className="col-span-full flex justify-evenly divide-x divide-primary/60 rounded-sm border border-primary/60">
          <City name="Los Angeles" abbr="LA" time={losAngeles} />
          <City name="New York City" abbr="NYC" time={newYorkCity} />
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
