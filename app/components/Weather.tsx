import Section from "./Section";
import WeatherChart from "./WeatherChart";
import WeatherSummary from "./WeatherSummary";

import type { Geolocation } from "@/lib/types/app";

export default function Weather({ ...location }: Geolocation) {
  return (
    <Section title="Weather" accentColor="primary">
      <div className="grid grid-cols-1 gap-x-6 gap-y-4 @lg/section:grid-cols-[minmax(auto,200px)_1fr] @1.5xl/section:grid-cols-[minmax(auto,225px)_1fr] @1.5xl/section:gap-x-7 @2xl/section:gap-x-8">
        <WeatherSummary {...location} />
        <WeatherChart />
      </div>
    </Section>
  );
}
