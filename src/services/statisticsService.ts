// src/services/statisticsService.ts
import { mockVisits } from "@/data/statistics";
import type { RawVisit, VisitStat, Period } from "@/types/statistics.t";

import {
  startOfWeek,
  endOfWeek,
  addDays,
  getDaysInMonth,
  format,
} from "date-fns";

export function fetchVisitStats(period: Period): Promise<VisitStat[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const now = new Date();
      let stats: VisitStat[] = [];

      if (period === "week") {
        // 1) Вычисляем начало и конец текущей недели (понедельник–воскресенье)
        const weekStart = startOfWeek(now, { weekStartsOn: 1 });
        const weekEnd = endOfWeek(now, { weekStartsOn: 1 });

        // 2) Собираем массив из 7 дат
        const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

        // 3) Группируем по дате
        stats = days.map((day) => ({
          label: format(day, "EEEE"), // «Понедельник»…
          value: mockVisits
            .filter((v) => {
              const d = new Date(v.date);
              return d >= weekStart && d <= weekEnd;
            })
            .reduce((sum, v) => sum + v.value, 0),
        }));
      } else if (period === "month") {
        // текущий месяц
        const year = now.getFullYear();
        const month = now.getMonth();
        const daysInThisMonth = getDaysInMonth(now);

        // массив дат 1…N числа этого месяца
        const days = Array.from(
          { length: daysInThisMonth },
          (_, i) => new Date(year, month, i + 1)
        );

        stats = days.map((day) => ({
          label: String(day.getDate()), // «1», «2», …
          value: mockVisits
            .filter((v) => {
              const d = new Date(v.date);
              return (
                d.getFullYear() === year &&
                d.getMonth() === month &&
                d.getDate() === day.getDate()
              );
            })
            .reduce((sum, v) => sum + v.value, 0),
        }));
      } else {
        // год — 12 месяцев
        const year = now.getFullYear();
        const months = Array.from({ length: 12 }, (_, i) => new Date(year, i, 1));

        stats = months.map((m) => ({
          label: format(m, "LLL"), // «Янв», «Фев»…
          value: mockVisits
            .filter((v) => {
              const d = new Date(v.date);
              return d.getFullYear() === year && d.getMonth() === m.getMonth();
            })
            .reduce((sum, v) => sum + v.value, 0),
        }));
      }

      resolve(stats);
    }, 200);
  });
}
