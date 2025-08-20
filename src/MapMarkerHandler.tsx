import { useEffect } from "react";
import type { MapRef } from "./common-types"
import { mapMarkerAtom, pointAtom } from "./atoms";
import { useAtomValue } from "jotai";

interface IProps {
    map: MapRef
}

function MapMarkerHandler({ map }: IProps) {
    const pt = useAtomValue(pointAtom)
    const marker = useAtomValue(mapMarkerAtom)

    useEffect(() => {
        if (map.current?.loaded && pt) {
            marker.setLngLat(pt)
        }
    }, [map, pt])

    return null;
}

export default MapMarkerHandler
