import React from "react";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bubble } from "react-chartjs-2";

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

const BubbleChart: React.FC = () => {
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
        display: false,
      },
    },
  };

  const data = {
    datasets: [
      {
        label: "Dataset 1",
        data: [
          { x: 10, y: 110, r: 5 },
          { x: 20, y: 74, r: 10 },
          { x: 30, y: 165, r: 7 },
          { x: 40, y: 200, r: 20 },
          { x: 50, y: 240, r: 7 },
          { x: 60, y: 275, r: 10 },
          { x: 70, y: 305, r: 5 },
          { x: 80, y: 325, r: 4 },
          { x: 90, y: 185, r: 7 },
          { x: 100, y: 310, r: 5 },
          { x: 110, y: 240, r: 5 },
          { x: 120, y: 270, r: 7 },
          { x: 130, y: 300, r: 6 },
        ],
        backgroundColor: "#836AF9",
      },
      {
        label: "Dataset 2",
        data: [
          { x: 10, y: 160, r: 12 },
          { x: 20, y: 135, r: 6 },
          { x: 30, y: 72, r: 5 },
          { x: 40, y: 110, r: 7 },
          { x: 50, y: 285, r: 5 },
          { x: 60, y: 235, r: 5 },
          { x: 70, y: 275, r: 7 },
          { x: 80, y: 290, r: 4 },
          { x: 90, y: 250, r: 10 },
          { x: 100, y: 227, r: 7 },
          { x: 110, y: 320, r: 15 },
          { x: 120, y: 230, r: 4 },
          { x: 130, y: 330, r: 7 },
        ],
        backgroundColor: "#FFE802",
      },
    ],
  };
  return (
    <>
      <div className={`flex justify-between p-4`}>
        <h1>Bubble Chart</h1>
        <p>$ 100,000</p>
      </div>
      <div className="h-[70vh] w-full flex-col items-center justify-center">
        <Bubble options={options} data={data} />
      </div>
    </>
  );
};

export default BubbleChart;
