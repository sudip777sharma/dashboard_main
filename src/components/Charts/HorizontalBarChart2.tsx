import React, { useState } from "react";
import { de } from "date-fns/locale";
import { format, parseISO } from "date-fns";
import "chartjs-adapter-date-fns";

import Datepicker from "react-tailwindcss-datepicker";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJs,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  type ChartOptions,
} from "chart.js";

ChartJs.register(BarElement, CategoryScale, Tooltip, Legend);

const HorizontalBarChart2: React.FC = () => {
  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const handleValueChange = (newValue) => {
    setValue(newValue);
  };

  const data = {
    labels: ["MON", "TUE", "WED", "THU", "FRI"],
    datasets: [
      {
        label: "Market Data",
        data: [710, 350, 580, 460, 120],
        backgroundColor: "#07B8D0",
        borderWidth: 0,
        borderRadius: 10,
        barPercentage: 0.6,
        categoryPercentage: 0.5,
        pointRadius: 1,
        fill: "start",
      },
    ],
  };
  const options: ChartOptions = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    adapters: {
      date: {
        locale: de,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#9196b2",
        },
        grid: {
          display: false,
        },
        beginAtZero: true,
      },
      y: {
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

  return (
    <div
      className={`w-full rounded-lg border-[1px] border-[#454960] md:w-[50%]`}
    >
      <div className={`flex items-center justify-between p-4`}>
        <div className={`flex-col`}>
          <h1>Horizontal Bar Chart Balance</h1>
          <h1>$74,123</h1>
        </div>
        <div className={`rounded-lg border-[1px] border-[#454960]`}>
          <Datepicker
            asSingle={true}
            useRange={false}
            primaryColor={"blue"}
            value={value}
            onChange={handleValueChange}
          />
        </div>
      </div>
      <div className="h-[70vh] w-full flex-col items-center justify-center p-1 md:p-4">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default HorizontalBarChart2;
