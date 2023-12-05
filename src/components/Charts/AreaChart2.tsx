// import React, { useState } from "react";
// import { Line } from "react-chartjs-2";
// import { de } from "date-fns/locale";
// import { format, parseISO } from "date-fns";
// import "chartjs-adapter-date-fns";

// import Datepicker from "react-tailwindcss-datepicker";

// import {
//   Chart as ChartJS,
//   LinearScale,
//   PointElement,
//   Tooltip,
//   Legend,
//   type ChartOptions,
//   TimeScale,
// } from "chart.js";

// ChartJS.register(LinearScale, PointElement, Tooltip, Legend, TimeScale);

// const corsairPlugin = {
//   id: "corsair",
//   defaults: {
//     width: 1.2,
//     color: "white",
//     dash: [3, 3],
//   },
//   afterInit: (chart, args, opts) => {
//     chart.corsair = {
//       x: 0,
//       y: 0,
//     };
//   },
//   afterEvent: (chart, args) => {
//     const { inChartArea } = args;
//     const { type, x, y } = args.event;

//     chart.corsair = { x, y, draw: inChartArea };
//     chart.draw();
//   },
//   beforeDraw: function (chart, easing, opts) {
//     if (chart.tooltip._active && chart.tooltip._active.length) {
//       const ctx = chart.ctx;
//       const { top, bottom, left, right } = chart.chartArea;
//       const { x: xCorsair, y: yCorsair, draw } = chart.corsair;
//       if (!draw) return;
//       const activePoint = chart.tooltip._active[0];
//       // console.log("activePoint", activePoint);
//       const x = activePoint.element.x;
//       const topY = chart.scales.y.top;
//       const bottomY = chart.scales.y.bottom;
//       const y = activePoint.element.y;
//       const leftX = chart.scales.x.left;
//       const rightX = chart.scales.x.right;
//       ctx.save();
//       ctx.beginPath();
//       ctx.lineWidth = opts.width;
//       ctx.strokeStyle = opts.color;
//       ctx.setLineDash(opts.dash);
//       ctx.moveTo(x, bottom);
//       ctx.lineTo(x, top);
//       // ctx.moveTo(left, yCorsair);
//       // ctx.lineTo(right, yCorsair);
//       ctx.stroke();
//       ctx.restore();
//     }
//   },
// };

// const AreaChart2: React.FC = () => {
//   const [value, setValue] = useState({
//     startDate: new Date(),
//     endDate: new Date(),
//   });

//   const handleValueChange = (newValue) => {
//     console.log("newValue:", newValue);
//     setValue(newValue);
//   };

