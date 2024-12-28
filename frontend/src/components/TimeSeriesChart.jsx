import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TimeSeriesChart = ({ bills }) => {
  const [chartData, setChartData] = useState({ labels: [], data: [] });

  useEffect(() => {
    // Process bills into time-series format
    const processData = () => {
      const monthlyData = {};

      // Iterate over bills and categorize by month and year
      bills.forEach((bill) => {
        const date = new Date(bill.date);
        const monthYear = `${date.getMonth() + 1}-${date.getFullYear()}`; // Format: MM-YYYY
        if (!monthlyData[monthYear]) {
          monthlyData[monthYear] = 0;
        }
        monthlyData[monthYear] += parseFloat(bill.amount); // Accumulate the amount for the same month
      });

      // Sort months and prepare data for the chart
      const labels = Object.keys(monthlyData).sort();
      const data = labels.map((label) => monthlyData[label]);

      return { labels, data };
    };

    if (bills.length > 0) {
      const { labels, data } = processData();
      setChartData({ labels, data });
    } else {
      console.log("No bills data available for charting.");
    }
  }, [bills]); // Only reprocess data when bills change

  // If no valid data is available
  if (chartData.labels.length === 0 || chartData.data.length === 0) {
    return <p>No data available to display the chart.</p>;
  }

  // Chart.js data configuration
  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Time-Series: Monthly Bills Overview",
      },
    },
  };

  // Chart.js dataset
  const chartDataset = {
    labels: chartData.labels,
    datasets: [
      {
        label: "Total Bills per Month",
        data: chartData.data,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  return (
    <div>
      <h3>Time-Series Chart</h3>
      <Line data={chartDataset} options={chartOptions} />
    </div>
  );
};

export default TimeSeriesChart;
