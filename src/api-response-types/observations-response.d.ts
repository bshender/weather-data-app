import type { FeatureCollection, Point } from "geojson";

interface ValueAndUnit {
  unitCode: string;
  value: number;
  qualityControl?: string;
}

// text description might be there
// icon might be there

interface ObservationProperties {
  "@id": string;
  "@type": string;
  elevation: ValueAndUnit;
  station: string;
  stationId: string;
  stationName: string;
  timestamp: string; // "2025-08-18T15:10:00+00:00",
  rawMessage: string; // might be empty
  textDescription: string; // might be empty
  icon: string | null; // url
  presentWeather: {
    intensity: string;
    modifier: string | null;
    weather: string;
    rawString: string;
  }[];
  temperature: ValueAndUnit;
  dewpoint: ValueAndUnit;
  windDirection: ValueAndUnit;
  windSpeed: ValueAndUnit;
  windGust: ValueAndUnit;
  barometricPressure: ValueAndUnit;
  seaLevelPressure: ValueAndUnit;
  visibility: ValueAndUnit;
  maxTemperatureLast24Hours: ValueAndUnit;
  minTemperatureLast24Hours: ValueAndUnit;
  precipitationLast3Hours: ValueAndUnit;
  relativeHumidity: ValueAndUnit;
  windChill: ValueAndUnit;
  heatIndex: ValueAndUnit;
  cloudLayers: {
    base: ValueAndUnit;
    amount: string;
  }[];
}

type ObservationResponse = FeatureCollection<Point, ObservationProperties>;

export type { ObservationProperties, ObservationResponse };
