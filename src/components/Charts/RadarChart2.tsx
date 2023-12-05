import React from "react";

import dynamic from "next/dynamic";

const ApexChartNoSSR = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const RadarChart2 = () => {
  const options = {
    series: [
      {
        name: "iPhone 12",
        data: [40, 70, 90, 80, 50, 50, 30, 20],
        color: "#9B88FA",
      },
      {
        name: "Samsung s20",
        data: [70, 50, 60, 40, 70, 75, 80, 50],
        color: "#D58B8F",
      },
    ],
    chart: {
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      height: 350,
      type: "radar",
      dropShadow: {
        enabled: true,
        blur: 1,
        left: 1,
        top: 1,
      },
    },
    plotOptions: {
      radar: {
        polygons: {
          strokeColors: "#9FA3BE", // Set the color of the web lines in the radar chart
        },
      },
    },
    legend: {
      labels: {
        colors: "#9FA3BE",
      },
    },
    stroke: {
      width: 0,
    },
    fill: {
      opacity: 0.7,
    },
    markers: {
      size: 0,
    },
    title: {
      show: false,
    },
    yaxis: {
      show: false,
    },
    xaxis: {
      categories: [
        "Battery",
        "Brand",
        "Camera",
        "Memory",
        "Storage",
        "Display",
        "OS",
        "Price",
      ],
    },
  };
  return (
    <div
      className={`w-full rounded-lg border-[1px] border-[#454960] p-4 md:w-[50%]`}
    >
      <div className={`flex-col`}>
        <h1>Mobile Comparison</h1>
      </div>
      <div className="h-[70vh] w-full flex-col items-center justify-center p-1 md:p-4">
        <ApexChartNoSSR
          options={options}
          series={options.series}
          type="radar"
          className="h-full w-full"
          height={"100%"}
          width={"100%"}
        />
      </div>
    </div>
  );
};

export default RadarChart2;
