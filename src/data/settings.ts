import {
  DismissalType,
  GeneralSettings,
  RoleAssignment,
  UserActivity,
} from "@/types/settings.t";

// мок-значения
export let mockGeneralSettings: GeneralSettings = {
  displayName: "Исламов Камрон",
  timeZone: "(UTC +05:00) Asia/Tashkent",
  language: "Русский",
  timeFormat: "24 часа",
  dateFormat: "dd.MM.yyyy",
  currency: "UZS",
};

// опции
export const TIME_ZONES = [
  "(UTC +05:00) Asia/Tashkent",
  "(UTC +03:00) Europe/Moscow",
  // …другие час. пояса
];

export const LANGUAGES = ["Русский", "English", "O‘zbekcha"];

export const TIME_FORMATS = ["12 часов", "24 часа"];

export const DATE_FORMATS = ["dd.MM.yyyy", "MM/dd/yyyy", "yyyy-MM-dd"];

export const CURRENCIES = ["UZS", "USD", "EUR"];

export const mockRoleAssignments: RoleAssignment[] = [
  {
    id: "1",
    name: "Исламов Камрон",
    department: "Отдел по умолчанию",
    login: "kamron@example.com",
    role: "Админ",
    specialPermissions: [
      "TimePad",
      "Заработная плата",
      "Редактирование ЗП",
      "Устройства",
      "Удержание и доплата",
      "Отгулы",
      "Локации",
      "Изменение профиля",
    ],
    location: "Ташкент",
  },
];

import { TimeOffType } from "@/types/settings.t";

export const mockTimeOffTypes: TimeOffType[] = [
  {
    id: "1",
    name: "По учёбе",
    color: "#52C41A",
    description: "Экзамены",
  },
  {
    id: "2",
    name: "По семейным делам",
    color: "#F5222D",
    description: "Гулять",
  },
];

export const mockDismissalTypes: DismissalType[] = [
  {
    id: "1",
    name: "По умолчанию",
    color: "#F5222D",
    description: "Лох",
  },
];

export const mockUserActivities: UserActivity[] = [
  {
    id: "1",
    message:
      'Viktoriya добавил(а) событие "Приход" для сотрудника Viktoriya в 16 июня 2025 г.',
    time: "Вчера 19:09",
  },
  {
    id: "2",
    message: "Иванов обновил(а) профиль сотрудника Kamron в 17 июня 2025 г.",
    time: "Сегодня 08:45",
  },
  // …можно добавить ещё
];