//   const data = {
//     datasets: [
//       {
//         label: "Sales",
//         data: [
//           { x: "2023-12-07", y: 20 },
//           { x: "2023-12-08", y: 40 },
//           { x: "2023-12-09", y: 30 },
//           { x: "2023-12-10", y: 70 },
//           { x: "2023-12-11", y: 40 },
//           { x: "2023-12-12", y: 60 },
//           { x: "2023-12-13", y: 50 },
//           { x: "2023-12-14", y: 140 },
//           { x: "2023-12-15", y: 120 },
//           { x: "2023-12-16", y: 100 },
//           { x: "2023-12-17", y: 140 },
//           { x: "2023-12-18", y: 180 },
//           { x: "2023-12-19", y: 220 },
//         ],
//         backgroundColor: "#AB7EFD",
//         borderWidth: 0,
//         pointRadius: 0,
//         hoverRadius: 6,
//         hoverBorderColor: "white", // Border color of the data points
//         hoverBorderWidth: 2,
//         fill: "start",
//       },
//       {
//         label: "Clicks",
//         data: [
//           { x: "2023-12-07", y: 60 },
//           { x: "2023-12-08", y: 80 },
//           { x: "2023-12-09", y: 70 },
//           { x: "2023-12-10", y: 110 },
//           { x: "2023-12-11", y: 80 },
//           { x: "2023-12-12", y: 100 },
//           { x: "2023-12-13", y: 90 },
//           { x: "2023-12-14", y: 180 },
//           { x: "2023-12-15", y: 160 },
//           { x: "2023-12-16", y: 140 },
//           { x: "2023-12-17", y: 200 },
//           { x: "2023-12-18", y: 220 },
//           { x: "2023-12-19", y: 275 },
//         ],
//         backgroundColor: "#B992FE",
//         borderWidth: 0,
//         pointRadius: 0,
//         hoverRadius: 6,
//         hoverBorderColor: "white", // Border color of the data points
//         hoverBorderWidth: 2,
//         fill: "start",
//       },
//       {
//         label: "Visits",
//         data: [
//           { x: "2023-12-07", y: 100 },
//           { x: "2023-12-08", y: 120 },
//           { x: "2023-12-09", y: 90 },
//           { x: "2023-12-10", y: 170 },
//           { x: "2023-12-11", y: 130 },
//           { x: "2023-12-12", y: 160 },
//           { x: "2023-12-13", y: 140 },
//           { x: "2023-12-14", y: 240 },
//           { x: "2023-12-15", y: 220 },
//           { x: "2023-12-16", y: 180 },
//           { x: "2023-12-17", y: 270 },
//           { x: "2023-12-18", y: 280 },
//           { x: "2023-12-19", y: 375 },
//         ],
//         backgroundColor: "#E0CFFE",
//         borderWidth: 0,
//         pointRadius: 0,
//         hoverRadius: 6,
//         hoverBorderColor: "white", // Border color of the data points
//         hoverBorderWidth: 2,
//         fill: "start",
//       },
//     ],
//   };

//   const getOrCreateTooltip = (chart, context) => {
//     let tooltipEl = chart.canvas.parentNode.querySelector("#tooltipEl");
//     // console.log("tooltipEl", tooltipEl);
//     if (!tooltipEl) {
//       // console.log('!tooltipEl')
//       tooltipEl = document.createElement("div");
//       tooltipEl.id = "tooltipEl";
//       tooltipEl.style.background = "#2F3349";
//       tooltipEl.style.borderRadius = "3px";
//       tooltipEl.style.color = "#8E92AC";
//       tooltipEl.style.opacity = 1;
//       tooltipEl.style.pointerEvents = "none";
//       tooltipEl.style.position = "absolute";
//       tooltipEl.style.transform = `translate(-50%, 0)`;
//       tooltipEl.style.transition = "all .1s ease";

//       const table = document.createElement("table");
//       table.style.margin = "0px";

//       tooltipEl.appendChild(table);
//       chart.canvas.parentNode.appendChild(tooltipEl);
//     }

//     return tooltipEl;
//   };

//   const getOrCreateCorsairTip = (chart, context) => {
//     let corsairTipEl = chart.canvas.parentNode.querySelector("#corsairTipEl");
//     // console.log("corsairTipEl", chart.canvas);
//     if (!corsairTipEl) {
//       corsairTipEl = document.createElement("div");
//       corsairTipEl.id = "corsairTipEl";
//       corsairTipEl.style.background = "#2F3349";
//       corsairTipEl.style.borderRadius = "3px";
//       corsairTipEl.style.color = "#8E92AC";
//       corsairTipEl.style.opacity = 1;
//       corsairTipEl.style.pointerEvents = "none";
//       corsairTipEl.style.position = "absolute";
//       corsairTipEl.style.transform = `translate(-50%, 0)`;
//       corsairTipEl.style.transition = "all .1s ease";

//       chart.canvas.parentNode.appendChild(corsairTipEl);
//     }
//     return corsairTipEl;
//   };

//   const customTooltip = (context) => {
//     // Tooltip Element
//     const { chart, tooltip } = context;
//     const tooltipEl = getOrCreateTooltip(chart, context);
//     const corsairTipEl = getOrCreateCorsairTip(chart, context);

//     // Hide if no tooltip
//     if (tooltip.opacity === 0) {
//       tooltipEl.style.opacity = 0;
//       corsairTipEl.style.opacity = 0;
//       return;
//     }

