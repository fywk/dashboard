"use client";

import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

import useCurrentWeather from "@/lib/hooks/useCurrentWeather";
import useWeatherForecast from "@/lib/hooks/useWeatherForecast";
import dayjs from "@/lib/utils/dayjs";

import type { ChartData, ChartOptions } from "chart.js";

ChartJS.register(CategoryScale, Filler, LinearScale, LineController, LineElement, PointElement);

export default function WeatherChart() {
  const { data: currentWeather, isLoading: isLoadingCurrentWeather } = useCurrentWeather();
  const { data: weatherForecast, isLoading: isLoadingWeatherForecast } = useWeatherForecast();

  if (!currentWeather || isLoadingCurrentWeather || !weatherForecast || isLoadingWeatherForecast) {
    return <div className="h-[10rem] w-full rounded bg-gray-900/50 @1.5xl/section:h-[11rem]"></div>;
  }

  // Add current weather to the chart
  const timestamps = ["Now"];
  const temperatures = [currentWeather.temp];

  weatherForecast.list.forEach((item) => {
    timestamps.push(
      dayjs
        .unix(item.dt)
        .utcOffset(weatherForecast.city.timezone / 60) // convert UTC offset in seconds to minutes
        .format("HH:mm"),
    );
    temperatures.push(item.main.temp);
  });

  const data: ChartData<"line"> = {
    labels: timestamps,
    datasets: [
      {
        backgroundColor: "rgb(110 242 255 / 0.075)",
        borderColor: "rgb(110 242 255 / 0.75)",
        borderWidth: 1.5,
        data: temperatures,
        fill: "start",
        pointBorderColor: function () {
          const colours = [
            "rgb(110 242 255)",
            "rgb(110 242 255)",
            "rgb(110 242 255)",
            "rgb(250 207 6)",
          ];
          return colours[Math.floor(Math.random() * colours.length)];
        },
        pointBorderWidth: 1.5,
        pointRadius: 6,
        pointStyle: "rectRot",
        tension: 0.375,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    devicePixelRatio: 2,
    events: [],
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    maintainAspectRatio: false,
    resizeDelay: 100,
    scales: {
      x: {
        border: {
          color: "rgb(110 242 255 / 0.5)",
          width: 2,
        },
        grid: {
          color: "rgb(110 242 255 / 0.125)",
        },
        ticks: {
          color: "rgb(161 161 170)", // text-gray-400
          font: {
            size: 11,
          },
        },
      },
      y: {
        grid: {
          color: "rgb(110 242 255 / 0.125)",
        },
        suggestedMin: Math.min(...temperatures) - 3,
        suggestedMax: Math.max(...temperatures) + 2,
        ticks: {
          callback: function (value) {
            return `${value.toString()}°`;
          },
          color: "rgb(161 161 170)", // text-gray-400
          font: {
            size: 11,
          },
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="relative h-[10rem] w-full overflow-hidden @1.5xl/section:h-[11rem]">
      <Line data={data} options={options} />
    </div>
  );
}
