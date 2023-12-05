import React from "react";

import dynamic from "next/dynamic"; // Import dynamic from next/dynamic

const ApexChartNoSSR = dynamic(() => import("react-apexcharts"), {
  ssr: false, // Set ssr to false to ensure it only renders on the client-side
});

const RadialBarChart = () => {
  const calculateAverage = () => {
    const total = series.reduce((sum, value) => sum + value, 0);
    const average = total / series.length;
    return average.toFixed(2) + '%'; // Round to 2 decimal places
  };
  const options = {
    chart: {
      height: 280,
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          total: {
            show: true,
            label: "Interactions",
            color: "#fff",
            formatter: function () {
              return calculateAverage(); // Calculate and display the average
            },
          },
          value: {
            color: "white", // Change color of percentage values
          },
        },
        hollow: {
          size: "40%"
        },
        track: {
          background: "transparent", // Set track background to transparent
        },
      },
    },
    stroke: {
      lineCap: "round",
    },
    legend: {
      show: true, // Set show to true to display legends
      position: "bottom", // Position of legends (you can use 'bottom', 'left', 'right' as well)
      markers: {
        fillColors: ["#FDD835", "#32BAFF", "#7367F0"], // Colors of legends markers
      },
      labels: {
        colors: "#9296B1", // Change legend label colors here
      },
      itemMargin: {
        horizontal: 10, // Horizontal space between legend items
        vertical: 5, // Vertical space between legend items
      },
    },
    labels: ["Comments", "Replies", "Shares"],
    colors: ["#FDD835", "#32BAFF", "#7367F0"],
  };
  const series = [80, 50, 35];

  return (
    <div
      className={`w-full rounded-lg border-[1px] border-[#454960] p-4 md:w-[50%]`}
    >
      <div className={`flex-col`}>
        <h1>Statistics</h1>
      </div>
      <div className="h-[70vh] w-full flex-col items-center justify-center p-1 md:p-4">
        <ApexChartNoSSR
          options={options}
          series={series}
          type="radialBar"
          className="h-full w-full"
          height={"100%"}
          width={"100%"}
        />
      </div>
    </div>
  );
};

export default RadialBarChart;
