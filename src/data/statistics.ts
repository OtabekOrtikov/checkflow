import type { RawVisit } from "@/types/statistics.t";

const today = new Date();
export const mockVisits: RawVisit[] = Array.from({ length: 365 }, (_, i) => {
  const d = new Date();
  d.setDate(today.getDate() - i);
  return {
    date: d.toISOString().slice(0, 10),
    value: Math.floor(Math.random() * 150),
  };
});
