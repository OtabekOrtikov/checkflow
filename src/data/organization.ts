import {
  DeviceDetailed,
  Department,
  Position,
  DayTemplate,
  Calendar,
  Location,
} from "@/types/organization.t";

// === Departments ===
export const mockDepartments: Department[] = [
  { id: "dep-1", name: "СММ", employeeCount: 1 },
  { id: "dep-2", name: "Отдел продаж", employeeCount: 12 },
  { id: "dep-3", name: "Производство", employeeCount: 14 },
  { id: "dep-4", name: "Дизайн и разработка", employeeCount: 5 },
  { id: "dep-5", name: "Цех БДМ", employeeCount: 41 },
];

// === Positions ===
export const mockPositions: Position[] = [
  { id: "pos-1", name: "Дизайнер", employeeCount: 2 },
  { id: "pos-2", name: "Уборщица", employeeCount: 4 },
  { id: "pos-3", name: "Разработчик", employeeCount: 3 },
  { id: "pos-4", name: "Электрик", employeeCount: 1 },
  { id: "pos-5", name: "Продукт менеджер", employeeCount: 1 },
];

// === Locations ===
export const mockLocations: Location[] = [
  {
    id: "loc-1",
    name: "г.Ташкент, Бектемирский р-н, ул. Хусейна Байкара 87",
    deviceCount: 2,
    employeeCount: 117,
  },
  {
    id: "loc-2",
    name: "Локация по умолчанию",
    deviceCount: 0,
    employeeCount: 1,
  },
];

// === Day Templates ===
export const mockDayTemplates: DayTemplate[] = [
  {
    id: "tpl-1",
    name: "Шаблон 1",
    color: "#FF4D4F", // красный
    description: "Описание шаблона",
  },
];

// === Devices ===
export const mockDevices: DeviceDetailed[] = [
  {
    id: "dev-1",
    name: "Hikvision",
    workType: "Уход",
    location: "г.Ташкент, ул. Байкара 87",
    timeZone: "GMT (+05:00)",
    lastConnection: "13.06.2025 15:39",
    status: "Активен",
  },
  {
    id: "dev-2",
    name: "Hikvision",
    workType: "Приход",
    location: "г.Ташкент, ул. Байкара 87",
    timeZone: "GMT (+05:00)",
    lastConnection: "13.06.2025 15:39",
    status: "Активен",
  },
];

// === Calendars ===
export const mockCalendars: Calendar[] = [{ id: "cal-1", name: "Календарь 1" }];
