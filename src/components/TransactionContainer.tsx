import Cross from "../assets/xmark-solid-full.svg";
import React from "react";
import Transaction from "./Transaction";
import { HashLoader } from "react-spinners";
import { useTransactions } from "../hooks/useTransactions";
import { useEffect } from "react";

interface TransactionContainerProps {
  show: boolean;
  showFunction: React.Dispatch<React.SetStateAction<boolean>>;
}

const TransactionContainer: React.FC<TransactionContainerProps> = ({
  show,
  showFunction,
}) => {
  const { transactions, isLoading } = useTransactions();
  useEffect(() => {}, [transactions]);
  return (
    <div
      className={`p-2 w-full h-full bg-white/60 flex flex-col roundex-2xl transition-all duration-500 absolute top-0 left-0 ${
        show ? "translate-y-[0%]" : "translate-y-[100%]"
      } `}
    >
      <div className="flex w-full justify-between items-center mb-2">
        <div className="w-[20px] h-[20px]"></div>
        <div>Transactions</div>
        <div className="h-[20px] w-[20px]" onClick={() => showFunction(false)}>
          <img src={Cross} alt="" />
        </div>
      </div>
      {isLoading ? (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <HashLoader color="#BBDCE5" />
        </div>
      ) : (
        <div className="flex-1 overflow-y-scroll">
          {transactions.map((transaction) => (
            <Transaction key={transaction.id} {...transaction} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionContainer;
