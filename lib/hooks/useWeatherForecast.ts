import useSWRImmutable from "swr/immutable";

import fetcher from "@/utils/fetcher";

import type { WeatherForecast } from "@/utils/openweather";

export default function useWeatherForecast() {
  const { data, isLoading, error } = useSWRImmutable<WeatherForecast, Error>(
    "/api/weather/forecast",
    fetcher
  );

  return { data, isLoading, error };
}
