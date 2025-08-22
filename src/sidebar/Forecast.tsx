import { Card } from "@blueprintjs/core";
import ForecastPeriod from "./ForecastPeriod";
import ForecastFetcher from "../data-components/ForecastFetcher";
import { Suspense } from "react";
import Loading from "../shared-components/Loading";

interface iProps {
  forecastUrl: string;
}

function Forecast({ forecastUrl }: iProps) {
  return (
    <Suspense fallback={<Loading />}>
      <ForecastFetcher forecastUrl={forecastUrl}>
        {(forecastData) => (
          <>
            <b>7-Day Forecast</b>
            <br />
            {forecastData?.properties.periods.map((p) => {
              return (
                <Card key={p.number}>
                  <ForecastPeriod period={p} />
                </Card>
              );
            })}
          </>
        )}
      </ForecastFetcher>
    </Suspense>
  );
}

export default Forecast;
