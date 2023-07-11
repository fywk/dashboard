import useSWRImmutable from "swr/immutable";

import fetcher from "@/utils/fetcher";

import type { CurrentWeatherData } from "@/types/openweather";

export default function useCurrentWeather() {
  const { data, isLoading } = useSWRImmutable<CurrentWeatherData>(
    "/api/weather/current",
    fetcher
  );

  return {
    currentWeather: data,
    isLoadingCurrentWeather: isLoading,
  };
}
