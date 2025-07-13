import { Position } from "@/types/position.t";
import api from "@/utils/api";

export const positionService = {
  getPositions: async (): Promise<Position[]> => {
    const response = await api.get<Position[]>("cameras/positions/");
    return response.data;
  },
};
