// src/types/department.t.ts
export interface Department {
  id: number;
  name: string;
}

export type CreateDepartmentPayload = {
  name: string;
};

export type UpdateDepartmentPayload = Partial<CreateDepartmentPayload>;
