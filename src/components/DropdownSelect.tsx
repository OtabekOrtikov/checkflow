// src/components/common/DropdownSelect.tsx
"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import ArrowDown from "@/assets/icons/arrow-down.svg";

interface Option {
  label: string;
  value: string;
}

interface DropdownSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function DropdownSelect({
  options,
  value,
  onChange,
  placeholder = "Выберите…",
  className = "",
}: DropdownSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // закрываем по клику вне
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const selected = options.find((o) => o.value === value)?.label;

  return (
    <div ref={ref} className={`relative ${className} h-full `}>
      <button
        onClick={() => setOpen((o) => !o)}
        className={`
          w-full flex items-center justify-between
          pl-[20px] pr-[15px] py-[14px] border rounded-full cursor-pointer
          bg-(--background) border-(--gray-e6)
          h-full text-(--foreground) xl:text-[18px] text-[18px] font-medium gap-[10px]
        `}
      >
        <span>{selected || placeholder}</span>
        <ArrowDown />
      </button>

      {open && (
        <ul
          className="
            absolute z-10 mt-1 min-w-full w-fit bg-white border rounded shadow-lg
            max-h-60 overflow-auto
          "
        >
          {options.map((opt) => (
            <li key={opt.value}>
              <button
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={`
                  w-full text-left px-3 py-2 hover:bg-gray-100 text-nowrap
                  ${opt.value === value ? "bg-blue-100 text-blue-700" : ""}
                `}
              >
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
