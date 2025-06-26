export interface WorkSchedule {
    id: string;
    name: string;
    start: string;         // например "08:00"
    end: string;           // например "17:00"
    norm: string;          // например "Календарь: 2025" или "За смену: 14 ч"
    night: string;         // например "18:00-08:00" или "-"
    lunch: string;         // например "-" или "01:00"
    employeesCount: number;
  }
  