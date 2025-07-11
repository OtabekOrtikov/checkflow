"use client";

import React from "react";
import MailBox from "@/assets/icons/Mailbox.svg";
import PlusCircle from "@/assets/icons/PlusCircle.svg";
import { TableHeadline } from "./layout/TableHeadline";
import Pagination from "./layout/Pagination";
import { AttendanceRecord } from "@/types/attendance.t";

interface DashboardSummaryProps {
  data: AttendanceRecord[];
  total: number; // общее число записей (для пагинации)
  page: number; // текущая страница (1-based)
  pageSize: number; // элементов на страницу
  onPageChange: (newPage: number) => void;
}

const DashboardSummary: React.FC<DashboardSummaryProps> = ({
  data,
  total,
  page,
  pageSize,
  onPageChange,
}) => {
  // форматирует ISO-строку в "HH:mm"
  const formatTime = (iso?: string | null) =>
    iso
      ? new Date(iso).toLocaleTimeString("ru-RU", {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "—";

  // пример функции для расчёта разницы времени
  const diffTime = (base: string, actual: string | null): string => {
    if (!actual) return "—";
    const [bh, bm] = base.split(":").map(Number);
    const baseMin = bh * 60 + bm;
    const dt = new Date(actual);
    const actualMin = dt.getHours() * 60 + dt.getMinutes();
    const diff = actualMin - baseMin;
    const sign = diff < 0 ? "-" : "";
    const absVal = Math.abs(diff);
    const hh = String(Math.floor(absVal / 60)).padStart(2, "0");
    const mm = String(absVal % 60).padStart(2, "0");
    return `${sign}${hh}:${mm}`;
  };

  return (
    <div className="tables board">
      {/* Заголовок таблицы */}
      <TableHeadline
        title="Сводка на сегодня"
        icon={<MailBox className="w-6 text-[var(--primary)]" />}
        btn
        btnIcon={<PlusCircle className="w-4 text-[var(--primary)]" />}
        btnText="Добавить приход и уход"
      />

      {/* Таблица */}
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Сотрудник</th>
              <th>Смена</th>
              <th>Пришел</th>
              <th>Ушел</th>
              <th>Опоздал</th>
              <th>Ушел раньше</th>
            </tr>
          </thead>

          <tbody>
            {data.map((rec) => (
              <tr key={rec.id}>
                <td>
                  {rec.user_name}
                </td>
                <td>
                  {rec.shift?.name ?? "—"}
                </td>
                <td>
                  {formatTime(rec.event_time_in)}
                </td>
                <td>
                  {formatTime(rec.event_time_out)}
                </td>
                <td className="!text-[var(--yellow)] !font-[700] !opacity-100">
                  {rec.shift
                    ? diffTime(rec.shift.start_time, rec.event_time_in)
                    : "—"}
                </td>
                <td className="!text-[var(--red)] !font-[700] !opacity-100">
                  {rec.shift
                    ? diffTime(rec.shift.end_time, rec.event_time_out)
                    : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Пагинация */}
      <Pagination
        total={total}
        page={page}
        pageSize={pageSize}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default DashboardSummary;
