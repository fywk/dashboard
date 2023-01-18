import useSWRImmutable from "swr/immutable";

import fetcher from "../fetcher";
import { WeatherForecastData } from "../types/openweather";

const useWeatherForecast = () => {
  const { data, isLoading } = useSWRImmutable<WeatherForecastData>(
    "/api/weather/forecast",
    fetcher
  );

  return {
    weatherForecast: data,
    isLoadingWeatherForecast: isLoading,
  };
};

export default useWeatherForecast;
