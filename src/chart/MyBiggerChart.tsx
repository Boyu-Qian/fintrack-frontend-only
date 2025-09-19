// src/components/MyBiggerChart.tsx
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import type { ChartData } from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

import { Line } from "react-chartjs-2";

interface LineChartProps {
  labels: number[] | string[] | undefined;
  incomeData: number[];
  expenseData: number[];
  height?: number; // 可选
  width?: number; // 可选
}

export const LineChart: React.FC<LineChartProps> = ({
  labels,
  incomeData,
  expenseData,
  height,
  width,
}) => {
  const chartData: ChartData<"line", number[], number | string> = {
    labels,
    datasets: [
      {
        label: "Revenue",
        data: incomeData,
        borderColor: "rgba(161, 165, 255,1)",
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, "rgba(161, 165, 255,1)"); // 上方颜色
          gradient.addColorStop(1, "rgba(161, 165, 255,.5)"); // 渐变到透明
          return gradient;
        },
        tension: 0.3,
        pointRadius: 0,
        fill: true,
      },
      {
        label: "Expense",
        data: expenseData,
        borderColor: "rgba(0, 165, 255,1)",
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, "rgba(0, 165, 255,1)"); // 上方颜色
          gradient.addColorStop(1, "rgba(0, 165, 255,0.5)"); // 渐变到透明
          return gradient;
        },
        tension: 0.3,
        pointRadius: 0,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: false,
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (context: any) {
            return context.raw; // 只显示数据点的数值
          },
        },
      },
    },
    scales: {
      x: { display: true, grid: { display: true } },
      y: { display: true, grid: { display: true } },
    },
  };

  return (
    <Line data={chartData} options={options} height={height} width={width} />
  );
};
