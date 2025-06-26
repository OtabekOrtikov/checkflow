// src/services/api.ts
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import {
  mockProfileInfo,
  mockTimeWorked,
  mockDepartmentAssignments,
  mockPositionAssignments,
} from "@/data/user";
import { mockTodaySummary } from "@/data/attendance";
import { mockDisciplined } from "@/data/discipline";
import { mockDevices } from "@/data/devices";
import { mockEmployees } from "@/data/employees";
import { mockSchedules } from "@/data/schedule";
import { mockReports } from "@/data/reports";

// 1) Создаём единый axios-инстанс
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000",
  headers: { "Content-Type": "application/json" },
});

// 2) Вешаем моки **только в development** и **только на клиенте**
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  const mock = new MockAdapter(api, { delayResponse: 200 });

  // userService моки
  mock.onGet("/user/profile").reply(200, mockProfileInfo);
  mock.onGet("/user/time-worked").reply(200, mockTimeWorked);
  mock.onGet("/user/departments").reply(200, mockDepartmentAssignments);
  mock.onGet("/user/positions").reply(200, mockPositionAssignments);

  // attendanceService мок
  mock.onGet("/attendance/today").reply(200, mockTodaySummary);

  // disciplineService мок
  mock.onGet("/disciplined").reply(200, mockDisciplined);

  // devicesService мок
  mock.onGet("/devices").reply(200, mockDevices);

  // employeesService мок
  mock.onGet("/employees").reply(200, mockEmployees);

  // schedulesService мок
  mock.onGet("/schedules").reply(200, mockSchedules);

  // reportsService мок
  mock.onGet("/reports").reply(200, mockReports);
}
