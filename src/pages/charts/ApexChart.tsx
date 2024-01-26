import React from "react";
import AreaChart2 from "~/components/Charts/ApexCharts/AreaChart2";
import CandleStickChart from "~/components/Charts/ApexCharts/CandleStickChart";
import DonutChart from "~/components/Charts/ApexCharts/DonutChart";
import HeatmapChart from "~/components/Charts/ApexCharts/HeatMapChart";
import HorizontalBarChart2 from "~/components/Charts/ReactChartjsCharts/HorizontalBarChart2";
import LineChart2 from "~/components/Charts/ApexCharts/LineChart2";
import RadarChart2 from "~/components/Charts/ApexCharts/RadarChart2";
import RadialBarChart from "~/components/Charts/ApexCharts/RadialBarChart";
import ScatterChart2 from "~/components/Charts/ApexCharts/ScatterChart2";
import StackedBarChart from "~/components/Charts/ApexCharts/StackedBarChart";

const ApexChart = () => {
  return (
    <div
        className={`flex w-full flex-col items-center gap-6 px-1 py-2 md:px-6
      `}    
    >
      <div
        className={` h-full w-full rounded-lg border-[1px] border-[#454960]
        p-1 md:p-4
      `}
      >
        <AreaChart2 />
      </div>
      <div
        className={` h-full w-full rounded-lg border-[1px] border-[#454960]
        p-1 md:p-4
      `}
      >
        <StackedBarChart />
      </div>
      <div
        className={` h-full w-full rounded-lg border-[1px] border-[#454960]
        p-1 md:p-4
      `}
      >
        <ScatterChart2 />
      </div>

      <div
        className={` h-full w-full rounded-lg border-[1px] border-[#454960]
        p-1 md:p-4
      `}
      >
        <LineChart2 />
      </div>

      <div
        className={`flex h-fit w-full flex-col gap-6 rounded-lg md:flex-row 
      `}
      >
        <HorizontalBarChart2 />
        <CandleStickChart />
      </div>

      <div
        className={`flex h-fit w-full flex-col gap-6 rounded-lg md:flex-row 
      `}
      >
        <HeatmapChart />
        <RadialBarChart />
      </div>

      <div
        className={`flex h-fit w-full flex-col gap-6 rounded-lg md:flex-row 
      `}
      >
        <RadarChart2 />
        <DonutChart />
      </div>
    </div>
  );
};

export default ApexChart;
