"use client";

import { Navbar } from "@/components/Navbar";
import { PageHeadline } from "@/components/PageHeadline";
import { SearchInput } from "@/components/SearchInput";
import PlusInCircle from "@/assets/icons/plusInCircle.svg";
import Link from "next/link";
import PrintIcon from "@/assets/icons/printIcon.svg";
import { fetchSchedules } from "@/services/scheduleService";
import { WorkSchedule } from "@/types/schedule.t";
import { useState, useEffect, useMemo } from "react";
import Pagination from "@/components/Pagination";
import { GridScheduleTable } from "../../components/schedules/GridScheduleTable";
import { Footer } from "@/components/Footer";

export default function SchedulesPage() {
  const [all, setAll] = useState<WorkSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // пагинация
  const [page, setPage] = useState(1);
  const pageSize = 7;

  useEffect(() => {
    fetchSchedules()
      .then((res) => setAll(res.data))
      .finally(() => setLoading(false));
  }, []);

  // фильтр по названию
  const filtered = useMemo(() => {
    if (!search) return all;
    return all.filter((s) =>
      s.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [all, search]);

  // пагинируем
  const total = filtered.length;
  const start = (page - 1) * pageSize;
  const paged = filtered.slice(start, start + pageSize);

  return (
    <div className="flex items-start">
      <Navbar />

      <main className="flex-1 2xl:py-[45px] 2xl:px-[50px] min-h-screen lg:py-[30px] lg:px-[35px] flex flex-col gap-y-[20px]">
        <PageHeadline title="Рабочие графики">
          <div className="flex items-center gap-x-[10px] ml-auto">
            <div className="relative flex-1 h-[60px] min-w-[210px] ">
              <SearchInput
                id="search-workGraphs"
                placeholder="Поиск"
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
            <button
              className={`flex w-fit items-center gap-x-[10px] 
                text-(--primary) bg-(--white) border border-(--gray-e6) 2xl:text-[24px] text-[20px] font-medium
                p-[10px] rounded-[50px]
                cursor-pointer`}
            >
              <PrintIcon />
            </button>
          </div>
        </PageHeadline>

        <GridScheduleTable
          data={paged}
          loading={loading}
        />

        {/* Пагинация */}
        <div className="mt-4">
          <Pagination
            total={total}
            page={page}
            pageSize={pageSize}
            onPageChange={setPage}
          />
        </div>

        <Footer className="mt-auto" />
      </main>
    </div>
  );
}
