export interface ReportBase {
  id: number;
  date_from: string;    // ISO-дата: "2025-07-13"
  date_to:   string;
  created_at: string;   // ISO-дата-время
}

/** Запрос на создание отчёта с фильтрами */
export interface CreateReportPayload {
  date_from: string;
  date_to:   string;
  department?: number;
  gender?:     "male" | "female";
  position?:   number;
  employee?:   number;
}