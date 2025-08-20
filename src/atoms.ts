import { atom } from "jotai";
import { atomWithHash } from "jotai-location";
import { atomWithSuspenseQuery } from "jotai-tanstack-query";
import { LngLat, Marker } from "mapbox-gl";
import type { PointResponse } from "./api-response-types/point-response";

const pointLocationAtom = atomWithHash<LngLat | undefined>("point", undefined)

const restrictTo4Places = (v: number): number => Math.round(v * 1000) / 1000
const pointAtom = atom(
    (get) => get(pointLocationAtom),
    (_, set, newValue: LngLat) => {
        const lat = restrictTo4Places(newValue.lat)
        const lng = restrictTo4Places(newValue.lng)
        set(pointLocationAtom, new LngLat(lng, lat))
    }
)

const mapMarkerAtom = atom(new Marker())

const pointData = atomWithSuspenseQuery<void, Error, PointResponse | null, readonly [string, number | undefined, number | undefined]>(get => ({
    queryKey: ["pointData", get(pointLocationAtom)?.lat, get(pointLocationAtom)?.lng],
    queryFn: async ({ queryKey: [, lat, lng] }) => {
        if (lat && lng) {
            console.log(lat, lng)
            const res = await fetch(`https://api.weather.gov/points/${lat},${lng}`)
            return res.json()
        }
        return null
    },
    staleTime: "static"
}))

export {
    pointAtom,
    mapMarkerAtom,
    pointData
}