//     // Set Text
//     if (tooltip.body) {
//       const titleLines = tooltip.title || [];
//       const bodyLines = tooltip.body.map((b) => b.lines);

//       const tableHead = document.createElement("thead");
//       // tableHead.style.padding = "2px 2px";
//       corsairTipEl.textContent = "";
//       tooltip?.title.forEach((title) => {
//         const text = document.createTextNode(title);
//         corsairTipEl.appendChild(text);
//       });

//       titleLines.forEach((title) => {
//         const tr = document.createElement("tr");
//         tr.style.borderWidth = 0;

//         const th = document.createElement("th");
//         th.style.borderWidth = 0;
//         th.style.textAlign = "start";
//         th.style.padding = "6px";
//         // th.style.fontSize = '12px';
//         // th.style.fontWeight = 'bold';
//         const text = document.createTextNode(title);

//         th.appendChild(text);
//         // corsairTipEl.appendChild(text);
//         tr.appendChild(th);
//         tableHead.appendChild(tr);
//       });

//       const tableBody = document.createElement("tbody");
//       // tableBody.style.padding = "2px 2px";
//       bodyLines.forEach((body, i) => {
//         const colors = tooltip.labelColors[i];

//         const span = document.createElement("span");
//         span.style.background = colors.backgroundColor;
//         span.style.borderColor = colors.borderColor;
//         span.style.borderWidth = "2px";
//         span.style.marginRight = "6px";
//         span.style.height = "12px";
//         span.style.width = "12px";
//         span.style.borderRadius = "50%";
//         span.style.display = "inline-block";

//         const tr = document.createElement("tr");
//         tr.style.backgroundColor = "inherit";
//         tr.style.borderWidth = 0;

//         const td = document.createElement("td");
//         td.style.borderWidth = 0;
//         td.style.padding = "10px";

//         const text = document.createTextNode(body);

//         td.appendChild(span);
//         td.appendChild(text);
//         tr.appendChild(td);
//         tableBody.appendChild(tr);
//       });

//       const tableRoot = tooltipEl.querySelector("table");

//       // Remove old children
//       while (tableRoot.firstChild) {
//         tableRoot.firstChild.remove();
//       }

//       // Add new children
//       tableRoot.appendChild(tableHead);
//       const hr = document.createElement("HR");
//       hr.style.borderTop = "1px solid #8E92AC";
//       tableRoot.appendChild(hr);
//       tableRoot.appendChild(tableBody);
//     }

//     const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

//     // Display, position, and set styles for font
//     tooltipEl.style.opacity = 1;
//     tooltipEl.style.left = positionX + tooltip.caretX + "px";
//     tooltipEl.style.top = positionY + tooltip.caretY + "px";
//     tooltipEl.style.font = tooltip.options.bodyFont.string;
//     tooltipEl.style.border = "1px solid #8E92AC";
//     tooltipEl.style.borderRadius = "5px";
//     tooltipEl.style.transform = `translate(${
//       context?.tooltip.xAlign === "left"
//         ? "calc(0% + 10px)"
//         : "calc(-100% - 10px)"
//     }, -50%)`;

//     const corsairTipPointer = document.createElement("div");
//     corsairTipPointer.style.position = "absolute";
//     corsairTipPointer.style.height = "11px";
//     corsairTipPointer.style.width = "11px";
//     corsairTipPointer.style.borderTop = "1px solid #8E92AC";
//     corsairTipPointer.style.backgroundColor = "#35344A";
//     corsairTipPointer.style.borderLeft = "1px solid #8E92AC";
//     corsairTipPointer.style.top = "-6px";
//     corsairTipPointer.style.left = "22px";
//     corsairTipPointer.style.transform = "rotate(45deg)";

//     corsairTipEl.appendChild(corsairTipPointer);

