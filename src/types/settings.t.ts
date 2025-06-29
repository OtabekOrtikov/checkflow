export interface GeneralSettings {
  displayName: string;
  timeZone: string;
  language: string;
  timeFormat: string;
  dateFormat: string;
  currency: string;
}

export interface RoleAssignment {
  id: string;
  name: string;
  department: string;
  login: string;
  role: string;
  specialPermissions: string[];
  location: string;
}

export interface TimeOffType {
  id: string;
  name: string;
  color: string; // CSS-цвет, например "#52C41A"
  description: string;
}

export interface DismissalType {
  id: string;
  name: string;
  color: string; // CSS-цвет, например "#F5222D"
  description: string;
}

export interface UserActivity {
  id: string;
  message: string;
  time: string;
}

export interface HolidayType {
  id: string;
  name: string;
  color: string; // CSS-цвет, например "#FF4D4F"
  description: string;
  startDate: string; // в формате "DD.MM.YYYY"
  endDate: string; // в формате "DD.MM.YYYY"
}
