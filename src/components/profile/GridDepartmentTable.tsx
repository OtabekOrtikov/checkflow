"use client";

import React from "react";
import { TableHeadline } from "@/components/TableHeadline";
import PlusInCircle from "@/assets/icons/plusInCircle.svg";
import PencilIcon from "@/assets/icons/pencilIcon.svg";
import TrashIcon from "@/assets/icons/TrashIcon.svg";
import type { DepartmentAssignment } from "@/types/profile.t";

interface Props {
  data: DepartmentAssignment[];
  loading: boolean;
  onAssign: () => void;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}

export default function GridDepartmentTable({
  data,
  loading,
  onAssign,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="bg-white rounded-[20px] p-6 border border-[var(--gray-e6)] flex flex-col gap-4">
      <TableHeadline
        title="Отделы"
        isIconVisible={false}
        isButtonVisible
        btnIcon={<PlusInCircle />}
        buttonText="Назначить"
        onClick={onAssign}
      />

      <div className="overflow-x-auto bg-[var(--background)] rounded-[10px]">
        <div className="grid grid-cols-[4fr_2fr_1fr] gap-4 p-3 font-bold border-b border-[var(--black-10)]">
          <div>Отдел</div>
          <div>Дата начала работы</div>
          <div className="text-center">Управлять</div>
        </div>

        {loading ? (
          <div className="p-4 text-center">Загрузка…</div>
        ) : data.length > 0 ? (
          data.map((row, i) => (
            <div
              key={i}
              className="grid grid-cols-[4fr_2fr_1fr] items-center gap-4 p-3 border-b last:border-b-0"
            >
              <div>{row.department}</div>
              <div>{new Date(row.startDate).toLocaleDateString()}</div>
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => onEdit(i)}
                  className="px-3 py-1 border rounded-full text-(--primary) bg-(--white)"
                >
                  <PencilIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(i)}
                  className="px-3 py-1 border rounded-full text-(--red) bg-(--white)"
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
    </div>
  );
}