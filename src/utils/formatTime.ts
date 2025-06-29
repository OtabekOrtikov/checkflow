// src/utils/format.ts
export const formatDate = (iso: string): string => {
  const d = new Date(iso);
  return d.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export const formatHours = (h: number): string => `${h.toFixed(2)} ч`;

export const formatNumber = (n: number): string =>
  n.toLocaleString("ru-RU", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
