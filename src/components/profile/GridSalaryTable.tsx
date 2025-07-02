// src/components/profile/GridSalaryTable.tsx
"use client";
import React from "react";
import { TableHeadline } from "@/components/TableHeadline";
import Pagination from "@/components/Pagination";
import PlusInCircle from "@/assets/icons/plusInCircle.svg";
import PencilIcon from "@/assets/icons/pencilIcon.svg";
import TrashIcon from "@/assets/icons/TrashIcon.svg";
import { SalaryAssignment } from "@/types/profile.t";

interface Props {
  data: SalaryAssignment[];
  loading: boolean;
  page: number;
  pageSize: number;
  setPage: (p: number) => void;
  onAssign: () => void;
  onEdit: (idx: number) => void;
  onDelete: (idx: number) => void;
}

export const GridSalaryTable: React.FC<Props> = ({
  data,
  loading,
  page,
  pageSize,
  setPage,
  onAssign,
  onEdit,
  onDelete,
}) => {
  const start = (page - 1) * pageSize;
  const pageData = data.slice(start, start + pageSize);
  return (
    <div className="overflow-x-auto bg-white rounded-[20px] p-6 border border-(--gray-e6) flex flex-col gap-4">
      <TableHeadline
        title="Зарплата"
        isIconVisible={false}
        isButtonVisible={true}
        btnIcon={<PlusInCircle />}
        buttonText="Назначить"
        onClick={onAssign}
      />
      <div className="bg-(--background) rounded-lg overflow-auto">
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] items-center bg-(--gray-f5) text-(--foreground-50) text-sm py-3 px-4">
          <div>Ставка</div>
          <div>Тип</div>
          <div>Дата назначения</div>
          <div>Дата начала</div>
          <div>Дата окончания</div>
          <div className="text-center">Управлять</div>
        </div>
        {loading ? (
          <div className="p-4 text-center">Загрузка…</div>
        ) : pageData.length > 0 ? (
          pageData.map((row, i) => {
            const idx = start + i;
            return (
              <div
                key={idx}
                className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] items-center py-3 px-4 border-b border-(--gray-e6)"
              >
                <div>
                  {row.amount.toLocaleString("ru-RU", {
                    minimumFractionDigits: 2,
                  })}{" "}
                  {row.currency}
                </div>
                <div>{row.rateType}</div>
                <div>
                  {row.assignedDate.slice(0, 10).split("-").reverse().join(".")}
                </div>
                <div>
                  {row.startDate.slice(0, 10).split("-").reverse().join(".")}
                </div>
                <div>
                  {row.endDate ? (
                    row.endDate.slice(0, 10).split("-").reverse().join(".")
                  ) : (
                    <span className="px-2 py-1 border border-(--green) text-(--green) rounded-full text-xs">
                      Текущий
                    </span>
                  )}
                </div>
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => onEdit(idx)}
                    className="p-2 border rounded-full text-(--primary)"
                  >
                    <PencilIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(idx)}
                    className="p-2 border border-(--red) rounded-full text-(--red)"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-4 text-center text-gray-500">Нет записей</div>
        )}
      </div>
      <Pagination
        total={data.length}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
      />
    </div>
  );
};

export default GridSalaryTable;
