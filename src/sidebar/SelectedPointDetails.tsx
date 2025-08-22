import { Button, Card, EntityTitle } from "@blueprintjs/core"
import { useAtomValue, useSetAtom } from "jotai"
import { useCallback } from "react"
import type { PointResponse } from "../api-response-types/point-response"
import { pointAtom, stationListUrlAtom } from "../atoms"
import type { MapRef } from "../common-types"

interface iProps {
    pointData: PointResponse
    map: MapRef
}

function SelectedPointDetails({ pointData, map }: iProps) {
    const selectedPoint = useAtomValue(pointAtom)
    const setStationUrl = useSetAtom(stationListUrlAtom)

    const panToLocation = useCallback(() => {
        if (map.current && selectedPoint) {
            map.current?.panTo(selectedPoint)
        }
    }, [selectedPoint, map])

    const loadStations = useCallback(() => {
        setStationUrl(pointData.properties.observationStations)
    }, [pointData, setStationUrl])

    const MapMarkerButton = <Button size="small" icon="map-marker" intent="primary" variant="minimal" onClick={panToLocation} />

    return (
        <Card>
            <b>Location Details</b><br />
            <div className="pt-text-box">
                <EntityTitle fill title={`${selectedPoint?.lat}, ${selectedPoint?.lng}`} icon={MapMarkerButton} />
                <br />
                <div><span>CWA:</span><span>{pointData.properties.cwa}</span></div>
                <div><span>Grid ID:</span><span>{pointData.properties.gridId}</span></div>
                <div><span>Radar Station:</span><span>{pointData.properties.radarStation}</span></div>
            </div>
            <Button icon="area-of-interest" intent="success" text="Show Related Stations" onClick={loadStations} />
        </Card>
    )
}

export default SelectedPointDetails
