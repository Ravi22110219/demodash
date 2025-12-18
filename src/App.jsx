import React, { useEffect, useState, useMemo } from "react";
import MapView from "./components/MapView";
import Charts from "./components/Charts";
import Filters from "./components/Filters";
import { processEarthquakeData } from "./utils/processData";

/* --- Styles remain mostly the same, adding a detail card style --- */
const appWrapper = { height: "100vh", display: "flex", flexDirection: "column", fontFamily: "'Inter', sans-serif", backgroundColor: "#f8fafc" };
const navbarStyle = { height: "60px", backgroundColor: "#1e293b", color: "#fff", display: "flex", alignItems: "center", padding: "0 24px", fontWeight: 700 };
const dashboardStyle = { flex: 1, display: "flex", overflow: "hidden" };
const sidebarStyle = { flex: 1, padding: "20px", overflowY: "auto", backgroundColor: "#ffffff", borderLeft: "1px solid #e2e8f0" };

const detailCardStyle = {
  padding: "16px",
  backgroundColor: "#f0f9ff",
  borderRadius: "8px",
  border: "1px solid #bae6fd",
  marginBottom: "20px",
  animation: "fadeIn 0.3s ease-in"
};

const DATA_URL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

export default function App() {
  const [data, setData] = useState([]);
  const [minMag, setMinMag] = useState(2.5);
  const [loading, setLoading] = useState(true);
  const [selectedQuake, setSelectedQuake] = useState(null); // Track clicked quake

  useEffect(() => {
    fetch(DATA_URL)
      .then(res => res.json())
      .then(json => {
        setData(json.features);
        setLoading(false);
      })
      .catch(err => { console.error(err); setLoading(false); });
  }, []);

  const filteredData = useMemo(() => {
    return data.filter(d => d.properties.mag >= minMag);
  }, [data, minMag]);

  const stats = useMemo(() => {
    return processEarthquakeData(filteredData);
  }, [filteredData]);

  return (
    <div style={appWrapper}>
      <div style={navbarStyle}>🌎 Global Earthquake Analytics</div>
      
      <div style={dashboardStyle}>
        <div style={{ flex: 2, position: "relative" }}>
          {loading ? (
            <div style={{ padding: 40, textAlign: "center" }}>Loading...</div>
          ) : (
            <MapView 
              data={filteredData} 
              onSelect={setSelectedQuake} 
              selectedId={selectedQuake?.id}
            />
          )}
        </div>

        <div style={sidebarStyle}>
          {/* DYNAMIC DETAIL SECTION */}
          {selectedQuake ? (
            <div style={detailCardStyle}>
              <button 
                onClick={() => setSelectedQuake(null)}
                style={{ float: 'right', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 'bold' }}
              >✕</button>
              <h4 style={{ margin: "0 0 8px 0", color: "#0369a1" }}>Selected Event</h4>
              <p style={{ fontSize: "0.9rem", margin: "4px 0" }}><strong>Location:</strong> {selectedQuake.properties.place}</p>
              <p style={{ fontSize: "0.9rem", margin: "4px 0" }}><strong>Magnitude:</strong> {selectedQuake.properties.mag}</p>
              <p style={{ fontSize: "0.9rem", margin: "4px 0" }}><strong>Time:</strong> {new Date(selectedQuake.properties.time).toLocaleString()}</p>
              <p style={{ fontSize: "0.9rem", margin: "4px 0" }}><strong>Depth:</strong> {selectedQuake.geometry.coordinates[2]} km</p>
            </div>
          ) : (
            <div style={{ ...detailCardStyle, backgroundColor: "#f8fafc", border: "1px dashed #cbd5e1" }}>
              <p style={{ margin: 0, fontSize: "0.85rem", color: "#64748b", textAlign: "center" }}>
                Click a circle on the map to see details.
              </p>
            </div>
          )}

          <Filters minMag={minMag} setMinMag={setMinMag} />
          <Charts stats={stats} />
        </div>
      </div>
    </div>
  );
}