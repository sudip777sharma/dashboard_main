import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { de } from "date-fns/locale";
import { format, parseISO } from "date-fns";
import "chartjs-adapter-date-fns";

import Datepicker from "react-tailwindcss-datepicker";

import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  TimeScale,
  type ChartOptions,
} from "chart.js";

ChartJS.register(LinearScale, PointElement, Tooltip, Legend, TimeScale);

const AreaChart: React.FC = () => {
  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const handleValueChange = (newValue: React.SetStateAction<{ startDate: Date; endDate: Date; }>) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };

  const data = {
    datasets: [
      {
        label: "Africa",
        data: [
          { x: "2023-12-07", y: 40 },
          { x: "2023-12-08", y: 55 },
          { x: "2023-12-09", y: 45 },
          { x: "2023-12-10", y: 75 },
          { x: "2023-12-11", y: 65 },
          { x: "2023-12-12", y: 55 },
          { x: "2023-12-13", y: 70 },
          { x: "2023-12-14", y: 60 },
          { x: "2023-12-15", y: 100 },
          { x: "2023-12-16", y: 98 },
          { x: "2023-12-17", y: 90 },
          { x: "2023-12-18", y: 120 },
          { x: "2023-12-19", y: 125 },
          { x: "2023-12-20", y: 140 },
          { x: "2023-12-21", y: 155 },
        ],
        backgroundColor: "rgba(44, 154, 255, 0.8)",
        borderWidth: 0,
        pointRadius: 1,
        fill: "start",
      },
      {
        label: "Asia",
        data: [
          { x: "2023-12-07", y: 70 },
          { x: "2023-12-08", y: 85 },
          { x: "2023-12-09", y: 75 },
          { x: "2023-12-10", y: 150 },
          { x: "2023-12-11", y: 100 },
          { x: "2023-12-12", y: 140 },
          { x: "2023-12-13", y: 110 },
          { x: "2023-12-14", y: 105 },
          { x: "2023-12-15", y: 160 },
          { x: "2023-12-16", y: 150 },
          { x: "2023-12-17", y: 125 },
          { x: "2023-12-18", y: 190 },
          { x: "2023-12-19", y: 200 },
          { x: "2023-12-20", y: 225 },
          { x: "2023-12-21", y: 275 },
        ],
        backgroundColor: "#84D0FF",
        borderWidth: 0,
        pointRadius: 1,
        fill: "start",
      },
      {
        label: "Europe",
        data: [
          { x: "2023-12-07", y: 240 },
          { x: "2023-12-08", y: 195 },
          { x: "2023-12-09", y: 160 },
          { x: "2023-12-10", y: 215 },
          { x: "2023-12-11", y: 185 },
          { x: "2023-12-12", y: 215 },
          { x: "2023-12-13", y: 185 },
          { x: "2023-12-14", y: 200 },
          { x: "2023-12-15", y: 250 },
          { x: "2023-12-16", y: 210 },
          { x: "2023-12-17", y: 195 },
          { x: "2023-12-18", y: 250 },
          { x: "2023-12-19", y: 235 },
          { x: "2023-12-20", y: 300 },
          { x: "2023-12-21", y: 315 },
        ],
        backgroundColor: "#EDF1F4",
        borderWidth: 0,
        pointRadius: 1,
        fill: "start",
      },
    ],
  };
  const options: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    adapters: {
      date: {
        locale: de,
      },
    },
    scales: {
      x: {
        type: "time",
        min: "2023-12-07",
        max: "2023-12-21",
        time: {
          unit: "day",
          parser: (value: string) => {
            return parseISO(value);
          },
          tooltipFormat: "dd/MM",
          formatter: (time: number | Date) => {
            // Custom formatting using date-fns
            return format(time, "dd/MM");
          },
        },
        position: "bottom",
        ticks: {
          color: "#9196b2",
          callback: (value, index, values) => {
            // Custom label formatting using date-fns with "/" separator
            const date = new Date(value);
            const day = date.getDate().toString();
            const month = (date.getMonth() + 1).toString();
            return `${day}/${month}`;
          },
        },
        grid: {
          color: "#646880",
          display: false,
        },
        beginAtZero: true,
      },
      y: {
        min: 0,
        max: 400,
        ticks: {
          stepSize: 100,
          color: "#9196b2",
        },
        grid: {
          color: "#646880",
          display: false,
        },
        beginAtZero: true,
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
    <div className={`w-full`}>
      <div className={`flex items-center justify-between p-4`}>
        <div className={``}>
          <h1>Area Chart</h1>
        </div>
        <div className={` rounded-lg border-[1px] border-[#454960]`}>
          <Datepicker
            // placeholder={"My Placeholder"}
            // separator={"<->"}
            // startFrom={new Date("1999-01-01")}
            asSingle={true}
            useRange={false}
            primaryColor={"blue"}
            value={value}
            onChange={handleValueChange}
            // showShortcuts={true}
            // showFooter={true}
            // displayFormat={"DD/MM/YYYY"}
            // readOnly={true}
            // disabled={true}
            // inputClassName="w-full rounded-md focus:ring-0 font-normal bg-green-100 dark:bg-green-900 dark:placeholder:text-green-100"
            // containerClassName="relative mt-8"
            // toggleClassName="absolute bg-red-300 rounded-r-lg text-white right-0 h-full px-3 text-gray-400 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
            // popoverDirection="up"
          />
        </div>
      </div>
      <div className="h-[70vh] w-full flex-col items-center justify-center rounded-lg">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default AreaChart;
