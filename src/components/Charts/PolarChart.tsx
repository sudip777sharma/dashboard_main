import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { PolarArea } from "react-chartjs-2";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const PolarChart: React.FC = () => {
  const data = {
    labels: ["Africa", "Asia", "Europe", "America", "Antartica", "Australia"],
    datasets: [
      {
        label: "My First Dataset",
        data: [9, 8, 7, 6, 5, 4],
        backgroundColor: [
          "#836AF9",
          "#FFE802",
          "#FF8131",
          "#299AFF",
          "#4F5D70",
          "#28DAC6",
          "#28DAC6",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      line: {
        borderWidth: 0,
      },
      arc: {
        borderWidth: 0,
      },
    },
    scale: {
      min: 0,
      max: 10,
      ticks: {
        stepSize: 1,
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
        position: "right",
      },
    },
    scales: {
      r: {
        grid: {
          display: false,
          color: "#676C84",
        },
        angleLines: {
          display: false,
          color: "#676C84",
        },
        pointLabels: {
          display: false,
          color: "#afb3c8",
        },
        ticks: {
          display: false,
          color: "#afb3c8",
          backdropColor: "transparent",
        },
      },
    },
  };

  return (
    <div
      className={`w-full rounded-lg border-[1px] border-[#454960] md:w-[50%]`}
    >
      <div className={`p-4`}>
        <h1>Polar Chart</h1>
      </div>
      <div className="h-[70vh] w-full flex-col items-center justify-center p-1 md:p-4">
        <PolarArea data={data} options={options} />
      </div>
    </div>
  );
};

export default PolarChart;
