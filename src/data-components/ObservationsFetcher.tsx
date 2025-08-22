import { DateTime } from "luxon";
import type { ObservationResponse } from "../api-response-types/observations-response";
import { useSuspenseQuery } from "@tanstack/react-query";
import errorHandler from "./errorHandler";

interface iProps {
    children: (observations: ObservationResponse | undefined) => React.ReactNode,
    stationId: string
}

function ObservationFetcher({ children, stationId }: iProps) {
    const { data, error } = useSuspenseQuery({
        queryKey: ["observations", stationId],
        queryFn: async ({ queryKey: [, stationId] }) => {
            // every second when tanstack gets the notion makes this the easy way
            const startTime = DateTime.now().minus({ day: 1 }).toISO({ precision: "seconds"})
            const endTime = DateTime.now().toISO({ precision: "seconds" })
            const url = `https://api.weather.gov/stations/${stationId}/observations?start=${encodeURIComponent(startTime)}&end=${encodeURIComponent(endTime)}&limit=500`
            const res = await fetch(url)
            const data: ObservationResponse = await res.json()
            return [data, res.status] as const
        }
    })

    if (error) {
        errorHandler(error)
    }

    const res = data?.[0]
    const status = data?.[1] || 0

    if (status >= 400) {
        // @ts-expect-error The error response has a title field, but the success response does not
        errorHandler(Error(res?.title || "Unknown Error"))
        return children(undefined)
    }

    return children(res)
}

export default ObservationFetcher
