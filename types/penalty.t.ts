// src/types/penalty.t.ts

// ручное назначение штрафа (manual penalties)
export interface ManualPenalty {
  id: number;
  title: string;              // название штрафа
  description: string;        // опционально описание
  amount: string;             // сумма штрафа (строка, например "50000.00")
  created_at: string;         // ISO-дата
}

// автоматические штрафы (по событиям камер) — пока не используем, но тянуть с бекенда можем
export interface AutomaticPenalty {
  id: number;
  camera: number;
  event_time: string;
  amount: string;
  created_at: string;
  params: number;
}

// общий ответ от GET /api/penalties/
export interface PenaltiesResponse {
  manual: ManualPenalty[];
  automatic: AutomaticPenalty[];
}
