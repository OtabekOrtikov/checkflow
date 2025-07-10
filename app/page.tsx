"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import ProtectedRoute from "@/components/ProtectedRoute";
import Layout from "@/components/Layout";
import DashboardSummary from "@/components/DashboardSummary";
import DashboardTop from "@/components/DashboardTop";
import DashboardDevices from "@/components/DashboardDevices";
import DashboardChart from "@/components/DashboardChart";
import { camerasService } from "@/services/cameras";
import {
  AttendanceSummary,
  DisciplineUser,
  Device,
  StatsResponse,
} from "@/types/checkflow";

export default function Dashboard() {
  const [chartPeriod, setChartPeriod] = useState<"week" | "month" | "year">(
    "week"
  );

  const { data: summary, error: summaryError } = useSWR<AttendanceSummary>(
    "attendance-summary",
    camerasService.getAttendanceSummary
  );

  const { data: disciplined, error: disciplinedError } = useSWR<
    DisciplineUser[]
  >("top-disciplined", camerasService.getTopDisciplined);

  const { data: undisciplined, error: undisciplinedError } = useSWR<
    DisciplineUser[]
  >("top-undisciplined", camerasService.getTopUndisciplined);

  const { data: devices, error: devicesError } = useSWR<Device[]>(
    "devices",
    camerasService.getDevices
  );

  const { data: stats, error: statsError } = useSWR<StatsResponse>(
    ["attendance-stats", chartPeriod],
    () => camerasService.getAttendanceStats(chartPeriod)
  );

  const handlePeriodChange = (period: "week" | "month" | "year") => {
    setChartPeriod(period);
  };

  // if (
  //   summaryError ||
  //   disciplinedError ||
  //   undisciplinedError ||
  //   devicesError ||
  //   statsError
  // ) {
  //   return (
  //     <ProtectedRoute>
  //       <Layout>
  //         <div className="flex items-center justify-center min-h-96">
  //           <div className="text-center">
  //             <h3 className="text-lg font-medium text-gray-900 mb-2">
  //               Ошибка загрузки данных
  //             </h3>
  //             <p className="text-gray-600">Пожалуйста, попробуйте позже</p>
  //           </div>
  //         </div>
  //       </Layout>
  //     </ProtectedRoute>
  //   );
  // }

  // if (!summary || !disciplined || !undisciplined || !devices || !stats) {
  //   return (
  //     <ProtectedRoute>
  //       <Layout>
  //         <div className="flex items-center justify-center min-h-96">
  //           <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
  //         </div>
  //       </Layout>
  //     </ProtectedRoute>
  //   );
  // }

  return (
    <ProtectedRoute>
      <Layout>
        <div className="flex justify-between sm:items-center w-full gap-[20px] sm:flex-row flex-col">
          <div>
            <h2 className="flex items-center 2xl:gap-x-[20px] gap-x-[10px]">
              <span className="aspect-square 2xl:w-[32px] w-[26px] bg-[var(--red)] block rounded-full"></span>
              <span className="2xl:text-5xl lg:text-3xl text-[var(--foreground)] font-[Bounded] font-[566]">
                Воскресенье
              </span>
            </h2>
            <p className="2xl:text-4xl lg:text-2xl">8 июня, 2025</p>
          </div>
          <div className="flex items-center gap-x-[10px] overflow-x-auto lg:max-w-fit max-w-[400px]">
            <div className="flex items-start flex-col 2xl:gap-y-[20px] lg:gap-y-[10px] pb-[8px] bg-[var(--white)] rounded-[20px] p-[12px]">
              <div className="flex items-start justify-between w-full">
                <p className="2xl:text-5xl lg:text-3xl font-[Bounded] font-[566] text-[var(--foreground)]">
                  85
                </p>
                <span className="aspect-square w-[20px] bg-[var(--red)] block rounded-full"></span>
              </div>
              <p className="font-[Bounded] font-[566] text-[var(--foreground)] opacity-[0.3] 2xl:text-2xl lg:text-[20px] whitespace-nowrap">
                Не пришли
              </p>
            </div>
            <div className="flex items-start flex-col 2xl:gap-y-[20px] lg:gap-y-[10px] pb-[8px] bg-[var(--white)] rounded-[20px] p-[12px]">
              <div className="flex items-start justify-between w-full">
                <p className="2xl:text-5xl lg:text-3xl font-[Bounded] font-[566] text-[var(--foreground)]">
                  3
                </p>
                <span className="aspect-square w-[20px] bg-[var(--yellow)] block rounded-full"></span>
              </div>
              <p className="font-[Bounded] font-[566] text-[var(--foreground)] opacity-[0.3] 2xl:text-2xl lg:text-[20px] whitespace-nowrap">
                Опаздали
              </p>
            </div>
            <div className="flex items-start flex-col 2xl:gap-y-[20px] lg:gap-y-[10px] pb-[8px] bg-[var(--white)] rounded-[20px] p-[12px]">
              <div className="flex items-start justify-between w-full">
                <p className="2xl:text-5xl lg:text-3xl font-[Bounded] font-[566] text-[var(--foreground)]">
                  29
                </p>
                <span className="aspect-square w-[20px] bg-[var(--green)] block rounded-full"></span>
              </div>
              <p className="font-[Bounded] font-[566] text-[var(--foreground)] opacity-[0.3] 2xl:text-2xl lg:text-[20px] whitespace-nowrap">
                Пришли
              </p>
            </div>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
