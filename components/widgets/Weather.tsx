import Widget from "../Widget";
import WeatherChart from "./weather/WeatherChart";
import WeatherSummary from "./weather/WeatherSummary";

type Props = {
  city: string;
  country: string;
};

const Weather = ({ city, country }: Props) => {
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
