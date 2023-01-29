import { CurrentWeatherData, WeatherForecastData } from "@/types/openweather";

const API_KEY = process.env.OPENWEATHER_API_KEY;

const API_ROOT = "https://api.openweathermap.org/data/2.5";

export const getCurrentWeather = async (
  lat: string,
  long: string
): Promise<CurrentWeatherData> => {
  const current_weather_endpoint = `${API_ROOT}/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`;

  const res = await fetch(current_weather_endpoint, { cache: "no-cache" });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export const getWeatherForecast = async (
  lat: string,
  long: string
): Promise<WeatherForecastData> => {
  const weather_forecast_endpoint = `${API_ROOT}/forecast?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric&cnt=10`;

  const res = await fetch(weather_forecast_endpoint, { cache: "no-cache" });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};
