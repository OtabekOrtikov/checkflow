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
        btnIcon={
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M8.00004 14.6667C11.6819 14.6667 14.6667 11.6819 14.6667 7.99999C14.6667 4.3181 11.6819 1.33333 8.00004 1.33333C4.31814 1.33333 1.33337 4.3181 1.33337 7.99999C1.33337 11.6819 4.31814 14.6667 8.00004 14.6667Z"
                stroke="#1967F2"
              />
              <path
                d="M10 8H8M8 8H6M8 8V6M8 8V10"
                stroke="#1967F2"
                stroke-linecap="round"
              />
            </svg>
          </>
        }
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
                <td>{rec.user_name}</td>
                <td>{rec.shift?.name ?? "—"}</td>
                <td>{formatTime(rec.event_time_in)}</td>
                <td>{formatTime(rec.event_time_out)}</td>
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
