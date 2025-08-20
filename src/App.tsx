import './App.css'
import { useRef, useEffect } from 'react'
import mapboxgl, { GeolocateControl, Map, MapMouseEvent, NavigationControl } from 'mapbox-gl'
import SelectionSideBar from './SelectionSidebar'
import { getDefaultStore } from 'jotai'
import { mapMarkerAtom, pointAtom } from './atoms'
import MapMarkerHandler from './MapMarkerHandler'

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN

function App() {
  const mapRef = useRef<Map>()
  const mapContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (mapContainerRef.current) {
      console.log("I got called")
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        center: [-74.0242, 40.6941],
        zoom: 10.12,
        hash: "bounds",
      })
        .addControl(new NavigationControl())
        .addControl(new GeolocateControl());

      mapRef.current.once("load", () => {
        const store = getDefaultStore()
        const pt = store.get(pointAtom)
        const marker = store.get(mapMarkerAtom)
        
        if (mapRef.current?.loaded) {
          marker.addTo(mapRef.current)
        }
        if (pt && mapRef.current?.loaded) {
          marker.setLngLat(pt)
          mapRef.current.panTo(pt)
        }
      })

      mapRef.current.on("click", (event: MapMouseEvent) => {
        const store = getDefaultStore()
        store.set(pointAtom, event.lngLat)
      })
    }

    return () => {
      mapRef.current?.remove()
    }
  }, [])

  return (
    <>
      <MapMarkerHandler map={mapRef} />
      <div id='map-container' ref={mapContainerRef} />
      <SelectionSideBar map={mapRef} />
    </>
  )
}

export default App
