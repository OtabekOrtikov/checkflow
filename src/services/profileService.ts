// src/services/profileService.ts
import { api } from "./api";
import type {
  ProfileInfo,
  TimeWorkedRecord,
  DepartmentAssignment,
  PositionAssignment,
} from "@/types/profile.t";

// Профиль
export const fetchProfileInfo = () => api.get<ProfileInfo>("/user/profile");
export const fetchTimeWorked = () =>
  api.get<TimeWorkedRecord[]>("/user/time-worked");

// Отделы
export const fetchDepartments = () =>
  api.get<DepartmentAssignment[]>("/user/departments");
export const fetchDepartmentsByUserId = (userId: string) =>
  api.get<DepartmentAssignment[]>(`/user/${userId}/departments`);
export const assignDepartment = (
  userId: string,
  dept: { department: string; startDate: string }
) => api.post<DepartmentAssignment>(`/user/${userId}/departments`, dept);
export const updateDepartmentByUserId = (
  userId: string,
  idx: number,
  dept: { department: string; startDate: string; endDate?: string }
) => api.put<DepartmentAssignment>(`/user/${userId}/departments/${idx}`, dept);
export const removeDepartment = (userId: string, idx: number) =>
  api.delete(`/user/${userId}/departments/${idx}`);

// Должности
export const fetchPositions = () =>
  api.get<PositionAssignment[]>("/user/positions");
export const fetchPositionsByUserId = (userId: string) =>
  api.get<PositionAssignment[]>(`/user/${userId}/positions`);
export const assignPosition = (
  userId: string,
  pos: { position: string; assignedDate: string }
) => api.post<PositionAssignment>(`/user/${userId}/positions`, pos);
export const updatePositionByUserId = (
  userId: string,
  idx: number,
  pos: { position: string; assignedDate: string; isCurrent?: boolean }
) => api.put<PositionAssignment>(`/user/${userId}/positions/${idx}`, pos);
export const removePosition = (userId: string, idx: number) =>
  api.delete(`/user/${userId}/positions/${idx}`);
