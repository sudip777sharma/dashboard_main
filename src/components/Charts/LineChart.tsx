import React, { useRef, useState, useEffect } from "react";
import * as d3 from "d3";
import { useSpring, animated } from "react-spring";

const useResizeObserver = (ref: React.RefObject<HTMLDivElement | null>) => {
  const [dimensions, setDimensions] = useState<DOMRectReadOnly | null>(null);
  useEffect(() => {
    if (ref.current) {
      const observeTarget = ref.current;
      const resizeObserver = new ResizeObserver((entries) => {
        // set resized dimension here
        entries.forEach((entry) => {
          setDimensions(entry.contentRect);
        });
      });
      if (resizeObserver) {
        resizeObserver.observe(observeTarget as Element);
      }
      return () => {
        if (resizeObserver) {
          resizeObserver.unobserve(observeTarget as Element);
        }
      };
    }
  }, [ref]);
  return dimensions;
};

const dataX1 = [
  0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160,
];
const dataY1 = [
  80, 150, 180, 270, 210, 160, 160, 202, 265, 210, 270, 255, 290, 360, 375, 150,
  160,
  // 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];
const dataX2 = [
  0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160,
];
const dataY2 = [
  80, 125, 105, 130, 215, 195, 140, 160, 230, 300, 220, 170, 210, 200, 280, 150,
  423,
  // 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];
const dataX3 = [
  0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160,
];
const dataY3 = [
  80, 99, 82, 90, 115, 115, 74, 75, 130, 155, 125, 90, 140, 130, 180, 150, 423,
  // 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];

type DataPoint = [number, number];
const makeDataset = (dataX: number[], dataY: number[]) => {
  const dataset: DataPoint[] = dataX.map((xValue, index) => {
    return [xValue, dataY[index] ?? 0];
  });
  return dataset;
};

const generateRandomDataPoint = (x: number): DataPoint => {
  // const x = Math.random() * 100; // Random x value
  const y = Math.round(Math.random() * 300) + 100;
  return [x * 10, y];
};

const generateRandomDataset = (count: number): DataPoint[] => {
  const dataset: DataPoint[] = [];
  for (let i = 0; i < count; i++) {
    dataset.push(generateRandomDataPoint(i));
  }
  return dataset;
};
const LineChart: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef(null);
  const listeningRectRef = useRef(null);
  const ttWrapperRef = useRef<HTMLDivElement | null>(null);

  const dimensions = useResizeObserver(wrapperRef);
  const width = dimensions?.width;
  const height = dimensions?.height;

  const [margin, setMargin] = useState({
    left: 40,
    right: 20,
    top: 20,
    bottom: 30,
  });
  const [curveColors, setCurveColors] = useState<string[]>([
    "#7C65EB",
    "#FFBD1F",
    "#FFE802",
  ]);
  const [curveNames, setCurveNames] = useState<string[]>([
    "Europe",
    "Asia",
    "Africa",
  ]);
  const [datasets, setDatasets] = useState<DataPoint[][]>([
    makeDataset(dataX1, dataY1),
    makeDataset(dataX2, dataY2),
    makeDataset(dataX3, dataY3),
  ]);
  const [tick, setTick] = useState({
    x: { count: 15, step: 10 },
    y: { count: 5, step: 100 },
  });

  const allDataPoints = datasets.flat();
  const xValues = allDataPoints.map((dataPoint) => dataPoint[0]);
  const yValues = allDataPoints.map((dataPoint) => dataPoint[1]);
  const [xScaleDomain, setXScaleDomain] = useState<[number, number]>(
    d3.extent(xValues) as [number, number]
  );
  const [yScaleDomain, setYScaleDomain] = useState<[number, number]>(
    d3.extent(yValues) as [number, number]
  );

  const xScale = d3.scaleLinear();

  if (width) {
    xScale.domain(xScaleDomain).range([margin.left, width - margin.right]);
  }

  const yScale = d3.scaleLinear();

  if (height) {
    yScale.domain(yScaleDomain).range([height - margin.bottom, margin.top]);
  }

  const [tooltipData, setTooltipData] = useState({
    x: -1000,
    y: -1000,
    opacity: 1,
    isVisible: "",
  });
  const [dataPoint, setDataPoint] = useState<DataPoint>([0, 0]);

  const [datasetIndex, setDatasetIndex] = useState<number>(0);
  const changeDatasetIndex = (index: number) => {
    const updatedVisibility: boolean[] = [...isDatasetVisible];
    updatedVisibility[index] = true;
    setIsDatasetVisible(updatedVisibility);
    setDatasetIndex(index);
  };

  const [isDatasetVisible, setIsDatasetVisible] = useState<boolean[]>(
    Array(curveColors.length).fill(true)
  );
  const handleVisibilityChange = (index: number) => {
    const updatedVisibility: boolean[] = [...isDatasetVisible];
    if (datasetIndex !== index) {
      updatedVisibility[index] = !updatedVisibility[index];
    }
    setIsDatasetVisible(updatedVisibility);
  };

  const [currentZoomState, setCurrentZoomState] = useState<d3.ZoomTransform>();
  const listeningRectSvg = d3.select(listeningRectRef.current);
  const zoomBehaviour = d3
    .zoom()
    .scaleExtent([1, 32])
    .on("zoom", () => {
      const zoomState = d3.zoomTransform(listeningRectSvg.node());
      const xPos = zoomState.rescaleX(xScale)(dataPoint[0]);
      const yPos = yScale(dataPoint[1]);
      setTooltipData((prev) => {
        return { ...prev, x: xPos, y: yPos };
      });
      setCurrentZoomState(zoomState);
    });

  if (height && width) {
    zoomBehaviour.translateExtent([
      [0, 0],
      [width, height],
    ]);
  }
  listeningRectSvg.call(zoomBehaviour);
  const handleOnMouseMove = (
    event: React.MouseEvent<SVGRectElement, MouseEvent>
  ) => {
    // console.log("event", event);
    let newXScale;
    if (currentZoomState) {
      newXScale = currentZoomState.rescaleX(xScale);
    } else {
      newXScale = xScale;
    }
    const [xCoord] = d3.pointer(event, svgRef.current);
    const xValue = newXScale.invert(xCoord);
    const index = d3
      .bisector<DataPoint, number>((d) => d[0])
      .center(datasets[datasetIndex] ?? [], xValue);
    const dataPoint = datasets[datasetIndex]?.[index] ?? [0, 0];
    const xPos = newXScale(dataPoint[0]);
    const yPos = yScale(dataPoint[1]);
    setDataPoint(dataPoint);
    setTooltipData((prev) => {
      return { ...prev, x: xPos, y: yPos, isVisible: "block" };
    });
  };
  const handleOnMouseLeave = () => {
    setTooltipData((prev) => {
      return { ...prev, isVisible: "hidden" };
    });
  };
  return (
    <>
      <div>
        Statistics
        <p>Commercial networks and enterprises</p>
      </div>
      <div className="cursor-pointer">
        <div className="flex flex-col md:flex-row justify-end">
          <div className="flex gap-2 p-1">
            <button
              onClick={() => {
                const dp = generateRandomDataPoint(
                  datasets[datasetIndex]?.length ?? 0
                );
                setDatasets((prev) => {
                  const nds: DataPoint[][] = [...prev];
                  nds[datasetIndex]?.push(dp);
                  return nds;
                });
                setXScaleDomain((prev) => {
                  const na: [number, number] = [...prev];
                  na[1] = Math.max(na[1], dp[0]);
                  return na;
                });
              }}
              className="p-2 rounded-lg bg-white/10 text-xs font-semibold text-white no-underline transition hover:bg-white/20"
            >
              Add Data
            </button>
            <button
              onClick={() => {
                setCurveNames((prev) => [...prev, "test"]);
                setCurveColors((prev) => [...prev, "red"]);
                setIsDatasetVisible((prev) => [...prev, true]);
                setDatasets((prev) => [...prev, generateRandomDataset(17)]);
              }}
              className="p-2 rounded-lg bg-white/10 text-xs font-semibold text-white no-underline transition hover:bg-white/20"
            >
              Add Dataset
            </button>
          </div>
          <div className="flex flex-col items-end justify-center px-1 md:px-10">
            <div className="flex flex-row gap-4 text-sm">
              {curveNames.map((option, index) => {
                return (
                  <label
                    key={index}
                    className="flex cursor-pointer items-center gap-1"
                  >
                    <input
                      type="radio"
                      value={option}
                      checked={index === datasetIndex}
                      onChange={() => changeDatasetIndex(index)}
                      className="hidden"
                    />
                    <div
                      style={{
                        backgroundColor:
                          index === datasetIndex ? curveColors[index] : "",
                      }}
                      className={`h-4 w-4 rounded-full border-2 ${
                        index === datasetIndex ? `` : "border-gray-300"
                      }`}
                    ></div>
                    <span className="">{option}</span>
                  </label>
                );
              })}
            </div>
            <div className="flex flex-col-reverse items-end justify-center">
              <div className="flex gap-4">
                {curveColors.map((color, index) => (
                  <label
                    key={index}
                    className="flex cursor-pointer items-center gap-1 text-sm"
                  >
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={isDatasetVisible[index]}
                      onChange={() => handleVisibilityChange(index)}
                    />
                    <div
                      style={{ backgroundColor: color }}
                      className={`h-4 w-4 rounded-full ${
                        !isDatasetVisible[index] && "line-through"
                      }`}
                    ></div>
                    <div
                      className={`${
                        !isDatasetVisible[index] && "line-through"
                      }`}
                    >
                      {curveNames[index]}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div
          id="chart-container"
          ref={wrapperRef}
          className="h-[35vh] w-full md:h-[63vh]"
        >
          {width && height && (
            <svg className="h-full w-full" ref={svgRef}>
              <defs>
                <clipPath id="clip">
                  <rect
                    x={margin.left}
                    y={0}
                    width={width - margin.left - margin.right}
                    height={height}
                  />
                </clipPath>
              </defs>
              <g
                className="x-axis"
                clipPath="url(#clip)"
                transform={`translate(0, ${height - margin.bottom})`}
                ref={(node) => {
                  if (node) {
                    let newXScale;
                    if (currentZoomState) {
                      newXScale = currentZoomState.rescaleX(xScale);
                    } else {
                      newXScale = xScale;
                    }
                    const axis = d3.axisBottom(newXScale);
                    d3.select(node).call(axis);
                  }
                }}
              />

              <g
                className="y-axis"
                transform={`translate(${margin.left}, 0)`}
                ref={(node) => {
                  if (node) {
                    const axis = d3.axisLeft(yScale).ticks(tick.y.count);
                    d3.select(node).call(axis);
                  }
                }}
              />

              {yScale.ticks(tick.y.count).map((tickValue, tickIndex) => {
                return (
                  <line
                    key={tickIndex}
                    className="horizontalGrid"
                    x1={margin.left}
                    x2={width - margin.right}
                    y1={yScale(tickValue)}
                    y2={yScale(tickValue)}
                    fill="none"
                    shapeRendering="crispEdges"
                    stroke="#454960"
                    strokeWidth="1px"
                  />
                );
              })}

              {currentZoomState
                ? currentZoomState
                    .rescaleX(xScale)
                    .ticks(tick.x.count)
                    .map((tickValue, tickIndex) => (
                      <line
                        key={tickIndex}
                        className="verticalGrid"
                        x1={currentZoomState.rescaleX(xScale)(tickValue)}
                        x2={currentZoomState.rescaleX(xScale)(tickValue)}
                        y1={margin.top}
                        y2={height - margin.bottom}
                        fill="none"
                        shapeRendering="crispEdges"
                        stroke="#454960"
                        strokeWidth="1px"
                      />
                    ))
                : xScale
                    .ticks(tick.x.count)
                    .map((tickValue, tickIndex) => (
                      <line
                        key={tickIndex}
                        clipPath="url(#clip)"
                        x1={xScale(tickValue)}
                        x2={xScale(tickValue)}
                        y1={margin.top}
                        y2={height - margin.bottom}
                        fill="none"
                        shapeRendering="crispEdges"
                        stroke="#454960"
                        strokeWidth="1px"
                      />
                    ))}

              {datasets.map((dataset, index) => {
                let newXScale: d3.ScaleLinear<number, number>;
                if (currentZoomState) {
                  newXScale = currentZoomState.rescaleX(xScale);
                } else {
                  newXScale = xScale;
                }
                const curveGenerator = d3
                  .line()
                  .y((d) => yScale(d[1]))
                  .curve(d3.curveMonotoneX);
                if (newXScale) {
                  curveGenerator.x((d) => newXScale(d[0]));
                }
                const curvePath = curveGenerator(dataset);
                return (
                  <Curve
                    key={index}
                    curvePath={curvePath ?? ""}
                    stroke={curveColors[index] ?? "black"}
                    strokeWidth={width < 768 ? 1 : 3}
                    opacity={isDatasetVisible[index] ? 1 : 0}
                  />
                );
              })}

              <TooltipLine
                x1={tooltipData.x}
                x2={tooltipData.x}
                y1={margin.top}
                y2={height - margin.bottom}
                stroke={curveColors[datasetIndex] ?? "black"}
                strokeWidth={1}
                opacity={tooltipData.opacity}
                isVisible={tooltipData.isVisible}
              />
              <Tooltip
                x={tooltipData?.x}
                y={tooltipData?.y}
                width={width}
                height={height}
                opacity={tooltipData.opacity}
                isVisible={tooltipData.isVisible}
              >
                <div className="flex items-center gap-1 md:gap-2">
                  <span
                    style={{ backgroundColor: curveColors[datasetIndex] }}
                    className={`h-1 w-1 md:h-3 md:w-3 bg-[${curveColors[datasetIndex]}] border-[1px] border-white`}
                  ></span>
                  <p className="">{curveNames[datasetIndex]}</p>
                </div>
                <p>x-value: {dataPoint[0]}</p>
                <p>y-value: {dataPoint[1]}</p>
              </Tooltip>

              <TooltipPoint
                cx={tooltipData.x}
                cy={tooltipData.y}
                fill={curveColors[datasetIndex] ?? "black"}
                r={3}
                opacity={tooltipData.opacity}
                stroke="white"
                isVisible={tooltipData.isVisible}
              />

              <rect
                ref={listeningRectRef}
                onMouseMove={(event) => handleOnMouseMove(event)}
                onMouseLeave={() => handleOnMouseLeave()}
                width={width}
                height={height}
                fill="transparent"
              />
            </svg>
          )}
        </div>
      </div>
    </>
  );
};

export default LineChart;

type TooltipLineProps = {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
  stroke: string;
  strokeWidth?: number;
  opacity?: number;
  isVisible?: string;
};

const TooltipLine = ({
  x1,
  x2,
  y1,
  y2,
  stroke,
  strokeWidth,
  opacity,
  isVisible,
}: TooltipLineProps) => {
  const springProps = useSpring({
    to: {
      x1,
      x2,
      y1,
      y2,
      stroke,
      strokeWidth,
      opacity,
    },
  });
  if (!springProps.x1) {
    return null;
  }

  return (
    <>
      <animated.line {...springProps} className={`${isVisible}`} />
    </>
  );
};

type TooltipPointProps = {
  cx: number;
  cy: number;
  fill: string;
  r: number;
  opacity: number;
  stroke: string;
  isVisible?: string;
};
const TooltipPoint = ({
  cx,
  cy,
  fill,
  r,
  opacity,
  stroke,
  isVisible,
}: TooltipPointProps) => {
  const springProps = useSpring({
    to: {
      cx,
      cy,
      fill,
      r,
      opacity,
      stroke,
    },
  });

  if (!springProps.cx) {
    return null;
  }

  return (
    <>
      <animated.circle {...springProps} className={`${isVisible}`} />
    </>
  );
};

type CurveProps = {
  key: number;
  curvePath: string;
  stroke: string;
  strokeWidth?: number;
  opacity?: number;
};

const Curve: React.FC<CurveProps> = ({
  curvePath,
  stroke,
  strokeWidth,
  opacity,
}) => {
  const springProps = useSpring({
    to: {
      opacity: opacity ?? 1,
    },
    from: {
      opacity: 0,
    },
    config: {
      duration: 300,
    },
  });

  const pathSpringProps = useSpring({
    to: {
      d: curvePath,
    },
    config: {
      friction: 10,
    },
  });

  return (
    <animated.path
      clipPath="url(#clip)"
      d={pathSpringProps.d ?? ""}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      opacity={springProps.opacity}
    />
  );
};

type TooltipProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  opacity: number;
  isVisible?: string;
  children: React.ReactNode;
};

const Tooltip = ({
  x,
  y,
  width,
  height,
  opacity,
  children,
  isVisible,
}: TooltipProps) => {
  const springProps = useSpring({
    to: {
      x,
      y,
      width,
      height,
      opacity,
    },
  });

  const styleSpringProps = useSpring({
    transform: `translateX(${x > width / 2 ? "-100%" : "0%"}) translateY(${
      y > height / 2 ? "-100%" : "0%"
    })`,
    config: { duration: 200 },
  });

  if (!springProps.x) {
    return null;
  }

  return (
    <animated.foreignObject
      {...springProps}
      overflow="visible"
      className={`${isVisible}`}
    >
      <animated.div
        style={styleSpringProps}
        className={`h-fit w-fit flex-col rounded-md bg-black p-1 text-[6px] leading-normal text-white opacity-70 md:p-2 md:text-sm`}
      >
        {children}
      </animated.div>
    </animated.foreignObject>
  );
};
