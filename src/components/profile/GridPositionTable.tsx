// src/components/profile/GridPositionTable.tsx
"use client";

import React from "react";
import { TableHeadline } from "@/components/TableHeadline";
import PlusInCircle from "@/assets/icons/plusInCircle.svg";
import PencilIcon from "@/assets/icons/pencilIcon.svg";
import TrashIcon from "@/assets/icons/TrashIcon.svg";
import type { PositionAssignment } from "@/types/profile.t";

interface Props {
  data: PositionAssignment[];
  loading: boolean;
  onAssign: () => void;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}

export default function GridPositionTable({
  data,
  loading,
  onAssign,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="bg-white rounded-[20px] p-6 border border-[var(--gray-e6)] flex flex-col gap-4">
      <TableHeadline
        title="Должности"
        isIconVisible={false}
        isButtonVisible
        btnIcon={<PlusInCircle />}
        buttonText="Назначить"
        onClick={onAssign}
      />

      <div className="overflow-x-auto bg-[var(--background)] rounded-[10px]">
        {/* Заголовки */}
        <div className="grid grid-cols-[4fr_2fr_1fr] gap-4 p-3 font-bold border-b border-[var(--black-10)]">
          <div>Должность</div>
          <div>Дата назначения</div>
          <div className="text-center">Управлять</div>
        </div>

        {/* Содержимое */}
        {loading ? (
          <div className="p-4 text-center">Загрузка…</div>
        ) : data.length > 0 ? (
          data.map((row, i) => (
            <div
              key={i}
              className="grid grid-cols-[4fr_2fr_1fr] items-center gap-4 p-3 border-b last:border-b-0"
            >
              <div>{row.position}</div>
              <div>{new Date(row.assignedDate).toLocaleDateString()}</div>
              <div className="flex justify-center gap-[10px]">
                <button
                  onClick={() => onEdit(i)}
                  className="px-3 py-1 border rounded-full text-(--primary) bg-white"
                >
                  <PencilIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(i)}
                  className="px-3 py-1 border rounded-full text-(--red) bg-white"
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