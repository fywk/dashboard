import { SearchParams } from "@/types/misc";

import Section from "./Section";
import WeatherChart from "./WeatherChart";
import WeatherSummary from "./WeatherSummary";

const Weather = ({ ...searchParams }: SearchParams) => {
  return (
    <Section title="Weather" accentColor="primary">
      <div className="grid grid-cols-1 gap-x-6 gap-y-4 @lg/section:grid-cols-[minmax(auto,200px)_1fr] @1.5xl/section:grid-cols-[minmax(auto,225px)_1fr] @1.5xl/section:gap-x-7 @2xl/section:gap-x-8">
        <WeatherSummary {...searchParams} />
        <WeatherChart />
      </div>
    </Section>
  );
};

export default Weather;
