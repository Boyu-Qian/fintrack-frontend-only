// src/components/MyLineChart.tsx
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
  labels: string[];
  data: number[];
  height?: number; // 可选
  width?: number; // 可选
}

export const LineChart: React.FC<LineChartProps> = ({
  labels,
  data,
  height,
  width,
}) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: "Revenue",
        data,
        borderColor: "rgba(161, 165, 255,1)",
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, "rgba(161, 165, 255,.5)"); // 上方颜色
          gradient.addColorStop(1, "rgba(161, 165, 255,0)"); // 渐变到透明
          return gradient;
        },
        tension: 0,
        pointRadius: 3,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
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
      x: { display: false, grid: { display: false } },
      y: { display: false, grid: { display: false } },
    },
  };

  return (
    <Line data={chartData} options={options} height={height} width={width} />
  );
};
