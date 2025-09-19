import { createContext } from "react";
import type { Transaction } from "../features/transactions/transactionsApi";

export interface TransactionsContextType {
  transactions: Transaction[];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  fetchTransactionsByDate: (params: {
    user_id: string;
    query_date: string;
    type: string;
  }) => void;
}

export const TransactionContext = createContext<
  TransactionsContextType | undefined
>(undefined);
