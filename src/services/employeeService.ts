import { api } from "./api";
import type { Employee } from "@/types/employee.t";

// возвращает Promise<AxiosResponse<Employee[]>>
export const fetchEmployees = () => api.get<Employee[]>("/employees");
