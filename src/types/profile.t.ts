export interface ProfileInfo {
  id: string;
  fullName: string;
  avatarUrl: string;
  role: string;
  startDate: string; // ISO, e.g. '2025-06-05'
  birthDate: string;
  pinCode: string;
  tabNumber: string;
  email: string;
  phone: string;
  homePhone?: string;
  address: string;
  ledgerAccount?: string;
  telegramBotCode?: string;
  position: string;
}

export interface TimeWorkedRecord {
  date: string;
  workedHours: number;
  earlyLeaveCount: number;
  lateMinutes: number;
}

export interface DepartmentAssignment {
  department: string;
  startDate: string;
  endDate?: string;
}

// Назначение на должность
export interface PositionAssignment {
  position: string;
  assignedDate: string;
  startWorkDate: string;
  isCurrent: boolean;
}
