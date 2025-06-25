// src/services/attendanceService.ts
import { api } from "./api";
import type { TodaySummaryRow } from "@/types/attendance.t";

export const fetchTodaySummary = () =>
  api.get<TodaySummaryRow[]>("/attendance/today");
