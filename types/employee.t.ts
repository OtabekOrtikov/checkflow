export interface Employee {
  id: number;
  employee_no: string;
  full_name: string;
  gender: "male" | "female";
  place_of_work: number;
  position: number;
  department: number;
  shift: number;
  salary: string;
  is_active: boolean;
  is_fired: boolean;
  created_at: string;
  updated_at: string;
}
