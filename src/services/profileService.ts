// src/services/profileService.ts
import { api } from "./api";
import type {
  ProfileInfo,
  TimeWorkedRecord,
  DepartmentAssignment,
  PositionAssignment,
  PayrollRuleAssignment,
  AutoPenaltyAssignment,
  SalaryAssignment,
  WageAssignment,
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

// ------- Salary -------
export const fetchSalaryAssignments = (userId: string) =>
  api.get<SalaryAssignment[]>(`/user/${userId}/salary`);
export const assignSalary = (userId: string, item: SalaryAssignment) =>
  api.post<SalaryAssignment>(`/user/${userId}/salary`, item);
export const updateSalary = (
  userId: string,
  idx: number,
  item: SalaryAssignment
) => api.put<SalaryAssignment>(`/user/${userId}/salary/${idx}`, item);
export const deleteSalary = (userId: string, idx: number) =>
  api.delete(`/user/${userId}/salary/${idx}`);

// ------- Wage -------
export const fetchWageAssignments = (userId: string) =>
  api.get<WageAssignment[]>(`/user/${userId}/wage`);
export const assignWage = (userId: string, item: WageAssignment) =>
  api.post<WageAssignment>(`/user/${userId}/wage`, item);
export const updateWage = (userId: string, idx: number, item: WageAssignment) =>
  api.put<WageAssignment>(`/user/${userId}/wage/${idx}`, item);
export const deleteWage = (userId: string, idx: number) =>
  api.delete(`/user/${userId}/wage/${idx}`);

// ------- Payroll Rule -------
export const fetchPayrollRuleAssignments = (userId: string) =>
  api.get<PayrollRuleAssignment[]>(`/user/${userId}/payroll-rule`);
export const assignPayrollRule = (
  userId: string,
  item: PayrollRuleAssignment
) => api.post<PayrollRuleAssignment>(`/user/${userId}/payroll-rule`, item);
export const updatePayrollRule = (
  userId: string,
  idx: number,
  item: PayrollRuleAssignment
) =>
  api.put<PayrollRuleAssignment>(`/user/${userId}/payroll-rule/${idx}`, item);
export const deletePayrollRule = (userId: string, idx: number) =>
  api.delete(`/user/${userId}/payroll-rule/${idx}`);

// ------- Auto Penalty -------
export const fetchAutoPenaltyAssignments = (userId: string) =>
  api.get<AutoPenaltyAssignment[]>(`/user/${userId}/auto-penalty`);
export const assignAutoPenalty = (
  userId: string,
  item: AutoPenaltyAssignment
) => api.post<AutoPenaltyAssignment>(`/user/${userId}/auto-penalty`, item);
export const updateAutoPenalty = (
  userId: string,
  idx: number,
  item: AutoPenaltyAssignment
) =>
  api.put<AutoPenaltyAssignment>(`/user/${userId}/auto-penalty/${idx}`, item);
export const deleteAutoPenalty = (userId: string, idx: number) =>
  api.delete(`/user/${userId}/auto-penalty/${idx}`);
