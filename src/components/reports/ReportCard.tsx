// src/components/ReportCard.tsx
"use client";

import React from "react";
import PlusIcon from "@/assets/icons/plusIcon.svg";
import PencilIcon from "@/assets/icons/pencilIcon.svg";

interface Props {
  title: string;
  count: number;
  onAdd: () => void;
  onEdit: () => void;
}

export const ReportCard: React.FC<Props> = ({
  title,
  count,
  onAdd,
  onEdit,
}) => {
  return (
    <div className="flex items-start justify-between bg-white border border-(--gray-e6) rounded-[10px] p-[12px]">
      <div className="flex flex-col gap-[20px]">
        <h3 className="text-2xl font-[466] font-[Bounded]">{title}</h3>
        <p className="text-2xl font-[466] font-[Bounded] text-(--foreground-50)">({count})</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onAdd}
          className="py-[7px] px-[14px] cursor-pointer rounded-full text-(--green) hover:bg-green-50 transition border border-(--green)"
          aria-label="Добавить"
        >
          <PlusIcon />
        </button>
        <button
          onClick={onEdit}
          className="p-2 rounded-full text-(--primary) py-[7px] px-[14px] cursor-pointer border border-(--primary) hover:bg-blue-50 transition"
          aria-label="Редактировать"
        >
          <PencilIcon />
        </button>
      </div>
    </div>
  );
};
