import React, { useState } from "react";
import { GoogleMap, LoadScript, Circle, InfoWindow } from "@react-google-maps/api";

const center = { lat: 20, lng: 0 };

const getColorByDepth = (depth) => {
  if (depth < 30) return "#ef4444"; // Red
  if (depth < 100) return "#f59e0b"; // Orange
  return "#3b82f6"; // Blue
};

const getRadiusByMag = (mag) => Math.pow(mag, 3) * 1500;

export default function MapView({ data, onSelect, selectedId }) {
  const [hoveredId, setHoveredId] = useState(null);
  const [infoWindowData, setInfoWindowData] = useState(null);

  const mapOptions = {
    disableDefaultUI: false,
    zoomControl: true,
    styles: [ /* Optional: You could add custom dark/light map styles here */ ]
  };

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        zoom={2.5}
        center={center}
        options={mapOptions}
      >
        {data.map((eq) => {
          const [lng, lat, depth] = eq.geometry.coordinates;
          const isSelected = selectedId === eq.id;
          const isHovered = hoveredId === eq.id;

          return (
            <Circle
              key={eq.id}
              center={{ lat, lng }}
              radius={getRadiusByMag(eq.properties.mag)}
              onMouseOver={() => setHoveredId(eq.id)}
              onMouseOut={() => setHoveredId(null)}
              onClick={() => {
                onSelect(eq);
                setInfoWindowData(eq);
              }}
              options={{
                fillColor: getColorByDepth(depth),
                fillOpacity: isHovered || isSelected ? 0.9 : 0.6,
                strokeColor: isSelected ? "#000" : "#fff",
                strokeWeight: isSelected || isHovered ? 3 : 1,
                cursor: "pointer"
              }}
            />
          );
        })}

        {/* CLICK POPUP */}
        {infoWindowData && (
          <InfoWindow
            position={{
              lat: infoWindowData.geometry.coordinates[1],
              lng: infoWindowData.geometry.coordinates[0]
            }}
            onCloseClick={() => setInfoWindowData(null)}
          >
            <div style={{ padding: "5px", color: "#333" }}>
              <h4 style={{ margin: "0 0 5px" }}>M {infoWindowData.properties.mag}</h4>
              <p style={{ margin: 0, fontSize: "12px" }}>{infoWindowData.properties.place}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
}