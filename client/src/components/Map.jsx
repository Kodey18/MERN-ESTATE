import React, { useEffect, useRef, useState } from 'react'
import 'leaflet/dist/leaflet.css'
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMapEvents,
    ZoomControl,
} from 'react-leaflet'
import { Link } from 'react-router-dom';
import { Icon } from 'leaflet';

// Custom hook to set the map view based on marker position
function LocationMarker({ position }) {
  const map = useMapEvents({
    click() {
      map.flyTo(position, map.getZoom());
    },
  });
  return null;
}

const Map = (props) => {
    const [position, setPosition] = useState([51.505, -0.09]);
    const [ginfo, setGinfo] = useState([]);

    console.log("ginfo : ",ginfo);

    // Function to handle marker drag and update the position
    const handleMarkerDrag = (e) => {
        setPosition(e.target.getLatLng());
    };

  useEffect(() => {
    const fetchInfo = async () => {
      // Fetch data here and update state accordingly
      const res = await fetch(`/api/ground/groundInfo`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      // console.log(data);
      setGinfo(data);
    };

    fetchInfo();
  }, []);

  const customMaker = new Icon({
    iconUrl: '../assets/marker.png',
    // iconUrl: '../assets/marker2.png',
    // shadowUrl: '/shadow.png',
    iconSize:     [120, 130], // size of the icon
    // shadowSize:   [50, 60], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    // shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
  })

  return (
    <div>
      <MapContainer
        center={position}
        zoom={20}
        style={{ width: "80vw", height: "80vh" }}
        minZoom={7}
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
          draggable={true}
          onDragEnd={handleMarkerDrag}
          icon={customMaker}
        >
          <Popup className="font-semibold text-lg">
            Drag me to select the location
          </Popup>
        </Marker>

        {ginfo.map((ground) => (
          <Marker
            key={ground._id}
            position={[ground.lat, ground.lng]}
            icon={customMaker}
          >
            <Popup className="font-semibold text-lg">
              <Link
                className="hover:underline`"
                to={`/campGround/${ground._id}`}
              >
                {ground.name}
              </Link>
            </Popup>
          </Marker>
        ))}

        {/* Use this custom hook to set the map view based on marker position */}
        <LocationMarker position={position} />

        {/* Add ZoomControl with custom style */}
        {/* <ZoomControl
          position="topright"
          zoomInText="+"
          zoomOutText="-"
          zoomInTitle="Zoom In"
          zoomOutTitle="Zoom Out"
          style={{ width: "1000px", height: "550px", fontSize: "300px" }}
        /> */}
      </MapContainer>
    </div>
  );
}

// var Esri_WorldImagery = L.tileLayer(
//   "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
//   {
//     attribution:
//       "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
//   }
// );

export default Map