import React, { useState, useEffect } from "react";
import { BsFullscreenExit } from "react-icons/bs";
import { IoIosAddCircleOutline } from "react-icons/io";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
} from "recharts";

const data = [
  { name: "2024-01-01", value: 84850.35 },
  { name: "2024-01-02", value: 90000.71 },
  { name: "2024-01-03", value: 63000 },
  { name: "2024-01-04", value: 67000 },
  { name: "2024-01-05", value: 67000 },
  { name: "2024-01-06", value: 65000 },
  { name: "2024-01-07", value: 72910 },
  { name: "2024-01-08", value: 67000 },
  { name: "2024-01-09", value: 63000 },
  { name: "2024-01-10", value: 68000 },
  { name: "2024-01-11", value: 65900 },
  { name: "2024-01-12", value: 62000 },
  { name: "2024-01-13", value: 65450 },
  { name: "2024-01-14", value: 69000 },
  { name: "2024-01-15", value: 90000 },
  { name: "2024-01-16", value: 80760 },
  { name: "2024-01-17", value: 82000 },
  { name: "2024-01-18", value: 69057 },
  { name: "2024-01-19", value: 64000 },
  { name: "2024-01-20", value: 67000 },
  { name: "2024-01-21", value: 90000 },
  { name: "2024-01-22", value: 6800 },
  { name: "2024-01-23", value: 65200 },
  { name: "2024-01-24", value: 10000 },
  { name: "2024-01-25", value: 66000 },
  { name: "2024-01-26", value: 60000 },
  { name: "2024-01-27", value: 10000 },
  { name: "2024-01-28", value: 80000 },
  { name: "2024-01-29", value: 99000 },
  { name: "2024-01-30", value: 63179 },
];

const CustomXAxisTick = ({ x, y, payload }) => (
  <text x={x} y={y + 10} dy={0} textAnchor="middle" fill="#666" fontSize={10}>
    {payload.value}
  </text>
);

export default function Chart() {
  const [chartWidth, setChartWidth] = useState(
    window.innerWidth < 768 ? 350 : 1000
  );
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isCompare, setIsCompare] = useState(false);
  const [selectedItem, setSelectedItem] = useState("1w");
  const items = ["1d", "3d", "1w", "1m", "6m", "1y", "max"];

  useEffect(() => {
    const handleResize = () => {
      setChartWidth(window.innerWidth < 768 ? 350 : 1000);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleFullscreenClick = () => {
    setIsFullscreen((prevState) => !prevState);
    if (!isFullscreen) {
      setIsCompare(false);
    }
  };

  const handleCompareClick = () => {
    setIsCompare((prevState) => !prevState);
    if (!isCompare) {
      setIsFullscreen(false);
    }
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <>
      <div className="mt-6 space-y-6 chart-header md:space-y-0 md:flex md:justify-between md:px-20 md:items-center">
        <div className="flex space-x-5 md:space-x-8">
          <div
            className={`flex items-center space-x-3 cursor-pointer pb-2 ${
              isFullscreen ? "border-b-2 border-[#675ef0]" : ""
            }`}
            onClick={handleFullscreenClick}
          >
            <BsFullscreenExit size={20} color="#74767b" />
            <h1 className="md:text-lg">Fullscreen</h1>
          </div>

          <div
            className={`flex items-center space-x-3 cursor-pointer pb-2 ${
              isCompare ? "border-b-2 border-[#675ef0]" : ""
            }`}
            onClick={handleCompareClick}
          >
            <IoIosAddCircleOutline size={23} color="#74767b" />
            <h1 className="md:text-lg">Compare</h1>
          </div>
        </div>
        <ul className="flex items-center space-x-5">
          {items.map((item, i) => (
            <React.Fragment key={i}>
              <li
                className={`text-base font-medium text-gray-700 cursor-pointer ${
                  item === selectedItem
                    ? "bg-[#4b40ee] rounded-md px-3 py-1 text-white"
                    : ""
                }`}
                onClick={() => handleItemClick(item)}
              >
                {item}
              </li>
            </React.Fragment>
          ))}
        </ul>
      </div>

      <div className="chart-container relative mt-7">
        <LineChart
          height={350}
          width={chartWidth}
          data={data}
          className="mx-auto"
        >
          <defs>
            <linearGradient id="gradientColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4b40ee" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#4b40ee" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={<CustomXAxisTick />} />
          <YAxis hide />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#4b40ee"
            fill="url(#gradientColor)"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
          <Line
            type="linear"
            dataKey="value"
            stroke="#4b40ee"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
            strokeLinejoin="bevel"
            strokeLinecap="square"
          />
        </LineChart>
      </div>
    </>
  );
}
