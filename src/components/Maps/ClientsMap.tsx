import React, { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { type LatLngTuple} from "leaflet";
import CustomMarker from "./CustomMarker";

import icon from "./constants";
const centerOfMyloc: LatLngTuple = [22, 83];

const clientsData = [
  {
    name: "India",
    lat: 22,
    long: 83,
  },
  {
    name: "United States",
    lat: 37.7749,
    long: -122.4194,
  },
  {
    name: "China",
    lat: 35.8617,
    long: 104.1954,
  },
  {
    name: "Brazil",
    lat: -14.235,
    long: -51.9253,
  },
  {
    name: "United Kingdom",
    lat: 51.509865,
    long: -0.118092,
  },
  {
    name: "Russia",
    lat: 61.524,
    long: 105.3188,
  },
  {
    name: "Australia",
    lat: -25.2744,
    long: 133.7751,
  },
  {
    name: "Canada",
    lat: 56.1304,
    long: -106.3468,
  },
  {
    name: "South Africa",
    lat: -30.5595,
    long: 22.9375,
  },
  {
    name: "Japan",
    lat: 36.2048,
    long: 138.2529,
  },
  {
    name: "Nepal",
    lat: 28.3949,
    long: 84.124,
  },
  {
    name: "Bangladesh",
    lat: 23.685,
    long: 90.3563,
  },
  {
    name: "Pakistan",
    lat: 30.3753,
    long: 69.3451,
  },
  {
    name: "Bhutan",
    lat: 27.5142,
    long: 90.4336,
  },
  {
    name: "Sri Lanka",
    lat: 7.8731,
    long: 80.7718,
  },
  {
    name: "Maldives",
    lat: 3.2028,
    long: 73.2207,
  },
  {
    name: "Myanmar",
    lat: 21.9162,
    long: 95.956,
  },
];

function LocationMarker({ position }: { position: LatLngTuple }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(position, map.getZoom());
  }, [map, position]);

  return position === null ? null : (
    <Marker position={position} icon={icon}>
    </Marker>
  );
}
const ClientsMap = () => {
  const [mapUrl] = useState(
    "https://api.maptiler.com/maps/dataviz-dark/{z}/{x}/{y}.png?key=FD8nzx8XXXjgvg9kmHx8"
  );
  const [position, setPosition] = useState<LatLngTuple>([22, 85]);
  return (
    <div className="flex rounded-lg border-[1.5px] border-[#484D64]">
      <div className="custom-scrollbar z-0 h-[80vh] w-56 cursor-pointer overflow-auto rounded-lg">
        <h1 className="sticky top-0 px-4 py-2 text-2xl font-semibold backdrop-blur-lg">
          Clients
        </h1>
        <div className="">
          {clientsData.map((client) => {
            return (
              <h1
                className={`px-4 py-2 hover:bg-[#4441657a] hover:text-white ${
                  client.lat === position[0] && client.long === position[1]
                    ? "bg-[#6153ff] text-white"
                    : ""
                }`}
                onClick={() => setPosition([client.lat, client.long])}
                key={client.name}
              >
                {client.name}
              </h1>
            );
          })}
        </div>
      </div>
      <MapContainer
        style={{
          height: "90vh",
          width: "100%",
          border: "0px solid black",
          borderRadius: "10px",
          zIndex: "1",
        }}
        center={centerOfMyloc}
        zoom={5}
        bounds={[
          [90, -180],
          [-90, 180],
        ]}
      >
        <TileLayer url={mapUrl} noWrap={true} />
        {clientsData.map((client) => (
          <CustomMarker
            key={client.name}
            position={[client.lat, client.long]}
            country={client.name}
          />
        ))}
        <LocationMarker position={position} />
      </MapContainer>
    </div>
  );
};

export default ClientsMap;
