import { env } from "@/lib/env.mjs";

import type {
  CurrentWeatherData,
  WeatherForecastData,
} from "@/types/openweather";

const API_KEY = env.OPENWEATHER_API_KEY;

const API_ROOT = "https://api.openweathermap.org/data/2.5";

export async function getCurrentWeather(
  lat: string,
  lon: string
): Promise<CurrentWeatherData> {
  const current_weather_endpoint = `${API_ROOT}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  const res = await fetch(current_weather_endpoint);

  return res.json();
}

export async function getWeatherForecast(
  lat: string,
  lon: string
): Promise<WeatherForecastData> {
  const weather_forecast_endpoint = `${API_ROOT}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&cnt=11`;

  const res = await fetch(weather_forecast_endpoint);

  return res.json();
}
