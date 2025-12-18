// src/components/Filters.js - REVISED

import React from "react";

export default function Filters({ minMag, setMinMag }) {
  return (
    <div style={{ marginBottom: 30, padding: 15, border: '1px solid #ddd', borderRadius: '8px' }}>
      <h3 style={{ marginTop: 0, color: '#333' }}>Filter Earthquakes</h3>
      <label style={{ display: 'block', marginBottom: 15, fontWeight: 'bold' }}>
        Minimum Magnitude: <span style={{ color: '#007bff' }}>{minMag.toFixed(1)}</span>
        <input
          type="range"
          min="0"
          max="8"
          step="0.1" // Increased precision for better filtering
          value={minMag}
          onChange={e => setMinMag(Number(e.target.value))}
          style={{ width: "100%", marginTop: 5 }}
        />
      </label>

      {/* Map Key for Interactivity */}
      <h4 style={{ borderTop: '1px solid #eee', paddingTop: 10, marginTop: 15, marginBottom: 5 }}>Map Key (Depth)</h4>
      <div style={{ fontSize: '0.9em' }}>
        <p style={{ margin: '3px 0' }}>
          <span style={{ display: 'inline-block', width: '10px', height: '10px', backgroundColor: '#ff3333', borderRadius: '50%', marginRight: '5px' }}></span> 
          Shallow (0 {'<'} 30 km)
        </p>
        <p style={{ margin: '3px 0' }}>
          <span style={{ display: 'inline-block', width: '10px', height: '10px', backgroundColor: '#ff9900', borderRadius: '50%', marginRight: '5px' }}></span> 
          Intermediate (30-100 km)
        </p>
        <p style={{ margin: '3px 0' }}>
          <span style={{ display: 'inline-block', width: '10px', height: '10px', backgroundColor: '#0066ff', borderRadius: '50%', marginRight: '5px' }}></span> 
          Deep ({'>'} 100 km)
        </p>
      </div>
    </div>
  );
}