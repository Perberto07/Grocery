// components/charts/TopProductsChart.jsx
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TopProductsChart = ({ startDate, endDate }) => {
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    let url = "https://backendgrocery-5rpu.onrender.com/top-products/";
    if (startDate && endDate) {
      url += `?start_date=${startDate}&end_date=${endDate}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => setTopProducts(data))
      .catch((err) => console.error("Error fetching top products:", err));
  }, [startDate, endDate]);

  const chartData = {
    labels: topProducts.map((p) => p.product),
    datasets: [
      {
        label: "Quantity Sold",
        data: topProducts.map((p) => p.total_quantity),
        backgroundColor: "rgba(16, 185, 129, 0.7)", // Tailwind green-500
        borderRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { labels: { color: "white" } },
      title: {
        display: true,
        text: "Most Bought Products",
        color: "white",
        font: { size: 18 },
      },
    },
    scales: {
      x: { ticks: { color: "white" } },
      y: { beginAtZero: true, ticks: { color: "white" } },
    },
  };

  return topProducts.length > 0 ? (
    <Bar data={chartData} options={chartOptions} />
  ) : (
    <p className="text-white">Loading chart...</p>
  );
};

export default TopProductsChart;
