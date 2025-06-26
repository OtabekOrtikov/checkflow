import { api } from "./api";
import type { WorkSchedule } from "@/types/schedule.t";

export const fetchSchedules = () => api.get<WorkSchedule[]>("/schedules");
