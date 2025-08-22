import { CardList, Section, SectionCard } from "@blueprintjs/core";
import type { PointResponse } from "../api-response-types/point-response";
import ForecastOffice from "./ForcecastOffice";
import type { MapRef } from "../common-types";
import SelectedPointDetails from "./SelectedPointDetails";
import Forecast from "./Forecast";

interface iProps {
    pointData: PointResponse
    map: MapRef
}

function SidebarLayout({ pointData, map }: iProps) {
    return (
        <Section>
            <SectionCard padded={false}>
                <CardList>
                    <SelectedPointDetails pointData={pointData} map={map} />
                    <ForecastOffice officeUrl={pointData.properties.forecastOffice} />
                </CardList>
            </SectionCard>
            <SectionCard className={"forecast-container"} padded={false}>
                <CardList>
                    <Forecast forecastUrl={pointData.properties.forecast} />
                </CardList>
            </SectionCard>
        </Section>
    )
}

export default SidebarLayout
