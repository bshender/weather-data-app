import { EntityTitle, Icon, Tooltip } from "@blueprintjs/core";
import type { ForecastPeriod } from "../api-response-types/forcecast-response";

interface iProps {
    period: ForecastPeriod
}

function Period({ period }: iProps) {

    const detailsIcon = (
        <Tooltip content={period.detailedForecast} popoverClassName="detailed-forecast">
            <Icon icon="info-sign" />
        </Tooltip>
    )

    return (
        <>
            <EntityTitle fill title={period.name} subtitle={period.shortForecast} icon={detailsIcon} />
            <div className="forecast-period">
                <div>
                    Temp: {period.temperature}°F<br />
                    Rain: {period.probabilityOfPrecipitation.value}%<br />
                    Wind: {period.windSpeed} {period.windDirection}<br />
                </div>
                <img src={period.icon} width={85} height={85} />
            </div>
        </>
    );
}

export default Period;
