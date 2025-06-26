import { ReactNode } from "react";

export interface FilterConfig {
  /** метка рядом с <select> */
  label: string;
  /** текущее выбранное значение */
  value: string;
  /** изменить значение */
  onChange: (v: string) => void;
  /** варианты для селекта */
  options: { label: string; value: string }[];
}

export interface Column<T> {
  /** заголовок колонки */
  header: string;
  /** ключ поля в объекте, если нет кастомного рендеринга */
  accessor?: keyof T;
  /** кастомный рендер ячейки */
  render?: (item: T) => ReactNode;
}

export interface PaginationConfig {
  total: number;
  page: number;
  pageSize: number;
  onPageChange: (newPage: number) => void;
}
