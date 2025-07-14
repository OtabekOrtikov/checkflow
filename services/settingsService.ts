import { Company } from "@/types/company.t";
import { CompanySettings } from "@/types/settings.t";
import api from "@/utils/api";
import { get } from "node:http";

export const settingsService = {
  // Получить текущие общие настройки
  getGeneralSettings: async (): Promise<CompanySettings> => {
    // const { data } = await api.get<CompanySettings>("/settings/general/");
    const data: CompanySettings = {
      id_display: "Ортиков Отабек",
      timezone: "(UTC+05:00) Asia/Tashkent",
      language: "Русский",
      time_format: "24",
      date_format: "DD.MM.YYYY",
      currency: "Узбекский сум (SUM)",
    };
    return Promise.resolve(data);
  },

  // Обновить общие настройки (пока эндпоинта нет — просто строчка)
  updateGeneralSettings: async (
    payload: CompanySettings
  ): Promise<CompanySettings> => {
    const { data } = await api.patch<CompanySettings>(
      "/settings/general/update/",
      payload
    );
    return data;
  },

  getCompanyById: async (id: number): Promise<Company> => {
    const { data } = await api.get<Company>(`/companies/${id}/`);
    return data;
  } 
};

