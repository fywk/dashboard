import { z } from "zod";

import { env } from "@/app/env.mjs";

import type { CurrentWeather } from "@/lib/types/openweather";

export type WeatherForecast = z.infer<typeof WeatherForecastSchema>;

const API_KEY = env.OPENWEATHER_API_KEY;

const API_ROOT = "https://api.openweathermap.org/data/2.5";

const CurrentWeatherSchema = z.object({
  weather: z
    .array(
      z.object({
        id: z.number(),
        description: z.string(),
        icon: z.string(),
      })
    )
    .nonempty(),
  main: z.object({
    temp: z.number(),
    pressure: z.number(),
    humidity: z.number(),
  }),
});

const WeatherForecastSchema = z.object({
  list: z
    .array(
      z.object({
        dt: z.number(),
        main: z.object({ temp: z.number() }),
      })
    )
    .nonempty(),
  city: z.object({ timezone: z.number() }),
});

/**
 * @param lat - Geographical latitude coordinate in decimal degrees format.
 * @param lon - Geographical longitude coordinate in decimal degrees format.
 */
export async function getCurrentWeather(
  lat: string,
  lon: string
): Promise<CurrentWeather | null> {
  const currentWeatherEndpoint = `${API_ROOT}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  const response = await fetch(currentWeatherEndpoint);
  const result = CurrentWeatherSchema.safeParse(await response.json());

  if (!result.success) return null;

  const { weather, main } = result.data;

  const current: CurrentWeather = {
    id: weather[0].id,
    description: weather[0].description,
    icon: weather[0].icon,
    temp: main.temp,
    pressure: main.pressure,
    humidity: main.humidity,
  };

  return current;
}

/**
 * @param lat - Geographical latitude coordinate in decimal degrees format.
 * @param lon - Geographical longitude coordinate in decimal degrees format.
 */
export async function getWeatherForecast(
  lat: string,
  lon: string
): Promise<WeatherForecast | null> {
  const weatherForecastEndpoint = `${API_ROOT}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&cnt=11`;

  const response = await fetch(weatherForecastEndpoint);
  const result = WeatherForecastSchema.safeParse(await response.json());

  if (!result.success) return null;

  return result.data;
}
