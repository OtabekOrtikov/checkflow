// src/services/userService.ts
import { api } from "./api";
import type {
  ProfileInfo,
  TimeWorkedRecord,
  DepartmentAssignment,
  PositionAssignment,
} from "@/types/profile.t";

export const fetchProfileInfo = () => api.get<ProfileInfo>("/user/profile");

export const fetchTimeWorked = () =>
  api.get<TimeWorkedRecord[]>("/user/time-worked");

export const fetchDepartments = () =>
  api.get<DepartmentAssignment[]>("/user/departments");

export const fetchPositions = () =>
  api.get<PositionAssignment[]>("/user/positions");
