import { format } from "date-fns";
import { ru } from "date-fns/locale";

// format: day (numeric), month (long), comma, year (numeric)

export function formatDate(date: Date, dateFormat: string): string {
  if (dateFormat === "eeee") {
    const formatted = format(date, dateFormat, { locale: ru });
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  }

  return format(date, dateFormat, { locale: ru });
}
