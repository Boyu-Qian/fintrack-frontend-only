import Food from "../assets/burger-solid-full.svg";
import Bus from "../assets/bus-solid-full.svg";
import HomeBill from "../assets/house-user-solid-full.svg";
import Care from "../assets/tooth-solid-full.svg";
import Shopping from "../assets/cart-shopping-solid-full.svg";
import Health from "../assets/notes-medical-solid-full.svg";
import ArrowUp from "../assets/arrow-up-from-bracket-solid-full.svg";
import Check from "../assets/money-check-dollar-solid-full.svg";
import Free from "../assets/comments-dollar-solid-full.svg";
import Invest from "../assets/money-bill-trend-up-solid-full.svg";
import { TRANSACTION_TYPES } from "../constants/transactionTypes";
import React from "react";
import { useState } from "react";

interface ExpenseInputPanelProps {
  show: boolean;
  showTransaction: boolean;
  showFunction: React.Dispatch<React.SetStateAction<boolean>>;
  showTransactionFunction: React.Dispatch<React.SetStateAction<boolean>>;
  changeTypeFunction: React.Dispatch<React.SetStateAction<string>>;
}

const ExpenseInputPanel: React.FunctionComponent<ExpenseInputPanelProps> = ({
  showFunction,
  showTransactionFunction,
  changeTypeFunction,
}) => {
  const [expenseHidden, setExpenseHidden] = useState(false);
  const [incomeHidden, setIncomeHidden] = useState(false);
  const expenseHiddenHandler = () => {
    setExpenseHidden(!expenseHidden);
  };
  const incomeHiddenHandler = () => {
    setIncomeHidden(!incomeHidden);
  };
  const showInputPanleHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    const id = event.currentTarget.id;

    switch (id) {
      case "Food":
        changeTypeFunction(TRANSACTION_TYPES.EXPENSE_FOOD);
        break;
      case "Transport":
        changeTypeFunction(TRANSACTION_TYPES.EXPENSE_TRANSPORT);
        break;
      case "HomeBills":
        changeTypeFunction(TRANSACTION_TYPES.EXPENSE_HOMEBILLS);
        break;
      case "SelfCare":
        changeTypeFunction(TRANSACTION_TYPES.EXPENSE_SELFCARE);
        break;
      case "Shopping":
        changeTypeFunction(TRANSACTION_TYPES.EXPENSE_SHOPPING);
        break;
      case "Health":
        changeTypeFunction(TRANSACTION_TYPES.EXPENSE_HEALTH);
        break;
      case "Salary":
        changeTypeFunction(TRANSACTION_TYPES.INCOME_SALARY);
        break;
      case "Freelance":
        changeTypeFunction(TRANSACTION_TYPES.INCOME_FREELANCE);
        break;
      case "Investment":
        changeTypeFunction(TRANSACTION_TYPES.INCOME_INVESTMENT);
        break;
    }

    showTransactionFunction(false);
    showFunction(true);
  };
  return (
    <div className="bg-white/60 min-w-[350px] max-w-[700px] rounded-2xl">
      <h3 className="w-full mx-auto text-center mt-2 relative">
        Expense
        <img
          className={`absolute top-1/2 -translate-y-[50%] w-[16px] inline-block ${
            expenseHidden ? "rotate-180" : ""
          } cursor-pointer transition-transform duration-300 right-3`}
          src={ArrowUp}
          onClick={expenseHiddenHandler}
          alt=""
        />
      </h3>
      <div
        className={`${
          expenseHidden ? "max-h-0 py-0" : "max-h-[1000px]"
        } overflow-hidden w-full grid grid-cols-3 gap-2 p-2 transition-all duration-500 ease-linear`}
      >
        <div
          id="Food"
          onClick={showInputPanleHandler}
          className="bg-[#ECEEDF] cursor-pointer hover:bg-[#D9C4B0] hover:text-white transition-colors duration-300 rounded-2xl flex flex-col justify-center items-center"
        >
          <p className="mt-2 mb-2">Food</p>
          <div className="bg-[#D9C4B0] text-white px-3 py-1 rounded-full mb-4">
            <img className="w-[40px]" src={Food} alt="" />
          </div>
        </div>
        <div
          id="Transport"
          onClick={showInputPanleHandler}
          className="bg-[#BBDCE5] cursor-pointer hover:bg-[#33A1E0] hover:text-white transition-colors duration-300 rounded-2xl flex flex-col justify-center items-center"
        >
          <p className="mt-2 mb-2">Transport</p>
          <div className="bg-[#33A1E0] text-white px-3 py-1 rounded-full mb-4">
            <img className="w-[40px]" src={Bus} alt="" />
          </div>
        </div>
        <div
          id="HomeBills"
          onClick={showInputPanleHandler}
          className="bg-[#F5BABB] cursor-pointer hover:bg-[#E4004B] hover:text-white transition-colors duration-300 rounded-2xl flex flex-col justify-center items-center"
        >
          <p className="mt-2 mb-2">Home Bills</p>
          <div className="bg-[#E4004B] text-white px-3 py-1 rounded-full mb-4">
            <img className="w-[40px]" src={HomeBill} alt="" />
          </div>
        </div>
        <div
          id="SelfCare"
          onClick={showInputPanleHandler}
          className="bg-[#C5B0CD] cursor-pointer hover:bg-[#9929EA] hover:text-white transition-colors duration-300 rounded-2xl flex flex-col justify-center items-center"
        >
          <p className="mt-2 mb-2">Self Care</p>
          <div className="bg-[#9929EA] text-white px-3 py-1 rounded-full mb-4">
            <img className="w-[40px]" src={Care} alt="" />
          </div>
        </div>
        <div
          id="Shopping"
          onClick={showInputPanleHandler}
          className="bg-[#FFD6BA] cursor-pointer hover:bg-[#FE7743] hover:text-white transition-colors duration-300 rounded-2xl flex flex-col justify-center items-center"
        >
          <p className="mt-2 mb-2">Shopping</p>
          <div className="bg-[#FE7743] text-white px-3 py-1 rounded-full mb-4">
            <img className="w-[40px]" src={Shopping} alt="" />
          </div>
        </div>
        <div
          id="Health"
          onClick={showInputPanleHandler}
          className="bg-[#DDF4E7] cursor-pointer hover:bg-[#67C090] hover:text-white transition-colors duration-300 rounded-2xl flex flex-col justify-center items-center"
        >
          <p className="mt-2 mb-2">Health</p>
          <div className="bg-[#67C090] text-white px-3 py-1 rounded-full mb-4">
            <img className="w-[40px]" src={Health} alt="" />
          </div>
        </div>
      </div>
      <h3 className="w-full mx-auto text-center mt-2 relative">
        Income
        <img
          className={`absolute top-1/2 -translate-y-[50%] w-[16px] inline-block ${
            incomeHidden ? "rotate-180" : ""
          } cursor-pointer transition-transform duration-300 right-3`}
          src={ArrowUp}
          onClick={incomeHiddenHandler}
          alt=""
        />
      </h3>
      <div
        className={`${
          incomeHidden ? "max-h-0 py-0" : "max-h-[1000px]"
        } overflow-hidden w-full grid grid-cols-3 gap-2 p-2 transition-all duration-500 ease-linear`}
      >
        <div
          id="Salary"
          onClick={showInputPanleHandler}
          className="bg-[#BBDCE5] cursor-pointer hover:bg-[#33A1E0] hover:text-white transition-colors duration-300 rounded-2xl flex flex-col justify-center items-center"
        >
          <p className="mt-2 mb-2">Salary</p>
          <div className="bg-[#33A1E0] text-white px-3 py-1 rounded-full mb-4">
            <img className="w-[40px]" src={Check} alt="" />
          </div>
        </div>
        <div
          id="Freelance"
          onClick={showInputPanleHandler}
          className="bg-[#F5BABB] cursor-pointer hover:bg-[#E4004B] hover:text-white transition-colors duration-300 rounded-2xl flex flex-col justify-center items-center"
        >
          <p className="mt-2 mb-2">Freelance</p>
          <div className="bg-[#E4004B] text-white px-3 py-1 rounded-full mb-4">
            <img className="w-[40px]" src={Free} alt="" />
          </div>
        </div>
        <div
          id="Investment"
          onClick={showInputPanleHandler}
          className="bg-[#DDF4E7] cursor-pointer hover:bg-[#67C090] hover:text-white transition-colors duration-300 rounded-2xl flex flex-col justify-center items-center"
        >
          <p className="mt-2 mb-2">Investment</p>
          <div className="bg-[#67C090] text-white px-3 py-1 rounded-full mb-4">
            <img className="w-[40px]" src={Invest} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseInputPanel;
