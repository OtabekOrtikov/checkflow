import { Branch } from "@/types/branch.t";
import api from "@/utils/api";

export const branchService = {
  // Получить все филиалы компании
  getBranches: async (companyId: number): Promise<Branch[]> => {
    const { data } = await api.get<Branch[]>(`/companies/${companyId}/branches/`);
    return data;
  },
  // Создать филиал
  createBranch: async (
    payload: Omit<Branch, "id">
  ): Promise<Branch> => {
    const { data } = await api.post<Branch>(
      "/companies/branches/create/",
      payload
    );
    return data;
  },
  // Обновить филиал
  updateBranch: async (
    id: number,
    payload: Partial<Omit<Branch, "id" | "company">>
  ): Promise<Branch> => {
    const { data } = await api.patch<Branch>(
      `/companies/branches/${id}/update/`,
      payload
    );
    return data;
  },
  // Удалить филиал
  deleteBranch: async (id: number) => {
    await api.delete(`/companies/branches/${id}/delete/`);
  },
};
