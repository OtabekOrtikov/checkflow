// src/services/companyService.ts
import { Company } from "@/types/company.t";
import api from "@/utils/api";

export const companyService = {
  getCompanyById: async (id: number): Promise<Company> => {
    const { data } = await api.get<Company>(`/api/companies/${id}/`);
    return data;
  },
};
