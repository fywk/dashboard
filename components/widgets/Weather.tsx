import Widget from "../Widget";
import WeatherChart from "./weather/WeatherChart";
import WeatherSummary from "./weather/WeatherSummary";

const Weather = () => {
  return (
    <Widget title="Weather" accentColor="primary">
      <div className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-[minmax(auto,225px)_1fr]">
        <WeatherSummary />
        <WeatherChart />
      </div>
    </Widget>
  );
};

export default Weather;
