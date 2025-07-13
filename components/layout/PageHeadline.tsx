// src/components/PageHeadline.tsx
"use client";

import React from "react";

interface PageHeadlineProps {
  title: string;
  searchValue: string;
  onSearchChange: (v: string) => void;
  addText?: string;
  onAdd?: () => void;
  onPrint?: () => void;
}

export function PageHeadline({
  title,
  searchValue,
  onSearchChange,
  addText,
  onAdd,
  onPrint,
}: PageHeadlineProps) {
  return (
    <div className="page-headline mb-4 flex flex-wrap items-center gap-4">
      <h2 className="text-2xl font-semibold flex-1">{title}</h2>

      {/* Поиск */}
      <input
        type="search"
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Поиск…"
        className="px-4 py-2 border rounded-full max-w-sm flex-1 lg:flex-none"
      />

      {/* Добавить */}
      {onAdd && addText && (
        <button
          onClick={onAdd}
          className="px-4 py-2 bg-[var(--primary)] text-white rounded-full hover:bg-[var(--primary-dark)] transition"
        >
          {addText}
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
  );
}
