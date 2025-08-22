
import type { Feature, Point } from "geojson"

type API_URL = string

type PointResponseRelativeLocationProperties = {
    "city": string,
    "state": string,
    "distance": {
        "unitCode": string,
        "value": number
    },
    "bearing": {
        "unitCode": string,
        "value": number
    }
}

type PointResponseProperties = {
    "@id": string,
    "@type": string,
    "cwa": string,
    "forecastOffice": string,
    "gridId": string,
    "gridX": number,
    "gridY": number,
    "forecast": API_URL,
    "forecastHourly": API_URL,
    "forecastGridData": API_URL,
    "observationStations": API_URL,
    "relativeLocation": Feature<Point, PointResponseRelativeLocationProperties>,
    "forecastZone": API_URL,
    "county": API_URL,
    "fireWeatherZone": API_URL,
    "timeZone": string,
    "radarStation": string
}

type PointResponse = Feature<Point, PointResponseProperties>

export type {
    PointResponse,
    PointResponseProperties,
    PointResponseRelativeLocationProperties
}
