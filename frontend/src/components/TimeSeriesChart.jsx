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
    console.log("Bills passed to TimeSeriesChart:", bills);

    // Process bills into time-series format
    const processData = () => {
      const monthlyData = {};

      bills.forEach((bill) => {
        if (bill.date && bill.amount) {
          const date = new Date(bill.date);
          if (!isNaN(date)) {
            const monthYear = `${date.getMonth() + 1}-${date.getFullYear()}`; // Format: MM-YYYY
            if (!monthlyData[monthYear]) {
              monthlyData[monthYear] = 0;
            }
            monthlyData[monthYear] += parseFloat(bill.amount); // Accumulate the amount for the same month
          } else {
            console.warn("Invalid date format in bill:", bill);
          }
        } else {
          console.warn("Invalid bill data:", bill);
        }
      });

      // Sort months and prepare data for the chart
      const labels = Object.keys(monthlyData).sort();
      const data = labels.map((label) => monthlyData[label]);

      console.log("Processed chart data:", { labels, data });

      return { labels, data };
    };

    if (bills && bills.length > 0) {
      const { labels, data } = processData();
      setChartData({ labels, data });
    } else {
      setChartData({ labels: [], data: [] });
      console.warn("No bills data available for charting.");
    }
  }, [bills]); // Re-run when `bills` changes

  if (chartData.labels.length === 0 || chartData.data.length === 0) {
    return (
      <div className="alert alert-warning text-center">
        No data available to display the chart.
      </div>
    );
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Time-Series: Monthly Bills Overview",
      },
    },
  };

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
