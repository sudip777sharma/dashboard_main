import React from "react";
import ReactApexChart from "react-apexcharts";

import dynamic from "next/dynamic"; // Import dynamic from next/dynamic

const ApexChartNoSSR = dynamic(() => import("react-apexcharts"), {
  ssr: false, // Set ssr to false to ensure it only renders on the client-side
});

const HeatmapChart = () => {
  const options = {
    chart: {
      type: "heatmap",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      animations: {
        dynamicAnimation: {
          enabled: false, // Disable maintain aspect ratio feature
        },
      },
    },
    plotOptions: {
      heatmap: {
        radius: 0, // Set radius to 0 to remove rounded corners
        // useFillColorAsStroke: true,
        border: 1,
        shadeIntensity: 0,
        colorScale: {
          ranges: [
            { from: 0, to: 10, name: "Low", color: "#B9B3F8" },
            { from: 10, to: 20, name: "Medium", color: "#ABA4F6" },
            { from: 20, to: 30, name: "High", color: "#9D95F5" },
            { from: 30, to: 40, name: "Very High", color: "#8F85F3" },
            { from: 40, to: 50, name: "Extreme", color: "#8176F2" },
            { from: 50, to: 60, name: "legend", color: "#7367F0" },
          ],
        },
      },
    },
    stroke: {
      colors: ["#2F3349"],
      width: 2,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      labels: {
        colors: "#646880",
      },
      position: "bottom",
      horizontalAlign: "center",
    },
    xaxis: {
      labels: {
        style: {
          colors: "#646880",
        },
      },
      categories: [
        "w1",
        "w2",
        "w3",
        "w4",
        "w5",
        "w6",
        "w7",
        "w8",
        "w9",
        "w10",
        "w11",
        "w12",
        "w13",
        "w14",
        "w15",
        "w16",
        "w17",
        "w18",
        "w19",
        "w20",
        "w21",
        "w22",
        "w23",
        "w24",
      ],
    },
    yaxis: {
      tooltip: {
        enabled: false,
      },
      labels: {
        style: {
          colors: "#646880",
        },
      },
      categories: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
    },
    title: {
      show: false,
    },
    tooltip: {
      theme: "dark",
    },
  };

  function generateRandomArray(
    length: number,
    min: number,
    max: number
  ): number[] {
    const randomArray: number[] = [];
    for (let i = 0; i < length; i++) {
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      randomArray.push(randomNumber);
    }
    return randomArray;
  }
  const series = [
    {
      name: "MON",
      data: generateRandomArray(24, 1, 50),
    },
    {
      name: "TUE",
      data: generateRandomArray(24, 1, 50),
    },
    {
      name: "WED",
      data: generateRandomArray(24, 1, 50),
    },
    {
      name: "THU",
      data: generateRandomArray(24, 1, 50),
    },
    {
      name: "FRI",
      data: generateRandomArray(24, 1, 50),
    },
    {
      name: "SAT",
      data: generateRandomArray(24, 1, 50),
    },
    {
      name: "SUN",
      data: generateRandomArray(24, 1, 50),
    },
  ];

  return (
    <div
      className={`w-full rounded-lg border-[1px] border-[#454960] md:w-[50%] p-4`}
    >
      <div className={`flex-col`}>
        <h1>Daily Sales States</h1>
      </div>
      <div className="h-[70vh] w-full flex-col items-center justify-center p-1 md:p-4">
        <ApexChartNoSSR
          options={options}
          series={series}
          type="heatmap"
          className="h-full w-full"
          height={"100%"}
          width={"100%"}
        />
      </div>
    </div>
  );
};

export default HeatmapChart;
