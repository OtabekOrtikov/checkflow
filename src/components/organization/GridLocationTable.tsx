"use client";

import React from "react";
import type { Location } from "@/types/organization.t";
import PencilIcon from "@/assets/icons/pencilIcon.svg";
import RefreshIcon from "@/assets/icons/refreshIcon.svg";
import TrashIcon from "@/assets/icons/TrashIcon.svg";
import { TableHeadline } from "../TableHeadline";
import Pagination from "../Pagination";

interface Props {
  data: Location[];
  loading: boolean;
  page: number;
  pageSize: number;
  setPage: (n: number) => void;
  onUpdate: (id: string, upd: Partial<Location>) => void;
  onDelete: (id: string) => void;
}

export const GridLocationTable: React.FC<Props> = ({
  data,
  loading,
  page,
  pageSize,
  setPage,
  onUpdate,
  onDelete,
}) => {
  const total = data.length;
  if (loading) return <div className="p-4 text-center">Загрузка…</div>;
  if (!data.length)
    return <div className="p-4 text-center text-gray-500">Нет записей</div>;

  return (
    <div className="overflow-x-auto bg-white rounded-[20px] p-[20px] border border-(--gray-e6) flex flex-col gap-[10px]">
      <TableHeadline title="Локации компании" isIconVisible={false} isButtonVisible={false}/>

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
          className="grid grid-cols-[3fr_1fr_1fr_1fr] items-center border-b border-(--black-10) pb-[10px]
          font-bold text-[16px] text-(--foreground) *:opacity-50"
        >
          <div>Название</div>
          <div>Устройств</div>
          <div>Сотрудников</div>
          <div className="text-center">Управлять</div>
        </div>
        {/* Строки */}
        {data.map((row) => (
          <div
            key={row.id}
            className="grid grid-cols-[3fr_1fr_1fr_1fr] items-center border-b border-(--black-10) py-[7.5px]
            text-[16px] text-(--foreground) font-medium last:border-b-0 last:pb-0"
          >
            <div>{row.name}</div>
            <div>{row.deviceCount}</div>
            <div>{row.employeeCount}</div>
            <div className="flex justify-center gap-2">
              {/* Редактировать */}
              <button
                onClick={() => onUpdate(row.id, {})}
                className="px-3 py-1 border rounded-full text-(--primary) bg-(--white)"
              >
                <PencilIcon />
              </button>
              {/* Refresh — увеличиваем устройств на 1 */}
              <button
                onClick={() =>
                  onUpdate(row.id, { deviceCount: row.deviceCount + 1 })
                }
                className="px-3 py-1 border border-(--gray-e6) rounded-full text-(--foreground) bg-(--white)"
              >
                <RefreshIcon />
              </button>
              {/* Удалить */}
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