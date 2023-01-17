import { SearchParams } from "../../../lib/types/misc";
import WeatherChart from "./WeatherChart";
import WeatherSummary from "./WeatherSummary";
import Widget from "./Widget";

const Weather = ({ city, country }: SearchParams) => {
  return (
    <Widget title="Weather" accentColor="primary">
      <div className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-[minmax(auto,225px)_1fr]">
        <WeatherSummary city={city} country={country} />
        <WeatherChart />
      </div>
    </Widget>
  );
};

export default Weather;
