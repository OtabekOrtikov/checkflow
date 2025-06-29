// src/services/reportService.ts
import { api } from "./api";
import type { Report, ReportItem } from "@/types/report.t";

export const fetchReports = () => api.get<Report[]>("/reports");
export const fetchCategoryByType = (type: string) =>
  api.get<Report>(`/reports/${type}`);

export const fetchResultByTypeAndId = (type: string, id: string) =>
  api.get<any>(`/reports/${type}/${id}`);

export const updateReportByTypeAndId = (type: string, id: string, data: any) =>
  api.put<any>(`/reports/${type}/${id}`, data);

export const createReport = (type: string, data: ReportItem) =>
  api.post<any>(`/reports/${type}`, data);

export const downloadReport = (type: string, id: string) =>
  api.get(`/reports/${type}/${id}/download`, { responseType: "blob" });

export const deleteReport = (type: string, id: string) =>
  api.delete(`/reports/${type}/${id}`);