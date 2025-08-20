import { Suspense } from "react";
import type { MapRef } from "./common-types"
import Loading from "./SharedComponents/Loading";
import PointFetcher from "./DataComponents/PointFetcher";
import SelectedPointComponent from "./SelectedPointComponent";
import Forecast from "./ForecastComponent";

interface IProps {
    map: MapRef
}

function SelectionSideBar({ map }: IProps) {
    return (
        <div id="right-sidebar">
            <Suspense fallback={<Loading />}>
                <PointFetcher>
                    {(pointData => {
                        return (
                            <>
                                <SelectedPointComponent pointData={pointData} />
                                <Forecast forecastUrl={pointData.properties.forecast} />
                            </>
                        )
                    })}
                </PointFetcher>
            </Suspense>
        </div>
    );
}

export default SelectionSideBar
