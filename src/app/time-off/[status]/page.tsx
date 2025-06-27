// src/app/time-off/[status]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { PageHeadline } from "@/components/PageHeadline";
import { SearchInput } from "@/components/SearchInput";
import PlusInCircle from "@/assets/icons/plusInCircle.svg";
import { mockTimeOffRequests } from "@/data/timeOff";
import { GridTimeOffTable } from "@/components/GridTimeOffTable";
import Link from "next/link";
import { TimeOffRequest } from "@/types/timeOff.t";
import { Footer } from "@/components/Footer";

type Status = "pending" | "approved" | "rejected" | "deleted";

export default function TimeOffStatusPage() {
  const params = useParams();
  const status = params?.status as Status; // получаем статус из параметров URL, по умолчанию "pending"
  const [data, setData] = useState<TimeOffRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // пагинация
  const [page, setPage] = useState(1);
  const pageSize = 6;

  // Фильтрация из мока при смене статуса
  useEffect(() => {
    setLoading(true);
    // берём из массива именно нужный статус
    const filtered = mockTimeOffRequests.filter((r) => r.status === status);
    setData(filtered);
    setPage(1);
    setLoading(false);
  }, [status]);

  // Обновление статуса «внутри» мока
  const handleApprove = (id: string) => {
    const rec = mockTimeOffRequests.find((r) => r.id === id);
    if (rec) rec.status = "approved";
    // обновляем текущий список
    setData(mockTimeOffRequests.filter((r) => r.status === status));
  };

  const handleReject = (id: string) => {
    const rec = mockTimeOffRequests.find((r) => r.id === id);
    if (rec) rec.status = "rejected";
    setData(mockTimeOffRequests.filter((r) => r.status === status));
  };

  // Пагинация
  const start = (page - 1) * pageSize;
  const paged = data.slice(start, start + pageSize);

  // Таб-бар
  const tabs: { key: Status; label: string }[] = [
    { key: "pending", label: "В ожидании" },
    { key: "approved", label: "Принятые" },
    { key: "rejected", label: "Непринятые" },
    { key: "deleted", label: "Удалённые" },
  ];

  return (
    <div className="flex items-start">
      <Navbar />

      <main
        className="flex-1 2xl:py-[45px] 2xl:px-[50px] min-h-screen 
        lg:py-[30px] lg:px-[35px] flex flex-col gap-y-[20px]"
      >
        <PageHeadline title="Отгулы">
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
          </div>
        </PageHeadline>

        <GridTimeOffTable
          data={paged}
          loading={loading}
          status={status}
          page={page}
          setPage={setPage}
          onApprove={handleApprove}
          onReject={handleReject}
        />

        <Footer className="mt-auto" />
      </main>
    </div>
  );
}
