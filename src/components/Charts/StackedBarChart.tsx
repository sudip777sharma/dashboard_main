import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import Datepicker from "react-tailwindcss-datepicker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);
import { de } from "date-fns/locale";
import { format, parseISO } from "date-fns";
import "chartjs-adapter-date-fns";

const StackedBarChart: React.FC = () => {
  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  const handleValueChange = (newValue) => {
    // console.log("newValue:", newValue);
    setValue(newValue);
  };

  const data = {
    datasets: [
      {
        label: "Apple",
        data: [
          { x: "2023-12-07", y: 90 },
          { x: "2023-12-08", y: 120 },
          { x: "2023-12-09", y: 55 },
          { x: "2023-12-10", y: 100 },
          { x: "2023-12-11", y: 80 },
          { x: "2023-12-12", y: 125 },
          { x: "2023-12-13", y: 175 },
          { x: "2023-12-14", y: 70 },
          { x: "2023-12-15", y: 88 },
        ],
        backgroundColor: "#826AF9",
        // borderRadius: 10,
        barPercentage: 0.4,
        categoryPercentage: 0.4,
        hidden: false,
      },
      {
        label: "Samsung",
        data: [
          { x: "2023-12-07", y: 85 },
          { x: "2023-12-08", y: 100 },
          { x: "2023-12-09", y: 30 },
          { x: "2023-12-10", y: 40 },
          { x: "2023-12-11", y: 95 },
          { x: "2023-12-12", y: 90 },
          { x: "2023-12-13", y: 30 },
          { x: "2023-12-14", y: 110 },
          { x: "2023-12-15", y: 62 },
        ],
        // data: [85, 100, 30, 40, 95, 90, 30, 110, 62],
        backgroundColor: "#D2B0FF",
        // borderRadius: 10,
        barPercentage: 0.4,
        categoryPercentage: 0.4,
        hidden: false,
      },
    ],
  };

  const backgroundBar = {
    id: "backgroundBar",
    bg: "#F8D3FF",
    opct: 1,
    beforeDatasetsDraw: function (chart, args, opts) {
      const {
        data,
        chartArea: { top, bottom, left, right, width, height },
        scales: { x, y },
        ctx,
      } = chart;
      ctx.save();
      const segment = width / data.datasets[0].data.length;
      const barWidth =
        segment *
        data.datasets[0].barPercentage *
        data.datasets[0].categoryPercentage;

      const cornerRadius = 10; // Adjust the corner radius as needed

      // Check if the dataset is hidden
      if (!chart?._metasets[0].hidden || !chart?._metasets[1].hidden) {
        // ctx.fillStyle = "#F8D3FF";
        ctx.fillStyle = this.bg;

        for (let i = 0; i < data.datasets[0].data.length; i++) {
          const xCoordinate = left + i * segment + segment / 2 - barWidth / 2;
          const yCoordinate = top;

          // Begin path for a rounded rectangle (only the top part is rounded)
          ctx.beginPath();
          ctx.moveTo(xCoordinate + cornerRadius, yCoordinate);
          ctx.lineTo(xCoordinate + barWidth - cornerRadius, yCoordinate);
          ctx.arcTo(
            xCoordinate + barWidth,
            yCoordinate,
            xCoordinate + barWidth,
            yCoordinate + cornerRadius,
            cornerRadius
          );
          ctx.lineTo(xCoordinate + barWidth, yCoordinate + height);
          ctx.lineTo(xCoordinate, yCoordinate + height);
          ctx.lineTo(xCoordinate, yCoordinate + cornerRadius);
          ctx.arcTo(
            xCoordinate,
            yCoordinate,
            xCoordinate + cornerRadius,
            yCoordinate,
            cornerRadius
          );
          ctx.closePath();

          // Fill the rounded rectangle
          ctx.fill();
        }
      }

      ctx.restore();
    },
  };

  function handleHover(evt, item, legend) {
    legend?.chart.data.datasets.forEach((dataset, index, datasets) => {
      datasets[index].backgroundColor =
        index === item.datasetIndex ||
        datasets[index].backgroundColor.length === 9
          ? datasets[index].backgroundColor
          : datasets[index].backgroundColor + "4D";
    });
    backgroundBar.bg = "#F8D3FF" + "4D";
    legend.chart.update();
  }
  function handleLeave(evt, item, legend) {
    legend?.chart.data.datasets.forEach((dataset, index, datasets) => {
      datasets[index].backgroundColor =
        datasets[index].backgroundColor.length === 9
          ? datasets[index].backgroundColor.slice(0, -2)
          : datasets[index].backgroundColor;
    });
    backgroundBar.bg = "#F8D3FF";
    legend.chart.update();
  }
  const options = {
    interaction: {
      mode: "nearest",
      intersect: false,
    },
    tooltips: {
      mode: "nearest",
      intersect: false,
    },
    hover: {
      mode: "nearest",
      intersect: false,
    },
    responsive: true,
    maintainAspectRatio: false,
    adapters: {
      date: {
        locale: de,
      },
    },
    scales: {
      x: {
        stacked: true,
        type: "time",
        min: "2023-12-07",
        max: "2023-12-15",
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
        stacked: true,
        min: 0,
        max: 240,
        ticks: {
          stepSize: 60,
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
        onHover: handleHover,
        onLeave: handleLeave,
        labels: {
          color: "#8D91AB",
          boxWidth: 12,
          boxHeight: 12,
          // usePointStyle: true,
          // pointStyle: "circle",
          padding: 30,
        },
        position: "top",
        align: "start",
      },
      title: {
        display: false,
        text: "Chart.js Bar Chart - Stacked",
      },
    },
  };
  return (
    <div className={`w-full`}>
      <div className={`flex items-center justify-between p-4`}>
        <div className={``}>
          <h1>Area Chart 2</h1>
          <p>Commercial networks</p>
        </div>
        <div className={` rounded-lg border-[1px] border-[#454960]`}>
          <Datepicker
            asSingle={true}
            useRange={false}
            primaryColor={"blue"}
            value={value}
            onChange={handleValueChange}
            // placeholder={"My Placeholder"}
            // separator={"<->"}
            // startFrom={new Date("1999-01-01")}
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
      <div
        id="chartContainer"
        className="relative h-[70vh] w-full flex-col items-center justify-center rounded-lg"
      >
        <Bar options={options} data={data} plugins={[backgroundBar]} />
      </div>
    </div>
  );
};

export default StackedBarChart;