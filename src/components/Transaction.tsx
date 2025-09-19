import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import EditableText from "./EditableText";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { useTransactions } from "../hooks/useTransactions";

import {
  useDeleteTransactionMutation,
  useUpdateTransactionMutation,
} from "../features/transactions/transactionsApi";
interface TransactionProps {
  id: string;
  user_id: string;
  type: string;
  amount: number;
  date: string;
  category: string;
  description: string;
}

const Transaction: React.FC<TransactionProps> = ({
  type,
  description,
  category,
  amount,
  date,
  id,
}) => {
  const [deleteTransation, { isSuccess }] = useDeleteTransactionMutation();
  const [updateTransaction, { isSuccess: updateSuccess }] =
    useUpdateTransactionMutation();
  const user = useSelector((state: RootState) => state.auth.user);
  const [descriptionShowing, setDescriptionShowing] =
    useState<string>(description);
  const [amountShowing, setAmountShowing] = useState<number>(amount);
  const { fetchTransactionsByDate } = useTransactions();
  useEffect(() => {
    if (isSuccess) {
      toast.success("Delete Complete!", { autoClose: 2000, theme: "colored" });
    }
    if (user) {
      fetchTransactionsByDate({
        user_id: user.id,
        query_date: date,
        type,
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (updateSuccess) {
      toast.success("Transaction updated!", {
        theme: "colored",
        autoClose: 3000,
      });
    }
  }, [updateSuccess]);

  useEffect(() => {
    setDescriptionShowing(description);
  }, [description]);

  useEffect(() => {
    setAmountShowing(amount);
  }, [amount]);
  return (
    <div className="bg-white/80 rounded-lg p-2 mb-2 flex justify-between items-center shadow-md">
      <div>
        <p className="font-medium">{category}</p>
        <EditableText
          text={descriptionShowing || "Edit description here"}
          onSave={(newDescription: string) => {
            setDescriptionShowing(newDescription);
          }}
        />
      </div>
      <div className="ml-auto mr-2 text-right">
        <p
          className={`font-semibold ${
            type === "expense" ? "text-red-600" : "text-green-600"
          } `}
        >
          {type === "expense" ? "-" : "+"}$
          <EditableText
            text={String(amountShowing)}
            onSave={(newAmount: string) => {
              setAmountShowing(Number(newAmount));
            }}
          />
        </p>
        <p className="text-sm text-gray-600">{date}</p>
      </div>
      <div className="flex flex-col gap-1">
        <button
          onClick={() => {
            deleteTransation({ id });
          }}
          className="border border-red-300 active:scale-90 transition-all duration-150 hover:bg-red-300 hover:text-white text-black/60 rounded px-2"
        >
          Delete
        </button>
        <button
          onClick={async () => {
            await updateTransaction({
              id: id,
              description: descriptionShowing,
              amount: amountShowing,
            });
            if (user) {
              fetchTransactionsByDate({
                user_id: user.id,
                query_date: date,
                type,
              });
            }
          }}
          className="border border-green-300 active:scale-90 transition-all duration-150 hover:bg-green-300 hover:text-white text-black/60 rounded px-2"
        >
          Modify
        </button>
      </div>
    </div>
  );
};

export default Transaction;
