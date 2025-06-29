// src/types/report.t.ts
export type ReportType = "employee" | "attendance" | "salary";

export interface ReportItem {
  id: string;
  title?: string;           // есть только у employee-отчетов
  startDate: string;
  endDate: string;
  createdAt: string;
}

export interface Report {
  id: string;
  title: string;
  type: ReportType;
  items: ReportItem[];
}