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

export interface SummaryItem {
  id: number;
  name: string;
  department: string;
  status: 'arrived' | 'late' | 'no_show';
  time: string;
  avatar?: string;
}

export interface AttendanceSummary {
  date: string;
  totalNoShow: number;
  totalLate: number;
  totalArrived: number;
  items: SummaryItem[];
}

export interface DisciplineUser {
  id: number;
  name: string;
  department: string;
  score: number;
  avatar?: string;
  attendanceRate: number;
}

export interface Device {
  id: string;
  name: string;
  location: string;
  status: 'online' | 'offline';
  lastConnection: string;
  ip: string;
}

export interface AttendanceStats {
  date: string;
  arrived: number;
  late: number;
  noShow: number;
}

export interface StatsResponse {
  period: 'week' | 'month' | 'year';
  data: AttendanceStats[];
}