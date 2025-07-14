// src/components/PageHeadline.tsx
"use client";

import React from "react";

import SearchIcon from "@/assets/icons/searchIcon.svg";

interface PageHeadlineProps {
  title: string;
  searchValue?: string;
  onSearchChange?: (v: string) => void;
  addText?: string;
  onAdd?: () => void;
  onPrint?: () => void;
  btnIcon?: React.ReactNode;
}

export function PageHeadline({
  title,
  searchValue,
  onSearchChange,
  addText,
  onAdd,
  onPrint,
  btnIcon,
}: PageHeadlineProps) {
  return (
    <div className="page-headline mb-4 flex flex-wrap items-center gap-4">
      <h2 className="text-2xl lg:text-5xl font-semibold flex-1 font-[Bounded]">
        {title}
      </h2>

      <div className="flex gap-2.5">
        {/* Поиск */}
        {onSearchChange && (
          <div className="relative">
            <p className="absolute left-3 top-1/2 -translate-y-1/2">
              <SearchIcon className="w-[24px] h-[24px] opacity-50" />
            </p>

            <input
              type="search"
              value={searchValue}
              onChange={(e) => onSearchChange?.(e.target.value)}
              placeholder="Поиск…"
              className="input !pl-12"
            />
          </div>
        )}

        {/* Добавить */}
        {onAdd && addText && (
          <button
            onClick={onAdd}
            className="px-4 py-2 bg-[var(--primary)] text-white rounded-full
          text-2xl font-medium flex items-center gap-2.5 whitespace-nowrap"
          >
            <span>{btnIcon}</span> <span>{addText}</span>
          </button>
        )}

        {/* Печать */}
        {onPrint && (
          <button
            onClick={onPrint}
            className="px-4 py-2 border border-[var(--gray-e6)] rounded-full hover:bg-gray-100 transition"
          >
            Печать
          </button>
        )}
      </div>
    </div>
  );
}
