export interface TodaySummaryRow {
  id: string;
  employee: string;
  position: string;
  arrivedAt: string;
  leftAt?: string;
  late?: string; // формат "HH:MM"
  earlyLeave?: string; // формат "HH:MM"
}
