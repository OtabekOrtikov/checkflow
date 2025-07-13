// src/services/reportService.ts
import api from "@/utils/api";
import { ReportBase, CreateReportPayload } from "@/types/report.t";

export const reportService = {
  getAttendanceReports: async (): Promise<ReportBase[]> =>
    (await api.get("/reports/attendance/")).data,

  createAttendanceReport: async (payload: CreateReportPayload) =>
    (await api.post("/reports/attendance/create/", payload)).data,

  // === Зарплатные отчёты ===
  getSalaryReports: async (): Promise<ReportBase[]> =>
    (await api.get("/reports/salary/")).data,

  createSalaryReport: async (payload: CreateReportPayload) =>
    (await api.post("/reports/salary/create/", payload)).data,

  // === Отчёты по сотруднику ===
  getEmployeeReports: async (): Promise<ReportBase[]> =>
    (await api.get("/reports/employee/")).data,

  createEmployeeReport: async (payload: CreateReportPayload) =>
    (await api.post("/reports/employee/create/", payload)).data,

  // === Отчёты по отделам ===
  getDepartmentReports: async (): Promise<ReportBase[]> =>
    (await api.get("/reports/department/")).data,

  createDepartmentReport: async (payload: CreateReportPayload) =>
    (await api.post("/reports/department/create/", payload)).data,

  // === Отчёты по гендеру ===
  getGenderReports: async (): Promise<ReportBase[]> =>
    (await api.get("/reports/gender/")).data,

  createGenderReport: async (payload: CreateReportPayload) =>
    (await api.post("/reports/gender/create/", payload)).data,

  // === Удаление ===
  deleteReport: async (type: string, id: number) =>
    api.delete(`/reports/${type}/${id}/delete/`),

  // === Скачивание ===
  downloadAttendanceReport: (id: number) =>
    api.get(`/reports/download/attendance/${id}/`, { responseType: "blob" }),

  downloadSalaryReport: (id: number) =>
    api.get(`/reports/download/excel/${id}/`, { responseType: "blob" }),

  downloadEmployeeReport: (id: number) =>
    api.get(`/reports/download/pdf/${id}/`, { responseType: "blob" }),

  downloadDepartmentReport: (id: number, filters?: { department?: number }) =>
    api.get(`/reports/download/excel/${id}/`, {
      params: filters,
      responseType: "blob",
    }),

  downloadGenderReport: (id: number, filters?: { gender?: string }) =>
    api.get(`/reports/download/excel/${id}/`, {
      params: filters,
      responseType: "blob",
    }),
};
