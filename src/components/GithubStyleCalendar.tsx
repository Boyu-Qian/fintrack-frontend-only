import { useState } from "react";

const Calendar = () => {
  const [date] = useState(new Date());
  const [logs] = useState<Record<string, number>>({}); // key: "YYYY-MM-DD", value: log count

  const year = date.getFullYear();
  const month = date.getMonth();

  // 生成当月日历
  const generateCalendar = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    let calendar: (number | null)[][] = [];
    let week: (number | null)[] = [];

    for (let i = 0; i < firstDay; i++) week.push(null);

    for (let day = 1; day <= daysInMonth; day++) {
      week.push(day);
      if (week.length === 7) {
        calendar.push(week);
        week = [];
      }
    }

    if (week.length) {
      while (week.length < 7) week.push(null);
      calendar.push(week);
    }

    return calendar;
  };

  const calendar = generateCalendar(year, month);

  // 根据 log 数量返回颜色
  const getColor = (day: number | null) => {
    if (!day) return "bg-gray-200";
    const key = new Date(year, month, day).toISOString().split("T")[0];
    const count = logs[key] || 0;
    if (count === 0) return "bg-gray-200";
    if (count < 3) return "bg-green-200";
    if (count < 6) return "bg-green-400";
    return "bg-green-600";
  };

  return (
    <div className="inline-grid grid-cols-7 gap-1">
      {calendar.map((week, rowIdx) =>
        week.map((day, colIdx) => (
          <div
            key={`${rowIdx}-${colIdx}`}
            className={`w-4 h-4 rounded-sm ${getColor(day)}`}
          ></div>
        ))
      )}
    </div>
  );
};

export default Calendar;
