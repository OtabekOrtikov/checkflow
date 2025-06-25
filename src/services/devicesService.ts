import { api } from "./api";
import type { Device } from "@/types/devices.t";

export const fetchDevices = () =>
  api.get<Device[]>("/devices");