//     corsairTipEl.style.left = positionX + tooltip.caretX + "px";
//     corsairTipEl.style.top = context?.chart.height - 27 + "px";
//     corsairTipEl.style.font = tooltip.options.bodyFont.string;
//     corsairTipEl.style.border = "1px solid #8E92AC";
//     corsairTipEl.style.borderRadius = "2px";
//     corsairTipEl.style.fontSize = "12px";
//     corsairTipEl.style.fontWeight = "bold";
//     corsairTipEl.style.padding = "6px 12px";
//     corsairTipEl.style.opacity = 1;
//     // #35344A
//     // tooltipEl.style.padding = tooltip.options.padding + "px " + tooltip.options.padding + "px";
//   };
//   function handleHover(evt, item, legend) {
//     legend?.chart.data.datasets.forEach((dataset, index, datasets) => {
//       datasets[index].backgroundColor =
//         index === item.datasetIndex ||
//         datasets[index].backgroundColor.length === 9
//           ? datasets[index].backgroundColor
//           : datasets[index].backgroundColor + "4D";
//     });
//     legend.chart.update();
//   }
//   function handleLeave(evt, item, legend) {
//     legend?.chart.data.datasets.forEach((dataset, index, datasets) => {
//       datasets[index].backgroundColor =
//         datasets[index].backgroundColor.length === 9
//           ? datasets[index].backgroundColor.slice(0, -2)
//           : datasets[index].backgroundColor;
//     });
//     legend.chart.update();
//   }
//   const options: ChartOptions = {
//     animation: {
//       duration: 100,
//     },
//     interaction: {
//       mode: "nearest",
//       intersect: false,
//     },
//     tooltips: {
//       mode: "nearest",
//       intersect: false,
//     },
//     hover: {
//       mode: "nearest",
//       intersect: false,
//     },
//     responsive: true,
//     maintainAspectRatio: false,
//     adapters: {
//       date: {
//         locale: de,
//       },
//     },
//     scales: {
//       x: {
//         type: "time",
//         min: "2023-12-07",
//         max: "2023-12-19",
//         time: {
//           unit: "day",
//           parser: (value) => {
//             // Custom parsing using date-fns
//             return parseISO(value);
//           },
//           tooltipFormat: "dd/MM",
//           formatter: (time) => {
//             // Custom formatting using date-fns
//             return format(time, "dd/MM");
//           },
//         },
//         position: "bottom",
//         ticks: {
//           color: "#9196b2",
//           callback: (value, index, values) => {
//             // Custom label formatting using date-fns with "/" separator
//             const date = new Date(value);
//             const day = date.getDate().toString();
//             const month = (date.getMonth() + 1).toString();
//             return `${day}/${month}`;
//           },
//         },
//         grid: {
//           color: "#646880",
//         },
//         beginAtZero: true,
//       },
//       y: {
//         min: 0,
//         max: 400,
//         ticks: {
//           stepSize: 100,
//           color: "#9196b2",
//         },
//         grid: {
//           color: "#646880",
//         },
//         beginAtZero: true,
//       },
//     },

//     plugins: {
//       legend: {
//         onHover: handleHover,
//         onLeave: handleLeave,
//         labels: {
//           color: "white",
//           boxWidth: 15,
//           boxHeight: 15,
//           usePointStyle: true,
//           pointStyle: "circle",
//           padding: 30,
//         },
//         position: "top",
//         align: "start",
//       },
//       tooltip: {
//         enabled: false,
//         // external: (context) => setTooltipContext(context),
//         external: customTooltip,
//       },
//     },
//   };

