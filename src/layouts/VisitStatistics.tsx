// src/components/VisitStatistics.tsx
"use client";

import { useEffect, useState } from "react";
import type { VisitStat, Period } from "@/types/statistics.t";
import { fetchVisitStats } from "@/services/statisticsService";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { TableHeadline } from "../components/TableHeadline";
import StatIcon from "@/assets/icons/statIcon.svg";

export const VisitStatistics = () => {
  const [period, setPeriod] = useState<Period>("week");
  const [data, setData] = useState<VisitStat[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchVisitStats(period)
      .then((stats) => setData(stats))
      .finally(() => setLoading(false));
  }, [period]);

  const periods: { label: string; value: Period }[] = [
    { label: "Неделя", value: "week" },
    { label: "Месяц", value: "month" },
    { label: "Год", value: "year" },
  ];

  return (
    <section className="bg-white border border-(--gray-e6) rounded-[20px] p-[20px] flex flex-col h-fit gap-[20px]">
      <div className="flex flex-col gap-[10px]">
        <TableHeadline
          isIconVisible
          isButtonVisible={false}
          title="Статистика посещений"
          icon={<StatIcon />}
        />
        <div className="flex space-x-2">
          {periods.map((p) => (
            <button
              onClick={() => setPeriod(p.value)}
              key={p.value}
              className={`px-[10px] py-1 text-[16px] font-bold rounded-full cursor-pointer transition ${
                period === p.value
                  ? "bg-(--primary) text-white"
                  : "bg-transparent text-(--foreground) border border-(--grey-80) rounded-full hover:bg-gray-200"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* График */}
      {loading ? (
        <div className="flex-1 flex items-center justify-center p-[20px] text-gray-400 min-h-[440px]">
          Загрузка…
        </div>
      ) : (
        <div className="flex-1 bg-(--background) rounded-[20px] p-[20px] h-fit">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={data}
              margin={{ top: 10, right: -20, left: -20, bottom: -10 }}
            >
              {/* 1) Только горизонтальные пунктирные линии */}
              <CartesianGrid
                vertical={false}
                stroke="#CCC"
                strokeDasharray="15 10"
              />

              {/* 2) X и Y без жирных осей и без линий от меток */}
              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 16, fill: "#1A1A1A" }}
                padding={{ left: 20, right: 20 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 16, fill: "#1A1A1A" }}
                domain={[0, "dataMax + 20"]}
              />

              {/* 3) Подсказка с лёгким фоном */}
              <Tooltip
                cursor={{ fill: "rgba(0,0,0,0.05)" }}
                contentStyle={{ borderRadius: 8 }}
              />

              {/* 4) Сам столбец: двойной радиус = барSize/2, чтобы получился «пилюльный» вид */}
              <Bar
                dataKey="value"
                barSize={50}
                fill="#1967F2"
                radius={[10, 10, 10, 10]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
};
