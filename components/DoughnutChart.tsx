"use client";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({
  labels,
  values,
  labelName,
  color,
  Adress,
}: {
  labels: string[];
  values: number[];
  labelName: string;
  color: string[];
  Adress: string;
}) => {
  const data = {
    labels: labels.map(
      (label) => label[0].toUpperCase() + label.slice(1).toLowerCase()
    ),
    datasets: [
      {
        label: labelName,
        data: [...values],
        backgroundColor: [...color],
        borderWidth: 2,
        borderColor: "#ffffff",
        hoverOffset: 15,
        hoverBorderWidth: 3,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          padding: 15,
          font: { size: 12 },
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-center text-xl lg:text-2xl font-bold mb-6 text-gray-800">
        {Adress}
      </h3>
      <div className="w-full max-w-xs mx-auto">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default DoughnutChart;
