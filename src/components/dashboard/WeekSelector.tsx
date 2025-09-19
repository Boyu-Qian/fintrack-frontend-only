import React from "react";
import CalendarSVG from "../../assets/calendar-regular-full.svg";

interface WeekSelectorProp {
  displayModeChangeFunction: React.Dispatch<React.SetStateAction<string>>;
  displayContent: string[];
  displayMode: string;
  monthChangeHandler: (targetDate: string) => void;
}

const WeekSelector: React.FC<WeekSelectorProp> = ({
  displayMode,
  displayModeChangeFunction,
  displayContent,
  monthChangeHandler,
}) => {
  return (
    <div className="w-full bg-white/50 rounded-2xl gap-2 grid grid-cols-7 p-2">
      <div className="col-span-7 h-[40px] flex flex-row gap-2 rounded-2xl">
        <img className="h-[40px]" src={CalendarSVG} alt="" />
        <div className="ml-auto flex justify-center items-center">
          <select
            value={displayMode}
            onChange={(e) => displayModeChangeFunction(e.target.value)}
            className="focus:outline-none"
          >
            <option value="weekly">Weekly Transactions</option>
            <option value="monthly">Monthly Transactions</option>
          </select>
        </div>
      </div>
      <div
        className={`w-full h-[60px] rounded-2xl flex justify-center items-center text-center ${
          displayMode === "monthly" ? "hover:bg-gray-300" : ""
        }`}
      >
        <div className="flex flex-col">
          <h3 className={`${displayMode === "weekly" ? "block" : "hidden"}`}>
            Sun
          </h3>
          <p className={`${displayMode === "weekly" ? "block" : "hidden"}`}>
            {displayContent[0].split("-")[2]}
          </p>
          <p
            onClick={() => {
              monthChangeHandler(displayContent[0]);
            }}
            className={`${
              displayMode === "monthly" ? "block" : "hidden"
            } cursor-pointer`}
          >
            {displayContent[0]}
          </p>
        </div>
      </div>
      <div
        className={`w-full h-[60px] rounded-2xl flex justify-center items-center text-center ${
          displayMode === "monthly" ? "hover:bg-gray-300" : ""
        }`}
      >
        <div className="flex flex-col">
          <h3 className={`${displayMode === "weekly" ? "block" : "hidden"}`}>
            Mon
          </h3>
          <p className={`${displayMode === "weekly" ? "block" : "hidden"}`}>
            {displayContent[1].split("-")[2]}
          </p>
          <p
            onClick={() => {
              monthChangeHandler(displayContent[1]);
            }}
            className={`${
              displayMode === "monthly" ? "block" : "hidden"
            } cursor-pointer`}
          >
            {displayContent[1]}
          </p>
        </div>
      </div>
      <div
        className={`w-full h-[60px] rounded-2xl flex justify-center items-center text-center ${
          displayMode === "monthly" ? "hover:bg-gray-300" : ""
        }`}
      >
        <div className="flex flex-col">
          <h3 className={`${displayMode === "weekly" ? "block" : "hidden"}`}>
            Tue
          </h3>
          <p className={`${displayMode === "weekly" ? "block" : "hidden"}`}>
            {displayContent[2].split("-")[2]}
          </p>
          <p
            onClick={() => {
              monthChangeHandler(displayContent[2]);
            }}
            className={`${
              displayMode === "monthly" ? "block" : "hidden"
            } cursor-pointer`}
          >
            {displayContent[2]}
          </p>
        </div>
      </div>
      <div
        className={`w-full h-[60px] rounded-2xl ${
          displayMode === "monthly" ? "bg-gray-400" : ""
        } flex justify-center items-center text-center`}
      >
        <div className="flex flex-col">
          <h3 className={`${displayMode === "weekly" ? "block" : "hidden"}`}>
            Wed
          </h3>
          <p className={`${displayMode === "weekly" ? "block" : "hidden"}`}>
            {displayContent[3].split("-")[2]}
          </p>
          <p
            className={`${
              displayMode === "monthly" ? "block" : "hidden"
            } cursor-pointer`}
          >
            {displayContent[3]}
          </p>
        </div>
      </div>
      <div
        className={`w-full h-[60px] rounded-2xl  flex justify-center items-center text-center ${
          displayMode === "monthly" ? "hover:bg-gray-300" : ""
        }`}
      >
        <div className="flex flex-col">
          <h3 className={`${displayMode === "weekly" ? "block" : "hidden"}`}>
            Thu
          </h3>
          <p className={`${displayMode === "weekly" ? "block" : "hidden"}`}>
            {displayContent[4].split("-")[2]}
          </p>
          <p
            onClick={() => {
              monthChangeHandler(displayContent[4]);
            }}
            className={`${
              displayMode === "monthly" ? "block" : "hidden"
            } cursor-pointer`}
          >
            {displayContent[4]}
          </p>
        </div>
      </div>
      <div
        className={`w-full h-[60px] rounded-2xl flex justify-center items-center text-center ${
          displayMode === "monthly" ? "hover:bg-gray-300" : ""
        }`}
      >
        <div className="flex flex-col">
          <h3 className={`${displayMode === "weekly" ? "block" : "hidden"}`}>
            Fri
          </h3>
          <p className={`${displayMode === "weekly" ? "block" : "hidden"}`}>
            {displayContent[5].split("-")[2]}
          </p>
          <p
            onClick={() => {
              monthChangeHandler(displayContent[5]);
            }}
            className={`${
              displayMode === "monthly" ? "block" : "hidden"
            } cursor-pointer`}
          >
            {displayContent[5]}
          </p>
        </div>
      </div>
      <div
        className={`w-full h-[60px] rounded-2xl flex justify-center items-center text-center ${
          displayMode === "monthly" ? "hover:bg-gray-300" : ""
        }`}
      >
        <div className="flex flex-col">
          <h3 className={`${displayMode === "weekly" ? "block" : "hidden"}`}>
            Sat
          </h3>
          <p className={`${displayMode === "weekly" ? "block" : "hidden"}`}>
            {displayContent[6].split("-")[2]}
          </p>
          <p
            onClick={() => {
              monthChangeHandler(displayContent[6]);
            }}
            className={`${
              displayMode === "monthly" ? "block" : "hidden"
            } cursor-pointer`}
          >
            {displayContent[6]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeekSelector;
