import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

import dynamic from "next/dynamic";

const ApexChartNoSSR = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const EarningChart = () => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Earning",
        data: [
          {
            x: "Mo",
            y: 2.9,
          },
          {
            x: "Tu",
            y: 4.1,
          },
          {
            x: "We",
            y: 3.5,
          },
          {
            x: "Th",
            y: 3.3,
          },
          {
            x: "Fr",
            y: 5.0,
            fillColor: "#7367F0",
            strokeColor: "#7367F0",
          },
          {
            x: "Sa",
            y: 3.6,
          },
          {
            x: "Su",
            y: 4.2,
          },
        ],
      },
    ],
    options: {
      colors: ["#383B61"],
      chart: {
        type: "bar",
        toolbar: {
          show: false,
        },
        sparkline: {
          enabled: false,
        },
      },
      grid: {
        show: false,
      },
      plotOptions: {
        bar: {
          borderRadius: 5,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        tooltip: {
          enabled: true,
        },
        labels: {
          style: {
            colors: "#9599B3", // Set the color of x-axis labels
          },
        },
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          formatter: function (val) {
            return val + "%";
          },
        },
      },
      tooltip: {
        theme: "dark",
      },
      maintainAspectRatio: false,
    },
  });

  return (
    <div id="chart">
      <ApexChartNoSSR
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={"150%"}
        width={"100%"}
      />
    </div>
  );
};

export default EarningChart;
