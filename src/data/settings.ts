import {
  DeductionAdditionType,
  DismissalType,
  GeneralSettings,
  HolidayType,
  PayrollRule,
  PenaltyAssignment,
  PenaltyType,
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

export const mockHolidays: HolidayType[] = [
  {
    id: "1",
    name: "Новый год",
    color: "#FF4D4F",
    description: "Празднование нового года",
    startDate: "01.01.2025",
    endDate: "01.01.2025",
  },
  {
    id: "2",
    name: "День независимости",
    color: "#52C41A",
    description: "Праздник независимости",
    startDate: "01.09.2025",
    endDate: "01.09.2025",
  },
];

export const mockPayrollRules: PayrollRule[] = [
  {
    id: "1",
    name: "По умолчанию",
    payments: [
      { id: "1", start: "00:00", end: "08:00", amount: 0, unit: "sum" },
      { id: "2", start: "18:00", end: "23:59", amount: 1000, unit: "sum" },
    ],
    overtimes: [
      { id: "1", start: "18:00", end: "23:59", amount: 150, unit: "percent" },
    ],
    algorithm: "daily",
  },
];

export const mockPenaltyTypes: PenaltyType[] = [
  {
    id: "1",
    name: "Штраф за опоздание",
    latenessRules: [
      { start: "00:00", end: "00:30", amount: 1000, unit: "Сум" },
    ],
    earlyLeaveRules: [],
    absenceEnabled: false,
  },
  // …
];

export const mockPenaltyAssignments: PenaltyAssignment[] = [
  // …
];

export const mockDeductionAdditions: DeductionAdditionType[] = [
  {
    id: "1",
    name: "Штраф за опоздание",
    description: "Опоздание более 5 минут",
    type: "sum",
    amount: 100000,
    isAddition: false,
  },
  {
    id: "2",
    name: "Надбавка ночная",
    description: "Ночная смена",
    type: "percentRate",
    amount: 150000,
    isAddition: true,
  },
];
