// src/components/settings/GridLocationTable.tsx
"use client";

import React from "react";
import Pagination from "@/components/Pagination";
import { TableHeadline } from "@/components/TableHeadline";
import PlusInCircle from "@/assets/icons/plusInCircle.svg";
import PencilIcon from "@/assets/icons/pencilIcon.svg";
import TrashIcon from "@/assets/icons/TrashIcon.svg";
import type { Location } from "@/types/location.t";

interface GridLocationTableProps {
  data: Location[];
  loading: boolean;
  page: number;
  pageSize: number;
  onPageChange: (n: number) => void;
  onAdd: () => void;
  onEdit: (item: Location) => void;
  onDelete: (id: string) => void;
}

export const GridLocationTable: React.FC<GridLocationTableProps> = ({
  data,
  loading,
  page,
  pageSize,
  onPageChange,
  onAdd,
  onEdit,
  onDelete,
}) => {
  const total = data.length;
  const start = (page - 1) * pageSize;
  const paged = data.slice(start, start + pageSize);

  return (
    <div className="overflow-x-auto bg-white rounded-[20px] p-[20px] border border-(--gray-e6) flex flex-col gap-[10px]">
      <TableHeadline
        title="Локации"
        isIconVisible={false}
        isButtonVisible={true}
        btnIcon={<PlusInCircle />}
        buttonText="Добавить"
        buttonLink="#"
        onClick={onAdd}
      />

      <div className="flex flex-col bg-(--background) rounded-[10px] overflow-x-auto">
        {/* header */}
        <div className="grid grid-cols-[3fr_4fr_1fr] items-center border-b border-(--black-10) font-bold text-[16px] text-(--foreground) opacity-50 p-[12px] pb-[8px]">
          <div>Название</div>
          <div>Адрес</div>
          <div className="text-center">Управлять</div>
        </div>

        {loading ? (
          <div className="p-4 text-center">Загрузка…</div>
        ) : paged.length ? (
          paged.map((loc) => (
            <div
              key={loc.id}
              className="grid grid-cols-[3fr_4fr_1fr] items-center border-b border-(--black-10) py-[10px] last:border-b-0 text-[16px] text-(--foreground) p-[12px] pb-[8px]"
            >
              <div className="font-medium">{loc.name}</div>
              <div>{loc.address}</div>
              <div className="flex items-center justify-center gap-[10px]">
                <button
                  onClick={() => onEdit(loc)}
                  className="w-[60px] px-3 py-1 flex items-center justify-center border rounded-full text-(--primary) bg-(--white)"
                >
                  <PencilIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(loc.id)}
                  className="w-[60px] px-3 py-1 flex items-center justify-center border rounded-full text-(--red) bg-(--white)"
                >
                  <TrashIcon className="w-4 h-4" />
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
        onPageChange={onPageChange}
      />
    </div>
  );
};
