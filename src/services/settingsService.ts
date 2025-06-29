import { GeneralSettings } from "@/types/settings.t";
import { api } from "./api";

export const fetchGeneralSettings = () =>
  api.get<GeneralSettings>("/settings/general");

export const updateGeneralSettings = (data: GeneralSettings) =>
  api.put<GeneralSettings>("/settings/general", data);
