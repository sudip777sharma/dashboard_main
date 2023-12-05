import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const RadarChart: React.FC = () => {
  const data = {
    labels: [
      "Eating",
      "Drinking",
      "Designing",
      "Sleeping",
      "Coding",
      "Running",
    ],
    datasets: [
      {
        label: "Developer",
        data: [79, 68, 90, 60, 96, 66],
        borderWidth: 1,
        fill: true,
        backgroundColor: "#eb9697c8",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(54, 162, 235)",
      },
      {
        label: "Normal human",
        data: [59, 99, 59, 87, 59, 90],
        borderWidth: 1,
        fill: true,
        backgroundColor: "#9180e89a",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(255, 99, 132)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      line: {
        borderWidth: 1,
      },
    },
    scale: {
      min: 30,
      max: 100,
      ticks: {
        stepSize: 100,
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "white",
        },
      },
    },
    scales: {
      r: {
        grid: {
          color: "#676C84",
        },
        angleLines: {
          color: "#676C84",
        },
        pointLabels: {
          color: "#afb3c8",
        },
        ticks: {
          color: "#afb3c8",
          backdropColor: "transparent",
        },
      },
    },
  };

  return (
    <div
      className={`md:w-[50%] w-full rounded-lg border-[1px] border-[#454960]`}
    >
      <div className={`p-4`}>
        <h1>Radar Chart</h1>
      </div>
      <div className="h-[70vh] w-full flex-col items-center justify-center p-1 md:p-4">
        <Radar data={data} options={options} />
      </div>
    </div>
  );
};

export default RadarChart;