//   return (
//     <div className={`w-full`}>
//       <div className={`flex items-center justify-between p-4`}>
//         <div className={``}>
//           <h1>Area Chart 2</h1>
//           <p>Commercial networks</p>
//         </div>
//         <div className={` rounded-lg border-[1px] border-[#454960]`}>
//           <Datepicker
//             asSingle={true}
//             useRange={false}
//             primaryColor={"blue"}
//             value={value}
//             onChange={handleValueChange}
//             // placeholder={"My Placeholder"}
//             // separator={"<->"}
//             // startFrom={new Date("1999-01-01")}
//             // showShortcuts={true}
//             // showFooter={true}
//             // displayFormat={"DD/MM/YYYY"}
//             // readOnly={true}
//             // disabled={true}
//             // inputClassName="w-full rounded-md focus:ring-0 font-normal bg-green-100 dark:bg-green-900 dark:placeholder:text-green-100"
//             // containerClassName="relative mt-8"
//             // toggleClassName="absolute bg-red-300 rounded-r-lg text-white right-0 h-full px-3 text-gray-400 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
//             // popoverDirection="up"
//           />
//         </div>
//       </div>
//       <div
//         id="chartContainer"
//         className="relative h-[70vh] w-full flex-col items-center justify-center rounded-lg"
//       >
//         <Line data={data} options={options} plugins={[corsairPlugin]} />
//       </div>
//     </div>
//   );
// };

// export default AreaChart2;

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { type ApexOptions } from "apexcharts";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import MyDatePicker from "../MyDatePicker";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const generateDayWiseTimeSeries = (
  baseDate: number,
  count: number,
  yrange: { min: number; max: number }
) => {
  let i = 0;
  let series = [];
  while (i < count) {
    const x = baseDate;
    const y =
      Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

    series.push([x, y]);
    baseDate += 86400000;
    i++;
  }
  return series;
};

const AreaChart2 = () => {
  const [value, setValue] = useState<DateValueType>({
    startDate: new Date(),
    endDate: new Date(),
  });

  const handleValueChange = (
    newValue: DateValueType,
    e?: HTMLInputElement | null | undefined
  ) => {
    setValue((prevState) => {
      if (newValue !== null) {
        return {
          ...prevState,
          startDate: newValue,
        };
      }
      return prevState;
    });
  };

  const options: ApexOptions = {
    series: [
      {
        name: "Sales",
        data: generateDayWiseTimeSeries(
          new Date("11 Feb 2017 GMT").getTime(),
          13,
          {
            min: 0,
            max: 100,
          }
        ),
      },
      {
        name: "Clicks",
        data: generateDayWiseTimeSeries(
          new Date("11 Feb 2017 GMT").getTime(),
          13,
          {
            min: 0,
            max: 100,
          }
        ),
      },
      {
        name: "Visits",
        data: generateDayWiseTimeSeries(
          new Date("11 Feb 2017 GMT").getTime(),
          13,
          {
            min: 0,
            max: 100,
          }
        ),
      },
    ],
    chart: {
      type: "area",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: true,
      },
      stacked: true,
    },
    colors: ["#AB7EFD", "#B992FE", "#E0CFFE"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
      width: 0,
    },
    fill: {
      type: "solid",
      colors: ["#AB7EFD", "#B992FE", "#E0CFFE"], // Set your desired fill color
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
      labels: {
        colors: "#555971",
      },
    },
    xaxis: {
      type: "datetime",
      axisBorder: {
        show: false, // Hide x-axis border
      },
      axisTicks: {
        show: false, // Hide x-axis ticks
      },
      labels: {
        style: {
          colors: "#646880",
          fontSize: "14px",
        },
      },
    },
    yaxis: {
      tooltip: {
        enabled: false,
      },
      labels: {
        style: {
          colors: "#646880",
          fontSize: "14px",
        },
      },
    },
    grid: {
      borderColor: "#646880",
      // strokeDashArray: 1,
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    tooltip: {
      theme: "dark",
      shared: false, // Disable shared tooltip
    },
  };

  return (
    <div className={`w-full`}>
      <div className={`flex items-center justify-between p-4`}>
        <div className={`flex-col`}>
          <h1 className="text-2xl">Stacked Area Chart</h1>
          <h1>Commercial networks</h1>
        </div>
        <div className={`rounded-lg border-[1px] border-[#454960]`}>
          {/* <MyDatePicker /> */}
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
        <ReactApexChart
          options={options}
          series={options.series}
          type="area"
          className="h-full w-full"
          height={"100%"}
          width={"100%"}
        />
      </div>
    </div>
  );
};

export default AreaChart2;
