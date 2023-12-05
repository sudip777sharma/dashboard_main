import React from "react";
import dynamic from "next/dynamic";
import { type ApexOptions } from "apexcharts";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

type propType = {
  barColor?: string;
  backgroundColor?: string;
  percentage: number;
  name?: string;
  barWidth: string;
};

const SingleHorizontalBar: React.FC<propType> = ({
  barColor,
  backgroundColor,
  percentage,
  name,
  barWidth,
}) => {
  const options: ApexOptions = {
    series: [
      {
        name: name,
        data: [percentage],
      },
    ],
    chart: {
      type: "bar",
      sparkline: {
        enabled: true,
      },
      toolbar: {
        show: false,
      },
    },
    colors: [barColor],
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 2,
      },
    },
    xaxis: {
      categories: [name],
      max: 100,
    },
    legend: {
      show: false,
    },
    tooltip: {
      theme: "dark",
    },
  };

  return (
    <div
      style={{ backgroundColor: `${backgroundColor}`, height: `${barWidth}` }}
      className="w-full rounded-full"
    >
      <ReactApexChart
        options={options}
        series={options.series}
        type="bar"
        height={"100%"}
        width={"100%"}
      />
    </div>
  );
};

export default SingleHorizontalBar;
