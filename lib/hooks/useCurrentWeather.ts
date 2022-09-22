import useSWRImmutable from "swr/immutable";

import fetcher from "../fetcher";
import { CurrentWeatherData } from "../types/openweather";

const useCurrentWeather = () => {
  const { data, error } = useSWRImmutable<CurrentWeatherData>(
    "/api/weather/current",
    fetcher
  );

  return {
    current: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useCurrentWeather;
