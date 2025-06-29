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
import { mockGeneralSettings } from "@/data/settings";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000",
  headers: { "Content-Type": "application/json" },
});

if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  const mock = new MockAdapter(api, { delayResponse: 200 });

  // userService
  mock.onGet("/user/profile").reply(200, mockProfileInfo);
  mock.onGet("/user/time-worked").reply(200, mockTimeWorked);
  mock.onGet("/user/departments").reply(200, mockDepartmentAssignments);
  mock.onGet("/user/positions").reply(200, mockPositionAssignments);

  // attendanceService
  mock.onGet("/attendance/today").reply(200, mockTodaySummary);

  // disciplineService
  mock.onGet("/disciplined").reply(200, mockDisciplined);

  // devicesService
  mock.onGet("/devices").reply(200, mockDevices);

  // employeesService
  mock.onGet("/employees").reply(200, mockEmployees);

  // schedulesService
  mock.onGet("/schedules").reply(200, mockSchedules);

  // GET /reports — список
  mock.onGet("/reports").reply(200, mockReports);

  // GET /reports/:type — детали одного отчёта
  mock.onGet(/\/reports\/\w+/).reply((cfg) => {
    const type = cfg.url!.split("/")[2];
    const report = mockReports.find((r) => r.type === type);
    return report ? [200, report] : [404, { message: "Report not found" }];
  });

  // POST /reports/:type/:id/ - изменение данных отчёта
  mock.onPost(/\/reports\/\w+\/\w+/).reply((cfg) => {
    const [type, id] = cfg.url!.split("/").slice(2);
    const report = mockReports.find((r) => r.id === id);
    if (!report) return [404, { message: "Report not found" }];
    return [200, { message: "Report updated successfully" }];
  });

  // POST /reports/:type - создание нового отчёта
  mock.onPost(/\/reports\/\w+/).reply((cfg) => {
    const type = cfg.url!.split("/")[2];
    const reportsByType = mockReports.filter((r) => r.type === type);
    const newReportId = String(reportsByType.length + 1);
    const requestData = JSON.parse(cfg.data);
    const newReport = { id: newReportId, type, ...requestData };
    mockReports.push(newReport);
    return [201, newReport];
  });

  mock
    .onGet("/reports/attendance")
    .reply(200, {
      title: "Отчёты о посещениях",
      items: mockReports.filter((r) => r.type === "attendance"),
    });
  mock
    .onGet("/reports/employee")
    .reply(200, {
      title: "Отчёты по сотруднику",
      items: mockReports.filter((r) => r.type === "employee"),
    });
  mock
    .onGet("/reports/salary")
    .reply(200, {
      title: "Отчёты по зарплате и штрафам",
      items: mockReports.filter((r) => r.type === "salary"),
    });

  mock.onGet(/\/reports\/\w+\/\w+\/download/).reply(200);
  mock.onDelete(/\/reports\/\w+\/\w+/).reply(204);

  // timeOffService
  mock.onGet(/\/time-off\?status=.*$/).reply((cfg) => {
    const status = cfg.url!.split("status=")[1];
    const list = mockTimeOffRequests.filter((r) => r.status === status);
    return [200, list];
  });
  mock.onPost(/\/time-off\/\w+\/approve/).reply((cfg) => {
    const id = cfg.url!.split("/")[2];
    const req = mockTimeOffRequests.find((r) => r.id === id);
    if (req) req.status = "approved";
    return [200, req];
  });
  mock.onPost(/\/time-off\/\w+\/reject/).reply((cfg) => {
    const id = cfg.url!.split("/")[2];
    const req = mockTimeOffRequests.find((r) => r.id === id);
    if (req) req.status = "rejected";
    return [200, req];
  });

  // settings
  mock.onGet("/settings/general").reply(200, mockGeneralSettings);
  mock.onPut("/settings/general").reply((cfg) => {
    // обновляем мок-объект и возвращаем его
    const updated = JSON.parse(cfg.data) as typeof mockGeneralSettings;
    Object.assign(mockGeneralSettings, updated);
    return [200, mockGeneralSettings];
  });
}
