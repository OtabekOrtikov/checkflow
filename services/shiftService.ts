// src/services/shiftService.ts
import { Shift } from "@/types/shift.t";
import api from "@/utils/api";

export const shiftService = {
  /** Список всех смен */
  getShifts: async (): Promise<Shift[]> => {
    const { data } = await api.get<Shift[]>("shifts/");
    return data;
  },

  /** Детали одной смены */
  getShift: async (id: number): Promise<Shift> => {
    const { data } = await api.get<Shift>(`shifts/${id}/`);
    return data;
  },

  /** Создать новую смену */
  createShift: async (
    payload: Omit<Shift, "id">
  ): Promise<Shift> => {
    const { data } = await api.post<Shift>("shifts/create/", payload);
    return data;
  },

  /** Обновить смену */
  updateShift: async (
    id: number,
    payload: Partial<Omit<Shift, "id">>
  ): Promise<Shift> => {
    const { data } = await api.patch<Shift>(
      `shifts/${id}/update/`,
      payload
    );
    return data;
  },

  /** Удалить смену */
  deleteShift: async (id: number): Promise<void> => {
    await api.delete(`/api/shifts/${id}/delete/`);
  },
};
