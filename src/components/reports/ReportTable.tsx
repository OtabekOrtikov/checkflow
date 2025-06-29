// src/components/reports/ReportTable.tsx
"use client";

import React from "react";
import Pagination from "@/components/Pagination";
import DownloadIcon from "@/assets/icons/DownloadIcon.svg";
import TrashIcon from "@/assets/icons/TrashIcon.svg";
import type { ReportItem } from "@/types/report.t";

interface ReportTableProps {
  type: string;
  title: string;
  items: ReportItem[];
  loading: boolean;
  page: number;
  pageSize: number;
  onDownload: (id: string) => void;
  onDelete: (id: string) => void;
  onPageChange: (page: number) => void;
}

export function ReportTable({
  type,
  title,
  items,
  loading,
  page,
  pageSize,
  onDownload,
  onDelete,
  onPageChange,
}: ReportTableProps) {
  if (loading) return <div className="p-4 text-center">Загрузка…</div>;
  if (!items.length)
    return <div className="p-4 text-center text-gray-500">Нет записей</div>;

  const total = items.length;
  const start = (page - 1) * pageSize;
  const paged = items.slice(start, start + pageSize);

  return (
    <div className="overflow-x-auto bg-white rounded-[20px] p-[20px] border border-(--gray-e6) flex flex-col gap-[10px]">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">{title}</h2>
      </div>

      <div className="min-w-[600px] bg-(--background) rounded-[15px] border border-gray-200 overflow-x-auto">
        <div
          className={`grid ${
            type === "employee"
              ? "grid-cols-[1fr_1fr_1fr_1fr_1fr]"
              : "grid-cols-[1fr_1fr_1fr_1fr]"
          } items-center 
        border-b border-(--black-10) font-bold text-[16px] 
        text-(--foreground) *:opacity-50 p-[12px] pb-[8px]`}
        >
          {type === "employee" ? (
            <>
              <div>Сотрудник</div>
              <div>Дата начала</div>
              <div>Дата окончания</div>
              <div>Создано</div>
              <div className="text-center">Скачать PDF</div>
            </>
          ) : (
            <>
              <div>Дата начала</div>
              <div>Дата окончания</div>
              <div>Создано</div>
              <div className="text-center">Скачать PDF</div>
            </>
          )}
        </div>

        {paged.map((row) => (
          <div
            key={row.id}
            className={`grid ${
              type === "employee"
                ? "grid-cols-[1fr_1fr_1fr_1fr_1fr]"
                : "grid-cols-[1fr_1fr_1fr_1fr]"
            } items-center 
            border-b border-(--black-10) py-[7.5px] text-[16px] 
            text-(--foreground) font-medium last:border-b-0 p-[12px] pb-[8px]`}
          >
            {type === "employee" && (<div>{row.title}</div>)}
            <div>{row.startDate}</div>
            <div>{row.endDate}</div>
            <div>{row.createdAt}</div>
            <div className="flex justify-center gap-[10px]">
              <button
                onClick={() => onDownload(row.id)}
                className="px-3 py-1 border border-(--green) bg-(--white)
                 text-(--green) rounded-full w-full max-w-[90px] flex items-center justify-center"
              >
                <DownloadIcon className="w-[16px] h-[16px]" />
              </button>
              <button
                onClick={() => onDelete(row.id)}
                className="px-3 py-1 border border-(--red) bg-(--white)
                 text-(--red) rounded-full w-full max-w-[90px] flex items-center justify-center"
              >
                <TrashIcon className="w-[16px] h-[16px]" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Pagination
        total={total}
        page={page}
        pageSize={pageSize}
        onPageChange={onPageChange}
      />
    </div>
  );
}
