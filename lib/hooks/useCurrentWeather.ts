import useSWRImmutable from "swr/immutable";

import fetcher from "@/lib/utils/fetcher";

import type { CurrentWeather } from "@/lib/types/openweather";

export default function useCurrentWeather() {
  const { data, isLoading, error } = useSWRImmutable<CurrentWeather, Error>(
    "/api/weather/current",
    fetcher,
  );

  return { data, isLoading, error };
}
