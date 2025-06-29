// src/components/settings/GridDedAddTable.tsx
"use client";

import React from "react";
import Pagination from "@/components/Pagination";
import { TableHeadline } from "@/components/TableHeadline";
import PlusInCircle from "@/assets/icons/plusInCircle.svg";
import PencilIcon from "@/assets/icons/pencilIcon.svg";
import TrashIcon from "@/assets/icons/TrashIcon.svg";
import UserChecked from "@/assets/icons/userCheckedIcon.svg";
import { DeductionAdditionType } from "@/types/settings.t"; // adjust this to your real type
import { formatAmount } from "@/utils/formatPrice";

interface GridDedAddTableProps {
  data: DeductionAdditionType[];
  loading: boolean;
  page: number;
  pageSize: number;
  setPage: (n: number) => void;
  onEdit: (item: DeductionAdditionType) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
  onAssign?: (item: DeductionAdditionType) => void; // optional for assignment modal
}

const GridDedAddTable: React.FC<GridDedAddTableProps> = ({
  data,
  loading,
  page,
  pageSize,
  setPage,
  onEdit,
  onDelete,
  onAdd,
  onAssign = () => {}, // default no-op function
}) => {
  const total = data.length;
  const start = (page - 1) * pageSize;
  const paged = data.slice(start, start + pageSize);

  return (
    <div className="overflow-x-auto bg-white rounded-[20px] p-[20px] border border-[var(--gray-e6)] flex flex-col gap-[10px]">
      {/* headline + add button */}
      <TableHeadline
        title="Типы удержаний и доплат"
        isIconVisible={false}
        isButtonVisible={true}
        btnIcon={<PlusInCircle />}
        buttonText="Добавить"
        onClick={onAdd}
      />

      {/* inner “table” wrapper */}
      <div className="flex flex-col bg-[var(--background)] rounded-[10px] overflow-x-auto p-[12px] pb-[8px]">
        {/* header row */}
        <div className="grid grid-cols-[3fr_1fr_1fr_1fr] items-center border-b border-[var(--black-10)] font-bold text-[16px] text-[var(--foreground)] *:opacity-50 pb-[10px]">
          <div>Название</div>
          <div>Сумма</div>
          <div>Тип</div>
          <div className="text-center">Управлять</div>
        </div>

        {/* data rows */}
        {loading ? (
          <div className="p-4 text-center">Загрузка…</div>
        ) : paged.length > 0 ? (
          paged.map((row) => (
            <div
              key={row.id}
              className="grid grid-cols-[3fr_1fr_1fr_1fr] items-center border-b border-[var(--black-10)] text-[16px] text-[var(--foreground)] py-[10px] last:border-b-0"
            >
              <div className="font-medium">{row.name}</div>
              <div>{formatAmount(row.amount)} {row.type === "sum" ? "сум" : "%"}</div>
              <div>{row.isAddition ? "Доплата" : "Удержание"}</div>
              <div className="flex items-center gap-[10px] justify-center">
                {/* edit */}
                <button
                  onClick={() => onEdit(row)}
                  className="w-[60px] px-3 py-1 flex items-center justify-center 
                  border rounded-full text-(--primary) bg-[var(--white)]"
                >
                  <PencilIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onAssign(row)}
                  className="w-[60px] px-3 py-1 flex items-center justify-center 
                  border border-(--gray-e6) rounded-full text-(--foreground) bg-[var(--white)]"
                >
                  <UserChecked className="w-4 h-4" />
                </button>

                {/* delete */}
                <button
                  onClick={() => onDelete(row.id)}
                  className="w-[60px] px-3 py-1 flex items-center justify-center 
                  border rounded-full text-(--red) bg-[var(--white)]"
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

      {/* pagination */}
      <Pagination
        total={total}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
      />
    </div>
  );
};

export default GridDedAddTable;
