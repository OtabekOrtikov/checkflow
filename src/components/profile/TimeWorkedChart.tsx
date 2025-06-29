// src/components/profile/TimeWorkedChart.tsx
"use client";

import React from "react";
import type { TimeWorkedRecord } from "@/types/profile.t";
import { formatDate, formatHours } from "@/utils/formatTime";

// Recharts imports
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from "recharts";

interface Props {
  data: TimeWorkedRecord[];
}

export const TimeWorkedChart: React.FC<Props> = ({ data }) => {
  // transform data for recharts
  const chartData = data.map((r) => {
    const earlyHours = r.earlyLeaveCount;
    const lateHours = r.lateMinutes / 60;
    const normalHours = r.workedHours - earlyHours - lateHours;
    return {
      label: formatDate(r.date),
      earlyHours,
      normalHours,
      lateHours,
    };
  });

  // compute max for Y-axis
  const maxHours = Math.max(...data.map((r) => r.workedHours), 8);

  return (
    <div className="bg-white rounded-[15px] border border-[var(--gray-e6)] p-4 gap-[20px] flex flex-col">
      <h3 className="text-[18px] font-semibold">Отработанное время</h3>
      <ResponsiveContainer
        width="100%"
        height={500}
        className="bg-(--background) rounded-[10px] border border-(--gray-e6) p-[20px]"
      >
        <BarChart
          data={chartData}
          //   margin={{ top: 10, right: 20, left: 20, bottom: 0 }}
        >
          <CartesianGrid vertical={false} stroke="#CCC" strokeDasharray="5 5" />
          <XAxis
            dataKey="label"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 16, fill: "#1A1A1A" }}
            padding={{ left: 10, right: 10 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 16, fill: "#1A1A1A" }}
            domain={[0, maxHours]}
          />
          <Tooltip
            cursor={{ fill: "rgba(0,0,0,0.05)" }}
            contentStyle={{ borderRadius: 8 }}
          />
          <Bar
            dataKey="earlyHours"
            stackId="a"
            barSize={40}
            fill="#FF4545"
            radius={[0, 0, 0, 0]}
          />
          <Bar
            dataKey="normalHours"
            stackId="a"
            barSize={40}
            fill="#24D56D"
            radius={[0, 0, 0, 0]}
          />
          <Bar
            dataKey="lateHours"
            stackId="a"
            barSize={40}
            fill="#FFD527"
            radius={[0, 0, 0, 0]}
          />
          <Bar
            dataKey="notWorkedHours"
            stackId="a"
            barSize={40}
            fill="#CCC"
            radius={[0, 0, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
      <div className="flex gap-[20px]">
        <div className="flex items-center gap-[10px]">
          <span className="bg-[#ccc] w-[20px] aspect-square rounded-full block"></span>
          <span className="text-[16px] font-medium">Не отработанное время</span>
        </div>
        <div className="flex items-center gap-[10px]">
          <span className="bg-[#FF4545] w-[20px] aspect-square rounded-full block"></span>
          <span className="text-[16px] font-medium">Ранние уходы</span>
        </div>
        <div className="flex items-center gap-[10px]">
          <span className="bg-[#24D56D] w-[20px] aspect-square rounded-full block"></span>
          <span className="text-[16px] font-medium">Отработанное время</span>
        </div>
        <div className="flex items-center gap-[10px]">
          <span className="bg-[#FFD527] w-[20px] aspect-square rounded-full block"></span>
          <span className="text-[16px] font-medium">Опаздания</span>
        </div>
      </div>
    </div>
  );
};
