import api from '@/utils/api';
import { AttendanceSummary, DisciplineUser, Device, StatsResponse } from '@/types/checkflow';

export const camerasService = {
  getAttendanceSummary: async (): Promise<AttendanceSummary> => {
    const response = await api.get<AttendanceSummary>('/cameras/attendance/summary/');
    return response.data;
  },

  getTopDisciplined: async (): Promise<DisciplineUser[]> => {
    const response = await api.get<DisciplineUser[]>('/cameras/attendance/top-discipline/');
    return response.data;
  },

  getTopUndisciplined: async (): Promise<DisciplineUser[]> => {
    const response = await api.get<DisciplineUser[]>('/cameras/attendance/top-undiscipline/');
    return response.data;
  },

  getDevices: async (): Promise<Device[]> => {
    const response = await api.get<Device[]>('/cameras/devices/');
    return response.data;
  },

  getAttendanceStats: async (period: 'week' | 'month' | 'year' = 'week'): Promise<StatsResponse> => {
    const response = await api.get<StatsResponse>(`/cameras/attendance/stats/?period=${period}`);
    return response.data;
  },
};