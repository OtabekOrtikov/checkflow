// src/services/disciplineService.ts
import { api } from "./api";
import type { Disciplined } from "@/types/discipline.t";

export const fetchDisciplined = () => api.get<Disciplined[]>("/disciplined");
