import * as Highcharts from "highcharts";
import { HighchartsReact } from "highcharts-react-official";
import { useAtomValue } from "jotai";
import { useMemo, useRef } from "react";
import type { ObservationResponse } from "../api-response-types/observations-response";
import { stationIdAtom } from "../atoms";

interface iProps {
    observationResponse: ObservationResponse
}

function ObservationsChart({ observationResponse }: iProps) {
    const stationId = useAtomValue(stationIdAtom)
    const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
    const chartOptions = useMemo(() => {
        const observations = observationResponse.features.map(f => f.properties)

        const temperatureUnit = observations[0].temperature.unitCode.includes("degC") ? "C" : "F"

        const tempSeries: Highcharts.SeriesLineOptions = {
            type: "line",
            data: observations.map(o => ([o.timestamp, o.temperature.value])),
            yAxis: "temp",
            name: `Temperature °${temperatureUnit}`
        }

        const windSpeedSeries: Highcharts.SeriesLineOptions = {
            type: "line",
            data: observations.map(o => ([o.timestamp, o.windSpeed.value])),
            yAxis: "speed",
            name: "Wind Speed"
        }

        const relHumiditySeries: Highcharts.SeriesLineOptions = {
            type: "line",
            data: observations.map(o => ([o.timestamp, o.relativeHumidity.value])),
            yAxis: "hum",
            name: "Relative Humidity"
        }

        const options: Highcharts.Options = {
            title: {
                text: `Last 24 hrs of Observations by ${stationId}`
            },
            xAxis: {
                type: "datetime"
            },
            yAxis: [
                {
                    type: "linear",
                    id: "temp",
                    title: { text: `Temperature °${temperatureUnit}` }
                },
                {
                    type: "linear",
                    id: "speed",
                    title: { text: "Wind Speed" }
                },
                {
                    type: "linear",
                    id: "hum",
                    title: { text: "Relative Humidity" }
                }
            ],
            series: [tempSeries, windSpeedSeries, relHumiditySeries]
        }
        return options
    }, [observationResponse, stationId])

    return <HighchartsReact highcharts={Highcharts} ref={chartComponentRef} options={chartOptions} />
}

export default ObservationsChart
