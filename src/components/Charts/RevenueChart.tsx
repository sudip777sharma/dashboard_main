// components/RevenueChart.tsx
import React from "react";
import ReactApexChart from "react-apexcharts";

import dynamic from "next/dynamic"; // Import dynamic from next/dynamic

const ApexChartNoSSR = dynamic(() => import("react-apexcharts"), {
  ssr: false, // Set ssr to false to ensure it only renders on the client-side
});

const RevenueChart: React.FC = () => {
  const series = [
    {
      name: "Revenue",
      data: [90, 95, 93, 97, 94, 99, 97.5],
    },
  ];

  const options = {
    chart: {
      type: "area",
      toolbar: {
        show: false, // Hide chart toolbar
      },
      sparkline: {
        enabled: true,
      },
    },
    xaxis: {
      categories: [2017, 2018, 2019, 2020, 2021, 2022, 2023],
      labels: {
        show: false,
      },
      axisBorder: {
        show: false, // Hide x-axis border
      },
      axisTicks: {
        show: false, // Hide x-axis ticks
      },
      //   categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
    },
    yaxis: {
      show: false, // Hide y-axis grid lines
    },
    grid: {
      show: false, // Hide both x and y-axis grid lines
    },
    maintainAspectRatio: false,
    fill: {
      type: "gradient",
      colors: ["#28C66F"], // Set the fill color to #28C66F
      gradient: {
        shade: "dark", // Set the shade to dark
        type: "vertical", // Set the gradient type to vertical
        shadeIntensity: 0.7, // Set the intensity of the shade
        gradientToColors: ["#2F3349"], // Set the end color to transparent
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 0,
        stops: [0, 100],
      },
    },
    stroke: {
      curve: "smooth", // Set curve type to smooth
      lineCap: "butt", // Set line cap to butt
      colors: ["#28C66F"], // Set the line color to #28C66F
      width: 2, // Set line width
    },
    dataLabels: {
      enabled: false, // Disable data point labels
    },
    tooltip: {
      theme: "dark",
    },
    markers: {
    //   size: 6, // Set the size of the data points
      colors: ["#28C66F"], // Set the default color of data points
      hover: {
        size: 4, // Set the size of data points on hover
        // sizeOffset: 2, // Set the offset of size on hover
        // colors: ["#FF5733"], // Set the color of data points on hover
      },
    },
  };

  return (
    <ApexChartNoSSR
      options={options}
      series={series}
      type="area"
      width={"100%"} // Set width to 100% of the container
      height={"93%"}
      style={{ margin: 0, padding: 0 }}
    />
  );
};

export default RevenueChart;
