import { api } from "./api";
import type { Location } from "@/types/location.t";

export const fetchLocations = () => api.get<Location[]>("/locations");

export const fetchLocationById = (id: string) =>
  api.get<Location>(`/locations/${id}`);

export const createLocation = (data: Omit<Location, "id">) =>
  api.post<Location>("/locations", data);

export const updateLocation = (id: string, data: Partial<Location>) =>
  api.put<Location>(`/locations/${id}`, data);

export const deleteLocation = (id: string) =>
  api.delete<void>(`/locations/${id}`);
