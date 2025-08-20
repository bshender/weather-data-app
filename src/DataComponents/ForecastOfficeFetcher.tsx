import type { OfficeResponse } from "../api-response-types/office-response";
import { useQuery } from "@tanstack/react-query";
import errorHandler from "./errorHandler";

interface iProps {
    children: (officeData: OfficeResponse | undefined, isLoading: boolean) => React.ReactNode
    officeUrl: string
}

function ForecastOfficeFetcher({ children, officeUrl }: iProps) {
    const { data, isLoading, error } = useQuery<unknown, Error, OfficeResponse, string[]>({
        queryKey: ["forecastOffice", officeUrl],
        queryFn: async ({ queryKey: [, officeUrl] }) => {
            const res = await fetch(officeUrl)
            return res.json()
        }
    })

    if (error) {
        errorHandler(error)
    }

    return children(data, isLoading)
}

export default ForecastOfficeFetcher