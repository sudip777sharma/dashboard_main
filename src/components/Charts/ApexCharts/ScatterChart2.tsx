// import React from "react";
// import { Scatter } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Tooltip,
//   Legend,
//   ChartOptions,
// } from "chart.js";
// ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

// const ScatterChart2: React.FC = () => {
//   const data = {
//     datasets: [
//       {
//         label: "Angular",
//         data: [
//           { x: 72, y: 225 },
//           { x: 81, y: 270 },
//           { x: 90, y: 230 },
//           { x: 103, y: 305 },
//           { x: 103, y: 245 },
//           { x: 108, y: 275 },
//           { x: 109, y: 350 },
//           { x: 110, y: 290 },
//           { x: 111, y: 315 },
//           { x: 113, y: 260 },
//           { x: 116, y: 340 },
//           { x: 117, y: 295 },
//           { x: 117, y: 275 },
//           { x: 126, y: 280 },
//           { x: 127, y: 340 },
//           { x: 133, y: 330 },
//         ],
//         backgroundColor: "#FF9F43",
//         pointRadius: 7,
//         pointBorderWidth: 1,
//         pointBorderColor: "white",
//         animation: {
//           duration: 10,
//         },
//       },
//       {
//         label: "Vue",
//         data: [
//           { x: 13, y: 155 },
//           { x: 13, y: 95 },
//           { x: 17, y: 115 },
//           { x: 18, y: 190 },
//           { x: 19, y: 130 },
//           { x: 21, y: 165 },
//           { x: 21, y: 125 },
//           { x: 22, y: 105 },
//           { x: 25, y: 155 },
//           { x: 26, y: 180 },
//           { x: 35, y: 125 },
//           { x: 43, y: 180 },
//           { x: 53, y: 202 },
//           { x: 61, y: 165 },
//           { x: 67, y: 225 },
//         ],
//         backgroundColor: "#836AF9",
//         pointRadius: 7,
//         pointBorderWidth: 1,
//         pointBorderColor: "white",
//         animation: {
//           duration: 10,
//         },
//       },
//       {
//         label: "React",
//         data: [
//           { x: 70, y: 195 },
//           { x: 72, y: 270 },
//           { x: 87, y: 240 },
//           { x: 92, y: 340 },
//           { x: 94, y: 280 },
//           { x: 94, y: 280 },
//           { x: 98, y: 255 },
//           { x: 99, y: 300 },
//           { x: 100, y: 335 },
//           { x: 100, y: 215 },
//           { x: 102, y: 290 },
//           { x: 108, y: 330 },
//           { x: 110, y: 275 },
//           { x: 111, y: 250 },
//         ],
//         backgroundColor: "#28C76F",
//         pointRadius: 7,
//         pointBorderWidth: 1,
//         pointBorderColor: "white",
//         animation: {
//           duration: 10,
//         },
//       },
//     ],
//   };
//   // function handleHover(evt, item, legend) {
//   //   legend?.chart.data.datasets.forEach((dataset, index, datasets) => {
//   //     datasets[index].backgroundColor =
//   //       index === item.datasetIndex ||
//   //       datasets[index].backgroundColor.length === 9
//   //         ? datasets[index].backgroundColor
//   //         : datasets[index].backgroundColor + "4D";
//   //     datasets[index].pointBorderColor =
//   //       index === item.datasetIndex ||
//   //       datasets[index].pointBorderColor.length === 9
//   //         ? datasets[index].pointBorderColor
//   //         : "#ffffff1f";
//   //     // datasets[index].pointBorderColor = "#ffffff1f";
//   //   });
//   //   legend.chart.update();
//   // }
//   // function handleLeave(evt, item, legend) {
//   //   legend?.chart.data.datasets.forEach((dataset, index, datasets) => {
//   //     datasets[index].backgroundColor =
//   //       datasets[index].backgroundColor.length === 9
//   //         ? datasets[index].backgroundColor.slice(0, -2)
//   //         : datasets[index].backgroundColor;

//   //     datasets[index].pointBorderColor = "white";
//   //   });
//   //   legend.chart.update();
//   // }
//   const options: ChartOptions<'scatter'> = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       x: {
//         min: 0,
//         max: 140,
//         ticks: {
//           stepSize: 10,
//           color: "#646880",
//         },
//         grid: {
//           color: "#646880",
//         },
//       },
//       y: {
//         min: 0,
//         max: 400,
//         ticks: {
//           stepSize: 100,
//           color: "#646880",
//         },
//         grid: {
//           color: "#646880",
//         },
//       },
//     },
//     plugins: {
//       legend: {
//         // onHover: handleHover,
//         // onLeave: handleLeave,
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
//     },
//   };

//   return (
//     <>
//       <div className={`flex justify-between p-4`}>
//         <h1>Scatter Chart</h1>
//       </div>
//       <div className="h-[70vh] w-full flex-col items-center justify-center">
//         <Scatter data={data} options={options} />
//       </div>
//     </>
//   );
// };

// export default ScatterChart2;

import React from "react";
import dynamic from "next/dynamic";
import { type ApexOptions } from "apexcharts";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const ScatterChart2: React.FC = () => {
  const options: ApexOptions = {
    chart: {
      type: "scatter",
      zoom: {
        enabled: true,
      },
      stacked: false,
      toolbar: {
        show: false,
      },
      // sparkline: {
      // enabled: true,
      // }
    },
    xaxis: {
      min: 0,
      max: 140,
      tickAmount: 14,
      labels: {
        style: {
          colors: "#646880",
        },
      },
      axisBorder: {
        show: false,
        color: "#646880",
      },
      axisTicks: {
        show: true,
        color: "#646880",
      },
    },
    yaxis: {
      min: 0,
      max: 400,
      tickAmount: 4,
      labels: {
        style: {
          colors: "#646880",
        },
      },
      axisBorder: {
        show: false,
        color: "#646880",
      },
      axisTicks: {
        show: true,
        color: "#646880",
      },
    },
    grid: {
      borderColor: "#646880",
      strokeDashArray: 0,
      xaxis: {
        lines: {
          show: true,
        },
      },
    },
    legend: {
      show: true,
      labels: {
        colors: "white",
      },
      position: "top",
      horizontalAlign: "left",
    },
    tooltip: {
      theme: "dark",
      shared: false, // Disable shared tooltip
    },
  };

  const series = [
    {
      name: "iPhone",
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
    },
    {
      name: "Samsung Note",
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
    },
    {
      name: "OnePlus",
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
    },
  ];

  return (
    <>
      <div className={`flex justify-between p-4`}>
        <h1>Scatter Chart</h1>
      </div>
      <div className="h-[70vh] w-full flex-col items-center justify-center">
        <ReactApexChart
          options={options}
          series={series}
          type="scatter"
          height="100%"
        />
      </div>
    </>
  );
};

export default ScatterChart2;
