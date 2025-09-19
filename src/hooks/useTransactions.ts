import { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";

export const useTransactions = () => {
    const context = useContext(TransactionContext)

    if(!context) {
        throw new Error("useTransactions hook must be used within a TransactionProvider")
    }

    return context
}