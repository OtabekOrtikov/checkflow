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
  const safeTotal = Math.max(0, total);
  const safePageSize = Math.max(1, pageSize);
  const totalPages = Math.max(1, Math.ceil(safeTotal / safePageSize));
  const start = (page - 1) * safePageSize + 1;
  const end = Math.min(page * safePageSize, safeTotal);

  // Build pages array dynamically based on current page
  let pages: (number | "...")[] = [];
  const currentPage = Math.max(1, Math.min(page, totalPages));

  if (totalPages <= 7) {
    pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  } else if (currentPage <= 3) {
    pages = [1, 2, 3, "...", totalPages];
  } else if (currentPage >= totalPages - 2) {
    pages = [1, "...", totalPages - 2, totalPages - 1, totalPages];
  } else {
    pages = [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  }

  // Remove duplicates and ensure valid pages
  const uniquePages = Array.from(
    new Set(
      pages.filter(
        (p) =>
          p === "..." || (typeof p === "number" && p >= 1 && p <= totalPages)
      )
    )
  );

  return (
    <div className="flex items-center justify-between flex-wrap lg:flex-nowrap gap-2.5">
      <p className="xl:text-[24px] font-[Bounded] font-[566] flex flex-row lg:flex-col gap-1 justify-between w-full">
        <span className="text-[var(--black-30)]">Показаны пришедшие</span>
        <span className="text-[var(--foreground)]">
          {total !== 0 ? `${start}-` : ""}
          {Math.min(start - 1 + pageSize, total)} из {total}
        </span>
      </p>
      <div className="flex items-center gap-x-[10px] w-full lg:w-auto justify-between">
        {/* Назад */}
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="2xl:py-[10px] 2xl:px-[15px] px-[10px] bg-white cursor-pointer py-[5px] rounded-[50px] block border border-[var(--black-10)] disabled:opacity-50"
        >
          <ChevronLeftIcon className="w-[32px]" />
        </button>

        {/* Номера страниц */}
        <div className="flex items-center gap-x-[10px] justify-evenly w-full lg:w-auto">
          {uniquePages.map((p, i) => {
            const key = `${i}-${typeof p === "number" ? p : "ellipsis"}`;
            return p === "..." ? (
              <span
                key={key}
                className="text-[var(--grey-80)] xl:text-[24px] text-[20px] font-bold"
              >
                ...
              </span>
            ) : (
              <button
                key={key}
                onClick={() => onPageChange(p as number)}
                className={`
                  xl:text-[24px] text-[20px] font-bold
                  ${
                    p === currentPage
                      ? "text-[var(--foreground)]"
                      : "text-[var(--grey-80)]"
                  }
                  transition
                `}
              >
                {p}
              </button>
            );
          })}
        </div>

        {/* Вперёд */}
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="2xl:py-[10px] 2xl:px-[15px] bg-white px-[10px] py-[5px] cursor-pointer rounded-[50px] block border border-[var(--black-10)] disabled:opacity-50"
        >
          <ChevronRightIcon className="w-[32px]" />
        </button>
      </div>
    </div>
  );
}
