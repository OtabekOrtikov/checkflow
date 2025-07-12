import { Employee } from "@/types/employee.t";
import api from "@/utils/api";

export const employeeService = {
  getEmployees: async (): Promise<Employee[]> => {
    const { data } = await api.get<Employee[]>("/cameras/employees/");
    return data;
  },
  // один сотрудник
  getEmployee: async (id: number): Promise<Employee> => {
    const { data } = await api.get<Employee>(`/cameras/employees/${id}/`);
    return data;
  },
  // создать
  createEmployee: async (
    payload: Omit<Employee, "id" | "created_at" | "updated_at">
  ) => {
    const { data } = await api.post<Employee>(
      "/cameras/employees/create/",
      payload
    );
    return data;
  },
  // обновить
  updateEmployee: async (id: number, payload: Partial<Employee>) => {
    const { data } = await api.put<Employee>(
      `/cameras/employees/${id}/`,
      payload
    );
    return data;
  },
  // удалить (если нужно)
  deleteEmployee: async (id: number) => {
    await api.delete(`/cameras/employees/${id}/`);
  },
};
