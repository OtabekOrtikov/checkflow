import { Report } from "@/types/report.t";

export const mockReports: Report[] = [
  {
    id: "1",
    title: "Отчет по сотруднику (pdf)",
    type: "employee",
    items: [
      {
        id: "1",
        title: "Камрон Исламов",
        startDate: "04.06.2025",
        endDate: "04.06.2025",
        createdAt: "04.06.2025 в 13:00",
      },
      {
        id: "2",
        title: "Амир Абдуллаев",
        startDate: "04.06.2025",
        endDate: "04.06.2025",
        createdAt: "04.06.2025 в 13:00",
      },
    ],
  },
  {
    id: "2",
    title: "Отчет о посещениях (excel)",
    type: "attendance",
    items: [
      {
        id: "1",
        startDate: "04.06.2025",
        endDate: "04.06.2025",
        createdAt: "04.06.2025 в 13:00",
      },
    ],
  },
  {
    id: "3",
    title: "Отчет по зарплате и штрафам (excel)",
    type: "salary",
    items: [
      {
        id: "1",
        startDate: "04.06.2025",
        endDate: "04.06.2025",
        createdAt: "04.06.2025 в 13:00",
      },
    ],
  },
];
