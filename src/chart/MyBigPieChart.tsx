// src/components/MyPieChart.tsx
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

interface PieChartProps {
  labels: string[]; // 每个扇形的名称
  data: number[]; // 对应每个扇形的数值
  colors?: string[]; // 可选，指定每个扇形的颜色
  height?: number;
  width?: number;
  title: string;
}

export const PieChart: React.FC<PieChartProps> = ({
  labels,
  data,
  colors,
  height,
  width,
  title,
}) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: "Dataset",
        data,
        backgroundColor: colors || [
          "rgba(161, 165, 255, 0.7)",
          "rgba(0, 165, 255, 0.7)",
          "rgba(255, 165, 0, 0.7)",
          "rgba(255, 99, 132, 0.7)",
          "rgba(75, 192, 192, 0.7)",
          "rgba(153, 102, 255, 0.7)",
        ],
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (context: any) {
            const value = context.raw;
            const label = context.label || "";
            return `${label}: ${value}`;
          },
        },
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 22,
        },
      },
    },
  };

  return (
    <Pie data={chartData} options={options} height={height} width={width} />
  );
};
