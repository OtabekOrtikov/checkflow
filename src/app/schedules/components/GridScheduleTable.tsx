// src/components/GridScheduleTable.tsx
"use client";

import React from "react";
import type { WorkSchedule } from "@/types/schedule.t";

interface Props {
  data: WorkSchedule[];
  loading: boolean;
}

export const GridScheduleTable: React.FC<Props> = ({ data, loading }) => {
  return (
    <div className="overflow-x-auto">
      <div className="border border-gray-200 rounded-lg bg-white flex flex-col gap-[10px] p-[20px]">
        {/*** HEADER ***/}
        <div
          className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr] justify-between items-center border-b border-(--gray-e6) pb-[10px]
          text-(--foreground-50) font-bold text-[16px] *:cursor-pointer *:flex *:items-center *:gap-[5px]
        "
        >
          <div>Название</div>

          <div>Начало и конец</div>

          <div>Норма часов</div>

          <div>Ночное время</div>

          <div>Обед</div>

          <div>Сотрудников</div>
        </div>

        {/*** BODY ***/}
        {loading ? (
          <div className="col-span-6 p-4 text-center text-gray-500">
            Загрузка…
          </div>
        ) : data.length > 0 ? (
          data.map((row) => (
            <div
              key={row.id}
              className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr] items-center pb-[10px] border-b border-(--gray-e6) last:border-b-0 last:pb-0"
            >
              <div className="font-medium">{row.name}</div>
              <div>
                {row.start}–{row.end}
              </div>
              <div>{row.norm}</div>
              <div>{row.night}</div>
              <div>{row.lunch}</div>
              <div>
                {row.employeesCount}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-6 p-4 text-center text-gray-500">
            Нет данных
          </div>
        )}
      </div>
    </div>
  );
};
