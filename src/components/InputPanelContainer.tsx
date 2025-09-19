import Cross from "../assets/xmark-solid-full.svg";
import React, { useState, useEffect } from "react";
import Eraser from "../assets/eraser-solid-full.svg";
import { TRANSACTION_TYPES } from "../constants/transactionTypes";
import { useCreateTransactionMutation } from "../features/transactions/transactionsApi";
import DatePicker from "./DatePicker";
import type { RootState } from "../store";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

type CreateTransactionFn = ReturnType<typeof useCreateTransactionMutation>[0];

interface InputPanelContainerProps {
  show: boolean;
  transactionType: string;
  showFunction: React.Dispatch<React.SetStateAction<boolean>>;
  transactionApiFunction: CreateTransactionFn;
}

const InputPanelContainer: React.FC<InputPanelContainerProps> = ({
  show,
  showFunction,
  transactionType,
  transactionApiFunction,
}) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const numberArr = [7, 8, 9, "X", 4, 5, 6, 0, 1, 2, 3, ".", "Enter"];
  const [date, setDate] = useState<Date>(new Date());
  const user = useSelector((state: RootState) => state.auth.user);
  const user_id = user?.id;

  const handleKeyOnScreen = (input: number | string) => {
    if (typeof input === "string") {
      if (input === "") return;
      if (amount === "") {
        toast.warn("Invalid operation! Please put the amount!", {
          autoClose: 3000,
          theme: "colored",
        });
        return;
      }
      if (input === "." || input === "。") {
        setAmount((prev) => {
          if (prev.length >= 8 || prev.includes(".")) {
            return prev;
          }
          return prev + String(input);
        });
        return;
      }
      if (input === "X") {
        setAmount((prev) => {
          return prev.slice(0, -1);
        });
        return;
      }

      //Call back end
      handleCreateTransaction();
      //Call back end
    } else {
      setAmount((prev) => {
        if (prev.length >= 8) {
          return prev;
        }
        return prev + String(input);
      });
      return;
    }
  };

  const handleCreateTransaction = () => {
    //Call back end
    //This is stored in the redux
    //Empty by default
    //get it from amount state
    const description = "";
    const category = transactionType;
    const transactionObject = {
      user_id,
      amount: Number(amount),
      type:
        transactionType === TRANSACTION_TYPES.INCOME_FREELANCE ||
        transactionType === TRANSACTION_TYPES.INCOME_SALARY ||
        transactionType === TRANSACTION_TYPES.INCOME_INVESTMENT
          ? "income"
          : "expense",
      category,
      transactionType,
      description,
      date: date.toISOString().split("T")[0],
    };
    setAmount("");
    setDate(new Date());
    transactionApiFunction(transactionObject);
  };

  useEffect(() => {
    if (!show) return;

    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key >= "0" && e.key <= "9") {
        setAmount((prev) => {
          if (prev.length >= 8) return prev;
          const newAmount = prev + e.key;
          return newAmount;
        });
        return;
      }
      if (e.key === "." || e.key === "。") {
        setAmount((prev) => {
          if (prev.length >= 8 || prev.includes(".")) return prev;
          const newAmount = prev + ".";
          return newAmount;
        });
        return;
      }
      if (e.key === "Backspace") {
        setAmount((prev) => {
          return prev.slice(0, -1);
        });
        return;
      }
      if (e.key === "Enter") {
        if (amount === "") {
          toast.warn("Invalid operation! Please put the amount!", {
            autoClose: 3000,
            theme: "colored",
          });
          return;
        }
        handleCreateTransaction();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [show, amount]);
  return (
    <div
      className={`p-2 w-full h-full bg-white/60 flex flex-col roundex-2xl transition-all duration-500 absolute top-0 left-0 ${
        show ? "translate-y-[0%]" : "translate-y-[100%]"
      } `}
    >
      <div className="flex w-full justify-between items-center mb-2">
        <div className="w-[20px] h-[20px]"></div>
        <div>Enter {transactionType}</div>
        <div
          className="h-[20px] w-[20px]"
          onClick={() => {
            setDate(new Date());
            showFunction(false);
          }}
        >
          <img src={Cross} alt="" />
        </div>
      </div>
      <div className="grid grid-cols-2 h-[100%]">
        <div className="text-4xl flex-1 relative">
          <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex">
            ${amount}
          </div>
          <input
            value={description}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDescription(e.target.value);
            }}
            type="text"
            placeholder="Enter description"
            className="bg-white/90 hidden absolute mb-2 mr-2 right-0 bottom-0 text-sm focus:outline-none px-2 py-1 rounded-xl"
          />
          <DatePicker date={date} setDateFunction={setDate} />
        </div>
        <div className="px-2 grid grid-cols-5 gap-2 bg-white rounded-2xl py-2">
          {numberArr.map((num) => {
            return (
              <div
                className={`rounded text-lg lg:text-2xl select-none hover:scale-90 transform-all duration-300 bg-gray-100 shadow-lg
 flex justify-center items-center ${
   num === "Enter" ? "col-start-5 col-end-6 row-start-1 row-end-4" : ""
 } ${num === "" ? "bg-white shadow-none" : ""}`}
                key={num}
                onClick={() => handleKeyOnScreen(num)}
              >
                {num === "X" ? (
                  <img className="w-[40%] h-[40%]" src={Eraser}></img>
                ) : (
                  num
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InputPanelContainer;
