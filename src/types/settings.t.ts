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
  color: string;        // CSS-цвет, например "#52C41A"
  description: string;
}