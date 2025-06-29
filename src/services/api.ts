// src/services/api.ts
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import {
  mockProfileInfo,
  mockTimeWorked,
  mockDepartmentAssignments,
  mockPositionAssignments,
} from "@/data/profile";
import { mockTodaySummary } from "@/data/attendance";
import { mockDisciplined } from "@/data/discipline";
import { mockDevices } from "@/data/devices";
import { mockEmployees } from "@/data/employees";
import { mockSchedules } from "@/data/schedule";
import { mockReports } from "@/data/reports";
import { mockTimeOffRequests } from "@/data/timeOff";
import {
  mockApiSettings,
  mockDeductionAdditions,
  mockDismissalTypes,
  mockGeneralSettings,
  mockHolidays,
  mockPayrollRules,
  mockPenaltyAssignments,
  mockPenaltyTypes,
  mockRoleAssignments,
  mockTimeOffTypes,
  mockUserActivities,
} from "@/data/settings";
import { HolidayType, PayrollRule, RoleAssignment } from "@/types/settings.t";

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

  mock.onGet("/reports/attendance").reply(200, {
    title: "Отчёты о посещениях",
    items: mockReports.filter((r) => r.type === "attendance"),
  });
  mock.onGet("/reports/employee").reply(200, {
    title: "Отчёты по сотруднику",
    items: mockReports.filter((r) => r.type === "employee"),
  });
  mock.onGet("/reports/salary").reply(200, {
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

  // === Роли и права доступа ===
  mock.onGet("/settings/roles").reply(200, mockRoleAssignments);

  mock.onPost("/settings/roles").reply((cfg) => {
    const item = JSON.parse(cfg.data) as RoleAssignment;
    mockRoleAssignments.push(item);
    return [201, item];
  });

  mock.onPut(/\/settings\/roles\/\w+/).reply((cfg) => {
    const id = cfg.url!.split("/").pop()!;
    const updated = JSON.parse(cfg.data) as RoleAssignment;
    const idx = mockRoleAssignments.findIndex((r) => r.id === id);
    mockRoleAssignments[idx] = { ...mockRoleAssignments[idx], ...updated };
    return [200, mockRoleAssignments[idx]];
  });

  mock.onDelete(/\/settings\/roles\/\w+/).reply((cfg) => {
    const id = cfg.url!.split("/").pop()!;
    const idx = mockRoleAssignments.findIndex((r) => r.id === id);
    mockRoleAssignments.splice(idx, 1);
    return [204];
  });

  // Time-Off Types:
  mock.onGet("/settings/time-off-types").reply(200, mockTimeOffTypes);

  mock.onPost("/settings/time-off-types").reply((cfg) => {
    const item = JSON.parse(cfg.data) as (typeof mockTimeOffTypes)[0];
    mockTimeOffTypes.push(item);
    return [201, item];
  });

  mock.onPut(/\/settings\/time-off-types\/\w+/).reply((cfg) => {
    const id = cfg.url!.split("/").pop()!;
    const idx = mockTimeOffTypes.findIndex((x) => x.id === id);
    const item = JSON.parse(cfg.data) as (typeof mockTimeOffTypes)[0];
    mockTimeOffTypes[idx] = item;
    return [200, item];
  });

  mock.onDelete(/\/settings\/time-off-types\/\w+/).reply((cfg) => {
    const id = cfg.url!.split("/").pop()!;
    const idx = mockTimeOffTypes.findIndex((x) => x.id === id);
    if (idx !== -1) mockTimeOffTypes.splice(idx, 1);
    return [204];
  });

  // FiredTypes
  mock.onGet("/settings/fired-types").reply(200, mockDismissalTypes);

  mock.onPost("/settings/fired-types").reply((cfg) => {
    const item = JSON.parse(cfg.data) as (typeof mockDismissalTypes)[0];
    mockDismissalTypes.push(item);
    return [201, item];
  });

  mock.onPut(/\/settings\/fired-types\/\w+/).reply((cfg) => {
    const id = cfg.url!.split("/").pop()!;
    const idx = mockDismissalTypes.findIndex((x) => x.id === id);
    const item = JSON.parse(cfg.data) as (typeof mockDismissalTypes)[0];
    mockDismissalTypes[idx] = item;
    return [200, item];
  });

  mock.onDelete(/\/settings\/fired-types\/\w+/).reply((cfg) => {
    const id = cfg.url!.split("/").pop()!;
    const idx = mockDismissalTypes.findIndex((x) => x.id === id);
    if (idx !== -1) mockDismissalTypes.splice(idx, 1);
    return [204];
  });

  // User Activities
  mock.onGet("/settings/user-activity").reply(200, mockUserActivities);

  // Holidays
  mock.onGet("/settings/holidays").reply(200, mockHolidays);
  mock.onPost("/settings/holidays").reply((cfg) => {
    const newItem = JSON.parse(cfg.data) as HolidayType;
    mockHolidays.push(newItem);
    return [201, newItem];
  });
  mock.onPut(/\/settings\/holidays\/\w+/).reply((cfg) => {
    const id = cfg.url!.split("/").pop()!;
    const updated = JSON.parse(cfg.data) as HolidayType;
    const idx = mockHolidays.findIndex((h) => h.id === id);
    mockHolidays[idx] = updated;
    return [200, updated];
  });
  mock.onDelete(/\/settings\/holidays\/\w+/).reply((cfg) => {
    const id = cfg.url!.split("/").pop()!;
    const idx = mockHolidays.findIndex((h) => h.id === id);
    mockHolidays.splice(idx, 1);
    return [204];
  });

  mock.onGet("/settings/payroll-rules").reply(200, mockPayrollRules);
  mock.onPost("/settings/payroll-rules").reply((cfg) => {
    const newRule = JSON.parse(cfg.data) as PayrollRule;
    mockPayrollRules.push(newRule);
    return [201, newRule];
  });
  mock.onPut(/\/settings\/payroll-rules\/\w+/).reply((cfg) => {
    const id = cfg.url!.split("/").pop()!;
    const updated = JSON.parse(cfg.data) as PayrollRule;
    const idx = mockPayrollRules.findIndex((r) => r.id === id);
    mockPayrollRules[idx] = updated;
    return [200, updated];
  });
  mock.onDelete(/\/settings\/payroll-rules\/\w+/).reply((cfg) => {
    const id = cfg.url!.split("/").pop()!;
    const idx = mockPayrollRules.findIndex((r) => r.id === id);
    mockPayrollRules.splice(idx, 1);
    return [204];
  });

  // --- SETTINGS: penalties ---
  // типы штрафов
  mock.onGet("/settings/penalties").reply(200, mockPenaltyTypes);
  mock.onPost("/settings/penalties").reply((cfg) => {
    const data = JSON.parse(cfg.data);
    const nextId = String(mockPenaltyTypes.length + 1);
    const newType = { id: nextId, ...data };
    mockPenaltyTypes.push(newType);
    return [201, newType];
  });
  mock.onPut(/\/settings\/penalties\/\w+$/).reply((cfg) => {
    const id = cfg.url!.split("/")[2];
    const idx = mockPenaltyTypes.findIndex((p) => p.id === id);
    if (idx === -1) return [404];
    Object.assign(mockPenaltyTypes[idx], JSON.parse(cfg.data));
    return [200, mockPenaltyTypes[idx]];
  });
  mock.onDelete(/\/settings\/penalties\/\w+$/).reply((cfg) => {
    const id = cfg.url!.split("/")[2];
    const idx = mockPenaltyTypes.findIndex((p) => p.id === id);
    if (idx !== -1) mockPenaltyTypes.splice(idx, 1);
    return [204];
  });

  // назначение штрафа
  mock.onPost(/\/settings\/penalties\/\w+\/assign$/).reply((cfg) => {
    const [_, , id] = cfg.url!.split("/"); // ['', 'settings','penalties','{id}','assign']
    const { employee } = JSON.parse(cfg.data);
    const nextAssignId = String(mockPenaltyAssignments.length + 1);
    const assign = { id: nextAssignId, penaltyTypeId: id, employee };
    mockPenaltyAssignments.push(assign);
    return [201, assign];
  });

  mock
    .onGet("/settings/deductions-additions")
    .reply(200, mockDeductionAdditions);

  mock.onPost("/settings/deductions-additions").reply((cfg) => {
    const data = JSON.parse(cfg.data);
    const newItem = { id: String(mockDeductionAdditions.length + 1), ...data };
    mockDeductionAdditions.push(newItem);
    return [201, newItem];
  });

  mock.onPut(/\/settings\/deductions-additions\/\w+/).reply((cfg) => {
    const id = cfg.url!.split("/").pop()!;
    const idx = mockDeductionAdditions.findIndex((r) => r.id === id);
    if (idx === -1) return [404];
    Object.assign(mockDeductionAdditions[idx], JSON.parse(cfg.data));
    return [200, mockDeductionAdditions[idx]];
  });

  mock.onDelete(/\/settings\/deductions-additions\/\w+/).reply((cfg) => {
    const id = cfg.url!.split("/").pop()!;
    const idx = mockDeductionAdditions.findIndex((r) => r.id === id);
    if (idx !== -1) mockDeductionAdditions.splice(idx, 1);
    return [204];
  });

  // Assign
  mock.onPost(/\/settings\/deductions-additions\/\w+\/assign/).reply((cfg) => {
    const [, , , typeId] = cfg.url!.split("/");
    const { employeeId } = JSON.parse(cfg.data);
    // в реале пушим в отдельный массив назначений
    return [200, { id: Date.now().toString(), typeId, employeeId }];
  });

  mock.onGet("/settings/api").reply(200, mockApiSettings);
  mock.onPut("/settings/api").reply((cfg) => {
    const updated = JSON.parse(cfg.data) as typeof mockApiSettings;
    Object.assign(mockApiSettings, updated);
    return [200, mockApiSettings];
  });

  // PROFILE MODULE
  mock.onGet("/user/profile").reply(200, mockProfileInfo);
  mock.onGet("/user/time-worked").reply(200, mockTimeWorked);
  mock.onGet("/user/departments").reply(200, mockDepartmentAssignments);
  mock.onGet("/user/positions").reply(200, mockPositionAssignments);

  // --- Departments by User ---
  mock.onGet(/\/user\/[^\/]+\/departments$/).reply((config) => {
    // GET /user/:userId/departments
    return [200, mockDepartmentAssignments];
  });

  mock.onPost(/\/user\/[^\/]+\/departments$/).reply((config) => {
    // POST /user/:userId/departments
    const newDept = JSON.parse(config.data);
    mockDepartmentAssignments.push(newDept);
    return [201, newDept];
  });

  mock.onDelete(/\/user\/[^\/]+\/departments\/\d+$/).reply((config) => {
    // DELETE /user/:userId/departments/:index
    const idx = Number(config.url!.split("/").pop());
    if (!isNaN(idx) && idx >= 0 && idx < mockDepartmentAssignments.length) {
      mockDepartmentAssignments.splice(idx, 1);
      return [204];
    }
    return [400];
  });

  // --- Positions by User ---
  mock.onGet(/\/user\/[^\/]+\/positions$/).reply((config) => {
    return [200, mockPositionAssignments];
  });

  mock.onPost(/\/user\/[^\/]+\/positions$/).reply((config) => {
    const newPos = JSON.parse(config.data);
    mockPositionAssignments.push(newPos);
    return [201, newPos];
  });

  mock.onDelete(/\/user\/[^\/]+\/positions\/\d+$/).reply((config) => {
    const idx = Number(config.url!.split("/").pop());
    if (!isNaN(idx) && idx >= 0 && idx < mockPositionAssignments.length) {
      mockPositionAssignments.splice(idx, 1);
      return [204];
    }
    return [400];
  });
}
