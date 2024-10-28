"use client";

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
  TimeScale,
} from "chart.js";
import type { ChartOptions } from "chart.js";
import "chartjs-adapter-date-fns";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale);

interface LineChartProps {
  data: { date: string; count: number }[];
}

// Helper function to aggregate data by date
const aggregateDataByDate = (data: { date: string; count: number }[]) => {
  return data.reduce((acc, entry) => {
    if (!entry.date) {
      return acc;
    }

    const formattedDate = new Date(entry.date).toISOString().split("T")[0];
    const existing = acc.find((item) => item.date === formattedDate);

    if (existing) {
      existing.count += entry.count; // Aggregate by summing counts
    } else {
      acc.push({ date: formattedDate, count: entry.count });
    }

    return acc;
  }, [] as { date: string; count: number }[]);
};

const LineChart = ({ data }: LineChartProps) => {
  // Sort data by date and aggregate by date
  const sortedData = data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const aggregatedData = aggregateDataByDate(sortedData);

  const chartData = {
    labels: aggregatedData.map((entry) => entry.date),
    datasets: [
      {
        label: "Homeless Counts",
        data: aggregatedData.map((entry) => entry.count),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: false, // Disable filling below the line
      },
    ],
  };

  // Define options with explicit typing for line charts
  const options: ChartOptions<"line"> = {
    responsive: true,
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
          displayFormats: {
            day: "MMM d", // Format for day and month only
          },
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default LineChart;
