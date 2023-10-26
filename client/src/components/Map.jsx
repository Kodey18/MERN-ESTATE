import React, { useEffect, useRef, useState } from 'react'
import 'leaflet/dist/leaflet.css'
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMapEvents,
} from 'react-leaflet'

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

    // Function to handle marker drag and update the position
    const handleMarkerDrag = (e) => {
        setPosition(e.target.getLatLng());
    };

  return (
    <div>
        <MapContainer
            center={position}
            zoom={10}
            style={{width:"50vw", height:"50vh"}}
        >
            <TileLayer
            attribution= '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
            />

            <Marker
                position={position}
                draggable={true}
                onDragEnd={handleMarkerDrag}
            >
                <Popup>Drag me to select the location</Popup>
            </Marker>

            {/* Use this custom hook to set the map view based on marker position */}
            <LocationMarker position={position} />
        </MapContainer>
    </div>
  )
}

export default Map