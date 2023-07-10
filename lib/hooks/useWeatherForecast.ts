import useSWRImmutable from "swr/immutable";

import fetcher from "@/utils/fetcher";

import type { WeatherForecastData } from "@/types/openweather";

export default function useWeatherForecast() {
  const { data, isLoading } = useSWRImmutable<WeatherForecastData>(
    "/api/weather/forecast",
    fetcher
  );

  return {
    weatherForecast: data,
    isLoadingWeatherForecast: isLoading,
  };
}
