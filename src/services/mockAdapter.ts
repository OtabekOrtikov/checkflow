// src/services/mockAdapter.ts
import MockAdapter from "axios-mock-adapter";
import { api } from "./api";

import {
  mockProfileInfo,
  mockTimeWorked,
  mockDepartmentAssignments,
  mockPositionAssignments,
} from "@/data/user";
import { mockTodaySummary } from "@/data/attendance";
import { mockDisciplined } from "@/data/discipline";

// Подключаем только в development
if (process.env.NODE_ENV === "development") {
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
}
