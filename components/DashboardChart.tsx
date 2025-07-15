"use client";

import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { TableHeadline } from "./layout/TableHeadline";
import StatsIcon from "@/assets/icons/StatsIcon.svg";
import { AttendanceStats } from "@/types/attendance.t";

interface DashboardChartProps {
  data: AttendanceStats[];
  selectedPeriod: "week" | "month" | "year";
  setSelectedPeriod: (period: "week" | "month" | "year") => void;
}

const DashboardChart: React.FC<DashboardChartProps> = ({ data, selectedPeriod, setSelectedPeriod }) => {

  const handlePeriodChange = (period: "week" | "month" | "year") => {
    setSelectedPeriod(period);
  };

  let chartData = data.map((item) => ({
    name: item.label,
    value: item.count,
  }));

  const values = chartData.map((item) => item.value);
  const maxValue = Math.max(...values);

  return (
    <div className="board">
      <div className="flex flex-col gap-2.5">
        <TableHeadline
          title={"Статистика посещений"}
          icon={
            <StatsIcon className="w-[24px] aspect-square text-[var(--primary)]" />
          }
        />
        <div className="flex gap-[5px]">
          <button
            onClick={() => handlePeriodChange("week")}
            className={`px-2.5 h-[40px] border border-[var(--gray-e6)] rounded-full text-base font-bold ${
              selectedPeriod === "week"
                ? "bg-[var(--primary)] text-white border-[var(--primary)]"
                : "bg-transparent text-[var(--foreground)]"
            }`}
          >
            Неделя
          </button>
          <button
            onClick={() => handlePeriodChange("month")}
            className={`px-2.5 h-[40px] border border-[var(--gray-e6)] rounded-full text-base font-bold ${
              selectedPeriod === "month"
                ? "bg-[var(--primary)] text-white border-[var(--primary)]"
                : "bg-transparent text-[var(--foreground)]"
            }`}
          >
            Месяц
          </button>
          <button
            onClick={() => handlePeriodChange("year")}
            className={`px-2.5 h-[40px] border border-[var(--gray-e6)] rounded-full text-base font-bold ${
              selectedPeriod === "year"
                ? "bg-[var(--primary)] text-white border-[var(--primary)]"
                : "bg-transparent text-[var(--foreground)]"
            }`}
          >
            Год
          </button>
        </div>
      </div>
      <div
        className="w-full overflow-x-auto min-h-[400px] h-fit p-5 bg-[var(--background)] rounded-[10px] 
      border border-[var(--gray-e6)]"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#1A1A1A", fontWeight: 600 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#1A1A1A", fontWeight: 600 }}
              domain={[0, maxValue]}
              ticks={values}
            />
            <Bar
              dataKey="value"
              fill="#1967F2"
              radius={[10, 10, 10, 10]}
              maxBarSize={50}
              style={{ marginBottom: "10px" }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardChart;
