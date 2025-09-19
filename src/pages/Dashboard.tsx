import DashboardNav from "../components/DashboardNav";
import Calendar from "../components/Calendar";
import TransactionContainer from "../components/TransactionContainer";
import ExpenseInputPanel from "../components/ExpenseInputPanel";
import InputPanelContainer from "../components/InputPanelContainer";
import { TransactionProvider } from "../context/TransactionProvider";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { TRANSACTION_TYPES } from "../constants/transactionTypes";
import { useCreateTransactionMutation } from "../features/transactions/transactionsApi";

const Dashboard = () => {
  const [showTransactions, setShowTransactions] = useState(false);
  const [showInputPanel, setShowInputPanel] = useState(false);
  const [createTransaction, { data, error, isLoading, isSuccess }] =
    useCreateTransactionMutation();
  const [transactionType, setTransactionType] = useState<string>(
    TRANSACTION_TYPES.EXPENSE_FOOD
  );

  useEffect(() => {
    if (isSuccess) {
      toast.success("Transaction logged!", {
        autoClose: 3000,
        theme: "colored",
      });
    }
    if (error) {
      toast.error("Transaction failed!", {
        autoClose: 3000,
        theme: "colored",
      });
    }
  }, [data, error, isLoading, isSuccess]);

  return (
    <div className="h-[100vh] w-full py-2">
      <div className="container bg-[#BBDCE5] h-[100%] mx-auto rounded-3xl p-3 gap-2 flex flex-col">
        <DashboardNav />
        <div className="h-full w-full gap-2 flex flex-row">
          <ExpenseInputPanel
            show={showInputPanel}
            showTransaction={showTransactions}
            showFunction={setShowInputPanel}
            showTransactionFunction={setShowTransactions}
            changeTypeFunction={setTransactionType}
          />
          <div className="bg-white/30 rounded-2xl flex-1 flex flex-col gap-2">
            <TransactionProvider>
              <div className="w-full relative lg:grid lg:grid-cols-2 lg:gap-2">
                <Calendar
                  tp="expense"
                  showFunction={setShowTransactions}
                  showInputFunction={setShowInputPanel}
                  isTransactionCreationSuccess={isSuccess}
                />
                <Calendar
                  tp="income"
                  showFunction={setShowTransactions}
                  showInputFunction={setShowInputPanel}
                  isTransactionCreationSuccess={isSuccess}
                />
              </div>
              <div className="w-full bg-transparent rounded-2xl flex-1 overflow-hidden relative">
                <TransactionContainer
                  show={showTransactions}
                  showFunction={setShowTransactions}
                />
                <InputPanelContainer
                  show={showInputPanel}
                  showFunction={setShowInputPanel}
                  transactionType={transactionType}
                  transactionApiFunction={createTransaction}
                />
              </div>
            </TransactionProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
