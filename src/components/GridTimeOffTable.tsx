// src/components/GridTimeOffTable.tsx
"use client";

import React, { useState } from "react";
import type { TimeOffRequest } from "@/types/timeOff.t";
import { TableHeadline } from "./TableHeadline";
import CheckIcon from "@/assets/icons/checkIcon.svg"; // Assuming you have a check icon
import XIcon from "@/assets/icons/XIcon.svg"; // Assuming you have an x icon
import TrashIcon from "@/assets/icons/TrashIcon.svg"; // Assuming you have a trash icon
import Pagination from "./Pagination";

interface Props {
  data: TimeOffRequest[];
  status?: "pending" | "approved" | "rejected" | "deleted";
  loading: boolean;
  page?: number;
  setPage?: (page: number) => void; // Optional setter for page, if needed
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export const GridTimeOffTable: React.FC<Props> = ({
  data,
  loading,
  status = "pending",
  page = 1,
  setPage = () => {},
  onApprove,
  onReject,
}) => {
  if (loading) {
    return <div className="p-4 text-center">Загрузка…</div>;
  }

  const total = data.length;
  const pageSize = 6;

  let title = "";
  switch (status) {
    case "pending":
      title = "В ожидании";
      break;
    case "approved":
      title = "Принятые";
      break;
    case "rejected":
      title = "Непринятые";
      break;
    case "deleted":
      title = "Удалённые";
      break;
    default:
      title = "Заявки";
  }

  if (!data.length) {
    return (
      <div className="flex flex-col gap-[10px] p-[20px] bg-(--white) rounded-[20px]">
        <TableHeadline
          title={title}
          isIconVisible={false}
          isButtonVisible={false}
        />
        <div
          className="
          min-w-[800px]
          bg-(--background)
          rounded-[15px]
          border border-gray-200
          w-full
          overflow-x-auto
          p-[12px]
          pb-[8px]
        "
        >
          <div className="text-center font-semibold text-(--foreground) text-[24px]">
            Нет запросов об отгуле, но вы можете его{" "}
            <button
              type="submit"
              className="cursor-pointer text-(--primary) underline"
            >
              добавить
            </button>
            .
          </div>
        </div>
        <Pagination
          total={total}
          page={page}
          pageSize={pageSize}
          onPageChange={setPage}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[10px] p-[20px] bg-(--white) rounded-[20px]">
      <TableHeadline
        title={title}
        isIconVisible={false}
        isButtonVisible={false}
      />
      <div
        className="
          min-w-[800px]
          bg-(--background)
          rounded-[15px]
          border border-gray-200
          w-full
          overflow-x-auto
          p-[12px]
          pb-[8px]
        "
      >
        {/* Заголовки */}
        <div
          className="grid grid-cols-[2fr_2fr_2fr_1fr] items-center border-b border-(--black-10) pb-[10px]
          font-bold text-[16px] text-(--foreground) *:opacity-50"
        >
          <div>Сотрудник</div>
          <div>Причина</div>
          <div>Интервал</div>
          <div className=" text-center">Действия</div>
        </div>
        {/* Данные */}
        {data.map((r) => (
          <div
            key={r.id}
            className="grid grid-cols-[2fr_2fr_2fr_1fr] items-center border-b border-(--black-10) py-[7.5px]
            text-[16px] text-(--foreground) font-medium last:border-b-0 last:pb-0"
          >
            <div>{r.employeeName}</div>
            <div>{r.reason}</div>
            <div>{r.interval}</div>
            <div className="flex justify-center gap-2">
              {r.status === "pending" && (
                <>
                  <button
                    onClick={() => onApprove(r.id)}
                    className="py-1 px-5 border border-(--green) text-(--foreground) bg-(--white) rounded-full"
                  >
                    <CheckIcon />
                  </button>
                  <button
                    onClick={() => onReject(r.id)}
                    className="py-1 px-5 border border-(--red) text-(--foreground) bg-(--white) rounded-full"
                  >
                    <XIcon />
                  </button>
                </>
              )}
              {r.status === "approved" && (
                <button
                  onClick={() => onReject(r.id)}
                  className="py-1 px-5 border border-(--red) text-(--red) bg-(--white) rounded-full"
                >
                  <TrashIcon />
                </button>
              )}
              {r.status === "rejected" && (
                <button
                  onClick={() => onApprove(r.id)}
                  className="py-1 px-5 border border-(--yellow) text-(--foreground) bg-(--white) rounded-full"
                >
                  ↺
                </button>
              )}
            </div>
          </div>
        ))}
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
