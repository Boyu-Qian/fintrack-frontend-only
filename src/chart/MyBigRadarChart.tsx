// src/components/MyRadarChart.tsx
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  Title
);

interface RadarChartProps {
  labels: string[]; // 每个维度的名称
  datasets: {
    label: string; // 数据集名称
    data: number[]; // 每个维度对应的数值
    borderColor?: string; // 边线颜色
    backgroundColor?: string; // 填充颜色
  }[];
  height?: number;
  width?: number;
}

export const RadarChart: React.FC<RadarChartProps> = ({
  labels,
  datasets,
  height,
  width,
}) => {
  const chartData = {
    labels,
    datasets: datasets.map((ds) => ({
      ...ds,
      fill: true,
      tension: 0.1,
      pointRadius: 3,
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
      title: {
        display: false,
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (context: any) {
            return `${context.dataset.label}: ${context.raw}`;
          },
        },
      },
    },
    scales: {
      r: {
        angleLines: { display: true },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: { stepSize: 20 },
        pointLabels: { font: { size: 12 } },
      },
    },
  };

  return (
    <Radar data={chartData} options={options} height={height} width={width} />
  );
};
