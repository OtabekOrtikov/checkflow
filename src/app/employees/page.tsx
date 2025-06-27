// src/app/employees/page.tsx
"use client";

import { useEffect, useState, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { PageHeadline } from "@/components/PageHeadline";
import Pagination from "@/components/Pagination";
import { fetchEmployees } from "@/services/employeeService";
import type { Employee } from "@/types/employee.t";
import { DropdownSelect } from "@/components/DropdownSelect";
import PlusInCircle from "@/assets/icons/plusInCircle.svg";
import Link from "next/link";
import { SearchInput } from "@/components/SearchInput";
import { GridEmployeeTable } from "@/components/employees/GridEmployeeTable";
import { Footer } from "@/components/Footer";

type SortField = "name" | "position" | "department" | "salary" | "identified";

export default function EmployeesPage() {
  const [all, setAll] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  // фильтры и поиск
  const [status, setStatus] = useState<"all" | "active" | "inactive">("all");
  const [workType, setWorkType] = useState<string>("all");
  const [position, setPosition] = useState<string>("all");
  const [created, setCreated] = useState<"all" | "7" | "30" | "365">("all");
  const [shift, setShift] = useState<"all" | "Дн" | "Ноч">("all");
  const [search, setSearch] = useState("");

  // сортировка
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // пагинация
  const [page, setPage] = useState(1);
  const pageSize = 15;

  useEffect(() => {
    fetchEmployees()
      .then((res) => setAll(res.data))
      .finally(() => setLoading(false));
  }, []);

  // построим опции
  const statusOptions = [
    { label: "Все статусы", value: "all" },
    { label: "Активный", value: "active" },
    { label: "Неактивный", value: "inactive" },
  ];

  const workPlaceOptions = useMemo(
    () =>
      ["all", ...new Set(all.map((e) => e.workPlace))].map((o) => ({
        label: o === "all" ? "Место работы" : o,
        value: o,
      })),
    [all]
  );

  const positionOptions = useMemo(
    () =>
      ["all", ...new Set(all.map((e) => e.position))].map((o) => ({
        label: o === "all" ? "Должность" : o,
        value: o,
      })),
    [all]
  );

  const createdOptions = [
    { label: "Создано", value: "all" },
    { label: "За 7 дней", value: "7" },
    { label: "За 30 дней", value: "30" },
    { label: "За год", value: "365" },
  ];

  const shiftOptions = [
    { label: "Смена сотрудника", value: "all" },
    { label: "Дн", value: "Дн" },
    { label: "Ноч", value: "Ноч" },
  ];

  // фильтрация
  const filtered = useMemo(() => {
    return all.filter((e) => {
      if (status !== "all" && e.status !== status) return false;
      if (workType !== "all" && e.workType !== workType) return false;
      if (position !== "all" && e.position !== position) return false;
      if (shift !== "all" && e.shift !== shift) return false;
      if (created !== "all") {
        const days = parseInt(created, 10);
        const cutoff = Date.now() - days * 864e5;
        if (new Date(e.createdAt).getTime() < cutoff) return false;
      }
      if (search && !e.name.toLowerCase().includes(search.toLowerCase()))
        return false;
      return true;
    });
  }, [all, status, workType, position, shift, created, search]);

  // пагинация
  const sorted = useMemo(() => {
    if (!sortField) return filtered;
    return [...filtered].sort((a, b) => {
      let diff: number;
      if (sortField === "salary") {
        diff = a.salary - b.salary;
      } else if (sortField === "identified") {
        diff = a.identified === b.identified ? 0 : a.identified ? 1 : -1;
      } else {
        diff = String(a[sortField]).localeCompare(String(b[sortField]), "ru");
      }
      return sortOrder === "asc" ? diff : -diff;
    });
  }, [filtered, sortField, sortOrder]);

  // отрезаем страницу
  const total = sorted.length;
  const start = (page - 1) * pageSize;
  const paged = sorted.slice(start, start + pageSize);

  // при клике на заголовок меняем поле и порядок
  function onHeaderClick(field: SortField) {
    if (sortField === field) {
      setSortOrder((o) => (o === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
    setPage(1);
  }

  return (
    <div className="flex items-start max-w-screen overflow-hidden">
      <Navbar />

      <main className="flex-1 2xl:py-[45px] 2xl:px-[50px] lg:py-[30px] lg:px-[35px] flex flex-col gap-y-[20px]">
        <PageHeadline title="Сотрудники" isCountVisible count={all.length} />

        {/* Фильтры */}
        <div className="flex flex-3 items-center gap-[10px] justify-between overflow-x-auto flex-wrap">
          <div className="flex text-nowrap w-fit gap-[5px] bg-(--white) border border-(--gray-e6) rounded-full p-[5px] items-center">
            <DropdownSelect
              options={statusOptions}
              value={status}
              onChange={(v) => {
                setStatus(v as any);
                setPage(1);
              }}
              placeholder="Статус"
              className="w-fit"
            />

            <DropdownSelect
              options={workPlaceOptions}
              value={workType}
              onChange={(v) => {
                setWorkType(v);
                setPage(1);
              }}
              className="w-fit"
            />

            <DropdownSelect
              options={positionOptions}
              value={position}
              onChange={(v) => {
                setPosition(v);
                setPage(1);
              }}
              placeholder="Должность"
              className="w-fit"
            />

            <DropdownSelect
              options={createdOptions}
              value={created}
              onChange={(v) => {
                setCreated(v as any);
                setPage(1);
              }}
              placeholder="Дата создания"
              className="w-fit"
            />

            <DropdownSelect
              options={shiftOptions}
              value={shift}
              onChange={(v) => {
                setShift(v as any);
                setPage(1);
              }}
              placeholder="Смена"
              className="w-fit"
            />
          </div>
          <div className="flex items-center gap-x-[10px] w-full flex-1">
            <div className="relative flex-1 h-[60px] min-w-[210px] ">
              <SearchInput
                id="search-employees"
                placeholder="Поиск"
                value={search}
                onChange={(value) => {
                  setSearch(value);
                  setPage(1);
                }}
                className="w-full h-full 2xl:min-h-[60px] min-w-[210px] rounded-[15px] border border-(--black-10) bg-(--white)"
              />
            </div>
            <Link
              href="/employees/add-employee/"
              className={`flex w-fit items-center gap-x-[10px] 
                bg-(--primary) text-(--white) 2xl:text-[24px] text-[20px] font-medium
                p-[10px] rounded-[50px]
                cursor-pointer`}
            >
              <PlusInCircle />
              <span>Добавить</span>
            </Link>
          </div>
        </div>

        {/* Таблица */}
        <GridEmployeeTable
          data={paged}
          loading={loading}
          sortField={sortField}
          sortOrder={sortOrder}
          onHeaderClick={onHeaderClick}
        />

        {/* Пагинация */}
        <Pagination
          total={total}
          page={page}
          pageSize={pageSize}
          onPageChange={setPage}
        />

        <Footer />
      </main>
    </div>
  );
}
