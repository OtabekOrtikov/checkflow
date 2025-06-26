import { TimeOffRequest } from "@/types/timeOff.t";


export const mockTimeOffRequests: TimeOffRequest[] = [
  {
    id: "1",
    employeeName: "Абдиев Амир",
    reason: "Встреча с клиентами",
    interval: "02/06/25 – 02/06/25",
    status: "pending",
  },
  {
    id: "2",
    employeeName: "Латыпов Артём",
    reason: "Сломался карбюратор",
    interval: "02/06/25 – 02/06/25",
    status: "pending",
  },
  {
    id: "3",
    employeeName: "Аслан",
    reason: "Рожает кошка",
    interval: "02/06/25 – 02/06/25",
    status: "approved",
  },
  {
    id: "4",
    employeeName: "Исламов Камрон",
    reason: "По семейным делам",
    interval: "02/06/25 – 02/06/25",
    status: "rejected",
  },
  {
    id: "5",
    employeeName: "Ахмедов Ислом",
    reason: "По другой работе",
    interval: "02/06/25 – 02/06/25",
    status: "deleted",
  },
  {
    id: "6",
    employeeName: "Сидоров Алексей",
    reason: "Учебный отпуск",
    interval: "05/06/25 – 10/06/25",
    status: "approved",
  },
  {
    id: "7",
    employeeName: "Петрова Мария",
    reason: "Отпуск по болезни",
    interval: "01/06/25 – 03/06/25",
    status: "rejected",
  },
];
