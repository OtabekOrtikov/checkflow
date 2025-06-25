// src/components/Pagination.tsx
"use client";

import ChevronLeftIcon from "@/assets/icons/arrow-left.svg";
import ChevronRightIcon from "@/assets/icons/arrow-right.svg";

interface PaginationProps {
  total: number;
  page: number;
  pageSize: number;
  onPageChange: (newPage: number) => void;
}

export default function Pagination({
  total,
  page,
  pageSize,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  // Собираем массив с номерами страниц и эллипсисами
  const pages: (number | "…")[] = [];
  if (totalPages <= 6) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    if (page <= 3) {
      pages.push(1, 2, 3, 4, "…", totalPages);
    } else if (page >= totalPages - 2) {
      pages.push(
        1,
        "…",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages
      );
    } else {
      pages.push(1, "…", page - 1, page, page + 1, "…", totalPages);
    }
  }

  return (
    <div className="flex items-center justify-between">
      <p className="xl:text-[24px] font-[Bounded] font-[566]">
        <p className="text-(--black-30)">Показаны пришедшие</p>
        <p className="text-(--foreground)">
          {start}–{Math.min(start - 1 + pageSize, total)} из {total}
        </p>
      </p>
      <div className="flex items-center gap-x-[10px]">
        {/* Назад */}
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="2xl:py-[10px] 2xl:px-[15px] px-[10px] py-[5px] rounded-[50px] block border border-(--black-10) disabled:opacity-50"
        >
          <ChevronLeftIcon className="xl:w-[32px] w-[24px]" />
        </button>

        {/* Номера страниц */}
        <div className="flex items-center gap-x-[10px]">
          {pages.map((p, i) =>
            p === "…" ? (
              <span
                key={i}
                className="text-(--grey-80) xl:text-[24px] text-[20px] font-bold"
              >
                …
              </span>
            ) : (
              <button
                key={p}
                onClick={() => onPageChange(p as number)}
                className={`
                xl:text-[24px] text-[20px] font-bold
                ${p === page ? "text-(--foreground)" : "text-(--grey-80)"}
                transition
              `}
              >
                {p}
              </button>
            )
          )}
        </div>

        {/* Вперёд */}
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="2xl:py-[10px] 2xl:px-[15px] px-[10px] py-[5px] rounded-[50px] block border border-(--black-10) disabled:opacity-50"
        >
          <ChevronRightIcon className="xl:w-[32px] w-[24px]" />
        </button>
      </div>
    </div>
  );
}
