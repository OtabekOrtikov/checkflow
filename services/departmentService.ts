import { Department } from "@/types/department.t";
import api from "@/utils/api";

export const departmentService = {
  getDepartments: async (): Promise<Department[]> => {
    const response = await api.get<Department[]>("cameras/departments/");
    return response.data;
  },

  getDepartmentById: async (id: number): Promise<Department> => {
    const response = await api.get<Department>(`cameras/departments/${id}/`);
    return response.data;
  },
};
