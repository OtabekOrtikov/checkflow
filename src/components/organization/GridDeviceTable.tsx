// src/components/organization/GridDeviceTable.tsx
"use client";

import React from "react";
import type { Device } from "@/types/organization.t";
import { TableHeadline } from "../TableHeadline";
import Pagination from "../Pagination";
import PencilIcon from "@/assets/icons/pencilIcon.svg";
import TrashIcon from "@/assets/icons/TrashIcon.svg";

interface Props {
  data: Device[];
  loading: boolean;
  page: number;
  pageSize: number;
  setPage: (n: number) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const GridDeviceTable: React.FC<Props> = ({
  data,
  loading,
  page,
  pageSize,
  setPage,
  onEdit,
  onDelete,
}) => {
  const total = data.length;

  if (loading) return <div className="p-4 text-center">Загрузка…</div>;
  if (!data.length)
    return <div className="p-4 text-center text-gray-500">Нет записей</div>;

  return (
    <div className="overflow-x-auto bg-white rounded-[20px] p-[20px] border border-(--gray-e6) flex flex-col gap-[10px]">
      <TableHeadline
        title="Устройства"
        isIconVisible={false}
        isButtonVisible={false}
      />

      <div
        className="
          min-w-[900px]
          bg-(--background)
          rounded-[15px]
          border border-gray-200
          w-full
          overflow-x-auto
          p-[12px] pb-[8px]
        "
      >
        {/* Заголовки */}
        <div
          className="
            grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr] items-center border-b border-(--black-10) pb-[10px]
          font-bold text-[16px] text-(--foreground) *:opacity-50"
        >
          <div>Название и ID</div>
          <div>Тип работы</div>
          <div>Локация</div>
          <div>Часовой пояс</div>
          <div>Послед. соед.</div>
          <div>Активность</div>
          <div className="text-center">Управлять</div>
        </div>

        {/* Строки */}
        {data.map((row) => (
          <div
            key={row.id}
            className="
              grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr] items-center border-b border-(--black-10) py-[7.5px]
            text-[16px] text-(--foreground) font-medium last:border-b-0 last:pb-0 *:truncate"
          >
            {/* Название + ID */}
            <div>
              <div className="flex items-center gap-2">
                <img
                  src={`/api/devices/${row.id}/thumbnail`} // если есть картинка
                  alt=""
                  className="w-8 h-8 rounded"
                />
                <div>
                  <div>{row.name}</div>
                  <div className="text-sm text-(--grey-80)">{row.id}</div>
                </div>
              </div>
            </div>

            <div>{row.type}</div>
            <div className="line-clamp-1">{row.location}</div>
            <div>{row.timeZone}</div>
            <div>{row.lastConnection}</div>
            <div>{row.status}</div>

            <div className="flex justify-center gap-2">
              <button
                onClick={() => onEdit(row.id)}
                className="px-3 py-1 border rounded-full text-(--primary) bg-(--white)"
              >
                <PencilIcon />
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

      <Pagination
        total={total}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
      />
    </div>
  );
};
