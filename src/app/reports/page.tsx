"use client";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { PageHeadline } from "@/components/PageHeadline";
import { fetchReports } from "@/services/reportService";
import { useState, useEffect } from "react";
import { ReportCard } from "./components/ReportCard";
import type { Report } from "@/types/report.t";

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports()
      .then((res) => setReports(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex items-start">
      <Navbar />

      <main
        className="flex-1 2xl:py-[45px] 2xl:px-[50px] min-h-screen 
        lg:py-[30px] lg:px-[35px] flex flex-col gap-y-[20px]"
      >
        <PageHeadline title="Отчеты" />

        {loading ? (
          <div className="text-center py-20 text-gray-500">Загрузка…</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px]">
            {reports.map((r) => (
              <ReportCard
                key={r.id}
                title={r.title}
                count={r.count}
                onAdd={() => alert(`Добавить к "${r.title}"`)}
                onEdit={() => alert(`Редактировать "${r.title}"`)}
              />
            ))}
          </div>
        )}

        <Footer className="mt-auto" />
      </main>
    </div>
  );
}
