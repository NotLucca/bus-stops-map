import { useState, useMemo, useCallback, useRef, Key } from "react";
import Places from "../places/index";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
  MarkerF,
  GoogleMapsMarkerClusterer,
  GoogleMarkerClusterer,
} from "@react-google-maps/api";
import stopData from "./csvjson.json";



type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;
type MapArray = any;

export default function Map() {
  const [office, setOffice] = useState<LatLngLiteral>();
  const mapRef = useRef<GoogleMap>();
  const center = useMemo<LatLngLiteral>(() => ({ lat: 43.45, lng: 23.49 }), []);
  const options = useMemo<MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );
  const onLoad = useCallback((map: any) => (mapRef.current = map), []);
  const data = require("./csvjson.json")
    
  return (
    <div className="container">
      <div className="controls">
        <span>
          <span
            role="img"
            aria-label="emoji"
            style={{
              fontSize: "2.5rem",
            }}
          >
            🗺️
          </span>
        </span>
        <Places
          setOffice={(position) => {
            setOffice(position);
            mapRef.current?.panTo(position);
          }}
        />
      </div>
      <div className="map">
        <GoogleMap
          zoom={13}
          center={center}
          mapContainerClassName="map-container"
          options={options}
          onLoad={onLoad}
        >
         
          <MarkerClusterer>
            {(clusterer) => data.map((stop: { stop_lat: any; stop_lon: any; stop_name: any; }, index: Key | null | undefined) => <Marker clusterer={clusterer} position={{lat: stop.stop_lat, lng: stop.stop_lon}} key={index}></Marker>) }
          </MarkerClusterer>
          {/* {data.map((stop: { stop_lat: any; stop_lon: any; }, index: Key | null | undefined) => <Marker position={{lat: stop.stop_lat, lng: stop.stop_lon}} key={index}></Marker>)} */}

          {/* {stopData.map<any>((stop: { stop_lat: any; stop_lon: any; stop_name: any;}, index: number) => (
            <Marker
            position={{lat: stop.stop_lat, lng: stop.stop_lon}}
            key={index * Math.random()}
            title={stop.stop_name}
            >
            
            </Marker>
          ))} */}
          {office && <Marker position={office} />}
        </GoogleMap>
      </div>
    </div>
  );
}

const defaultOptions = {
  strokeOpacity: 0.5,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
};
const closeOptions = {
  ...defaultOptions,
  zIndex: 3,
  fillOpacity: 0.05,
  strokeColor: "#8BC34A",
  fillColor: "#8BC34A",
};
const middleOptions = {
  ...defaultOptions,
  zIndex: 2,
  fillOpacity: 0.05,
  strokeColor: "#FBC02D",
  fillColor: "#FBC02D",
};
const farOptions = {
  ...defaultOptions,
  zIndex: 1,
  fillOpacity: 0.05,
  strokeColor: "#FF5252",
  fillColor: "#FF5252",
};
