"use client";

import { useEffect, useState } from "react";
import { PageHeadline } from "@/components/PageHeadline";
import { GridReportCards } from "@/components/reports/GridReportCards";
import {
  fetchReports,
} from "@/services/reportService";
import type { Report } from "@/types/report.t";
import { Navbar } from "@/components/Navbar";

export default function ReportsPage() {
  const [data, setData] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    fetchReports()
      .then((r) => setData(r.data))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  return (
    <div className="flex items-start">
      <Navbar />

      <main className="flex-1 2xl:py-[45px] 2xl:px-[30px] min-h-screen lg:py-[30px] lg:px-[15px] flex flex-col gap-y-[20px]">
        <PageHeadline title="Отчеты" />

        <GridReportCards
          data={data}
          loading={loading}
        />
      </main>
    </div>
  );
}
