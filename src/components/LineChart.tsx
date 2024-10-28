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
    const dateObj: Date = new Date(entry.date);
    const formattedDate = dateObj.toISOString().split("T")[0]!;

    const existing = acc.find((item) => item.date === formattedDate);
    if (existing) {
      existing.count += entry.count;
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
    labels: aggregatedData
      .filter((entry) => {
        const day = new Date(entry.date).getDay();
        return day === 6 || day === 0; // Include only Saturdays and Sundays
      })
      .map((entry) => entry.date),
    datasets: [
      {
        label: "People Served",
        data: aggregatedData
          .filter((entry) => {
            const day = new Date(entry.date).getDay();
            return day === 6 || day === 0;
          })
          .map((entry) => entry.count),
        borderColor: "#ADC178", // olive color
        backgroundColor: "rgba(173, 193, 120, 0.2)", // olive color with opacity
        fill: true,
        tension: 0.4, // Add some curve to the line
        pointBackgroundColor: "#6C584C", // darkBrown for point color
        pointBorderColor: "#F0EAD2", // beige for point border
        pointHoverBackgroundColor: "#dec0f1", // accent color for hover
        pointHoverBorderColor: "#A98467", // brown for hover border
      },
    ],
  };
  

  // Define options with explicit typing for line charts
  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "category",
        grid: {
          color: "rgba(108, 88, 76, 0.1)", // darkBrown with opacity for grid lines
        },
        ticks: {
          color: "#6C584C", // darkBrown for x-axis labels
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(108, 88, 76, 0.1)", // darkBrown with opacity for grid lines
        },
        ticks: {
          color: "#6C584C", // darkBrown for y-axis labels
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "#6C584C", // darkBrown for legend labels
          font: {
            family: "'Comic Sans MS', 'Chalkboard SE', 'Arial', sans-serif", // More playful font
            size: 14,
          },
        },
      },
      tooltip: {
        backgroundColor: "#F0EAD2", // beige background for tooltip
        titleColor: "#6C584C", // darkBrown for tooltip title
        bodyColor: "#A98467", // brown for tooltip body
        borderColor: "#ADC178", // olive border for tooltip
        borderWidth: 2,
        cornerRadius: 8,
        padding: 10,
        titleFont: {
          family: "'Comic Sans MS', 'Chalkboard SE', 'Arial', sans-serif",
          size: 14,
          weight: 'bold',
        },
        bodyFont: {
          family: "'Comic Sans MS', 'Chalkboard SE', 'Arial', sans-serif",
          size: 12,
        },
      },
    },
  };
  
  

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;