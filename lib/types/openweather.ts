interface Coord {
  lon: number;
  lat: number;
}

interface WeatherEntity {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

interface Wind {
  speed: number;
  deg: number;
}

interface Clouds {
  all: number;
}

export interface CurrentWeatherData {
  coord: Coord;
  weather: WeatherEntity[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

interface Main {
  sea_level: number;
  grnd_level: number;
  temp_kf: number;
}

interface Wind {
  gust: number;
}

export interface WeatherForecastData {
  cod: string;
  message: number;
  cnt: number;
  list: {
    dt: number;
    main: Main;
    weather: WeatherEntity[];
    clouds: Clouds;
    wind: Wind;
    visibility: number;
    pop: number;
    rain: {
      "3h": number;
    };
    sys: {
      pod: string;
    };
    dt_txt: string;
  }[];
  city: {
    id: number;
    name: string;
    coord: Coord;
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}
