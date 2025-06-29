// src/components/settings/GridHolidayTable.tsx
"use client";

import React from "react";
import Pagination from "@/components/Pagination";
import { TableHeadline } from "@/components/TableHeadline";
import PencilIcon from "@/assets/icons/pencilIcon.svg";
import TrashIcon from "@/assets/icons/TrashIcon.svg";
import type { HolidayType } from "@/types/settings.t";
import PlusInCircle from "@/assets/icons/plusInCircle.svg";

interface Props {
  data: HolidayType[];
  loading: boolean;
  page: number;
  pageSize: number;
  setPage: (n: number) => void;
  onEdit: (item: HolidayType) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
}

export const GridHolidayTable: React.FC<Props> = ({
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
        title="Праздники"
        isIconVisible={false}
        isButtonVisible={true}
        btnIcon={<PlusInCircle />}
        buttonText="Добавить"
        buttonLink="#"
        onClick={onAdd}
      />

      <div className="min-w-[800px] bg-(--background) rounded-[15px] border border-(--black-10) overflow-x-auto">
        {/* Header */}
        <div className="grid grid-cols-[2fr_1fr_3fr_2fr_1fr] items-center border-b border-(--black-10) p-[12px] font-bold text-[16px] text-(--foreground) *:opacity-50">
          <div>Название</div>
          <div>Цвет</div>
          <div>Описание</div>
          <div>Даты</div>
          <div className="text-center">Управлять</div>
        </div>

        {loading ? (
          <div className="p-4 text-center">Загрузка…</div>
        ) : paged.length ? (
          paged.map((h) => (
            <div
              key={h.id}
              className="grid grid-cols-[2fr_1fr_3fr_2fr_1fr] items-center border-b border-(--black-10) p-[12px] text-[16px] text-(--foreground) font-medium last:border-b-0"
            >
              <div>{h.name}</div>
              <div>
                <span
                  className="inline-block w-[50px] h-[20px] rounded-full"
                  style={{ backgroundColor: h.color }}
                />
              </div>
              <div>{h.description}</div>
              <div>
                {h.startDate}–{h.endDate}
              </div>
              <div className="flex justify-center gap-2">
              <button
                  onClick={() => onEdit(h)}
                  className="w-[60px] px-3 py-1 flex items-center justify-center border rounded-full text-(--primary) bg-(--white)"
                >
                  <PencilIcon className="w-[16px]" />
                </button>
                {/* Удалить */}
                <button
                  onClick={() => onDelete(h.id)}
                  className="w-[60px] px-3 py-1 flex items-center justify-center border rounded-full text-(--red) bg-(--white)"
                >
                  <TrashIcon className="w-[16px]" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-gray-500">Нет записей</div>
        )}
      </div>

      <Pagination total={total} page={page} pageSize={pageSize} onPageChange={setPage} />
    </div>
  );
};