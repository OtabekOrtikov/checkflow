// src/mocks/profile.ts
import type {
    ProfileInfo,
    TimeWorkedRecord,
    DepartmentAssignment,
    PositionAssignment,
  } from "@/types/profile.t";
  
  export const mockProfileInfo: ProfileInfo = {
    id: "u-123",
    fullName: "Исламов Камрон",
    avatarUrl: "/assets/user.jpg",
    role: "Администратор",
    startDate: "2025-06-05",
    birthDate: "2025-05-27",
    pinCode: "1",
    tabNumber: "1",
    email: "kamronislamov.c@gmail.com",
    phone: "+998977370131",
    homePhone: "+998712450416",
    address: "Ц1, Эко-парк",
    ledgerAccount: "-",
    telegramBotCode: "ABCD-1234",
    position: "Администратор"
  };
  
  export const mockTimeWorked: TimeWorkedRecord[] = [
    { date: "2025-06-05", workedHours: 8, earlyLeaveCount: 0, lateMinutes: 0 },
    { date: "2025-06-06", workedHours: 8, earlyLeaveCount: 0, lateMinutes: 0 },
    { date: "2025-06-17", workedHours: 9, earlyLeaveCount: 0, lateMinutes: 0 },
    { date: "2025-06-18", workedHours: 5, earlyLeaveCount: 1, lateMinutes: 0 },
    { date: "2025-06-19", workedHours: 6, earlyLeaveCount: 0, lateMinutes: 15 },
  ];
  
  export const mockDepartmentAssignments: DepartmentAssignment[] = [
    {
      department: "Отдел по умолчанию",
      startDate: "2025-06-05",
      endDate: undefined,
    },
  ];
  
  export const mockPositionAssignments: PositionAssignment[] = [
    {
      position: "Должность по умолчанию",
      assignedDate: "2025-06-05",
      startWorkDate: "2025-06-05",
      isCurrent: true,
    },
  ];
  