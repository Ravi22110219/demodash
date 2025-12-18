// src/components/Charts.js - REVISED

import React from "react";
import Chart from "react-apexcharts";

export default function Charts({ stats }) {
  // Options for all charts
  const chartOptions = {
    chart: { toolbar: { show: false } },
    dataLabels: { enabled: true }
  };

  const barChartOptions = {
    ...chartOptions,
    xaxis: { 
      categories: stats.magLabels,
      title: { text: "Magnitude Range" }
    },
    title: { text: "Magnitude Distribution (Count)", align: 'left', style: { color: '#555' } },
    plotOptions: { bar: { columnWidth: '60%' } }
  };

  const pieChartOptions = {
    ...chartOptions,
    labels: stats.depthLabels,
    title: { text: "Depth Distribution", align: 'left', style: { color: '#555' } },
    legend: { position: 'bottom' },
    responsive: [{ breakpoint: 480, options: { chart: { width: 200 }, legend: { position: 'bottom' } } }]
  };

  return (
    <>
      <h3 style={{ color: '#333', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>Earthquake Analysis</h3>

      <div style={{ marginBottom: 20, backgroundColor: '#fff', padding: 10, borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
        <Chart
          type="bar"
          height={300} // Slightly taller chart
          series={[{ name: "Count", data: stats.magCounts }]}
          options={barChartOptions}
        />
      </div>

      <div style={{ backgroundColor: '#fff', padding: 10, borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
        <Chart
          type="pie"
          height={300} // Consistent height
          series={stats.depthCounts}
          options={pieChartOptions}
        />
      </div>
    </>
  );
}