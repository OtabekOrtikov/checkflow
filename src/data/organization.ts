// src/data/organization.ts

import type {
  Department,
  Position,
  Location,
  DayTemplate,
  Device,
  Calendar,
} from "@/types/organization.t";

// Отделы
export const mockDepartments: Department[] = [
  { id: "dept-1", name: "Отдел продаж",       employeeCount: 12 },
  { id: "dept-2", name: "Отдел разработки",   employeeCount:  5 },
  { id: "dept-3", name: "Отдел тестирования", employeeCount:  3 },
];

// Должности
export const mockPositions: Position[] = [
  { id: "pos-1", name: "Менеджер",        employeeCount:  8 },
  { id: "pos-2", name: "Разработчик",     employeeCount: 10 },
  { id: "pos-3", name: "QA Engineer",     employeeCount:  4 },
];

// Локации
export const mockLocations: Location[] = [
  {
    id:             "loc-1",
    name:           "Главный офис, Ташкент",
    deviceCount:    3,
    employeeCount:  25,
  },
  {
    id:             "loc-2",
    name:           "Склад, Чиланзар",
    deviceCount:    1,
    employeeCount:   4,
  },
];

// Шаблоны дня
export const mockDayTemplates: DayTemplate[] = [
  {
    id:          "tpl-1",
    name:        "Стандартный",
    color:       "#FF4D4F",
    description: "09:00–18:00 без перерыва",
  },
  {
    id:          "tpl-2",
    name:        "Укороченный",
    color:       "#52C41A",
    description: "09:00–15:00, обед 12:00–13:00",
  },
];

// Устройства
export const mockDevices: Device[] = [
  {
    id:             "L42687655",
    name:           "Hikvision",
    type:           "Приход",
    ipAddress:      "192.168.0.101",
    location:       "Главный офис, Ташкент",
    cameraLocation: "Лобби",
    timeZone:       "GMT+05:00",
    lastConnection: "13/06/2025 15:39",
    status:         "Активен",
  },
  {
    id:             "L42687656",
    name:           "Hikvision ",
    type:           "Уход",
    ipAddress:      "192.168.0.102",
    location:       "Склад, Чиланзар",
    cameraLocation: "Парадная",
    timeZone:       "GMT+05:00",
    lastConnection: "12/06/2025 11:22",
    status:         "Неактивен",
  },
];

// Календари
export const mockCalendars: Calendar[] = [
  { id: "cal-1", name: "Календарь 2025" },
  { id: "cal-2", name: "Постпраздничный июль" },
];