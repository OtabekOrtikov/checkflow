// src/components/schedules/ScheduleTable.tsx
"use client";

import Pagination from "@/components/layout/Pagination";
import { Shift } from "@/types/shift.t";

interface ScheduleTableProps {
  data: Shift[];
  total: number;
  page: number;
  pageSize: number;
  onPageChange: (p: number) => void;
}

export default function ScheduleTable({
  data,
  total,
  page,
  pageSize,
  onPageChange,
}: ScheduleTableProps) {
  return (
    <>
      <div className="tables !overflow-x-auto !p-0 mb-4">
        <table className="min-w-full !bg-white !p-[20px] !border-0">
          <thead>
            <tr>
              {[
                "Название",
                "Начало и конец",
                "Норма часов",
                "Ночное время",
                "Обед",
                "Сотрудников",
              ].map((h) => (
                <th key={h} className="last:!text-left">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((s) => (
              <tr key={s.id}>
                <td className="">{s.name}</td>
                <td className="">
                  {s.start_time.slice(0, 5)}–{s.end_time.slice(0, 5)}
                </td>
                <td className="">—</td>
                <td className="">—</td>
                <td className="">—</td>
                <td className="">0</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        total={total}
        page={page}
        pageSize={pageSize}
        onPageChange={onPageChange}
      />
    </>
  );
}
