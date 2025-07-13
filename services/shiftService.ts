import api from "@/utils/api";
import { Shift } from "@/types/shift.t";

export const shiftService = {
  getShifts: async (): Promise<Shift[]> => {
    const res = await api.get<Shift[]>("/shifts/");
    return res.data;
  },
};