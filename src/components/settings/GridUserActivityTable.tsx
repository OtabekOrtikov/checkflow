// src/components/settings/GridUserActivityTable.tsx
"use client";

import React from "react";
import Pagination from "@/components/Pagination";
import { TableHeadline } from "@/components/TableHeadline";
import type { UserActivity } from "@/types/settings.t";

interface Props {
  data: UserActivity[];
  loading: boolean;
  page: number;
  pageSize: number;
  setPage: (n: number) => void;
}

export const GridUserActivityTable: React.FC<Props> = ({
  data,
  loading,
  page,
  pageSize,
  setPage,
}) => {
  const total = data.length;
  const start = (page - 1) * pageSize;
  const paged = data.slice(start, start + pageSize);

  return (
    <div className="overflow-x-auto bg-white rounded-[20px] p-[20px] border border-(--gray-e6) flex flex-col gap-[10px]">
      <TableHeadline
        title="Активность пользователей"
        isIconVisible={false}
        isButtonVisible={false}
      />

      <div className="flex flex-col bg-(--background) rounded-[15px] overflow-x-auto">
        {/* Заголовок */}
        <div className="grid grid-cols-[4fr_1fr] items-center border-b border-(--black-10) 
        font-bold text-[16px] text-(--foreground) *:opacity-50 p-[12px] pb-[8px]">
          <div>Действие пользователя</div>
          <div className="text-center">Время</div>
        </div>

        {/* Содержимое */}
        {loading ? (
          <div className="p-4 text-center">Загрузка…</div>
        ) : paged.length > 0 ? (
          paged.map((row) => (
            <div
              key={row.id}
              className="grid grid-cols-[4fr_1fr] items-center border-b border-(--black-10) 
              py-[10px] px-[12px] text-[16px] text-(--foreground) font-medium last:border-b-0"
            >
              <div className="opacity-80">{row.message}</div>
              <div className="text-center opacity-80">{row.time}</div>
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-gray-500">Нет записей</div>
        )}
      </div>

      <Pagination
        total={total}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
      />
    </div>
  );
};