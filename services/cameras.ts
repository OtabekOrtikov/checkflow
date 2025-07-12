import api from "@/utils/api";
import { Device, DisciplinedList } from "@/types/checkflow";

export const camerasService = {
  getTopDisciplined: async (): Promise<DisciplinedList> => {
    const response = await api.get<DisciplinedList>(
      "/cameras/attendance/top-discipline/"
    );
    return response.data;
  },

  getDevices: async (): Promise<Device[]> => {
    const response = await api.get<Device[]>("/cameras/devices/");
    return response.data;
  },
};
