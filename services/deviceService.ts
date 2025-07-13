import { Device } from "@/types/device.t";
import api from "@/utils/api";

export const deviceService = {
  // получить список всех устройств
  getDevices: async (): Promise<Device[]> => {
    const { data } = await api.get<Device[]>("/cameras/devices/");
    return data;
  },
  // (если понадобится) получить одно устройство
  getDevice: async (id: number): Promise<Device> => {
    const { data } = await api.get<Device>(`/cameras/devices/${id}/`);
    return data;
  },
  // (если понадобится) создать
  createDevice: async (
    payload: Omit<Device, "id" | "created_at" | "updated_at">
  ) => {
    const { data } = await api.post<Device>(
      "/cameras/devices/create/",
      payload
    );
    return data;
  },
  // (если понадобится) обновить
  updateDevice: async (id: number, payload: Partial<Device>) => {
    const { data } = await api.patch<Device>(
      `/cameras/devices/${id}/update/`,
      payload
    );
    return data;
  },
  // (если понадобится) удалить
  deleteDevice: async (id: number) => {
    await api.delete(`/cameras/devices/${id}/delete/`);
  },
};
