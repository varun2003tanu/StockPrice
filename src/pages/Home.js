import React, { useState } from "react";
import Chart from "../components/Chart";

export default function Home() {
  const items = ["Summary", "Chart", "Statistics", "Analysis", "Settings"];
  const [selectedItem, setSelectedItem] = useState("Chart");

  return (
    <div className="px-4 py-5 md:px-10">
      <div className="space-y-3">
        <div className="flex items-baseline">
          <h1 className="text-4xl font-bold text-stone-800">63,179.71</h1>
          <span className="font-semibold text-[#bdbebf] ml-2">USD</span>
        </div>
        <div>
          <p className="font-semibold text-green-500">+2,161.42 (3.54%)</p>
        </div>
      </div>

      <div className="border-b-[1px] border-gray-300 md:w-full max-w-lg">
        <ul className="flex my-5 space-x-3 md:space-x-8">
          {items.map((item, i) => (
            <li
              key={i}
              className={`text-[#828487] font-semibold cursor-pointer text-sm pb-2 ${
                item === selectedItem ? "border-b-2 border-[#675ef0] " : ""
              }`}
              onClick={() => setSelectedItem(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
      <Chart />
    </div>
  );
}
