"use client";

import React from "react";
import Pagination from "@/components/Pagination";
import type { RoleAssignment } from "@/types/settings.t";
import { TableHeadline } from "../TableHeadline";
import PlusInCircle from "@/assets/icons/plusInCircle.svg";
import PencilIcon from "@/assets/icons/pencilIcon.svg";
import TrashIcon from "@/assets/icons/TrashIcon.svg";

interface GridRoleTableProps {
  data: RoleAssignment[];
  loading: boolean;
  page: number;
  pageSize: number;
  setPage: (page: number) => void;
  onEdit: (item: RoleAssignment) => void;
  onDelete: (id: string) => void;
  onAdd?: () => void;
}

export const GridRoleTable: React.FC<GridRoleTableProps> = ({
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
    <div
      className="overflow-x-auto bg-white rounded-[20px] p-[20px] border border-(--gray-e6) 
    flex flex-col gap-[10px]"
    >
      <TableHeadline
        title={"Роли и права доступа"}
        isIconVisible={false}
        isButtonVisible={true}
        btnIcon={<PlusInCircle />}
        buttonText={"Добавить"}
        onClick={onAdd}
      />

      <div className="flex flex-col bg-(--background) rounded-[10px] overflow-x-auto p-[12px] pb-[8px]">
        <div
          className="grid grid-cols-[2fr_1fr_1fr_1fr_2fr_1fr] justify-between gap-[20px] items-center border-b 
        border-(--black-10) font-bold text-[16px] pb-[10px] text-(--foreground) *:opacity-50"
        >
          <div>Имя</div>
          <div>Отдел</div>
          <div>Логин</div>
          <div>Роль</div>
          <div>Спец. права</div>
          <div className="text-center">Действия</div>
        </div>
        {loading ? (
          <div className="p-4 text-center">Загрузка…</div>
        ) : paged.length > 0 ? (
          paged.map((row) => (
            <div
              key={row.id}
              className="grid grid-cols-[2fr_1fr_1fr_1fr_2fr_1fr] justify-between gap-[20px] items-start border-b 
              border-(--black-10) text-[16px] py-[10px] text-(--foreground) font-[400] last:border-b-0"
            >
              <div className="font-medium">{row.name}</div>
              <div>{row.department}</div>
              <div>{row.login}</div>
              <div>{row.role}</div>
              <div className="flex flex-wrap w-full gap-[5px]">
                {row.specialPermissions.map((item) => (
                  <span
                    className="px-[10px] bg-(--white) rounded-full border border-(--gray-e6)"
                    key={item}
                  >
                    {item}
                  </span>
                ))}
              </div>
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => onEdit(row)}
                  className="w-[60px] px-3 py-1 flex items-center justify-center border rounded-full text-(--primary) bg-(--white)"
                >
                  <PencilIcon className="w-[16px]" />
                </button>
                {/* Удалить */}
                <button
                  onClick={() => onDelete(row.id)}
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
      <Pagination
        total={total}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
      />
    </div>
  );
};
