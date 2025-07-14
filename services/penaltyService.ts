// src/services/penaltyService.ts

import api from "@/utils/api";
import {
  PenaltiesResponse,
  ManualPenalty,
  AutomaticPenalty,
} from "@/types/penalty.t";

export const penaltyService = {
  // тянем все сразу, но на странице показываем только `manual`
  getAll: async (): Promise<PenaltiesResponse> => {
    const { data } = await api.get<PenaltiesResponse>("/penalties/");
    return data;
  },

  // можно зарефакторить под getManual: ()=>getAll().then(d=>d.manual)
  // но swr не умеет сразу вытаскивать вложенный массив, поэтому мы будем post-процессить в странице

  // назначить штраф (ручной) — замените endpoint, если у вас другой
  assign: async (payload: { penalty: number; employee: number }) => {
    const { data } = await api.post<ManualPenalty>(
      "/penalties/manual/create/", 
      payload
    );
    return data;
  },

  // удалить ручной штраф
  delete: async (id: number) => {
    await api.delete(`/penalties/manual/${id}/delete/`);
  },

  // обновить ручной штраф
  update: async (
    id: number,
    payload: Partial<Omit<ManualPenalty, "id" | "created_at">>
  ) => {
    const { data } = await api.patch<ManualPenalty>(
      `/penalties/manual/${id}/update/`,
      payload
    );
    return data;
  },

  // создать новый ручной штраф (тип штрафа)
  create: async (payload: {
    title: string;
    description?: string;
    amount: string;
  }) => {
    const { data } = await api.post<ManualPenalty>(
      "/penalties/manual/create/",
      payload
    );
    return data;
  },
};
