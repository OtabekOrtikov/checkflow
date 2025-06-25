import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { mockTodaySummary } from "@/data/attendance";
import type { TodaySummaryRow } from "@/types/attendance.t";

export const attendanceApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000",
  headers: { "Content-Type": "application/json" },
});

// В режиме разработки «подменяем» endpoint моком
if (process.env.NODE_ENV === "development") {
  const mock = new MockAdapter(attendanceApi, { delayResponse: 200 });
  mock.onGet("/attendance/today").reply<TodaySummaryRow[]>(200, mockTodaySummary);
}

// Метод для получения данных
export const fetchTodaySummary = () =>
  attendanceApi.get<TodaySummaryRow[]>("/attendance/today");
