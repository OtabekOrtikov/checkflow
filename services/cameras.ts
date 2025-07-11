import api from "@/utils/api";
import { Device, DisciplinedList, AttendanceStats } from "@/types/checkflow";
import { AttendanceRecord, AttendanceSummary } from "@/types/attendance.t";

export const camerasService = {
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

  getTopDisciplined: async (): Promise<DisciplinedList> => {
    const response = await api.get<DisciplinedList>(
      "/cameras/attendance/top-discipline/"
    );
    return response.data;
  },

  getDevices: async (): Promise<Device[]> => {
    const response = await api.get<Device[]>("/cameras/devices/");
    return response.data;
  },

  getAttendanceStats: async (): Promise<AttendanceStats[]> => {
    const response = await api.get<AttendanceStats[]>(
      `/cameras/attendance/stats/`
    );
    return response.data;
  },
};
