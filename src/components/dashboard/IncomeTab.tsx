import ArrowUp from "../../assets/arrow-up-from-bracket-solid-full.svg";
import IncomeSVG from "../../assets/money-bill-trend-up-solid-full (1).svg";
import IncomeCard from "./IncomeCard";
import { useState } from "react";

interface ExpenseTabProp {
  displayData: [string[], number[]][];
}

const IncomeTab: React.FC<ExpenseTabProp> = ({ displayData }) => {
  const [showIncomeTab, setShowIncomeTab] = useState<boolean>(false);
  return (
    <div className="bg-transparent rounded-2xl p-2 flex flex-col">
      <div className="flex flex-row gap-2 justify-items-start items-center mb-2">
        <img className="w-[40px]" src={IncomeSVG} alt="" />
        <h3>Income</h3>
        <img
          onClick={() => {
            setShowIncomeTab((prev) => !prev);
          }}
          className={`ml-auto w-[20px] duration-500 transition-all ${
            showIncomeTab ? "rotate-180" : ""
          }`}
          src={ArrowUp}
          alt=""
        />
      </div>
      <div
        className={`flex duration-500 transition-all flex-col gap-2 ${
          showIncomeTab ? "max-h-0 overflow-hidden py-0" : "max-h-[1000px]"
        }`}
      >
        <IncomeCard displayData={displayData[0]} type="salary" />
        <IncomeCard displayData={displayData[1]} type="freelance" />
        <IncomeCard displayData={displayData[2]} type="investment" />
      </div>
    </div>
  );
};

export default IncomeTab;
