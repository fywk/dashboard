"use client";

import pluralize from "pluralize";
import { useEffect, useState } from "react";

import dayjs from "@/lib/utils/dayjs";

import Section from "./Section";

type UptimeProps = {
  isVisible: boolean;
  duration: string;
  durationISO: string;
};

type CityProps = {
  name: string;
  abbr: string;
  time: string;
};

function Uptime(props: UptimeProps) {
  if (!props.isVisible) return;

  return (
    <p
      className="font-oxanium text-[11px] font-[550] !leading-[1.125] @md/section:text-xs @lg/section:text-[13px] @1.5xl/section:text-sm"
      title="Time since last build"
    >
      <span className="text-primary">Uptime</span>
      <span className="text-gray-300">
        : <time dateTime={props.durationISO}>{props.duration}</time>
      </span>
    </p>
  );
}

function City({ name, abbr, time }: CityProps) {
  return (
    <div className="w-full py-1 @xl/section:py-1.5 @2xl/section:py-2">
      <div className="-mx-0.5 flex flex-col gap-y-0.5 bg-gray-950 py-0.5 text-center @sm/section:gap-y-1 @1.5xl/section:py-1">
        <p className="text-[9px] uppercase !leading-none @lg/section:text-[10px] @1.5xl/section:text-[11px] @[45rem]/section:text-xs">
          <abbr className="@xl/section:hidden">{abbr}</abbr>
          <span className="hidden tracking-tight @xl/section:inline">{name}</span>
        </p>
        <time className="font-oxanium text-[9px] font-medium !leading-none text-gray-100 @sm/section:text-[10px] @xl/section:-mb-px @xl/section:text-xs @1.5xl/section:text-sm">
          {time}
        </time>
      </div>
    </div>
  );
}

export default function Time() {
  const initialTime = "00:00:00";
  const timeFormat = "HH:mm:ss";

  const appCreatedAt = +(process.env.APP_START_TIME ?? 0);

  const [uptime, setUptime] = useState<UptimeProps>();
  const [timeUTC, setTimeUTC] = useState(initialTime);
  const [timeLocal, setTimeLocal] = useState(initialTime);
  const [timeLA, setTimeLA] = useState(initialTime);
  const [timeNYC, setTimeNYC] = useState(initialTime);
  const [timeLON, setTimeLON] = useState(initialTime);
  const [timeSIN, setTimeSIN] = useState(initialTime);
  const [timeDUB, setTimeDUB] = useState(initialTime);
  const [timeSYD, setTimeSYD] = useState(initialTime);

  useEffect(() => {
    const interval = setInterval(() => {
      const dayjsUTC = dayjs().utc();
      const diffSinceCreated = dayjsUTC.diff(appCreatedAt);
      const durationSinceCreated = dayjs.duration(diffSinceCreated);
      const days = Math.floor(durationSinceCreated.asDays());
      const hours = durationSinceCreated.hours(); // 0-23
      const minutes = durationSinceCreated.minutes(); // 0-59
      const pluralizedDays = days >= 1 ? pluralize("day", days, true) : days;
      const pluralizedHours = hours >= 1 ? pluralize("hour", hours, true) : hours;
      const pluralizedMinutes = minutes >= 1 ? pluralize("min", minutes, true) : minutes;

      setUptime({
        isVisible: durationSinceCreated.asMinutes() >= 1,
        duration: [pluralizedDays, pluralizedHours, pluralizedMinutes].filter(Boolean).join(", "),
        durationISO: dayjs.duration({ days, hours, minutes }).toISOString(),
      });
      setTimeUTC(dayjsUTC.format(timeFormat));
      setTimeLocal(dayjsUTC.local().format(timeFormat));
      setTimeLA(dayjs().tz("America/Los_Angeles").format(timeFormat));
      setTimeNYC(dayjs().tz("America/New_York").format(timeFormat));
      setTimeLON(dayjs().tz("Europe/London").format(timeFormat));
      setTimeDUB(dayjs().tz("Asia/Dubai").format(timeFormat));
      setTimeSIN(dayjs().tz("Asia/Singapore").format(timeFormat));
      setTimeSYD(dayjs().tz("Australia/Sydney").format(timeFormat));
    }, 1000);

    return () => clearInterval(interval);
  }, [appCreatedAt]);

  return (
    <Section
      title="Time"
      subtitle={uptime && Object.keys(uptime).length !== 0 && <Uptime {...uptime} />}
      accentColor="secondary"
    >
      <div className="mt-1 grid grid-cols-2 gap-x-4 gap-y-1 @md/section:mt-[5px] @xl/section:gap-x-4.5 @1.5xl/section:gap-x-5">
        <div className="flex flex-col gap-y-2 @container @sm/section:gap-y-2.5">
          <span className="ml-1 w-fit rounded-[3px] px-1 text-[10px] font-bold !leading-tight tracking-tighter text-primary ring-1 ring-primary @lg/section:text-[11px] @1.5xl/section:text-xs">
            LOCAL
          </span>
          <h2 className="text-center font-oxanium text-[24cqw]/none text-gray-100">
            <time>{timeLocal}</time>
          </h2>
        </div>
        <div className="flex flex-col gap-y-2 @container @sm/section:gap-y-2.5">
          <span className="ml-1 w-fit rounded-[3px] px-1 text-[10px] font-bold !leading-tight tracking-tighter text-secondary ring-1 ring-secondary @lg/section:text-[11px] @1.5xl/section:text-xs">
            UTC
          </span>
          <h2 className="text-center font-oxanium text-[24cqw]/none text-gray-500">
            <time>{timeUTC}</time>
          </h2>
        </div>
        <div className="col-span-full flex justify-evenly divide-x divide-primary/60 rounded-sm border border-primary/60">
          <City name="Los Angeles" abbr="LA" time={timeLA} />
          <City name="New York City" abbr="NYC" time={timeNYC} />
          <City name="London" abbr="LON" time={timeLON} />
          <City name="Dubai" abbr="DUB" time={timeDUB} />
          <City name="Singapore" abbr="SIN" time={timeSIN} />
          <City name="Sydney" abbr="SYD" time={timeSYD} />
        </div>
      </div>
    </Section>
  );
}
