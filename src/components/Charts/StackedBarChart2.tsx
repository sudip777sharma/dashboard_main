import React from "react";
import dynamic from "next/dynamic";
import { type ApexOptions } from "apexcharts";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const StackedBarChart2: React.FC = () => {
  const chartData = {
    series: [
      {
        name: "PRODUCT A",
        data: [58, 46, 87, 30, 47, 69, 49, 18],
      },
      {
        name: "",
        data: [-5, -5, -5, -5, -5, -5, -5, -5],
      },
      {
        name: "PRODUCT B",
        data: [-31, -39, -29, -46, -25, -30, -20, -40],
      },
    ],
  };

  const options: ApexOptions = {
    chart: {
      type: "bar",
      stacked: true,
      sparkline: {
        enabled: true,
      },
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    colors: ["#7367F0", "transparent", "#A8AAAE"],
    plotOptions: {
      bar: {
        columnWidth: "28%",
        borderRadius: 9,
        borderRadiusApplication: "around",
        borderRadiusWhenStacked: "all",
      },
    },
    xaxis: {
      type: "datetime",
      categories: [
        "01/01/2023 GMT",
        "01/02/2023 GMT",
        "01/03/2023 GMT",
        "01/04/2023 GMT",
        "01/05/2023 GMT",
        "01/06/2023 GMT",
        "01/07/2023 GMT",
        "01/08/2023 GMT",
      ],
    },
    tooltip: {
      theme: "dark",
    },
  };

  return (
    <div className="w-full">
      <ReactApexChart
        options={options}
        series={chartData.series}
        type="bar"
        height={"190%"}
        width={"100%"}
      />
    </div>
  );
};

export default StackedBarChart2;
