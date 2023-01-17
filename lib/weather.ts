import { CurrentWeatherData, ForecastWeatherData } from "./types/openweather";

export const fetchCurrentWeather = async (): Promise<CurrentWeatherData> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/weather/current`,
    { cache: "no-store" }
  );
  return res.json();
};

export const fetchWeatherForecast = async (): Promise<ForecastWeatherData> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/weather/forecast`,
    { cache: "no-store" }
  );
  return res.json();
};
