import type { FeatureCollection, Point } from "geojson";

type URL = string;

interface StationProperties {
  "@id": URL;
  "@type": string;
  elevation: {
    unitCode: string;
    value: number;
  };
  stationIdentifier: string;
  name: string;
  timeZone: string;
  distance: {
    unitCode: string;
    value: number;
  };
  bearing: {
    unitCode: string;
    value: number;
  };
  forecast: URL;
  county: URL;
  fireWeatherZone: URL;
}

type StationResponse = FeatureCollection<Point, StationProperties>;

export type { StationResponse, StationProperties };
