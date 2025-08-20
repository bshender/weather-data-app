import { useQuery } from "@tanstack/react-query";
import type { ForecastResponse } from "../api-response-types/forcecast-response";
import { Classes, Card, CardList, Section, SectionCard } from "@blueprintjs/core";
import Period from "./Period";

interface iProps {
    forecastUrl: string
}

function Forecast({ forecastUrl }: iProps) {
    const { data, isLoading, error } = useQuery<unknown, Error, ForecastResponse, string[]>({
        queryKey: ["forecastDetails", forecastUrl],
        queryFn: async ({ queryKey: [, forecastUrl] }) => {
            const res = await fetch(forecastUrl)
            return res.json()
        }
    })

    if (error) {
        console.error(error)
        return null
    }

    return (
        <Section title="7-Day Forecast" className={"forecast-container " + (isLoading ? Classes.SKELETON : "")}>
            <SectionCard padded={false}>
                <CardList>
                    {
                        data?.properties.periods.map(p => {
                            return (
                                <Card key={p.number}>
                                    <Period period={p} />
                                </Card>
                            )
                        })
                    }
                </CardList>
            </SectionCard>
        </Section>
    );
}

export default Forecast
