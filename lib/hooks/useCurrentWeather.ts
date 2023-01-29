import useSWRImmutable from "swr/immutable";

import { CurrentWeatherData } from "../types/openweather";
import fetcher from "../utils/fetcher";

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
