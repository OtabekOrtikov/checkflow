"use client";

import { useState } from "react";
import useSWR from "swr";
import ProtectedRoute from "@/components/ProtectedRoute";
import Layout from "@/components/Layout";
import DashboardSummary from "@/components/DashboardSummary";
import { camerasService } from "@/services/cameras";
import { AttendanceRecord, AttendanceStats, AttendanceSummary } from "@/types/attendance.t";
import { MainHeadline } from "@/components/app/MainHeadline";
import DashboardTop from "@/components/DashboardTop";
import DashboardDevices from "@/components/DashboardDevices";
import DashboardChart from "@/components/DashboardChart";
import { Footer } from "@/components/Footer";
import { attendanceService } from "@/services/attendanceService";

export default function Dashboard() {
  // фиксированные даты для примера
  const todayStr = "2025-07-09";
  const tomorrowStr = "2025-07-10";

  // фронтенд-фильтры и пагинация
  const [departmentFilter, setDepartmentFilter] = useState<number>();
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // 1) Сначала загружаем _все_ записи за период
  const { data: attendanceAll, error: attendanceError } = useSWR<
    AttendanceRecord[],
    any
  >(["attendance", todayStr, tomorrowStr], () =>
    attendanceService.getAttendance({ date_from: todayStr, date_to: tomorrowStr })
  );

  const { data: summary, error: summaryError } = useSWR<AttendanceSummary>(
    "attendance-summary",
    attendanceService.getAttendanceSummary
  );

  const { data: disipline_list, error: disciplineError } = useSWR(
    "discipline-list",
    camerasService.getTopDisciplined
  );

  const { data: devices, error: devicesError } = useSWR(
    "devices-list",
    camerasService.getDevices
  );

  const { data: attendanceStats, error: statsError } = useSWR<AttendanceStats[]>(
    "attendance-stats",
    attendanceService.getAttendanceStats
  );

  if (attendanceError || summaryError || disciplineError || devicesError || statsError) {
    return <div>Ошибка при загрузке данных</div>;
  }
  if (!attendanceAll || !summary || !disipline_list || !devices || !attendanceStats) {
    return <div>Загрузка...</div>;
  }

  // 2) Применяем фронтенд-фильтр по отделу
  const filtered =
    departmentFilter != null
      ? attendanceAll.filter((rec) => rec.branch.id === departmentFilter)
      : attendanceAll;

  // 3) Пагинация уже отфильтрованных данных
  const total = filtered.length;
  const start = (page - 1) * pageSize;
  const pageItems = filtered.slice(start, start + pageSize);

  return (
    <ProtectedRoute>
      <Layout>
        <MainHeadline summary={summary} />

        <DashboardSummary
          data={pageItems}
          total={total}
          page={page}
          pageSize={pageSize}
          onPageChange={setPage}
        />

        <DashboardTop
          disciplined={disipline_list.top_disciplinary}
          undisciplined={disipline_list.top_undisciplined}
        />

        <DashboardDevices devices={devices} />

        <DashboardChart
          data={attendanceStats}
        />

        <Footer />
      </Layout>
    </ProtectedRoute>
  );
}
