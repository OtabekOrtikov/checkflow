import {
  DeductionAdditionAssignment,
  DeductionAdditionType,
  DismissalType,
  GeneralSettings,
  HolidayType,
  PayrollRule,
  PenaltyAssignment,
  PenaltyType,
  RoleAssignment,
  TimeOffType,
  UserActivity,
} from "@/types/settings.t";
import { api } from "./api";

const base = "/settings/roles";

export const fetchGeneralSettings = () =>
  api.get<GeneralSettings>("/settings/general");

export const updateGeneralSettings = (data: GeneralSettings) =>
  api.put<GeneralSettings>("/settings/general", data);

export const fetchRoleAssignments = () => api.get<RoleAssignment[]>(base);

/**
 * Создать новую привязку ролей
 */
export const createRoleAssignment = (item: RoleAssignment) =>
  api.post<RoleAssignment>(base, item);

/**
 * Обновить существующую привязку
 */
export const updateRoleAssignment = (
  id: string,
  item: Partial<RoleAssignment>
) => api.put<RoleAssignment>(`${base}/${id}`, item);

/**
 * Удалить привязку роли
 */
export const deleteRoleAssignment = (id: string) =>
  api.delete<void>(`${base}/${id}`);

// Time-Off Types
export const fetchTimeOffTypes = () =>
  api.get<TimeOffType[]>("/settings/time-off-types");
export const createTimeOffType = (d: TimeOffType) =>
  api.post<TimeOffType>("/settings/time-off-types", d);
export const updateTimeOffType = (id: string, d: TimeOffType) =>
  api.put<TimeOffType>(`/settings/time-off-types/${id}`, d);
export const deleteTimeOffType = (id: string) =>
  api.delete(`/settings/time-off-types/${id}`);

// Dismissal Types

export const fetchDismissalTypes = () =>
  api.get<DismissalType[]>("/settings/fired-types");
export const createDismissalType = (d: DismissalType) =>
  api.post<DismissalType>("/settings/fired-types", d);
export const updateDismissalType = (id: string, d: DismissalType) =>
  api.put<DismissalType>(`/settings/fired-types/${id}`, d);
export const deleteDismissalType = (id: string) =>
  api.delete(`/settings/fired-types/${id}`);

export const fetchUserActivities = () =>
  api.get<UserActivity[]>("/settings/user-activity");

// Holiday Types
export const fetchHolidays = () => api.get<HolidayType[]>("/settings/holidays");

export const createHoliday = (h: HolidayType) =>
  api.post<HolidayType>("/settings/holidays", h);

export const updateHoliday = (id: string, h: HolidayType) =>
  api.put<HolidayType>(`/settings/holidays/${id}`, h);

export const deleteHoliday = (id: string) =>
  api.delete<void>(`/settings/holidays/${id}`);

// Payroll Rules
export const fetchPayrollRules = () =>
  api.get<PayrollRule[]>("/settings/payroll-rules");
export const createPayrollRule = (data: PayrollRule) =>
  api.post<PayrollRule>("/settings/payroll-rules", data);
export const updatePayrollRule = (id: string, data: PayrollRule) =>
  api.put<PayrollRule>(`/settings/payroll-rules/${id}`, data);
export const deletePayrollRule = (id: string) =>
  api.delete(`/settings/payroll-rules/${id}`);

// Penalty Types
export const fetchPenaltyTypes = () =>
  api.get<PenaltyType[]>("/settings/penalties");
export const createPenaltyType = (data: Omit<PenaltyType, "id">) =>
  api.post<PenaltyType>("/settings/penalties", data);
export const updatePenaltyType = (id: string, data: PenaltyType) =>
  api.put<PenaltyType>(`/settings/penalties/${id}`, data);
export const deletePenaltyType = (id: string) =>
  api.delete(`/settings/penalties/${id}`);

export const assignPenalty = (penaltyTypeId: string, employee: string) =>
  api.post<PenaltyAssignment>(`/settings/penalties/${penaltyTypeId}/assign`, {
    employee,
  });

export const fetchDeductionAdditionTypes = () =>
  api.get<DeductionAdditionType[]>("/settings/deductions-additions");

export const createDeductionAdditionType = (
  data: Omit<DeductionAdditionType, "id">
) => api.post<DeductionAdditionType>("/settings/deductions-additions", data);

export const updateDeductionAdditionType = (
  id: string,
  data: Partial<DeductionAdditionType>
) =>
  api.put<DeductionAdditionType>(`/settings/deductions-additions/${id}`, data);

export const deleteDeductionAdditionType = (id: string) =>
  api.delete<void>(`/settings/deductions-additions/${id}`);

// Назначение удержания/доплаты сотруднику
export const assignDeductionAddition = (typeId: string, employeeId: string) =>
  api.post<DeductionAdditionAssignment>(
    `/settings/deductions-additions/${typeId}/assign`,
    { employeeId }
  );
