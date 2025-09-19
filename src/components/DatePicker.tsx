import React, { useState, useEffect, useRef } from "react";

interface DatePickerProps {
  date: Date;
  setDateFunction: React.Dispatch<React.SetStateAction<Date>>;
}

const DatePicker: React.FC<DatePickerProps> = ({ date, setDateFunction }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth());

  const ref = useRef<HTMLDivElement>(null);

  // 点击外部时自动关闭
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const handleDateClick = (day: number) => {
    const newDate = new Date(year, month, day);
    setDateFunction(newDate);
    setIsOpen(false);
  };

  const handlePrevMonth = () => {
    if (month === 0) {
      setYear(year - 1);
      setMonth(11);
    } else {
      setMonth(month - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setYear(year + 1);
      setMonth(0);
    } else {
      setMonth(month + 1);
    }
  };

  return (
    <div className="absolute left-0 bottom-0 mb-2 text-sm" ref={ref}>
      {/* 触发按钮 */}
      <button
        className="bg-white/90 px-2 py-1 rounded-xl hover:bg-gray-400"
        onClick={() => setIsOpen(!isOpen)}
      >
        {date.toLocaleDateString()}
      </button>

      {/* 日历面板 */}
      {isOpen && (
        <div className="absolute bottom-[110%] mt-2 bg-white border rounded-lg shadow-lg p-2 z-10 min-w-[350px]">
          {/* 年月切换 */}
          <div className="flex justify-between items-center mb-2">
            <button onClick={handlePrevMonth}>&lt;</button>
            <span className="font-bold">
              {year} - {month + 1}
            </span>
            <button onClick={handleNextMonth}>&gt;</button>
          </div>

          {/* 星期标题 */}
          <div className="grid grid-cols-7 gap-1 text-center font-semibold">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          {/* 日期格子 */}
          <div className="grid grid-cols-7 gap-1 text-center mt-1">
            {Array(firstDay)
              .fill(null)
              .map((_, i) => (
                <div key={`empty-${i}`} />
              ))}

            {Array(daysInMonth)
              .fill(null)
              .map((_, i) => {
                const day = i + 1;
                const isSelected =
                  day === date.getDate() &&
                  month === date.getMonth() &&
                  year === date.getFullYear();
                return (
                  <button
                    key={day}
                    onClick={() => handleDateClick(day)}
                    className={`p-1 rounded ${
                      isSelected
                        ? "bg-blue-500 text-white"
                        : "hover:bg-gray-200"
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
