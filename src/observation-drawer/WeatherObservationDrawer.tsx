import { Drawer } from "@blueprintjs/core";
import { useAtom } from "jotai";
import { Suspense, useCallback } from "react";
import { stationIdAtom } from "../atoms";
import ObservationFetcher from "../data-components/ObservationsFetcher";
import Loading from "../shared-components/Loading";
import ObservationsChart from "./ObservationsChart";

function WeatherObservationDrawer() {
  const [stationId, setStationId] = useAtom(stationIdAtom);

  const closeDrawer = useCallback(() => {
    setStationId(undefined);
  }, [setStationId]);

  return (
    <Drawer
      isOpen={!!stationId}
      title="Weather Observations"
      position="bottom"
      canOutsideClickClose={false}
      hasBackdrop={false}
      onClose={closeDrawer}
    >
      <Suspense fallback={<Loading />}>
        {stationId ? (
          <ObservationFetcher stationId={stationId}>
            {(obserations) => {
              if (!obserations) {
                return null;
              }
              return <ObservationsChart observationResponse={obserations} />;
            }}
          </ObservationFetcher>
        ) : null}
      </Suspense>
    </Drawer>
  );
}

export default WeatherObservationDrawer;
