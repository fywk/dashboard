import useSWRImmutable from "swr/immutable";

import { WeatherForecastData } from "@/types/openweather";
import fetcher from "@/utils/fetcher";

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
