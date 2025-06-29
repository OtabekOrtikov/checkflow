import { GeneralSettings, RoleAssignment, TimeOffType } from "@/types/settings.t";
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
