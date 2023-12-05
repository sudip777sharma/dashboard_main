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
  type ChartOptions,
} from "chart.js";

ChartJs.register(BarElement, Tooltip, Legend);

const VerticalBarChart: React.FC = () => {
  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const handleValueChange = (newValue) => {
    setValue(newValue);
  };

  const data = {
    datasets: [
      {
        label: "Africa",
        data: [
          { x: "2023-12-07", y: 275 },
          { x: "2023-12-08", y: 90 },
          { x: "2023-12-09", y: 190 },
          { x: "2023-12-10", y: 205 },
          { x: "2023-12-11", y: 125 },
          { x: "2023-12-12", y: 85 },
          { x: "2023-12-13", y: 55 },
          { x: "2023-12-14", y: 87 },
          { x: "2023-12-15", y: 127 },
          { x: "2023-12-16", y: 150 },
          { x: "2023-12-17", y: 230 },
          { x: "2023-12-18", y: 280 },
          { x: "2023-12-19", y: 190 },
        ],
        backgroundColor: "#FFCF5C",
        barPercentage: 0.5,
        borderWidth: 0,
        borderRadius: 10,
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
        max: "2023-12-19",
        barThickness: 10,
        time: {
          unit: "day",
          parser: (value) => {
            // Custom parsing using date-fns
            return parseISO(value);
          },
          tooltipFormat: "dd/MM",
          formatter: (time) => {
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
        display: false,
        position: "top",
        align: "start",
      },
    },
  };

  return (
    <div
      className={`w-full rounded-lg border-[1px] border-[#454960] md:w-[50%]`}
    >
      <div className={`flex items-center justify-between p-4`}>
        <div className={``}>
          <h1>Vertical Bar Chart</h1>
        </div>
        <div className={` h-full rounded-lg border-[1px] border-[#454960]`}>
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
      <div className="h-[70vh] w-full flex-col items-center justify-center p-1 md:p-4">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default VerticalBarChart;
