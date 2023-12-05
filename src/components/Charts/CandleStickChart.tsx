import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

import dynamic from "next/dynamic"; // Import dynamic from next/dynamic
const ApexChartNoSSR = dynamic(() => import("react-apexcharts"), {
  ssr: false, // Set ssr to false to ensure it only renders on the client-side
});

const CandleStickChart = () => {
  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const handleValueChange = (newValue) => {
    setValue(newValue);
  };
  const [chartData, setChartData] = useState({
    series: [
      {
        data: [
          {
            x: new Date("2023-07-01"),
            y: [150, 170, 50, 100],
          },
          {
            x: new Date("2023-08-11"),
            y: [200, 400, 170, 330],
          },
          {
            x: new Date("2023-09-11"),
            y: [330, 340, 250, 280],
          },
          {
            x: new Date("2023-10-11"),
            y: [300, 330, 200, 320],
          },
          {
            x: new Date("2023-11-11"),
            y: [320, 450, 280, 350],
          },
          {
            x: new Date("2023-12-11"),
            y: [300, 350, 80, 250],
          },
        ],
      },
    ],
    options: {
      chart: {
        type: "candlestick",
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
      title: {
        show: false,
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
          },
        },
      },
      yaxis: {
        tooltip: {
          enabled: true,
        },
        labels: {
          style: {
            colors: "#646880",
          },
        },
      },
      grid: {
        borderColor: "#646880",
        strokeDashArray: 1,
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
      },
    },
  });

  return (
    <div
      className={`w-full rounded-lg border-[1px] border-[#454960] md:w-[50%]`}
    >
      <div className={`flex items-center justify-between p-4`}>
        <div className={`flex-col`}>
          <h1>Horizontal Bar Chart Balance</h1>
          <h1>$74,123</h1>
        </div>
        <div className={`rounded-lg border-[1px] border-[#454960]`}>
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
        <ApexChartNoSSR
          options={chartData.options}
          series={chartData.series}
          type="candlestick"
          className="h-full w-full"
          height={"100%"}
          width={"100%"}
        />
      </div>
    </div>
  );
};

export default CandleStickChart;
