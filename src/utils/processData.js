// src/utils/processData.js - REVISED FOR MORE DETAIL

export function processEarthquakeData(data) {
  // Use more standard magnitude bins for better distribution visualization
  const magBins = [0, 1, 2, 3, 4, 5, 6, 7]; // 0 to <1, 1 to <2, ..., 7+
  const magCounts = new Array(magBins.length).fill(0);
  const magLabels = magBins.map((m, i) => i < magBins.length - 1 ? `${m}-${m + 0.9}` : `${m}+`);

  // Depth categories: Shallow (<30km), Intermediate (30-100km), Deep (>100km)
  let shallow = 0;
  let intermediate = 0;
  let deep = 0;

  data.forEach(eq => {
    const mag = eq.properties.mag;
    const depth = eq.geometry.coordinates[2];
    const title = eq.properties.title;
 console.log(`Processing Earthquake: ${title}, Mag: ${mag}, Depth: ${depth} km`);
    // 1. Magnitude Binning
    for (let i = 0; i < magBins.length; i++) {
      if (i === magBins.length - 1) { // Last bin is 7+
        if (mag >= magBins[i]) {
          magCounts[i]++;
          break;
        }
      } else if (mag >= magBins[i] && mag < magBins[i] + 1) {
        magCounts[i]++;
        break;
      }
    }

    // 2. Depth Binning (using common geological boundaries)
    if (depth < 30) {
      shallow++;
    } else if (depth < 100) {
      intermediate++;
    } else {
      deep++;
    }
  });

  return {
    magLabels: magLabels,
    magCounts: magCounts,
    // Return all three depth counts for the pie chart
    depthLabels: ["Shallow (<30km)", "Intermediate (30-100km)", "Deep (>100km)"],
    depthCounts: [shallow, intermediate, deep]
  };
}