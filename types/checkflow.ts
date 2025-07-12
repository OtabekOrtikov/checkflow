export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  refresh: string;
  access: string;
}

export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email?: string;
}

export interface Disciplinary {
  full_name: string;
  position: string;
  attendance_percent: number;
}

export interface DisciplinedList {
  top_disciplinary: Disciplinary[];
  top_undisciplined: Disciplinary[];
}

export interface Device {
  id: string;
  device_id: string;
  device_type: string;
  name: string;
  ip_address: string;
  location: string;
  is_active: boolean;
  brand: number;
  created_at: string;
  updated_at: string;
}