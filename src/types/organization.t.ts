export interface Department {
  id: string;
  name: string;
  employeeCount: number;
}

export interface Position {
  id: string;
  name: string;
  employeeCount: number;
}

export interface Location {
  id: string;
  name: string;
  deviceCount: number;
  employeeCount: number;
}

export interface DayTemplate {
  id: string;
  name: string;
  color: string; // CSS-цвет, например "#FF4D4F"
  description: string;
}

export interface Device {
  id: string;
  name: string;
  type: string;            // например "Приход" или "Уход"
  ipAddress: string;
  location: string;        // строковое представление локации
  cameraLocation: string;  // текст из выпадашки
  timeZone: string;        // например "GMT (+05:00)"
  lastConnection: string;  // например "13/06/2025 15:39"
  status: string;          // "Активен" / "Неактивен"
}

export interface DeviceDetailed {
  id: string;
  name: string;
  workType: "Приход" | "Уход" | "Вход" | "Выход";
  location: string;
  timeZone: string; // например "GMT (+05:00)"
  lastConnection: string; // ISO или dd.MM.yyyy HH:mm строка
  status: "Активен" | "Неактивен";
}

export interface Calendar {
  id: string;
  name: string;
}
