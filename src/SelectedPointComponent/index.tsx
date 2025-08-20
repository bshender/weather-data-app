import { Card, CardList, Section, SectionCard } from "@blueprintjs/core";
import type { PointResponse } from "../api-response-types/point-response";
import { useAtomValue } from "jotai";
import { pointAtom } from "../atoms";
import ForecastOffice from "./ForcecastOffice";

interface iProps {
    pointData: PointResponse
}

function SelectedPointComponent({ pointData }: iProps) {
    const selectedPoint = useAtomValue(pointAtom)

    return (
        <Section>
            <SectionCard padded={false}>
                <CardList>
                <Card>
                    <div className="pt-text-box">
                        <div><span>Latitude:</span><span>{selectedPoint?.lat}</span></div>
                        <div><span>Longitude:</span><span>{selectedPoint?.lng}</span></div>
                        <div><span>CWA:</span><span>{pointData.properties.cwa}</span></div>
                        <div><span>Grid ID:</span><span>{pointData.properties.gridId}</span></div>
                        <div><span>Radar Station:</span><span>{pointData.properties.radarStation}</span></div>
                    </div>
                </Card>
                <Card>
                    <ForecastOffice officeUrl={pointData.properties.forecastOffice} />
                </Card>
                </CardList>
            </SectionCard>
        </Section>
    )
}

export default SelectedPointComponent
