import BowlFoodSVG from "../../assets/bowl-food-solid-full.svg";
import CarSVG from "../../assets/car-solid-full.svg";
import HomeSVG from "../../assets/house-user-solid-full (1).svg";
import CareSVG from "../../assets/tooth-solid-full (1).svg";
import ShoppingSVG from "../../assets/cart-shopping-solid-full (1).svg";
import HealthSVG from "../../assets/kit-medical-solid-full.svg";
import React from "react";

interface ExpenseCardProp {
  type: string;
  frequencyArray?: number[];
  lastTransaction?: Date;
  displayData: [string[], number[]];
}

const iconMap: Record<string, string> = {
  food: BowlFoodSVG,
  transport: CarSVG,
  home: HomeSVG,
  care: CareSVG,
  shopping: ShoppingSVG,
  health: HealthSVG,
};

const nameMap: Record<string, string> = {
  food: "Food",
  transport: "Transport",
  home: "Home Bills",
  care: "Self Care",
  shopping: "Shopping",
  health: "Health",
};

//Light color in front, dark color in the back
const colorMap: Record<string, string[]> = {
  food: ["#ECEEDF", "#D9C4B0"],
  transport: ["#BBDCE5", "#33A1E0"],
  home: ["#F5BABB", "#E4004B"],
  care: ["#C5B0CD", "#9929EA"],
  shopping: ["#FFD6BA", "#FE7743"],
  health: ["#DDF4E7", "#67C090"],
};

const messageMap: Record<string, string> = {
  food: "Eat healthy and save money!",
  transport: "Travel safe, save money!",
  home: "Cut bills, save smart!",
  care: "Invest in you, wisely.",
  shopping: "Spend less, enjoy more.",
  health: "Healthy habits, smarter savings.",
};

const ExpenseCard: React.FC<ExpenseCardProp> = ({ type, displayData }) => {
  const [dates, freq] = displayData;
  const selectedIcon = iconMap[type.toLowerCase()];
  const selectedColorSet = colorMap[type.toLowerCase()];
  const selectedType = nameMap[type.toLowerCase()];
  const selectedMessage = messageMap[type.toLowerCase()];

  return (
    <div className="w-full rounded-2xl bg-white p-2 flex flex-row">
      <img className="h-[60px]" src={selectedIcon} alt="" />
      <div className="w-[70%] ml-1">
        <h2 className="mb-0 ">{selectedType}</h2>
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

export default ExpenseCard;
