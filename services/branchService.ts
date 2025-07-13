import { Branch } from "@/types/branch.t";
import api from "@/utils/api";

export const branchService = {
  getBranches: async (companyId: number): Promise<Branch[]> => {
    const res = await api.get<Branch[]>(`/companies/${companyId}/branches/`);
    return res.data;
  },
};