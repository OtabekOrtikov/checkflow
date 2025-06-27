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
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000",
  headers: { "Content-Type": "application/json" },
});

if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  const mock = new MockAdapter(orgApi, { delayResponse: 200 });

  /**
   * Утилита для CRUD-моков:
   *  GET    path            → возвращает весь массив
   *  POST   path            → добавляет новый
   *  PUT    path/:id        → обновляет элемент
   *  DELETE path/:id        → удаляет элемент
   */
  const register = <T extends { id: string }>(path: string, storage: T[]) => {
    mock.onGet(path).reply(200, storage);

    mock.onPost(path).reply((c) => {
      const item = JSON.parse(c.data) as T;
      storage.push(item);
      return [201, item];
    });

    mock.onPut(new RegExp(`${path}/\\w+`)).reply((c) => {
      const id = c.url!.split("/").pop()!;
      const idx = storage.findIndex((x) => x.id === id);
      const updated = JSON.parse(c.data) as T;
      storage[idx] = updated;
      return [200, updated];
    });

    mock.onDelete(new RegExp(`${path}/\\w+`)).reply((c) => {
      const id = c.url!.split("/").pop()!;
      const idx = storage.findIndex((x) => x.id === id);
      if (idx !== -1) storage.splice(idx, 1);
      return [204];
    });
  };

  register("/organization/departments", mockDepartments);
  register("/organization/positions",   mockPositions);
  register("/organization/locations",   mockLocations);
  register("/organization/day-templates", mockDayTemplates);
  register("/organization/devices",     mockDevices);
  register("/organization/calendars",   mockCalendars);
}

// Departments
export const fetchDepartments = () => orgApi.get("/organization/departments");
export const createDepartment  = (d: any) => orgApi.post("/organization/departments", d);
export const updateDepartment  = (id: string, d: any) => orgApi.put(`/organization/departments/${id}`, d);
export const deleteDepartment  = (id: string) => orgApi.delete(`/organization/departments/${id}`);

// Positions
export const fetchPositions = () => orgApi.get("/organization/positions");
export const createPosition = (d: any) => orgApi.post("/organization/positions", d);
export const updatePosition = (id: string, d: any) => orgApi.put(`/organization/positions/${id}`, d);
export const deletePosition = (id: string) => orgApi.delete(`/organization/positions/${id}`);

// Locations
export const fetchLocations = () => orgApi.get("/organization/locations");
export const createLocation  = (d: any) => orgApi.post("/organization/locations", d);
export const updateLocation  = (id: string, d: any) => orgApi.put(`/organization/locations/${id}`, d);
export const deleteLocation  = (id: string) => orgApi.delete(`/organization/locations/${id}`);

// Day-templates
export const fetchDayTemplates = () => orgApi.get("/organization/day-templates");
export const createDayTemplate = (d: any) => orgApi.post("/organization/day-templates", d);
export const updateDayTemplate = (id: string, d: any) => orgApi.put(`/organization/day-templates/${id}`, d);
export const deleteDayTemplate = (id: string) => orgApi.delete(`/organization/day-templates/${id}`);

// Devices
export const fetchOrgDevices = () => orgApi.get("/organization/devices");
export const createOrgDevice  = (d: any) => orgApi.post("/organization/devices", d);
export const updateOrgDevice  = (id: string, d: any) => orgApi.put(`/organization/devices/${id}`, d);
export const deleteOrgDevice  = (id: string) => orgApi.delete(`/organization/devices/${id}`);

// Calendars
export const fetchCalendars = () => orgApi.get("/organization/calendars");
export const createCalendar = (d: any) => orgApi.post("/organization/calendars", d);
export const updateCalendar = (id: string, d: any) => orgApi.put(`/organization/calendars/${id}`, d);
export const deleteCalendar = (id: string) => orgApi.delete(`/organization/calendars/${id}`);