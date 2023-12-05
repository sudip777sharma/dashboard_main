import React from "react";
import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

const ScatterChart: React.FC = () => {
  const data = {
    datasets: [
      {
        label: "iPhone",
        data: [
          { x: 72, y: 225 },
          { x: 81, y: 270 },
          { x: 90, y: 230 },
          { x: 103, y: 305 },
          { x: 103, y: 245 },
          { x: 108, y: 275 },
          { x: 109, y: 350 },
          { x: 110, y: 290 },
          { x: 111, y: 315 },
          { x: 113, y: 260 },
          { x: 116, y: 340 },
          { x: 117, y: 295 },
          { x: 117, y: 275 },
          { x: 126, y: 280 },
          { x: 127, y: 340 },
          { x: 133, y: 330 },
        ],
        backgroundColor: "#836AF9",
        pointRadius: 5,
      },
      {
        label: "Samsung Note",
        data: [
          { x: 13, y: 155 },
          { x: 13, y: 95 },
          { x: 17, y: 115 },
          { x: 18, y: 190 },
          { x: 19, y: 130 },
          { x: 21, y: 165 },
          { x: 21, y: 125 },
          { x: 22, y: 105 },
          { x: 25, y: 155 },
          { x: 26, y: 180 },
          { x: 35, y: 125 },
          { x: 43, y: 180 },
          { x: 53, y: 202 },
          { x: 61, y: 165 },
          { x: 67, y: 225 },
        ],
        backgroundColor: "#FF9F43",
        pointRadius: 5,
      },
      {
        label: "OnePlus",
        data: [
          { x: 70, y: 195 },
          { x: 72, y: 270 },
          { x: 87, y: 240 },
          { x: 92, y: 340 },
          { x: 94, y: 280 },
          { x: 94, y: 280 },
          { x: 98, y: 255 },
          { x: 99, y: 300 },
          { x: 100, y: 335 },
          { x: 100, y: 215 },
          { x: 102, y: 290 },
          { x: 108, y: 330 },
          { x: 110, y: 275 },
          { x: 111, y: 250 },
        ],
        backgroundColor: "#28C76F",
        pointRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        min: 0,
        max: 140,
        ticks: {
          stepSize: 10,
          color: "#646880",
        },
        grid: {
          color: "#646880",
        },
      },
      y: {
        min: 0,
        max: 400,
        ticks: {
          stepSize: 100,
          color: "#646880",
        },
        grid: {
          color: "#646880",
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "white",
          boxWidth: 15,
          boxHeight: 15,
          usePointStyle: true,
          pointStyle: "circle",
          padding: 30,
        },
        position: "top",
        align: "start",
      },
    },
  };

  return (
    <>
      <div className={`flex justify-between p-4`}>
        <h1>Scatter Chart</h1>
      </div>
      <div className="h-[70vh] w-full flex-col items-center justify-center">
        <Scatter data={data} options={options} />
      </div>
    </>
  );
};

export default ScatterChart;
