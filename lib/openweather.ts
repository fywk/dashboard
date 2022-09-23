import { CurrentWeatherData, ForecastWeatherData } from "./types/openweather";

const API_KEY = process.env.OPENWEATHER_API_KEY;

const API_ROOT = "https://api.openweathermap.org/data/2.5";

export const getCurrentWeather = async (
  lat: string,
  long: string
): Promise<CurrentWeatherData> => {
  const weather_endpoint = `${API_ROOT}/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`;

  const response = await fetch(weather_endpoint);

  return response.json();
};

export const getForecastWeather = async (
  lat: string,
  long: string
): Promise<ForecastWeatherData> => {
  const forecast_endpoint = `${API_ROOT}/forecast?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric&cnt=10`;

  const response = await fetch(forecast_endpoint);

  return response.json();
};
