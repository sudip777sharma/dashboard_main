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
  type ChartOptions,
  TimeScale,
  LineElement,
} from "chart.js";

ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale
);

const corsairPlugin = {
  id: "corsair",
  defaults: {
    width: 1.2,
    color: "white",
    dash: [3, 3],
  },
  afterInit: (chart, args, opts) => {
    chart.corsair = {
      x: 0,
      y: 0,
    };
  },
  afterEvent: (chart, args) => {
    const { inChartArea } = args;
    const { type, x, y } = args.event;

    chart.corsair = { x, y, draw: inChartArea };
    chart.draw();
  },
  beforeDraw: function (chart, easing, opts) {
    if (chart.tooltip._active && chart.tooltip._active.length) {
      const ctx = chart.ctx;
      const { top, bottom, left, right } = chart.chartArea;
      const { x: xCorsair, y: yCorsair, draw } = chart.corsair;
      if (!draw) return;
      const activePoint = chart.tooltip._active[0];
      // console.log("activePoint", activePoint);
      const x = activePoint.element.x;
      const topY = chart.scales.y.top;
      const bottomY = chart.scales.y.bottom;
      const y = activePoint.element.y;
      const leftX = chart.scales.x.left;
      const rightX = chart.scales.x.right;
      ctx.save();
      ctx.beginPath();
      ctx.lineWidth = opts.width;
      ctx.strokeStyle = opts.color;
      ctx.setLineDash(opts.dash);
      ctx.moveTo(x, bottom);
      ctx.lineTo(x, top);
      // ctx.moveTo(left, yCorsair);
      // ctx.lineTo(right, yCorsair);
      ctx.stroke();
      ctx.restore();
    }
  },
};

