import { GeneralSettings } from "@/types/settings.t";

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
