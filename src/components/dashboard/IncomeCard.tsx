import salarySVG from "../../assets/money-bill-1-solid-full-red.svg";
import freelanceSVG from "../../assets/comments-dollar-solid-full (1).svg";
import investmentSVG from "../../assets/arrow-trend-up-solid-full.svg";
import React from "react";

interface IncomeCardProp {
  type: string;
  frequencyArray?: number[];
  lastTransaction?: Date;
  displayData: [string[], number[]];
}

const iconMap: Record<string, string> = {
  salary: salarySVG,
  freelance: freelanceSVG,
  investment: investmentSVG,
};

const nameMap: Record<string, string> = {
  salary: "Salary",
  freelance: "Freelance",
  investment: "Investment",
};

const messageMap: Record<string, string> = {
  salary: "Save your hard earned money!",
  freelance: "Your skills bring freedom—save wisely!",
  investment: "Grow your wealth, but protect it smartly!",
};

//Light color in front, dark color in the back
const colorMap: Record<string, string[]> = {
  salary: ["#BBDCE5", "#33A1E0"],
  freelance: ["#F5BABB", "#E4004B"],
  investment: ["#DDF4E7", "#67C090"],
};

const IncomeCard: React.FC<IncomeCardProp> = ({ type, displayData }) => {
  const [dates, freq] = displayData;
  const selectedIcon = iconMap[type.toLowerCase()];
  const selectedName = nameMap[type.toLowerCase()];
  const selectedMessage = messageMap[type.toLowerCase()];
  const selectedColorSet = colorMap[type.toLowerCase()];
  return (
    <div className="w-full rounded-2xl bg-white p-2 flex flex-row">
      <img className="h-[60px]" src={selectedIcon} alt="" />
      <div className="w-[70%] ml-1">
        <h2 className="mb-0 ">{selectedName}</h2>
        <p className="text-xs">{selectedMessage}</p>
        <div className="flex flex-row gap-0.5">
          {dates.map((date, index) => {
            return (
              <div key={index} className="relative group">
                {/* 小方块 */}
                <div
                  style={{
                    backgroundColor:
                      freq[index] !== 0 ? selectedColorSet[1] : "",
                  }}
                  className="w-[5px] rounded bg-gray-300 h-[10px] cursor-pointer"
                ></div>

                {/* Tooltip */}
                <div className="absolute text-nowrap bottom-[100%] left-[100%] -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-black text-white text-xs px-2 py-1 rounded">
                  {date}: {freq[index]} transactions
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div
        style={{
          color: selectedColorSet[1],
          backgroundColor: selectedColorSet[0],
        }}
        className="w-[60px] text-center bg-[#D9C4B0] text-sm flex-1 flex justify-center items-center rounded-2xl"
      >
        {freq.reduce((acc, ele) => (acc += ele), 0)}
        <br></br>Trans
      </div>
    </div>
  );
};

export default IncomeCard;
