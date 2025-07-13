// FilterBar.tsx
"use client";

import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { Check, ChevronDown } from "lucide-react";
import SearchIcon from "@/assets/icons/searchIcon.svg";
import ArrowDown from "@/assets/icons/arrow-down.svg";
import { Employee } from "@/types/employee.t";
import { departmentService } from "@/services/departmentService";
import useSWR from "swr";
import { Department } from "@/types/department.t";
import PlusCircle from "@/assets/icons/PlusCircle.svg";

export interface Filters {
  status: "all" | "active" | "fired";
  workplace: number | "all";
  position: number | "all";
  created: string;
  salaryMin: string;
  salaryMax: string;
  search: string;
}

interface FilterBarProps {
  all: Employee[];
  filters: Filters;
  onChange: (c: Partial<Filters>) => void;
  setModalOpen: (open: boolean) => void;
}

const pickUnique = <K extends keyof Employee>(arr: Employee[], key: K) =>
  Array.from(new Set(arr.map((x) => x[key]))).filter(
    (x) => x !== undefined && x !== null
  ) as Employee[K][];

export default function FilterBar({
  all,
  filters,
  onChange,
  setModalOpen,
}: FilterBarProps) {
  const workplaces = pickUnique(all, "place_of_work").sort();
  const positions = pickUnique(all, "position").sort();

  return (
    <div className="flex items-center gap-2.5 flex-col-reverse xl:flex-row w-full max-w-full">
      <div className="board !flex-row !rounded-full justify-between flex-grow !w-fit !p-[5px] !gap-2.5 max-w-full overflow-scroll">
        {/* — Status */}
        <Listbox
          value={filters.status}
          onChange={(v) => onChange({ status: v })}
        >
          <div className="relative">
            <Listbox.Button className="selection-btn">
              {filters.status === "all"
                ? "Статус"
                : filters.status === "active"
                ? "Активные"
                : "Уволенные"}
              <ChevronDown className="w-6 h-6" />
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="selection-options absolute">
                {[
                  { value: "all", label: "Все" },
                  { value: "active", label: "Активные" },
                  { value: "fired", label: "Уволенные" },
                ].map((o) => (
                  <Listbox.Option
                    key={o.value}
                    value={o.value}
                    className="px-4 py-2 flex justify-between hover:bg-gray-100"
                  >
                    {o.label}
                    {filters.status === o.value && (
                      <Check className="w-4 h-4 text-green-500" />
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>

        {/* — Workplace */}
        <Listbox
          value={filters.workplace}
          onChange={(v) => onChange({ workplace: v })}
        >
          <div className="relative">
            <Listbox.Button className="selection-btn">
              {filters.workplace === "all" ? "Место работы" : filters.workplace}
              <ArrowDown className="w-6 h-6" />
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="selection-options max-h-48 overflow-y-auto">
                <Listbox.Option
                  value="all"
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  Все
                </Listbox.Option>
                {workplaces.map((w) => {
                  const { data } = useSWR<Department>(`departments/${w}`, () =>
                    departmentService.getDepartmentById(w)
                  );
                  return (
                    <Listbox.Option
                      key={w}
                      value={w}
                      className="px-4 py-2 hover:bg-gray-100"
                    >
                      {data ? data.name : `Отдел ${w}`}
                    </Listbox.Option>
                  );
                })}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>

        {/* — Position */}
        <Listbox
          value={filters.position}
          onChange={(v) => onChange({ position: v })}
        >
          <div className="relative">
            <Listbox.Button className="selection-btn">
              {filters.position === "all" ? "Должность" : filters.position}
              <ArrowDown className="w-6 h-6" />
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="selection-options max-h-48 overflow-y-auto">
                <Listbox.Option
                  value="all"
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  Все
                </Listbox.Option>
                {positions.map((p) => (
                  <Listbox.Option
                    key={p}
                    value={p}
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    {p}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>

        {/* — Created date */}
        <div className="relative">
          <input
            type="date"
            value={filters.created}
            onChange={(e) => onChange({ created: e.target.value })}
            className="selection-btn pr-10"
          />
        </div>

        {/* — Salary */}
        {/* <input
        type="number"
        placeholder="Мин зарпл."
        value={filters.salaryMin}
        onChange={(e) => onChange({ salaryMin: e.target.value })}
        className="selection-btn w-24"
      />
      <input
        type="number"
        placeholder="Макс зарпл."
        value={filters.salaryMax}
        onChange={(e) => onChange({ salaryMax: e.target.value })}
        className="selection-btn w-24"
      /> */}
      </div>
      <div className="min-h-68px flex w-full flex-grow items-center gap-2.5">
        {/* — Search */}
        <div className="relative flex-grow max-w-full w-full min-w[300px] h-[68px]">
          <input
            type="text"
            placeholder="Поиск..."
            value={filters.search}
            onChange={(e) => onChange({ search: e.target.value })}
            className="w-full pr-5 pl-12 py-3 h-full border 
            border-[var(--gray-e6)] bg-[var(--white)] rounded-[20px]
            text-2xl font-[400] text-[var(--foreground)] placeholder:text-[var(--foreground-50)] "
          />
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 scale-70 text-gray-500" />
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center py-3 px-5 bg-[var(--primary)] text-[var(--white)] rounded-full text-2xl font-medium gap-2.5"
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="white"
                strokeWidth="1.5"
              />
              <path
                d="M15 12H12M12 12H9M12 12V9M12 12V15"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </span>
          Добавить
        </button>
      </div>
    </div>
  );
}
