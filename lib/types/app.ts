export type AppConfig = {
  user: string;
  title: string;
  titleSeparator: string;
  description: string;
  /**
   * The default date format to be used in the app.
   *
   * See https://day.js.org/docs/en/display/format for list of valid formats and syntax.
   */
  defaultDateFormat: string;
  /**
   * The location the app will use during development and fallback to
   * in production if the hosting platform does not provide one.
   */
  location: {
    city: string;
    country: string;
    latitude: string;
    longitude: string;
  };
};

export type SearchParams = AppConfig["location"];
