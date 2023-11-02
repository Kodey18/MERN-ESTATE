import React, { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import { Icon } from "leaflet";

const GroundMap = ({lat, lng, gname}) => {
  const [position, setPosition] = useState([56.45, 128.33]);

  // Function to handle marker drag and update the position
  const handleMarkerDrag = (e) => {
    setPosition(e.target.getLatLng());
  };

  const customMaker = new Icon({
    iconUrl: "../assets/marker.png",
    iconSize: [120, 130], // size of the icon
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
  });

  return (
    <div>
      <MapContainer
        center={position}
        zoom={20}
        style={{ width: "45vw", height: "70vh" }}
        minZoom={1}
        className="border rounded-2xl"
      >
        <TileLayer
          // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          // url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
        />

          <Marker 
            position={position}
            icon={customMaker}
          >
            <Popup>{gname}</Popup>
          </Marker>
      </MapContainer>
    </div>
  );
};


export default GroundMap;
