"use client";
import { useGetProjects } from "@/hooks/projects";
import DoughnutChart from "./DoughnutChart";

const Chart = () => {
  const { data } = useGetProjects();
  if (!data) return null;

  const progressGroup = {
    "<20": 0,
    "20-40": 0,
    "40-60": 0,
    "60-80": 0,
    "80-100": 0,
  };

  const statusGroup = {
    "in-progress": 0,
    completed: 0,
    pending: 0,
  };

  data.forEach((item) => {
    statusGroup[item.status as keyof typeof statusGroup]++;
    if (item.progress < 20) progressGroup["<20"]++;
    if (item.progress >= 20 && item.progress < 40) progressGroup["20-40"]++;
    if (item.progress >= 40 && item.progress < 60) progressGroup["40-60"]++;
    if (item.progress >= 60 && item.progress < 80) progressGroup["60-80"]++;
    if (item.progress >= 80 && item.progress < 100) progressGroup["80-100"]++;
  });

  return (
    <div className="container mx-auto px-4 py-8 lg:py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
        <DoughnutChart
          Adress="Progress"
          labels={Object.keys(progressGroup)}
          values={Object.values(progressGroup)}
          labelName="Progress"
          color={["#E63946", "#F3722C", "#F9C74F", "#90BE6D", "#43AA8B"]}
        />
        <DoughnutChart
          Adress="Status"
          labels={Object.keys(statusGroup)}
          values={Object.values(statusGroup)}
          labelName="Status"
          color={["#2196F3", "#4CAF50", "#FFC107"]}
        />
      </div>
    </div>
  );
};

export default Chart;