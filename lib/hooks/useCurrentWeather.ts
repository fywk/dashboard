import useSWRImmutable from "swr/immutable";

import fetcher from "../fetcher";
import { CurrentWeatherData } from "../types/openweather";

const useCurrentWeather = () => {
  const { data, isLoading } = useSWRImmutable<CurrentWeatherData>(
    "/api/weather/current",
    fetcher
  );

  return {
    currentWeather: data,
    isLoadingCurrentWeather: isLoading,
  };
};

export default useCurrentWeather;
