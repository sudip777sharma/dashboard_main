import React from "react";

import dynamic from "next/dynamic"; // Import dynamic from next/dynamic

const ApexChartNoSSR = dynamic(() => import("react-apexcharts"), {
  ssr: false, // Set ssr to false to ensure it only renders on the client-side
});

const DonutChart = () => {
  const calculateAverage = () => {
    const total = series.reduce((sum, value) => sum + value, 0);
    const average = total / series.length;
    return average.toFixed(2) + "%"; // Round to 2 decimal places
  };
  const options = {
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
              label: "Progress",
              color: "#fff",
              formatter: calculateAverage,
            },
            value: {
              color: "white",
            },
          },
        },
      },
    },
    chart: {
      type: "donut",
    },
    stroke: {
      colors: "transparent",
    },
    legend: {
      position: "bottom",
      labels: {
        colors: "white",
      },
    },
    labels: ["Operational", "Networking", "Hiring", "R&D"],
    colors: ["#FDD835", "#FFA1A1", "#826BF8", "#00D4BD"],
  };

  const series = [42, 24, 24, 7];
  return (
    <div
      className={`w-full rounded-lg border-[1px] border-[#454960] p-4 md:w-[50%]`}
    >
      <div className={`flex-col text-xl`}>
        <h1>Expense Ratio</h1>
        <h1>Spending on various categories</h1>
      </div>
      <div className="h-[70vh] w-full flex-col items-center justify-center p-1 md:p-4">
        <ApexChartNoSSR
          options={options}
          series={series}
          type="donut"
          className="h-full w-full"
          height={"100%"}
          width={"100%"}
        />
      </div>
    </div>
  );
};

export default DonutChart;
