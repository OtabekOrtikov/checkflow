"use client";

import React from "react";
import Pagination from "@/components/Pagination";
import { TableHeadline } from "@/components/TableHeadline";
import PlusInCircle from "@/assets/icons/plusInCircle.svg";
import PencilIcon from "@/assets/icons/pencilIcon.svg";
import TrashIcon from "@/assets/icons/TrashIcon.svg";
import type { TimeOffType } from "@/types/settings.t";

interface Props {
  data: TimeOffType[];
  loading: boolean;
  page: number;
  pageSize: number;
  setPage: (p: number) => void;
  onEdit: (item: TimeOffType) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
}

export const GridTimeOffTypeTable: React.FC<Props> = ({
  data,
  loading,
  page,
  pageSize,
  setPage,
  onEdit,
  onDelete,
  onAdd,
}) => {
  const total = data.length;
  const start = (page - 1) * pageSize;
  const paged = data.slice(start, start + pageSize);

  return (
    <div className="overflow-x-auto bg-white rounded-[20px] p-[20px] border border-(--gray-e6) flex flex-col gap-[10px]">
      <TableHeadline
        title="Типы отгулов"
        isIconVisible={false}
        isButtonVisible
        btnIcon={<PlusInCircle />}
        buttonText="Добавить"
        buttonLink="#"
        onClick={onAdd}
      />

      <div className="flex flex-col bg-(--background) rounded-[10px] overflow-x-auto p-[12px] pb-[8px]">
        <div className="grid grid-cols-[3fr_1fr_3fr_1fr] items-center gap-[20px] border-b border-(--black-10) font-bold text-[16px] text-(--foreground) *:opacity-50 pb-[10px]">
          <div>Название</div>
          <div>Цвет</div>
          <div>Описание</div>
          <div className="text-center">Управлять</div>
        </div>

        {loading ? (
          <div className="p-4 text-center">Загрузка…</div>
        ) : paged.length > 0 ? (
          paged.map((row) => (
            <div
              key={row.id}
              className="grid grid-cols-[3fr_1fr_3fr_1fr] items-center gap-[20px] border-b border-(--black-10) text-[16px] text-(--foreground) font-medium py-[10px] last:border-b-0"
            >
              <div>{row.name}</div>
              <div className="flex justify-start">
                <div
                  className="h-4 w-10 rounded-full"
                  style={{ backgroundColor: row.color }}
                />
              </div>
              <div>{row.description}</div>
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => onEdit(row)}
                  className="px-3 py-1 border rounded-full text-(--primary) bg-(--white)"
                >
                  <PencilIcon className="w-[16px] h-[16px]" />
                </button>
                <button
                  onClick={() => onDelete(row.id)}
                  className="px-3 py-1 border rounded-full text-(--red) bg-(--white)"
                >
                  <TrashIcon className="w-[16px] h-[16px]" />
                </button>
              </div>
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
