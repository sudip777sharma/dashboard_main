import React from "react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const StorkedGaugeChart = () => {
  const options = {
    series: [85],
    chart: {
      type: "radialBar",
      offsetY: -10,
    },
    plotOptions: {
      radialBar: {
        track: {
          background: "transparent",
        },
        startAngle: -135,
        endAngle: 135,
        hollow: {
          size: "67%",
        },
        dataLabels: {
          showOn: "always",
          name: {
            offsetY: -10,
            show: true,
            color: "#72778F",
            fontSize: "13px",
          },
          value: {
            color: "#ACB0CC",
            fontSize: "40px",
            show: true,
          },
        },
      },
    },
    maintainAspectRatio: false,
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        colorStops: [
          {
            offset: 0,
            color: "#474685",
          },
          {
            offset: 40,
            color: "#7367F0",
          },
        ],
      },
    },
    stroke: {
      dashArray: 11,
    },
    labels: ["Completed Task"],
  };

  return (
    <ReactApexChart
      //   className="bg-[#474685] text-[#7367F0]"
      options={options}
      series={options.series}
      type="radialBar"
      height={"370"}
      width={"100%"}
    />
  );
};

export default StorkedGaugeChart;
