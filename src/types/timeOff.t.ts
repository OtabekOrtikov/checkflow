export interface TimeOffRequest {
  id: string;
  employeeName: string;
  reason: string;
  interval: string;
  status: "pending" | "approved" | "rejected" | "deleted";
}
