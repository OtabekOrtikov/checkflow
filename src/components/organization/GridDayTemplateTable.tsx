"use client";

import React from "react";
import type { DayTemplate } from "@/types/organization.t";
import PencilIcon from "@/assets/icons/pencilIcon.svg";
import RefreshIcon from "@/assets/icons/refreshIcon.svg";
import TrashIcon from "@/assets/icons/TrashIcon.svg";
import Pagination from "@/components/Pagination";
import { TableHeadline } from "../TableHeadline";

interface Props {
  data: DayTemplate[];
  loading: boolean;
  page: number;
  pageSize: number;
  setPage: (p: number) => void;
  onEdit: (item: DayTemplate) => void;
  onDuplicate: (item: DayTemplate) => void;
  onDelete: (id: string) => void;
}

export const GridDayTemplateTable: React.FC<Props> = ({
  data,
  loading,
  page,
  pageSize,
  setPage,
  onEdit,
  onDuplicate,
  onDelete,
}) => {
  const total = data.length;
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);
  const paged = data.slice((page - 1) * pageSize, page * pageSize);

  if (loading) return <div className="p-4 text-center">Загрузка…</div>;
  if (!total)
    return <div className="p-4 text-center text-gray-500">Нет шаблонов</div>;

  return (
    <div className="overflow-x-auto bg-white rounded-[20px] p-[20px] border border-(--gray-e6) flex flex-col gap-[10px]">
      <TableHeadline
        title="Шаблон дня"
        isIconVisible={false}
        isButtonVisible={false}
      />

      {/* Grid */}
      <div
        className="
          min-w-[800px]
          bg-(--background)
          rounded-[15px]
          border border-gray-200
          w-full
          overflow-x-auto
          p-[12px]
          pb-[8px]
        "
      >
        <div
          className="grid grid-cols-[3fr_1fr_4fr_1fr] items-center border-b border-(--black-10) pb-[10px]
          font-bold text-[16px] text-(--foreground) *:opacity-50"
        >
          <div>Название</div>
          <div>Цвет</div>
          <div>Описание</div>
          <div className="text-center">Управлять</div>
        </div>
        {paged.map((row) => (
          <div
            key={row.id}
            className="grid grid-cols-[3fr_1fr_4fr_1fr] items-center border-b border-(--black-10) py-[7.5px]
            text-[16px] text-(--foreground) font-medium last:border-b-0 last:pb-0"
          >
            <div>{row.name}</div>
            <div>
              <span
                className="block w-[50px] h-[20px] rounded-full"
                style={{ backgroundColor: row.color }}
              />
            </div>
            <div>{row.description}</div>
            <div className="flex justify-center gap-2">
              <button
                onClick={() => onEdit(row)}
                className="px-3 py-1 border rounded-full text-(--primary) bg-(--white)"
              >
                <PencilIcon />
              </button>
              <button
                onClick={() => onDuplicate(row)}
                className="px-3 py-1 border border-(--foreground-50) rounded-full text-(--foreground) bg-(--white)"
              >
                <RefreshIcon />
              </button>
              <button
                onClick={() => onDelete(row.id)}
                className="px-3 py-1 border rounded-full text-(--red) bg-(--white)"
              >
                <TrashIcon />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Подпись + пагинация */}
      <Pagination
        total={total}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
      />
    </div>
  );
};
