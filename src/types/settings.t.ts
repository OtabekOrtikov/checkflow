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
