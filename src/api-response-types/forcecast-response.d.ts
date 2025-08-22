import type { Feature, Polygon } from "geojson";

type Timestamp = string; // "2025-08-20T13:00:00+00:00/P7DT18H"
type WeatherIconUrl = string;

interface ForecastPeriod {
  number: number;
  name: string;
  startTime: Timestamp;
  endTime: Timestamp;
  isDaytime: boolean;
  temperature: number;
  temperatureUnit: string; // F
  probabilityOfPrecipitation: {
    value: number; // percent
  };
  windSpeed: string;
  windDirection: string;
  icon: WeatherIconUrl;
  shortForecast: string;
  detailedForecast: string;
}

interface ForecastProperties {
  units: string;
  forecastGenerator: string;
  generatedAt: Timestamp;
  updateTime: Timestamp;
  validTimes: Timestamp;
  elevation: {
    value: number; // meters
  };
  periods: ForecastPeriod[];
}

type ForecastResponse = Feature<Polygon, ForecastProperties>;

export type { ForecastPeriod, ForecastResponse };
