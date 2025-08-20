import { useAtom } from "jotai";
import { pointData } from "../atoms";
import type { PointResponse } from "../api-response-types/point-response";
import errorHandler from "./errorHandler";

interface iProps {
    children: (pointData: PointResponse) => React.ReactNode
}

function PointFetcher({ children }: iProps) {
    const [{ data, error }] = useAtom(pointData)

    if (error) {
        errorHandler(error)
    }

    if (!data) {
        return null
    }
    
    return children(data)
}

export default PointFetcher