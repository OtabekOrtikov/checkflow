/** Одна сырая запись посещения */
export interface RawVisit {
  date: string; // ISO-строка: "2025-06-11"
  value: number; // количество посещений в этот день
}

/** Готовая точка для графика */
export interface VisitStat {
  label: string; // подпись по оси X
  value: number; // суммарное значение
}

/** Периоды, которые поддерживаем */
export type Period = "week" | "month" | "year";
