import { useSuspenseQuery } from "@tanstack/react-query"
import type { ForecastResponse } from "../api-response-types/forcecast-response"
import errorHandler from "./errorHandler"

interface iProps {
    children: (forecastData: ForecastResponse | undefined) => React.ReactNode
    forecastUrl: string
}

function ForecastFetcher({ children, forecastUrl }: iProps) {
    const { data, error } = useSuspenseQuery({
        queryKey: ["forecastDetails", forecastUrl],
        queryFn: async ({ queryKey: [, forecastUrl] }) => {
            const res = await fetch(forecastUrl)
            const data: ForecastResponse = await res.json()
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

export default ForecastFetcher
