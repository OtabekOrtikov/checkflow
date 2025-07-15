import { AttendanceSummary, AttendanceRecord, AttendanceStats } from "@/types/attendance.t";
import api from "@/utils/api";

export const attendanceService = {
  getAttendanceSummary: async (): Promise<AttendanceSummary> => {
    const response = await api.get<AttendanceSummary>(
      "/cameras/attendance/summary/"
    );
    return response.data;
  },

  getAttendance: async (params: {
    date_from?: string;
    date_to?: string;
    department?: number;
    employee_no?: string;
    gender?: "male" | "female";
    name?: string;
    position?: number;
  }): Promise<AttendanceRecord[]> => {
    const response = await api.get<AttendanceRecord[]>("/cameras/attendance/", {
      params,
    });
    return response.data;
  },

  getAttendanceStats: async (params: {
    period: string;
  }): Promise<AttendanceStats[]> => {
    const response = await api.get<AttendanceStats[]>(
      `/cameras/attendance/stats/?period=${params.period}`
    );
    return response.data;
  },
};
