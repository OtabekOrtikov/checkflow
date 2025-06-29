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

export interface PayrollRulePayment {
  id: string;
  start: string; // время начала, например "08:00"
  end: string; // время окончания
  amount: number; // размер выплаты за час
  unit: "sum" | "percent";
}

export interface PayrollRuleOvertime {
  id: string;
  start: string; // время начала
  end: string; // время окончания
  amount: number; // процент или сумма
  unit: "sum" | "percent";
}

export interface PayrollRule {
  id: string;
  name: string;
  payments: PayrollRulePayment[];
  overtimes: PayrollRuleOvertime[];
  algorithm: "daily" | "monthly";
}

export interface PenaltyRule {
  start: string;
  end: string;
  amount: number;
  unit: string;
}

export interface PenaltyType {
  id: string;
  name: string;
  latenessRules: PenaltyRule[];
  earlyLeaveRules: PenaltyRule[];
  absenceEnabled: boolean;
  absenceAmount?: number;
  absenceUnit?: string;
  absenceThreshold?: number;
}

export interface PenaltyAssignment {
  id: string;
  penaltyTypeId: string;
  employee: string;
}

export interface DeductionAdditionType {
  id: string;
  name: string;
  description?: string;
  type: "sum" | "percentRate" | "percentTotal"; // Тип: сумма, процент от ставки или процент от итоговой суммы
  amount: number;
  isAddition: boolean; // true — доплата, false — удержание
}

export interface DeductionAdditionAssignment {
  id: string;
  typeId: string;
  employeeId: string;
}

export interface ApiSettings {
  clientId: string;
  clientSecret: string;
}
