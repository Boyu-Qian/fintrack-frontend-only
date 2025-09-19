import type { ReactNode } from "react";
import { TransactionContext } from "./TransactionContext";
import type { Transaction } from "../features/transactions/transactionsApi";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useLazyGetTransactionsByDateQuery } from "../features/transactions/transactionsApi";
interface TransactionsProviderProps {
  children: ReactNode;
}

export const TransactionProvider: React.FC<TransactionsProviderProps> = ({
  children,
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [
    useGetTransactionsByDateQuery,
    { data, isLoading, isSuccess, isError },
  ] = useLazyGetTransactionsByDateQuery();

  useEffect(() => {
    if (data) {
      setTransactions(data);
      toast.success("Data fetch from server complete!", {
        autoClose: 2000,
        theme: "colored",
      });
      return;
    }
    if (isError) {
      toast.error("Data Fetch failed!", {
        autoClose: 2000,
        theme: "colored",
      });
      return;
    }
  }, [data]);

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        isLoading,
        isSuccess,
        isError,
        fetchTransactionsByDate: useGetTransactionsByDateQuery,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
