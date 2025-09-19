import type { RootState } from "../store";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { LineChart } from "../chart/MyLineChart";
import { useSelector } from "react-redux";
import { LineChart as MyBiggerChart } from "../chart/MyBiggerChart";
import { PieChart } from "../chart/MyBigPieChart";
import ExpenseTab from "../components/dashboard/ExpenseTab";
import DashboardNav from "../components/DashboardNav";
import { toast } from "react-toastify";
import WeekSelector from "../components/dashboard/WeekSelector";
import { HashLoader } from "react-spinners";
import IncomeTab from "../components/dashboard/IncomeTab";
import {
  useGetDailyAmountByDatesMutation,
  useGetPieChartDataMutation,
  useGetFrenquencyDataMutation,
} from "../features/transactions/transactionsApi";

const generateThisMonth = (targetDate?: Date) => {
  var today = new Date();
  if (targetDate) {
    today = targetDate;
  }
  const year = today.getFullYear();
  //Starts at 0
  const month = today.getMonth();

  //month+1 代表下个月，day=0 代表上个月的最后一天
  const daysInThisMonth = new Date(year, month + 1, 0).getDate();

  var res: string[] = [];
  for (let i = 1; i <= daysInThisMonth; i++) {
    res.push(new Date(year, month, i).toISOString().split("T")[0]);
  }
  return res;
};

const generateSevenMonths = (targetDate?: Date) => {
  const result = [];
  for (let i = -3; i <= 3; i++) {
    var today = new Date();
    if (targetDate) {
      today = targetDate;
    }
    const year = today.getFullYear();
    const month = today.getMonth();
    const date = today.getDate();
    const target = new Date(year, month + i, date);
    const newTar = target.toDateString().split(" ");
    const str = newTar[1] + " " + newTar[3];
    result.push(str);
  }
  return result;
};

const generateThisWeek = () => {
  const today = new Date();
  //This return 0 if it is sunday,
  //return 6 if it is Saturday
  const todayIsWhatDay = today.getDay();
  const res: string[] = [];
  const oneDayInMilli = 1000 * 60 * 60 * 24;
  for (let i = todayIsWhatDay; i > 0; i--) {
    const thatDayString = new Date(today.getTime() - oneDayInMilli * i)
      .toISOString()
      .split("T")[0];
    res.push(thatDayString);
  }
  for (let i = todayIsWhatDay; i <= 6; i++) {
    const thatDayString = new Date(
      today.getTime() + (i - todayIsWhatDay) * oneDayInMilli
    )
      .toISOString()
      .split("T")[0];
    res.push(thatDayString);
  }
  return res;
};

