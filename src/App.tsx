import { getDefaultStore } from "jotai";
import mapboxgl, {
  GeolocateControl,
  Map,
  Marker,
  NavigationControl,
  Popup,
} from "mapbox-gl";
import { useEffect, useRef } from "react";
import type { StationProperties } from "./api-response-types/station-response";
import "./App.css";
import DiamondMapMarker from "./assets/diamondMapMarker";
import { pointAtom, stationIdAtom, stationListUrlAtom } from "./atoms";
import Sidebar from "./sidebar";
import ObservationDrawer from "./observation-drawer";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

function App() {
  const mapRef = useRef<Map>();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const unsubscriptions: (() => void)[] = [];

  useEffect(() => {
    if (mapContainerRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        center: [-74.0242, 40.6941],
        zoom: 10.12,
        hash: "bounds",
      })
        .addControl(new NavigationControl())
        .addControl(new GeolocateControl());

      const store = getDefaultStore();
      const marker = new Marker();
      mapRef.current.once("load", () => {
        const pt = store.get(pointAtom);

        if (mapRef.current) {
          if (pt) {
            marker.setLngLat(pt);
            marker.addTo(mapRef.current);
            mapRef.current.panTo(pt);
          }

          mapRef.current.addImage("diamond", DiamondMapMarker);

          mapRef.current.addSource("stations", {
            type: "geojson",
            generateId: true,
            data: {
              type: "FeatureCollection",
              features: [],
            },
          });

          mapRef.current.addLayer({
            id: "stationLayer",
            type: "symbol",
            source: "stations",
            paint: {
              "text-halo-color": "white",
              "text-halo-width": 5,
            },
            layout: {
              "icon-image": "diamond",
              "text-field": ["get", "stationIdentifier"],
              "text-font": ["Open Sans Regular"],
              "text-offset": [0, -0.6],
              "text-anchor": "bottom",
              "text-size": 12,
            },
          });

          const popup = new Popup({
            closeButton: false,
            closeOnClick: false,
          });

          mapRef.current.addInteraction("stations-mouseenter", {
            type: "mouseenter",
            target: { layerId: "stationLayer" },
            handler(e) {
              if (mapRef.current && e.feature) {
                mapRef.current.getCanvas().style.cursor = "pointer";

                if (e.feature.geometry.type == "Point") {
                  e.feature.geometry.coordinates.slice();
                  const coordinates =
                    e.feature.geometry.coordinates.slice() as [number, number];
                  // this is known
                  const properties = e.feature
                    .properties as unknown as StationProperties;
                  const description = `<b>${properties.name}</b><br/>Station ID: ${properties.stationIdentifier}<br/><i>Click for observations</i>`;

                  popup
                    .setLngLat(coordinates)
                    .setHTML(description)
                    .addTo(mapRef.current);
                }
              }
            },
          });

          mapRef.current.addInteraction("stations-mouseleave", {
            type: "mouseleave",
            target: { layerId: "stationLayer" },
            handler() {
              if (mapRef.current) {
                mapRef.current.getCanvas().style.cursor = "";
                popup.remove();
              }
            },
          });

          mapRef.current.addInteraction("stations-click", {
            type: "click",
            target: { layerId: "stationLayer" },
            handler(e) {
              e.preventDefault();
              if (e.feature) {
                const properties = e.feature
                  .properties as unknown as StationProperties;
                const stationId = properties.stationIdentifier;
                store.set(stationIdAtom, stationId);
              }
            },
          });

          mapRef.current.addInteraction("onMapClick", {
            type: "click",
            handler(event) {
              if (mapRef.current) {
                store.set(pointAtom, event.lngLat);
                marker.setLngLat(event.lngLat);
                marker.addTo(mapRef.current);
              }
            },
          });
        }
      });

      unsubscriptions.push(
        store.sub(stationListUrlAtom, () => {
          const stationUrl = store.get(stationListUrlAtom);
          if (stationUrl && mapRef.current?.loaded()) {
            const stationSource = mapRef.current.getSource("stations");
            if (stationSource && stationSource.type === "geojson") {
              stationSource.setData(stationUrl);
            }
          }
        }),
      );
    }

    return () => {
      mapRef.current?.remove();
      unsubscriptions.forEach((v) => v());
    };
  }, []);

  return (
    <>
      <div id="map-container" ref={mapContainerRef} />
      <Sidebar map={mapRef} />
      <ObservationDrawer />
    </>
  );
}

export default App;
