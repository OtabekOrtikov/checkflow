// src/services/departmentService.ts
import {
  Department,
  CreateDepartmentPayload,
  UpdateDepartmentPayload,
} from "@/types/department.t";
import api from "@/utils/api";

export const departmentService = {
  /** Получить список всех отделов */
  getDepartments: async (): Promise<Department[]> => {
    const { data } = await api.get<Department[]>("/cameras/departments/");
    return data;
  },

  /** Получить один отдел по ID */
  getDepartmentById: async (id: number): Promise<Department> => {
    const { data } = await api.get<Department>(`/cameras/departments/${id}/`);
    return data;
  },

  /** Создать новый отдел */
  createDepartment: async (
    payload: CreateDepartmentPayload
  ): Promise<Department> => {
    const { data } = await api.post<Department>(
      "/cameras/departments/create/",
      payload
    );
    return data;
  },

  /** Обновить существующий отдел */
  updateDepartment: async (
    id: number,
    payload: UpdateDepartmentPayload
  ): Promise<Department> => {
    const { data } = await api.patch<Department>(
      `/cameras/departments/${id}/update/`,
      payload
    );
    return data;
  },

  /** Удалить отдел */
  deleteDepartment: async (id: number): Promise<void> => {
    await api.delete(`/cameras/departments/${id}/delete/`);
  },
};
