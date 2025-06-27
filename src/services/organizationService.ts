// src/services/organizationService.ts
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  mockDepartments,
  mockPositions,
  mockLocations,
  mockDayTemplates,
  mockDevices,
  mockCalendars,
} from "@/data/organization";

export const orgApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
});

if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  const mock = new MockAdapter(orgApi, { delayResponse: 200 });

  // Универсальная функция регистрации моков для сущности
  const register = <T extends { id: string }>(path: string, storage: T[]) => {
    mock.onGet(path).reply(200, storage);
    mock.onPost(path).reply((c) => {
      const item = JSON.parse(c.data);
      storage.push(item);
      return [201, item];
    });
    mock.onPut(new RegExp(`${path}/\\w+`)).reply((c) => {
      const id = c.url!.split("/").pop()!;
      const idx = storage.findIndex((x) => x.id === id);
      const item = JSON.parse(c.data);
      storage[idx] = item;
      return [200, item];
    });
    mock.onDelete(new RegExp(`${path}/\\w+`)).reply((c) => {
      const id = c.url!.split("/").pop()!;
      const idx = storage.findIndex((x) => x.id === id);
      storage.splice(idx, 1);
      return [204];
    });
  };

  register("/organization/departments", mockDepartments);
  register("/organization/positions", mockPositions);
  register("/organization/locations", mockLocations);
  register("/organization/day-templates", mockDayTemplates);
  register("/organization/devices", mockDevices);
  register("/organization/calendars", mockCalendars);
}

// Экспорт «фэчей» (Promise возвращает .data)
export const fetchDepartments = () => orgApi.get("/organization/departments");
export const createDepartment = (d: any) =>
  orgApi.post("/organization/departments", d);
export const updateDepartment = (id: string, d: any) =>
  orgApi.put(`/organization/departments/${id}`, d);
export const deleteDepartment = (id: string) =>
  orgApi.delete(`/organization/departments/${id}`);

// Аналогично для остальных сущностей:
export const fetchPositions = () => orgApi.get("/organization/positions");
export const createPosition = (d: any) =>
  orgApi.post("/organization/positions", d);
export const updatePosition = (id: string, d: any) =>
  orgApi.put(`/organization/positions/${id}`, d);
export const deletePosition = (id: string) =>
  orgApi.delete(`/organization/positions/${id}`);

export const fetchLocations = () => orgApi.get("/organization/locations");
// ... и т.д. для day-templates, devices, calendars
