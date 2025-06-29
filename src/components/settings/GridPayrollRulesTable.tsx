// src/components/settings/GridPayrollRulesTable.tsx
"use client";

import React from "react";
import Pagination from "@/components/Pagination";
import type { PayrollRule } from "@/types/settings.t";
import { TableHeadline } from "@/components/TableHeadline";
import PencilIcon from "@/assets/icons/PencilIcon.svg";
import TrashIcon from "@/assets/icons/TrashIcon.svg";
import PlusInCircle from "@/assets/icons/plusInCircle.svg";

interface Props {
  data: PayrollRule[];
  loading: boolean;
  page: number;
  pageSize: number;
  setPage: (p: number) => void;
  onEdit: (item: PayrollRule) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
}

export const GridPayrollRulesTable: React.FC<Props> = ({
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
        title="Правила начисления зарплаты"
        isIconVisible={false}
        isButtonVisible
        btnIcon={<PlusInCircle />}
        buttonText="Добавить"
        buttonLink="#"
        onClick={onAdd}
      />

      <div className="flex flex-col bg-(--background) rounded-[15px] overflow-x-auto">
        <div className="grid grid-cols-[4fr_1fr] items-center gap-[20px] border-b border-(--black-10) p-[12px] text-[16px] font-bold text-(--foreground) *:opacity-50">
          <div>Название</div>
          {/* <div>Доп. выплаты / Сверхурочно</div> */}
          <div className="text-center">Действия</div>
        </div>

        {loading ? (
          <div className="p-4 text-center">Загрузка…</div>
        ) : paged.length > 0 ? (
          paged.map((rule) => (
            <div
              key={rule.id}
              className="grid grid-cols-[4fr_1fr] items-center gap-[20px] border-b border-(--black-10) p-[12px] text-[16px] text-(--foreground) font-medium last:border-b-0"
            >
              <div>{rule.name}</div>
              {/* <div className="flex flex-col gap-1">
                <span>Выплат: {rule.payments.length}</span>
                <span>Сверхурок: {rule.overtimes.length}</span>
                <span>
                  Алгоритм:{" "}
                  {rule.algorithm === "daily" ? "Ежедневный" : "Ежемесячный"}
                </span>
              </div> */}
              <div className="flex justify-center gap-[10px]">
                <button
                  onClick={() => onEdit(rule)}
                  className="w-[60px] px-3 py-1 flex items-center justify-center border rounded-full text-(--primary) bg-(--white)"
                >
                  <PencilIcon className="w-[16px] h-[16px]" />
                </button>
                <button
                  onClick={() => onDelete(rule.id)}
                  className="w-[60px] px-3 py-1 flex items-center justify-center border rounded-full text-(--red) bg-(--white)"
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
