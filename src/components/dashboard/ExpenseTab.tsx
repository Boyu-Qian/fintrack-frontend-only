import ExpenseCard from "./ExpenseCard";
import ExpenseSVG from "../../assets/money-check-dollar-solid-full (1).svg";
import ArrowUp from "../../assets/arrow-up-from-bracket-solid-full.svg";
import { useState } from "react";

interface ExpenseTabProp {
  displayData: [string[], number[]][];
}

const ExpenseTab: React.FC<ExpenseTabProp> = ({ displayData }) => {
  const [showExpenseTab, setShowExpenseTab] = useState<boolean>(false);
  return (
    <div className="bg-transparent rounded-2xl p-2 flex duration-1000 transition-all flex-col">
      <div className="flex flex-row gap-2 mb-2 justify-items-start items-center">
        <img className="w-[40px]" src={ExpenseSVG} alt="" />
        <h3>Expense</h3>
        <img
          onClick={() => {
            setShowExpenseTab((prev) => !prev);
          }}
          className={`ml-auto w-[20px] duration-500 transition-all ${
            showExpenseTab ? "rotate-180" : ""
          }`}
          src={ArrowUp}
          alt=""
        />
      </div>
      <div
        className={`flex duration-500 transition-all flex-col gap-2 ${
          showExpenseTab ? "max-h-0 overflow-hidden" : "max-h-[1000px]"
        }`}
      >
        <ExpenseCard displayData={displayData[0]} type="food" />
        <ExpenseCard displayData={displayData[1]} type="transport" />
        <ExpenseCard displayData={displayData[2]} type="home" />
        <ExpenseCard displayData={displayData[3]} type="care" />
        <ExpenseCard displayData={displayData[4]} type="shopping" />
        <ExpenseCard displayData={displayData[5]} type="health" />
      </div>
    </div>
  );
};

export default ExpenseTab;
