import type { OfficeResponse } from "../api-response-types/office-response";
import { useQuery } from "@tanstack/react-query";
import errorHandler from "./errorHandler";

interface iProps {
    children: (officeData: OfficeResponse | undefined, isLoading: boolean) => React.ReactNode
    officeUrl: string
}

function ForecastOfficeFetcher({ children, officeUrl }: iProps) {
    const { data, isLoading, error } = useQuery({
        queryKey: ["forecastOffice", officeUrl],
        queryFn: async ({ queryKey: [, officeUrl] }) => {
            const res = await fetch(officeUrl)
            const data: OfficeResponse = await res.json()
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
        return children(undefined, isLoading)
    }

    return children(res, isLoading)
}

export default ForecastOfficeFetcher