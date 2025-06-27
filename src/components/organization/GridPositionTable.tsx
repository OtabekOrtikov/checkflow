"use client";

import { Position } from "@/types/organization.t";
import React from "react";
import { TableHeadline } from "../TableHeadline";
import Pagination from "../Pagination";
import PencilIcon from "@/assets/icons/pencilIcon.svg";
import RefreshIcon from "@/assets/icons/refreshIcon.svg";
import TrashIcon from "@/assets/icons/TrashIcon.svg";

interface Props {
  data: Position[];
  loading: boolean;
  page?: number;
  pageSize?: number;
  setPage?: (page: number) => void;
  onUpdate: (id: string, upd: Partial<Position>) => void;
  onDelete: (id: string) => void;
}

export const GridPositionTable: React.FC<Props> = ({
  data,
  loading,
  page = 1,
  pageSize = 5,
  setPage = () => {},
  onUpdate,
  onDelete,
}) => {
  const total = data.length;

  if (loading) return <div className="p-4 text-center">Загрузка…</div>;
  if (!data.length)
    return <div className="p-4 text-center text-gray-500">Нет записей</div>;

  return (
    <div className="overflow-x-auto bg-white rounded-[20px] p-[20px] border border-(--gray-e6) flex flex-col gap-[10px]">
      <TableHeadline
        title="Должности"
        isIconVisible={false}
        isButtonVisible={false}
      />

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
        {/* Заголовки */}
        <div
          className="
            grid grid-cols-[2fr_2fr_1fr]
            items-center
            border-b border-(--black-10) pb-[10px]
            font-bold text-[16px] text-(--foreground) opacity-50
          "
        >
          <div>Название</div>
          <div>Количество сотрудников</div>
          <div className="text-center">Управлять</div>
        </div>

        {/* Данные */}
        {data.map((row) => (
          <div
            key={row.id}
            className="
              grid grid-cols-[2fr_2fr_1fr]
              items-center
              border-b border-(--black-10) py-[7.5px]
              text-[16px] text-(--foreground) font-medium
              last:border-b-0 last:pb-0
            "
          >
            <div>{row.name}</div>
            <div>{row.employeeCount}</div>
            <div className="flex justify-center gap-2">
              {/* Edit */}
              <button
                onClick={() => onUpdate(row.id, {})}
                className="px-3 py-1 border rounded-full text-(--primary) bg-(--white)"
              >
                <PencilIcon />
              </button>
              {/* Refresh */}
              <button
                onClick={() =>
                  onUpdate(row.id, { employeeCount: row.employeeCount + 1 })
                }
                className="px-3 py-1 border border-(--gray-e6) rounded-full text-(--foreground) bg-(--white)"
              >
                <RefreshIcon />
              </button>
              {/* Delete */}
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

      <Pagination
        total={total}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
      />
    </div>
  );
};