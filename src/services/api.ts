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
import { mockTimeOffRequests } from "@/data/timeOff";

// 1) Создаём единый axios-инстанс
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000",
  headers: { "Content-Type": "application/json" },
});

// 2) Вешаем моки только в development (и на сервере, и в браузере)
if (process.env.NODE_ENV === "development") {
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

  // timeOffService моки
  mock.onGet(/\/time-off\?status=.*/).reply((config) => {
    const status = config.url!.split("status=")[1];
    const list = mockTimeOffRequests.filter((r) => r.status === status as any);
    return [200, list];
  });

  mock.onPost(/\/time-off\/\w+\/approve/).reply((config) => {
    const id = config.url!.split("/")[2];
    const req = mockTimeOffRequests.find((r) => r.id === id);
    if (req) req.status = "approved";
    return [200, req];
  });

  mock.onPost(/\/time-off\/\w+\/reject/).reply((config) => {
    const id = config.url!.split("/")[2];
    const req = mockTimeOffRequests.find((r) => r.id === id);
    if (req) req.status = "rejected";
    return [200, req];
  });
}