"use client";

import { TableHeadline } from "@/components/TableHeadline";
import PochtaIcon from "@/assets/icons/PochtaIcon.svg";
import PlusIcon from "@/assets/icons/plusIcon.svg";
import { fetchTodaySummary } from "@/services/attendanceService";
import { TodaySummaryRow } from "@/types/attendance.t";
import { useState, useEffect } from "react";
import Pagination from "@/components/Pagination";
import { TodayReviewTable } from "@/components/TodayReviewTable";

export const TodayReview = () => {
  const [data, setData] = useState<TodaySummaryRow[]>([]);
  const [page, setPage] = useState(1);
  const pageSize = 6; // Количество записей на странице

  useEffect(() => {
    fetchTodaySummary()
      .then((res) => setData(res.data))
      .catch(console.error);
  }, []);

  const total = data.length;
  const start = (page - 1) * pageSize;
  const displayed = data.slice(start, start + pageSize);
  return (
    <section className="today-review border border-(--gray-e6) flex flex-col gap-y-[20px] p-[20px] bg-(--white) rounded-[20px]">
      <TableHeadline
        title="Сводка на сегодня"
        isButtonVisible
        isIconVisible
        buttonText="Добавить приход и уход"
        buttonLink="/today-review/add"
        icon={<PochtaIcon />}
        btnIcon={<PlusIcon />}
      />

      {/* Таблица */}
      <TodayReviewTable displayed={displayed} />

      {/* Пагинация */}
      <Pagination
        total={total}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
      />
    </section>
  );
};