const ReportPage = () => {
  const [graph, setGraph] = useState<number>(0);
  const thisWeek = generateThisWeek();
  const thisMonth = generateThisMonth();
  const [reportData, setReportData] = useState<string[]>(thisWeek);
  const [displayMode, setDisplayMode] = useState<string>("weekly");
  const navigate = useNavigate();
  //These two are for line charts
  const [reportAmountIncome, setReportIncomeArray] = useState<number[]>([]);
  const [reportAmountExpense, setReportExpenseArray] = useState<number[]>([]);
  //These two are for line charts

  //These two are for pie charts
  const [pieChartIncome, setPieChartIncome] = useState<[string[], number[]]>([
    [],
    [],
  ]);
  const [pieChartExpense, setPieChartExpense] = useState<[string[], number[]]>([
    [],
    [],
  ]);
  //These are for pie charts

  //These are for frequency charts
  const [incomeFreq, setIncomeFreq] = useState<[string[], number[]][]>([
    [[], []],
  ]);
  const [expenseFreq, setExpenseFreq] = useState<[string[], number[]][]>([
    [[], []],
  ]);
  //These are for frequency charts

  //Hooks for transaction api
  const [useGetDailyAmountByDates] = useGetDailyAmountByDatesMutation();
  const [getPieChartData] = useGetPieChartDataMutation();
  const [getFrequencyData] = useGetFrenquencyDataMutation();
  //Hooks for transaction api

  const sevenMonths = generateSevenMonths();
  const [weekSelectorContent, setWeekSelectorContent] =
    useState<string[]>(thisWeek);
  const user = useSelector((state: RootState) => state.auth.user);
  const intervalRef = useRef<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  //This one is for carousel
  useEffect(() => {
    const changeGraph = () => {
      setGraph((prev) => {
        return (prev + 1) % 3;
      });
    };
    intervalRef.current = setInterval(changeGraph, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  //Apis
  useEffect(() => {
    const fetchTransactions = async (dates: string[], user_id: string) => {
      setLoading(true);
      try {
        //Used for 3 small and big charts
        const dailyIncomeAmounts = await useGetDailyAmountByDates({
          user_id: user_id,
          query_dates: dates,
          type: "income",
        }).unwrap();
        setReportIncomeArray(dailyIncomeAmounts.map(([_, amount]) => amount));
        const dailyExpenseAmounts = await useGetDailyAmountByDates({
          user_id: user_id,
          query_dates: dates,
          type: "expense",
        }).unwrap();
        setReportExpenseArray(dailyExpenseAmounts.map(([_, amount]) => amount));

        //Used for pie chart
        const incomePieChartData = await getPieChartData({
          user_id: user_id,
          query_dates: dates,
          categories: [
            "food",
            "transport",
            "homebills",
            "selfcare",
            "shopping",
            "health",
          ],
        }).unwrap();
        // console.log("3+" + incomePieChartData);
        setPieChartIncome(incomePieChartData);
        const expensePieChartData = await getPieChartData({
          user_id: user_id,
          query_dates: dates,
          categories: ["salary", "freelance", "investment"],
        }).unwrap();
        setPieChartExpense(expensePieChartData);

        const freqIncomeData = await getFrequencyData({
          user_id: user_id,
          query_dates: dates,
          categories: ["salary", "freelance", "investment"],
        }).unwrap();
        setIncomeFreq(freqIncomeData);

        const freqExpenseData = await getFrequencyData({
          user_id: user_id,
          query_dates: dates,
          categories: [
            "food",
            "transport",
            "homebills",
            "selfcare",
            "shopping",
            "health",
          ],
        }).unwrap();
        setExpenseFreq(freqExpenseData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchTransactions(reportData, user.id);
    } else {
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 1000);
      toast.warn("User info missing!", { autoClose: 2000, theme: "colored" });
    }
  }, [reportData]);

  useEffect(() => {
    if (displayMode === "weekly") {
      setReportData(thisWeek);
      setWeekSelectorContent(thisWeek);
    } else {
      setWeekSelectorContent(sevenMonths);
      setReportData(thisMonth);
    }
  }, [displayMode]);

  const stopCarousel = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = 0;
    }
  };

  const monthChangeHandler = (month: string) => {
    const targetDate = new Date(month);
    setReportData(generateThisMonth(targetDate));
    setWeekSelectorContent(generateSevenMonths(targetDate));
  };

  return (
    <div className="h-[100vh] w-full py-2">
      <div className="container bg-[#BBDCE5] h-[100%] mx-auto rounded-3xl p-3 gap-2 flex flex-col">
        <DashboardNav />
        <div className="h-full w-full gap-2 flex flex-row bg-transparent rounded-2xl overflow-hidden">
          <div className="w-full md:w-[70%] bg-white/50 rounded-2xl md:grid md:grid-cols-3 md:grid-rows-[200px_1fr] md:items-start md:gap-2 overflow-hidden">
            <div className="bg-white/30 shadow-md border-gray-300 h-auto border-1 rounded-2xl relative">
              <div className="h-[200px] min-w-[300px] p-2 flex flex-row">
                {loading ? (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <HashLoader color="#BBDCE5" />
                  </div>
                ) : (
                  <>
                    <div className="h-full w-[30%] flex flex-col items-center">
                      <h2>Total</h2>
                      <p className="my-auto">
                        $
                        {reportAmountIncome
                          .map(
                            (value, index) => value - reportAmountExpense[index]
                          )
                          .reduce((acc, ele) => (acc += ele), 0)}
                      </p>
                    </div>
                    <div className="w-[70%] p-4">
                      <LineChart
                        labels={reportData}
                        data={reportAmountIncome.map(
                          (value, index) => value - reportAmountExpense[index]
                        )}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="bg-white/30 shadow-md border-gray-300 border-1 h-auto rounded-2xl  relative">
              <div className="h-[200px] min-w-[300px] p-2 flex flex-row">
                {loading ? (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <HashLoader color="#BBDCE5" />
                  </div>
                ) : (
                  <>
                    <div className="h-full w-[30%] flex flex-col items-center">
                      <h2>Expense</h2>
                      <p className="my-auto">
                        $
                        {reportAmountExpense.reduce(
                          (acc, ele) => (acc += ele),
                          0
                        )}
                      </p>
                    </div>
                    <div className="w-[70%] p-4">
                      <LineChart
                        labels={reportData}
                        data={reportAmountExpense}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="bg-white/30 shadow-md border-gray-300 border-1 rounded-2xl h-auto  relative">
              <div className="h-[200px] min-w-[300px] p-2 flex flex-row">
                {loading ? (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <HashLoader color="#BBDCE5" />
                  </div>
                ) : (
                  <>
                    <div className="h-full w-[30%] flex flex-col items-center">
                      <h2>Income</h2>
                      <p className="my-auto">
                        $
                        {reportAmountIncome.reduce(
                          (acc, ele) => (acc += ele),
                          0
                        )}
                      </p>
                    </div>
                    <div className="w-[70%] p-4">
                      <LineChart
                        labels={reportData}
                        data={reportAmountIncome}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="md:col-span-3 h-full py-4 bg-white/30 border-gray-300 border-1 shadow-sm overflow-hidden rounded-2xl relative">
              {loading ? (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <HashLoader color="#BBDCE5" />
                </div>
              ) : (
                <>
                  <div
                    className={`flex flex-row w-[300%] transition-all duration-1000 h-[90%] ${
                      graph === 0
                        ? "translate-x-0"
                        : graph === 1
                        ? "-translate-x-1/3"
                        : "-translate-x-2/3"
                    }`}
                  >
                    <div className="w-1/3 h-full p-4">
                      <MyBiggerChart
                        labels={reportData}
                        incomeData={reportAmountIncome}
                        expenseData={reportAmountExpense}
                      />
                    </div>
                    <div className="w-1/3 h-full  px-4">
                      <PieChart
                        labels={[
                          "Food",
                          "Transport",
                          "Home Bills",
                          "Self Care",
                          "Shopping",
                          "Health",
                        ]}
                        data={pieChartIncome[1]}
                        colors={[
                          "#D9C4B0",
                          "#33A1E0",
                          "#E4004B",
                          "#9929EA",
                          "#FE7743",
                          "#67C090",
                        ]}
                        title={`${
                          displayMode === "weekly" ? "Weekly" : "Monthly"
                        } Expense Pie Chart`}
                      />
                    </div>
                    <div className="w-1/3 h-full  px-4">
                      <PieChart
                        labels={["Salary", "Freelance", "Investment"]}
                        data={pieChartExpense[1]}
                        colors={["#33A1E0", "#E4004B", "#67C090"]}
                        title={`${
                          displayMode === "weekly" ? "Weekly" : "Monthly"
                        } Income Pie Chart`}
                      />
                    </div>
                  </div>
                  <div className="w-full h-[10%] relative">
                    <div className="flex gap-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300">
                      <div
                        className={`h-[15px] w-[15px] ${
                          graph === 0 ? "w-[55px] bg-blue-500" : ""
                        } transition-all duration-300 rounded-full hover:bg-blue-500 cursor-pointer bg-[#BBDCE5]`}
                        onClick={() => {
                          setGraph(0);
                          stopCarousel();
                        }}
                      ></div>
                      <div
                        className={`h-[15px] w-[15px] ${
                          graph === 1 ? "w-[55px] bg-blue-500" : ""
                        } transition-all duration-300 rounded-full hover:bg-blue-500 cursor-pointer bg-[#BBDCE5]`}
                        onClick={() => {
                          setGraph(1);
                          stopCarousel();
                        }}
                      ></div>
                      <div
                        className={`h-[15px] w-[15px] ${
                          graph === 2 ? "w-[55px] bg-blue-500" : ""
                        } transition-all duration-300 hover:bg-blue-500 rounded-full cursor-pointer bg-[#BBDCE5]`}
                        onClick={() => {
                          setGraph(2);
                          stopCarousel();
                        }}
                      ></div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="hidden md:flex flex-col flex-1 gap-2 bg-white/40 rounded-2xl overflow-hidden relative">
            {loading ? (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <HashLoader color="#BBDCE5" />
              </div>
            ) : (
              <WeekSelector
                monthChangeHandler={monthChangeHandler}
                displayMode={displayMode}
                displayModeChangeFunction={setDisplayMode}
                displayContent={weekSelectorContent}
              />
            )}

            <div className="bg-white/40 flex-1 w-full rounded-2xl overflow-y-scroll relative">
              {loading ? (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <HashLoader color="#BBDCE5" />
                </div>
              ) : (
                <>
                  <ExpenseTab displayData={expenseFreq} />
                  <IncomeTab displayData={incomeFreq} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
