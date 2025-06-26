import type { Employee } from "@/types/employee.t";

function randomDate(start: Date, end: Date): string {
  const d = new Date(+start + Math.random() * (+end - +start));
  return d.toISOString().slice(0, 10);
}

const NAMES = [
  "Абдиев Амир",
  "Латыпов Артём",
  "Аслан",
  "Исламов Камрон",
  "Ахмедов Ислом",
  "Сидоров Алексей",
  "Петрова Мария",
  "Кузнецов Игорь",
  "Семенова Ольга",
];

export const mockEmployees: Employee[] = Array.from(
  { length: 116 },
  (_, i) => ({
    id: `${i + 1}`,
    name: NAMES[i % NAMES.length],
    status: i % 3 === 0 ? "active" : "inactive",
    workType: (["Часовая", "Окладная", "Сдельная"] as const)[i % 3],
    workPlace: (
      ["Офис", "Удалённо", "Командировка"] as const
    )[i % 3],
    position: (
      [
        "Product manager",
        "Flutter разработчик",
        "Backend Developer",
        "UX/UI Дизайнер",
        "Frontend Developer",
      ] as const
    )[i % 5],
    department: (
      [
        "Отдел дизайна и разработки",
        "Отдел аналитики",
        "Отдел тестирования",
        "Отдел маркетинга",
        "Отдел контента",
      ] as const
    )[i % 5],
    salary: 70_000 + (i % 5) * 10_000,
    createdAt: randomDate(new Date(2025, 4, 1), new Date(2025, 5, 30)),
    shift: (["Дн", "Ноч"] as const)[i % 2],
    identified: i % 2 === 0,
    idCard: i % 3 === 0,
    faceId: i % 4 === 0,
  })
);
