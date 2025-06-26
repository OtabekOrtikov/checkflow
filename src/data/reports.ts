import type { Report } from "@/types/report.t";

export const mockReports: Report[] = [
  { id: "general", title: "Отчёты", count: 2 },
  { id: "pdf", title: "Отчёт – PDF", count: 4 },
  { id: "visits", title: "Отчёт о посещениях – Excel", count: 9 },
  { id: "excel", title: "Отчёт – Excel", count: 2 },
];
