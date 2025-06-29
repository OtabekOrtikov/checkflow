// src/components/settings/GridPenaltyTable.tsx
"use client";

import React from "react";
import Pagination from "@/components/Pagination";
import { TableHeadline } from "@/components/TableHeadline";
import PlusInCircle from "@/assets/icons/plusInCircle.svg";
import PencilIcon from "@/assets/icons/pencilIcon.svg";
import UserIcon from "@/assets/icons/userCheckedIcon.svg"; // иконка человека
import TrashIcon from "@/assets/icons/TrashIcon.svg";
import { PenaltyType } from "@/types/settings.t";

interface GridPenaltyTableProps {
  data: PenaltyType[];
  loading: boolean;
  page: number;
  pageSize: number;
  setPage: (n: number) => void;
  onEdit: (item: PenaltyType) => void;
  onDelete: (id: string) => void;
  onAssign: (item: PenaltyType) => void;
  onAdd: () => void;
}

export const GridPenaltyTable: React.FC<GridPenaltyTableProps> = ({
  data,
  loading,
  page,
  pageSize,
  setPage,
  onEdit,
  onDelete,
  onAssign,
  onAdd,
}) => {
  const total = data.length;
  const start = (page - 1) * pageSize;
  const paged = data.slice(start, start + pageSize);

  return (
    <div className="overflow-x-auto bg-white rounded-[20px] p-[20px] border border-(--gray-e6) flex flex-col gap-[10px]">
      <TableHeadline
        title="Штрафы"
        isIconVisible={false}
        isButtonVisible={true}
        btnIcon={<PlusInCircle />}
        buttonText="Добавить"
        onClick={onAdd}
      />

      <div className="flex flex-col bg-(--background) rounded-[10px] overflow-x-auto p-[12px] pb-[8px]">
        <div className="grid grid-cols-[4fr_1fr] items-center border-b border-(--black-10) font-bold text-[16px] text-(--foreground) *:opacity-50 pb-[10px]">
          <div>Название</div>
          <div className="text-center">Управлять</div>
        </div>

        {loading ? (
          <div className="p-4 text-center">Загрузка…</div>
        ) : paged.length ? (
          paged.map((row) => (
            <div
              key={row.id}
              className="grid grid-cols-[4fr_1fr] items-center border-b border-(--black-10) text-[16px] text-(--foreground) py-[10px] last:border-b-0"
            >
              <div className="font-medium">{row.name}</div>

              <div className="flex items-center gap-[10px] justify-center">
                <div className="flex justify-center">
                  <button
                    onClick={() => onEdit(row)}
                    className="w-[60px] px-3 py-1 flex items-center justify-center border rounded-full text-(--primary) bg-(--white)"
                  >
                    <PencilIcon className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={() => onAssign(row)}
                    className="w-[60px] px-3 py-1 flex items-center justify-center border border-(--gray-e6) rounded-full text-(--foreground) bg-(--white)"
                  >
                    <UserIcon className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={() => onDelete(row.id)}
                    className="w-[60px] px-3 py-1 flex items-center justify-center border rounded-full text-(--red) bg-(--white)"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
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
