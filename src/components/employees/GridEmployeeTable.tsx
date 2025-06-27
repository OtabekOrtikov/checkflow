// src/components/GridEmployeeTable.tsx
"use client";

import React from "react";
import type { Employee } from "@/types/employee.t";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import ArrowDown from "@/assets/icons/arrow-down.svg";
import CheckedIcon from "@/assets/icons/checkedIcon.svg";
import IdCardIcon from "@/assets/icons/idCardIcon.svg";
import FaceIcon from "@/assets/icons/FaceIcon.svg";

type SortField = "name" | "position" | "department" | "salary" | "identified";

interface Props {
  data: Employee[];
  loading: boolean;
  sortField: SortField | null;
  sortOrder: "asc" | "desc";
  onHeaderClick: (field: SortField) => void;
}

export const GridEmployeeTable: React.FC<Props> = ({
  data,
  loading,
  sortField,
  sortOrder,
  onHeaderClick,
}) => {
  // вспомогалка для стрелки
  const Arrow = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortOrder === "asc" ? (
      <ChevronUpIcon className="w-4 h-4 inline-block ml-1" />
    ) : (
      <ChevronDownIcon className="w-4 h-4 inline-block ml-1" />
    );
  };

  return (
    <div className="overflow-x-auto">
      <div className="border border-gray-200 rounded-lg bg-white flex flex-col gap-[10px] p-[20px]">
        {/*** HEADER ***/}
        <div
          className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr] justify-between items-center border-b border-(--gray-e6) pb-[10px]
          text-(--foreground-50) font-bold text-[16px] *:cursor-pointer *:flex *:items-center *:gap-[5px]
        "
        >
          <div onClick={() => onHeaderClick("name")}>
            Сотрудник
            <span className={`text-(--foreground) opacity-100 transition-all ${sortOrder === "asc" && sortField === "name" ? "rotate-180" : ""}`}>
              <ArrowDown />
            </span>
          </div>

          <div onClick={() => onHeaderClick("position")}>
            Должность
            <span className={`text-(--foreground) opacity-100 transition-all ${sortOrder === "asc" && sortField === "position" ? "rotate-180" : ""}`}>
              <ArrowDown />
            </span>
          </div>

          <div onClick={() => onHeaderClick("department")}>
            Отдел
            <span className={`text-(--foreground) opacity-100 transition-all ${sortOrder === "asc" && sortField === "department" ? "rotate-180" : ""}`}>
              <ArrowDown />
            </span>
          </div>

          <div onClick={() => onHeaderClick("salary")}>
            Зарплата
            <span className={`text-(--foreground) opacity-100 transition-all ${sortOrder === "asc" && sortField === "salary" ? "rotate-180" : ""}`}>
              <ArrowDown />
            </span>
          </div>

          <div className="text-center cursor-default justify-center">
            Идентификация
          </div>
        </div>

        {/*** BODY ***/}
        {loading ? (
          <div className="col-span-5 p-4 text-center text-gray-500">
            Загрузка…
          </div>
        ) : data.length > 0 ? (
          data.map((e) => (
            <div
              key={e.id}
              className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr] items-center pb-[10px] border-b border-(--gray-e6) last:border-b-0 last:pb-0"
            >
              <div className="border-gray-100">{e.name}</div>
              <div className="border-gray-100 text-gray-500">{e.position}</div>
              <div className="border-gray-100 text-gray-500">
                {e.department}
              </div>
              <div className="border-gray-100">
                <div className="text-xs text-gray-400">Часовая 01.06.2025</div>
                <div className="font-semibold">
                  {e.salary.toLocaleString()} сум
                </div>
              </div>
              <div className="border-gray-100 flex items-center justify-center gap-2">
                <span>
                  <CheckedIcon
                    className={`${
                      e.identified ? "text-(--green)" : "opacity-30"
                    }`}
                  />
                </span>
                <span className={`
                  ${e.idCard ? "text-(--green)" : "opacity-30"}`}>
                  <IdCardIcon />
                </span>
                <span className={`${e.faceId ? "text-(--green)" : "opacity-30"}`}>
                  <FaceIcon />
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-5 p-4 text-center text-gray-500">
            Ничего не найдено
          </div>
        )}
      </div>
    </div>
  );
};
