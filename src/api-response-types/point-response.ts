
import type { Feature, Point } from "geojson"

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
    "forecast": string,
    "forecastHourly": string,
    "forecastGridData": string,
    "observationStations": string,
    "relativeLocation": Feature<Point, PointResponseRelativeLocationProperties>,
    "forecastZone": string,
    "county": string,
    "fireWeatherZone": string,
    "timeZone": string,
    "radarStation": string
}

type PointResponse = Feature<Point, PointResponseProperties>

export type {
    PointResponse,
    PointResponseProperties,
    PointResponseRelativeLocationProperties
}
