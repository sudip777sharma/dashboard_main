import React from "react";

import AreaChart from "~/components/Charts/ReactChartjsCharts/AreaChart";
import BubbleChart from "~/components/Charts/ReactChartjsCharts/BubbleChart";
import HorizontalBarChart from "~/components/Charts/ReactChartjsCharts/HorizontalBarChart";
import LineChart from "~/components/Charts/D3jsCharts/LineChart";
import PolarChart from "~/components/Charts/ReactChartjsCharts/PolarChart";
import RadarChart from "~/components/Charts/ReactChartjsCharts/RadarChart";
import ScatterChart from "~/components/Charts/ReactChartjsCharts/ScatterChart";
import VerticalBarChart from "~/components/Charts/ReactChartjsCharts/VerticalBarChart";
const Chartjs = () => {
  return (
    <div
      className={`flex w-full flex-col items-center gap-6 px-1 py-2 md:px-6
      `}
    >
      <div
        className={` w-full rounded-lg border-[1px] border-[#454960]
        p-1 md:p-4
      `}
      >
        <LineChart />
      </div>
      <div
        className={`flex h-fit w-full flex-col gap-6 rounded-lg md:flex-row 
      `}
      >
        <RadarChart />
        <PolarChart />
      </div>
      <div
        className={` h-full w-full rounded-lg border-[1px] border-[#454960]
        p-1 md:p-4
      `}
      >
        <BubbleChart />
      </div>
      <div
        className={` h-full w-full rounded-lg border-[1px] border-[#454960]
        p-1 md:p-4
      `}
      >
        <ScatterChart />
      </div>
      <div
        className={` h-full w-full rounded-lg border-[1px] border-[#454960]
        p-1 md:p-4
      `}
      >
        <AreaChart />
      </div>
      <div
        className={`flex h-fit w-full flex-col gap-6 rounded-lg md:flex-row 
      `}
      >
        <VerticalBarChart />
        <HorizontalBarChart />
      </div>
    </div>
  );
};

export default Chartjs;
