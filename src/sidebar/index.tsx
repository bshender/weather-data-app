import { Suspense } from "react";
import type { MapRef } from "../common-types"
import Loading from "../shared-components/Loading";
import PointFetcher from "../data-components/PointFetcher";
import { NonIdealState } from "@blueprintjs/core";
import SidebarLayout from "./SidebarLayout";

interface IProps {
    map: MapRef
}

function Sidebar({ map }: IProps) {
    return (
        <div id="right-sidebar">
            <Suspense fallback={<Loading />}>
                <PointFetcher>
                    {(pointData => (
                        pointData
                            ? <SidebarLayout pointData={pointData} map={map} />
                            : <NonIdealState className="non-ideal-state-component" icon="map-marker" title="Select a point on the map" />
                    ))}
                </PointFetcher>
            </Suspense>
        </div>
    );
}

export default Sidebar
