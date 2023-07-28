"use client";

import { IconDropCircle, IconGauge } from "@tabler/icons-react";

import useCurrentWeather from "@/lib/hooks/useCurrentWeather";
import useWeatherForecast from "@/lib/hooks/useWeatherForecast";

import WeatherConditionIcon from "./icons/WeatherConditionIcon";

import type { SearchParams } from "@/lib/types/app";

export default function WeatherSummary({ city, country }: SearchParams) {
  const { data: currentWeather, isLoading: isLoadingCurrentWeather } = useCurrentWeather();
  const { data: weatherForecast } = useWeatherForecast();

  if (!currentWeather || isLoadingCurrentWeather) {
    return (
      <div className="grid w-full grid-cols-[55%_1fr] gap-4 @lg/section:grid-cols-none @lg/section:grid-rows-[max-content_max-content]">
        <div className="flex w-full flex-col overflow-hidden @lg/section:gap-y-px @xl/section:gap-y-0.5">
          <h3
            className="truncate font-oxanium text-2xl font-bold uppercase text-gray-100 @xl/section:text-[1.625rem] @1.5xl/section:text-[1.75rem]"
            title={`${city}, ${country}`}
          >
            {city}
          </h3>
          <div className="flex items-center gap-x-2 @lg/section:gap-x-2.5">
            <div className="h-9 w-28 rounded bg-gray-900 @xl/section:h-10 @1.5xl/section:h-11"></div>
            <div className="flex w-full flex-col gap-y-2.5">
              <div className="h-1.5 w-full rounded-full bg-gray-900"></div>
              <div className="h-1.5 w-full rounded-full bg-gray-900"></div>
            </div>
          </div>
        </div>
        <div className="w-full overflow-hidden">
          <div className="flex h-full flex-col items-end justify-between gap-x-2 @lg/section:flex-row @lg/section:items-center @lg/section:justify-start @lg/section:gap-x-2.5">
            <div className="h-8.5 w-8.5 rounded bg-gray-900 @lg/section:h-9 @lg/section:w-9"></div>
            <div className="flex w-full flex-col items-end gap-y-1.5 @lg/section:w-auto @lg/section:grow @lg/section:items-start">
              <div className="h-2.5 w-3/4 rounded bg-gray-900 @lg/section:h-3"></div>
              <div className="h-2 w-1/2 rounded bg-gray-900 @lg/section:h-2.5"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { id, description, icon: iconCode, temp, pressure, humidity } = currentWeather;

  // Calculate the min and max temperatures from the weather forecast
  let minTemp: string | number = "--";
  let maxTemp: string | number = "--";
  if (weatherForecast) {
    const temperatures = [temp]; // include the current temperature for calculating the min and max temperatures too
    weatherForecast.list.forEach((item) => temperatures.push(item.main.temp));
    minTemp = Math.round(Math.min(...temperatures));
    maxTemp = Math.round(Math.max(...temperatures));
  }

  return (
    <div
      className="grid w-full grid-cols-[55%_1fr] gap-4 @lg/section:grid-cols-none @lg/section:grid-rows-[max-content_max-content]"
      id="weather-summary"
    >
      <div className="flex w-full flex-col overflow-hidden @lg/section:gap-y-px @xl/section:gap-y-0.5">
        <h3
          className="truncate font-oxanium text-2xl font-bold uppercase text-gray-100 @xl/section:text-[1.625rem] @1.5xl/section:text-[1.75rem]"
          title={`${city}, ${country}`}
        >
          {city}
        </h3>
        <div className="flex items-center gap-x-2 @lg/section:gap-x-2.5">
          <h4
            className="-mb-1 font-oxanium text-[2.5rem] font-medium leading-10 tracking-tight text-gray-200 @xl/section:text-[2.75rem] @1.5xl/section:text-5xl"
            title={`${temp} °C`}
          >
            {`${Math.round(temp)}°`}
          </h4>
          <div className="flex w-full flex-col">
            <div
              className="flex items-center gap-x-1 @lg/section:gap-x-1.5"
              title={`Humidity: ${humidity}%`}
            >
              <IconDropCircle className="h-4 w-4" stroke={2.25} />
              <label className="sr-only" htmlFor="humidity">
                Humidity
              </label>
              <progress id="humidity" max={100} value={humidity}>
                {`${humidity}%`}
              </progress>
            </div>
            <div
              className="flex items-center gap-x-1 @lg/section:gap-x-1.5"
              title={`Pressure: ${pressure} hPa`}
            >
              <IconGauge className="h-4 w-4" stroke={2.25} />
              <label className="sr-only" htmlFor="pressure">
                Pressure
              </label>
              <progress id="pressure" value={(pressure - 975.75) / (1050.75 - 975.75)}>
                {`${pressure} hPa`}
              </progress>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full overflow-hidden">
        <div className="flex h-full flex-col items-end justify-between gap-x-2 @lg/section:flex-row @lg/section:items-center @lg/section:justify-start @lg/section:gap-x-2.5">
          <WeatherConditionIcon
            className="h-8.5 w-8.5 text-gray-100 @lg/section:h-9 @lg/section:w-9"
            id={id}
            iconCode={iconCode}
          />
          <div className="flex flex-col items-end @lg/section:items-start">
            <p className="truncate text-xs font-medium capitalize tracking-tight text-gray-100 @lg/section:text-sm">
              {description}
            </p>
            <p className="text-[10px] leading-3 tracking-tight @lg/section:text-xs">
              {`H: ${maxTemp}° L: ${minTemp}°`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
