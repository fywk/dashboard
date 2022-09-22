import useSWRImmutable from "swr/immutable";

import fetcher from "../fetcher";
import { ForecastWeatherData } from "../types/openweather";

const useWeatherForecast = () => {
  const { data, error } = useSWRImmutable<ForecastWeatherData>(
    "/api/weather/forecast",
    fetcher
  );

  return {
    forecast: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useWeatherForecast;
