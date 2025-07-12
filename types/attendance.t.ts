export interface AttendanceSummary {
  not_arrived: number;
  late: number;
  on_time: number;
}

export interface SummaryItem {
  id: number;
  name: string;
  department: string;
  status: "arrived" | "late" | "no_show";
  time: string;
  avatar?: string;
}

export interface AttendanceRecord {
  id: number;
  camera_in: {
    id: number;
    device_id: string;
    device_type: string;
    name: string;
    ip_address: string;
    location: string;
    is_active: boolean;
    branch: number;
    created_at: string;
    updated_at: string;
  };
  camera_out: {
    id: number;
    device_id: string;
    device_type: string;
    name: string;
    ip_address: string;
    location: string;
    is_active: boolean;
    branch: number;
    created_at: string;
    updated_at: string;
  } | null;
  branch: {
    id: number;
    name: string;
    taxpair_identification_number: bigint;
    location: string;
    company: number;
  };
  user_name: string;
  employee_no: string;
  event_time_in: string;
  event_time_out: string | null;
  shift: {
    id: number;
    name: string;
    start_time: string;
    end_time: string;
  } | null;
  verify_mode: string;
  created_at: string;
}


export interface AttendanceStats {
  label: string;
  count: number;
}