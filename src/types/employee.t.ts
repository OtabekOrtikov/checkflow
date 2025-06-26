export interface Employee {
  id: string;
  name: string;
  status: "active" | "inactive";
  workType: "Часовая" | "Окладная" | "Сдельная";
  workPlace: "Офис" | "Удалённо" | "Командировка";
  position: string;
  department: string;
  salary: number;
  createdAt: string; // ISO YYYY-MM-DD
  shift: "Дн" | "Ноч";
  identified: boolean;
  idCard?: boolean;
  faceId?: boolean;
}
