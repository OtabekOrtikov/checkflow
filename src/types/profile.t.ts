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

export interface SalaryAssignment {
  rateType: string; // e.g. "Часовая", "Дневная" и т.д.
  amount: number; // сумма (за единицу)
  currency: string; // "UZS", "USD"...
  assignedDate: string; // ISO дата назначения
  startDate: string; // ISO начала действия
  endDate?: string; // ISO окончания или отсутствует
}

// 2) Оклад (фиксированная з/п)
export interface WageAssignment {
  amount: number;
  currency: string;
  startDate: string;
  endDate?: string;
}

// 3) Правила начисления зарплаты
export interface PayrollRuleAssignment {
  ruleId: string; // id правила
  ruleName: string; // человекочитаемое
  assignedDate: string;
  startDate: string;
  endDate?: string;
}

// 4) Автоматические штрафы
export interface AutoPenaltyAssignment {
  penaltyId: string;
  penaltyName: string;
  assignedDate: string;
  startDate: string;
  endDate?: string;
}
