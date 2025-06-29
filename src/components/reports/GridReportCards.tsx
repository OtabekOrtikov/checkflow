// src/components/reports/GridReportCards.tsx
"use client";

import React from "react";
import type { Report } from "@/types/report.t";
import PlusIcon from "@/assets/icons/plusIcon.svg";
import Link from "next/link";

interface Props {
  data: Report[];
  loading: boolean;
}

export const GridReportCards: React.FC<Props> = ({
  data,
  loading,
}) => {
  if (loading) return <div className="p-4 text-center">Загрузка…</div>;
  if (!data.length)
    return <div className="p-4 text-center text-gray-500">Нет отчётов</div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {data.map((r) => (
        <Link
          key={r.id}
          href={`/reports/${r.type}`}
          className="bg-white p-6 rounded-[15px] flex flex-col items-start justify-between border border-(--gray-e6) "
        >
          <div className="w-full flex justify-between items-start">
            <h3 className="text-2xl font-[Bounded] font-[466] text-(--foreground)">
              {r.title}
            </h3>
            <button
              onClick={(e) => {
                e.preventDefault();
              }}
              className="min-w-[100px] text-center border border-(--green) py-2 rounded-full flex justify-center items-center text-(--green)"
            >
              <PlusIcon className="w-[16px]" />
            </button>
          </div>
          <p className="mt-4 text-2xl font-[Bounded] font-[466] text-(--foreground-50)">
            ({r.items?.length || 0})
          </p>
        </Link>
      ))}
    </div>
  );
};
