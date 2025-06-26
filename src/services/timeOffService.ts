import { TimeOffRequest } from "@/types/timeOff.t";
import { api } from "./api";

export const fetchTimeOffRequests = (status: string) =>
  api.get<TimeOffRequest[]>(`/time-off?status=${status}`);

export const approveTimeOffRequest = (id: string) =>
  api.post<TimeOffRequest>(`/time-off/${id}/approve`);

export const rejectTimeOffRequest = (id: string) =>
  api.post<TimeOffRequest>(`/time-off/${id}/reject`);
