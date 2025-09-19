import { useRef, useEffect, useState, useMemo } from "react";
import { useTransactions } from "../hooks/useTransactions";
import { HashLoader } from "react-spinners";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { useGetMonthlyTransactionMutation } from "../features/transactions/transactionsApi";

interface CalendarProps {
  tp: string;
  showFunction: React.Dispatch<React.SetStateAction<boolean>>;
  showInputFunction: React.Dispatch<React.SetStateAction<boolean>>;
  isTransactionCreationSuccess: boolean;
}

interface TransactionItem {
  date: string;
  total: number;
}

//This function generates a calendar(2D array) for a given month and year
const generateCalendar = (year: number, month: number) => {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInThisMonth = new Date(year, month + 1, 0).getDate();

  let calendar = [];
  let week = [];

  for (let i = 0; i < firstDay; i++) {
    week.push(null);
  }

  for (let day = 1; day <= daysInThisMonth; day++) {
    week.push(
      `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(
        2,
        "0"
      )}`
    );
    if (week.length === 7) {
      calendar.push(week);
      week = [];
    }
  }

  if (week.length) {
    while (week.length < 7) {
      week.push(null);
    }
    calendar.push(week);
  }
  return calendar;
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Calendar: React.FC<CalendarProps> = ({
  tp,
  showFunction,
  showInputFunction,
  isTransactionCreationSuccess,
}) => {
  const [getMonthlyTransaction, { data }] = useGetMonthlyTransactionMutation();
  const { fetchTransactionsByDate, transactions } = useTransactions();
  const [date, setDate] = useState(new Date());
  const yearRef = useRef(date.getFullYear());
  const [year, setYear] = useState(yearRef.current);
  const monthRef = useRef(date.getMonth());
  const [month, setMonth] = useState(monthRef.current);
  const [selecting, setSelecting] = useState(false);
  const calendar = generateCalendar(yearRef.current, monthRef.current);
  const user = useSelector((state: RootState) => state.auth.user);

  const dataMap = useMemo(() => {
    if (!data) return {};
    return data?.reduce(
      (acc: Record<string, number>, item: TransactionItem) => {
        acc[item.date] = item.total;
        return acc;
      },
      {} as Record<string, number>
    );
  }, [data, transactions, isTransactionCreationSuccess]);

  useEffect(() => {
    console.log(user);
    if (user) {
      getMonthlyTransaction({
        user_id: user.id,
        query_date: date.toISOString().split("T")[0],
        type: tp,
      });
    }
  }, [date, transactions, isTransactionCreationSuccess]);

  return (
    <div
      className={`${
        tp === "income" ? "absolute hidden" : "relative"
      } lg:block lg:relative`}
    >
      <div className="min-w-[300px] max-w-[600px] bg-white/60 rounded-2xl">
        <div className="hover:bg-gray-300 overflow-hidden rounded-2xl">
          <div className="flex justify-center items-center p-2 relative">
            {selecting ? (
              <div className="flex gap-2 text-sm">
                <select
                  value={month}
                  onChange={(e) => setMonth(Number(e.target.value))}
                  className="border rounded p-1 focus:outline-none"
                >
                  {months.map((m, i) => (
                    <option key={i} value={i}>
                      {m}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  value={year}
                  onChange={(e) =>
                    setYear(
                      Math.max(1970, Math.min(2100, Number(e.target.value)))
                    )
                  }
                  className="border rounded p-1 w-20 focus:outline-none"
                />
                <button
                  onClick={() => {
                    yearRef.current = year;
                    monthRef.current = month;
                    setDate(new Date(year, month, 1));
                    setSelecting(false);
                  }}
                  className="bg-blue-500 text-white px-2 rounded"
                >
                  OK
                </button>
              </div>
            ) : (
              <p
                className="text-lg font-semibold cursor-pointer hover:underline"
                onClick={() => setSelecting(true)}
              >
                {date.toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                })}
              </p>
            )}
            <div className="absolute top-1/2 right-3 -translate-y-1/2">
              {tp === "expense" ? (
                <p className="text-red-600/30 font-semibold">OUT</p>
              ) : (
                <p className="text-green-600/30 font-semibold">IN</p>
              )}
            </div>
          </div>
          {/* <p className="hover:bg-gray-300 text-center text-lg font-semibold p-2 overflow-hidden">
            
            {date.toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
            })}
          </p> */}
        </div>
      </div>
      <div className="grid grid-cols-7 text-center min-w-[300px] pt-2 mt-2 bg-white/60 rounded-t-2xl">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>
      <div className="grid grid-cols-7 text-center min-w-[300px] min-h-[300px] bg-white/60 rounded-b-2xl overflow-hidden relative">
        {data ? (
          calendar.map((week, rowIndex) => (
            <div key={rowIndex} className="contents">
              {week.map((day, colIndex) => (
                <div
                  key={colIndex}
                  className={`relative rounded-2xl ${
                    day ? "cursor-pointer hover:bg-[#BBDCE5]" : ""
                  }  border-gray-300 h-[50px] flex items-start justify-center`}
                  onClick={() => {
                    if (day !== null) {
                      if (dataMap[day] === 0) {
                        return;
                      }
                      if (user) {
                        fetchTransactionsByDate({
                          user_id: user.id,
                          query_date: day,
                          type: tp,
                        });
                      }
                      showInputFunction(false);
                      showFunction(true);
                    }
                  }}
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2">
                    {day?.split("-")[2]}
                  </div>
                  <div
                    className={`absolute text-sm bottom-0 left-1/2 -translate-x-1/2 ${
                      tp === "income" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {day !== null && dataMap[day] !== 0
                      ? tp === "income"
                        ? "+"
                        : "-"
                      : ""}
                    {day
                      ? dataMap[day] === 0
                        ? ""
                        : Number(dataMap[day]).toFixed(1)
                      : day}
                  </div>
                </div>
              ))}
            </div>
          ))
        ) : (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <HashLoader color="#BBDCE5" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;
