import { SearchParams } from "@/types/misc";

import Section from "./Section";
import WeatherChart from "./WeatherChart";
import WeatherSummary from "./WeatherSummary";

const Weather = ({ ...searchParams }: SearchParams) => {
  return (
    <Section title="Weather" accentColor="primary">
      <div className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-[minmax(auto,225px)_1fr]">
        <WeatherSummary {...searchParams} />
        <WeatherChart />
      </div>
    </Section>
  );
};

export default Weather;
