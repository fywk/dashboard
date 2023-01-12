import useSWRImmutable from "swr/immutable";

import fetcher from "../fetcher";
import { ForecastWeatherData } from "../types/openweather";

const useWeatherForecast = () => {
  const { data, isLoading } = useSWRImmutable<ForecastWeatherData>(
    "/api/weather/forecast",
    fetcher
  );

  return {
    weatherForecast: data,
    isLoadingWeatherForecast: isLoading,
  };
};

export default useWeatherForecast;