const LineChart2: React.FC = () => {
  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };

  const data = {
    datasets: [
      {
        label: "",
        data: [
          { x: "2023-12-07", y: 280 },
          { x: "2023-12-08", y: 200 },
          { x: "2023-12-09", y: 220 },
          { x: "2023-12-10", y: 180 },
          { x: "2023-12-11", y: 270 },
          { x: "2023-12-12", y: 250 },
          { x: "2023-12-13", y: 70 },
          { x: "2023-12-14", y: 90 },
          { x: "2023-12-15", y: 200 },
          { x: "2023-12-16", y: 150 },
          { x: "2023-12-17", y: 160 },
          { x: "2023-12-18", y: 100 },
          { x: "2023-12-19", y: 150 },
          { x: "2023-12-20", y: 100 },
          { x: "2023-12-21", y: 50 },
        ],
        backgroundColor: "#E08F44",
        borderColor: "#E08F44",
        borderWidth: 5,
        pointRadius: 0,
        hoverRadius: 6,
        hoverBorderColor: "white", // Border color of the data points
        hoverBorderWidth: 7,
      },
    ],
  };

  const getOrCreateTooltip = (chart, context) => {
    let tooltipEl = chart.canvas.parentNode.querySelector("#tooltipEl");
    // console.log("tooltipEl", tooltipEl);
    if (!tooltipEl) {
      // console.log('!tooltipEl')
      tooltipEl = document.createElement("div");
      tooltipEl.id = "tooltipEl";
      tooltipEl.style.background = "#2F3349";
      tooltipEl.style.borderRadius = "3px";
      tooltipEl.style.color = "#8E92AC";
      tooltipEl.style.opacity = 1;
      tooltipEl.style.pointerEvents = "none";
      tooltipEl.style.position = "absolute";
      tooltipEl.style.transform = `translate(-50%, 0)`;
      tooltipEl.style.transition = "all .1s ease";

      const h1 = document.createElement("h1");
      h1.style.margin = "0px";

      tooltipEl.appendChild(h1);
      chart.canvas.parentNode.appendChild(tooltipEl);
    }

    return tooltipEl;
  };

  const getOrCreateCorsairTip = (chart, context) => {
    let corsairTipEl = chart.canvas.parentNode.querySelector("#corsairTipEl");
    // console.log("corsairTipEl", chart.canvas);
    if (!corsairTipEl) {
      corsairTipEl = document.createElement("div");
      corsairTipEl.id = "corsairTipEl";
      corsairTipEl.style.background = "#2F3349";
      corsairTipEl.style.borderRadius = "3px";
      corsairTipEl.style.color = "#8E92AC";
      corsairTipEl.style.opacity = 1;
      corsairTipEl.style.pointerEvents = "none";
      corsairTipEl.style.position = "absolute";
      corsairTipEl.style.transform = `translate(-50%, 0)`;
      corsairTipEl.style.transition = "all .1s ease";

      chart.canvas.parentNode.appendChild(corsairTipEl);
    }
    return corsairTipEl;
  };

  const customTooltip = (context) => {
    // Tooltip Element
    const { chart, tooltip } = context;
    const tooltipEl = getOrCreateTooltip(chart, context);
    const corsairTipEl = getOrCreateCorsairTip(chart, context);

    // Hide if no tooltip
    if (tooltip.opacity === 0) {
      tooltipEl.style.opacity = 0;
      corsairTipEl.style.opacity = 0;
      return;
    }

    // Set Text
    if (tooltip.body) {
      const titleLines = tooltip.title || [];
      const bodyLines = tooltip.body.map((b) => b.lines);
      corsairTipEl.textContent = "";
      tooltip?.title.forEach((title) => {
        const text = document.createTextNode(title);
        corsairTipEl.appendChild(text);
      });

      const tableBody = document.createElement("tbody");
      bodyLines.forEach((body, i) => {
        // console.log('body', body)
        const tr = document.createElement("tr");
        tr.style.backgroundColor = "inherit";
        tr.style.borderWidth = 0;

        const td = document.createElement("td");
        td.style.borderWidth = 0;
        td.style.padding = "10px";

        const text = document.createTextNode(body + '%');

        td.appendChild(text);
        tr.appendChild(td);
        tableBody.appendChild(tr);
      });

      const tableRoot = tooltipEl.querySelector("h1");

      // Remove old children
      while (tableRoot.firstChild) {
        tableRoot.firstChild.remove();
      }

      // Add new children
      tableRoot.appendChild(tableBody);
    }

    const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

    // Display, position, and set styles for font
    tooltipEl.style.opacity = 1;
    tooltipEl.style.left = positionX + tooltip.caretX + "px";
    tooltipEl.style.top = positionY + tooltip.caretY + "px";
    tooltipEl.style.font = tooltip.options.bodyFont.string;
    tooltipEl.style.border = "1px solid #8E92AC";
    tooltipEl.style.borderRadius = "5px";
    tooltipEl.style.transform = `translate(${
      context?.tooltip.xAlign === "left"
        ? "calc(0% + 10px)"
        : "calc(-100% - 10px)"
    }, -50%)`;

    const corsairTipPointer = document.createElement("div");
    corsairTipPointer.style.position = "absolute";
    corsairTipPointer.style.height = "11px";
    corsairTipPointer.style.width = "11px";
    corsairTipPointer.style.borderTop = "1px solid #8E92AC";
    corsairTipPointer.style.backgroundColor = "#35344A";
    corsairTipPointer.style.borderLeft = "1px solid #8E92AC";
    corsairTipPointer.style.top = "-6px";
    corsairTipPointer.style.left = "22px";
    corsairTipPointer.style.transform = "rotate(45deg)";

    corsairTipEl.appendChild(corsairTipPointer);

    corsairTipEl.style.left = positionX + tooltip.caretX + "px";
    corsairTipEl.style.top = context?.chart.height - 27 + "px";
    corsairTipEl.style.font = tooltip.options.bodyFont.string;
    corsairTipEl.style.border = "1px solid #8E92AC";
    corsairTipEl.style.borderRadius = "2px";
    corsairTipEl.style.fontSize = "12px";
    corsairTipEl.style.fontWeight = "bold";
    corsairTipEl.style.padding = "6px 12px";
    corsairTipEl.style.opacity = 1;
  };
  const options: ChartOptions = {
    animation: {
      duration: 100,
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
    tooltips: {
      mode: "index",
      intersect: false,
    },
    hover: {
      mode: "index",
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
        type: "time",
        min: "2023-12-07",
        max: "2023-12-21",
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
        max: 300,
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
        display: false,
      },
      tooltip: {
        enabled: false,
        // external: (context) => setTooltipContext(context),
        external: customTooltip,
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
        <Line data={data} options={options} plugins={[corsairPlugin]} />
      </div>
    </div>
  );
};

export default LineChart2;
