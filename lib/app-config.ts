import type { AppConfig } from "./types/app";

const appConfig: Readonly<AppConfig> = {
  user: "Francis Yeong",
  title: "Dashboard",
  titleSeparator: "｜",
  description: "My Tron-inspired personal dashboard",
  defaultDateFormat: "D MMM YYYY, HH:mm",
  location: {
    city: "Kuala Lumpur",
    country: "Malaysia",
    latitude: "3.1415",
    longitude: "101.6865",
  },
  // location: {
  //   city: "London",
  //   country: "England",
  //   latitude: "51.507351",
  //   longitude: "-0.127758",
  // },
};

export { appConfig as app };
