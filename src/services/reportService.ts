import { api } from "./api";
import type { Report } from "@/types/report.t";

export const fetchReports = () => api.get<Report[]>("/reports");
