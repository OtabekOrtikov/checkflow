// src/components/employees/EmployeeModal.tsx
"use client";

import { Fragment, useState } from "react";
import { Dialog, Transition, Listbox } from "@headlessui/react";
import { Check } from "lucide-react";
import useSWR from "swr";
import { branchService } from "@/services/branchService";
import { departmentService } from "@/services/departmentService";
import { positionService } from "@/services/positionService";
import { shiftService } from "@/services/shiftService";
import { employeeService } from "@/services/employeeService";
import { Branch } from "@/types/branch.t";
import { Department } from "@/types/department.t";
import { Position } from "@/types/position.t";
import { Shift } from "@/types/shift.t";
import ArrowDown from "@/assets/icons/arrow-down.svg";
import { ModalTitle } from "../ModalTitle";
import TrashIcon from "@/assets/icons/trash.svg";

interface EmployeeModalProps {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
}

interface FormState {
  employee_no: string;
  full_name: string;
  gender: "female" | "male";
  workplaces: number[];
  departments: number[];
  positions: number[];
  shifts: number[];
  salary: string;
  is_active: boolean;
  is_fired: boolean;
}

export default function EmployeeModal({
  open,
  onClose,
  onSaved,
}: EmployeeModalProps) {
  const [form, setForm] = useState<FormState>({
    employee_no: "",
    full_name: "",
    gender: "female",
    workplaces: [0],
    departments: [0],
    positions: [0],
    shifts: [0],
    salary: "",
    is_active: true,
    is_fired: false,
  });

  const { data: branches = [] } = useSWR<Branch[]>("branches", () =>
    branchService.getBranches(1)
  );
  const { data: departments = [] } = useSWR<Department[]>(
    "departments",
    departmentService.getDepartments
  );
  const { data: positions = [] } = useSWR<Position[]>(
    "positions",
    positionService.getPositions
  );
  const { data: shifts = [] } = useSWR<Shift[]>(
    "shifts",
    shiftService.getShifts
  );

  // Обновление элемента в массиве
  const updateArray = <K extends keyof FormState>(
    key: K,
    idx: number,
    value: number
  ) => {
    setForm((f) => {
      const arr = [...(f[key] as unknown as number[])];
      arr[idx] = value;
      return { ...f, [key]: arr } as FormState;
    });
  };

  // Добавить/удалить блок
  const addBlock = (
    key: "workplaces" | "departments" | "positions" | "shifts"
  ) =>
    setForm((f) => ({
      ...f,
      [key]: [...(f[key] as unknown as number[]), 0],
    }));
  const removeBlock = (
    key: "workplaces" | "departments" | "positions" | "shifts",
    idx: number
  ) =>
    setForm((f) => {
      const arr = [...(f[key] as unknown as number[])];
      if (arr.length <= 1) return f;
      arr.splice(idx, 1);
      return { ...f, [key]: arr } as FormState;
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      employee_no: form.employee_no,
      full_name: form.full_name,
      gender: form.gender,
      place_of_work: form.workplaces[0],
      department: form.departments[0],
      position: form.positions[0],
      shift: form.shifts[0],
      salary: form.salary,
      is_active: form.is_active,
      is_fired: form.is_fired,
    };
    console.log("Submitting employee:", payload);
    try {
      const res = await employeeService.createEmployee(payload);
      console.log("API response:", res);
      onSaved();
    } catch (err: any) {
      console.error("CreateEmployee failed:", err.response?.data || err);
      // здесь можно показать пользователю уведомление об ошибке
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-30"
          leave="ease-in duration-200"
          leaveFrom="opacity-30"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black" style={{ opacity: 0.3 }} />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto p-5">
          <div className="flex min-h-full items-center justify-center py-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300 transform"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200 transform"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-5xl bg-white p-4 space-y-6  rounded-[30px]">
                {/* Header */}
                <ModalTitle title={"Добавить сотрудника"} onClose={onClose} />

                <hr className="opacity-10" />

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
                  <div className="flex gap-5 flex-wrap lg:flex-nowrap">
                    {/* Имя */}
                    <div className="flex flex-col gap-2.5 flex-grow w-full">
                      <label
                        htmlFor="first-name"
                        className="text-2xl font-medium"
                      >
                        Имя
                      </label>
                      <input
                        type="text"
                        placeholder="Имя"
                        id="first-name"
                        value={form.full_name.split(" ")[1] || ""}
                        onChange={(e) =>
                          setForm((f) => {
                            const parts = f.full_name.split(" ");
                            parts[1] = e.target.value;
                            return { ...f, full_name: parts.join(" ") };
                          })
                        }
                        className="input"
                        required
                      />
                    </div>
                    {/* Фамилия */}
                    <div className="flex flex-col gap-2.5 flex-grow w-full">
                      <label
                        htmlFor="last-name"
                        className="text-2xl font-medium"
                      >
                        Фамилия
                      </label>
                      <input
                        type="text"
                        id="last-name"
                        placeholder="Фамилия"
                        value={form.full_name.split(" ")[0] || ""}
                        onChange={(e) =>
                          setForm((f) => ({
                            ...f,
                            full_name: `${e.target.value} ${f.full_name
                              .split(" ")
                              .slice(1)
                              .join(" ")}`,
                          }))
                        }
                        className="input"
                        required
                      />
                    </div>
                    {/* Отчество */}
                    <div className="flex flex-col gap-2.5 flex-grow w-full">
                      <label
                        htmlFor="middle-name"
                        className="text-2xl font-medium"
                      >
                        Отчество
                      </label>
                      <input
                        type="text"
                        placeholder="Отчество"
                        id="middle-name"
                        value={form.full_name.split(" ")[2] || ""}
                        onChange={(e) =>
                          setForm((f) => {
                            const parts = f.full_name.split(" ");
                            parts[2] = e.target.value;
                            return { ...f, full_name: parts.join(" ") };
                          })
                        }
                        className="input"
                        required
                      />
                    </div>
                    {/* Gender */}
                    <div className="flex flex-col gap-2.5 flex-grow w-full">
                      <p className="text-2xl font-medium">Пол</p>
                      <div className="flex gap-2.5">
                        {(["female", "male"] as const).map((g) => (
                          <button
                            key={g}
                            type="button"
                            onClick={() =>
                              setForm((f) => ({ ...f, gender: g }))
                            }
                            className={`flex justify-center min-h-[60px] border items-center flex-1 w-full rounded-[15px]
                              text-xl font-semibold ${
                                form.gender === g
                                  ? "border-[var(--primary)] text-[var(--primary)]"
                                  : "border-[var(--gray-e6)] text-[var(--foreground)]"
                              }`}
                          >
                            {g === "female" ? "Жн" : "Мж"}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <hr className="opacity-10" />

                  {/* Workplaces */}
                  <div className="flex flex-col gap-2.5">
                    <label className="font-semibold text-2xl">
                      Места работы
                    </label>
                    {form.workplaces.map((_, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-5 flex-wrap lg:flex-nowrap"
                      >
                        <div className="w-1/2">
                          <Listbox
                            value={form.workplaces[i]}
                            onChange={(v) => updateArray("workplaces", i, v)}
                          >
                            <div className="relative flex-1">
                              <Listbox.Button
                                className="flex flex-grow w-full items-center justify-between border 
                            border-[var(--gray-e6)] min-h-[60px] pl-4 pr-2.5 rounded-[15px] text-xl font-semibold text-[var(--foreground-50)]"
                              >
                                {branches.find(
                                  (b) => b.id === form.workplaces[i]
                                )?.name ?? "Выберите филиал"}
                                <ArrowDown className="w-5 h-5 text-[var(--foreground)]" />
                              </Listbox.Button>
                              <Listbox.Options className="absolute mt-1 w-full rounded-lg bg-white border border-gray-200 shadow-lg z-10 overflow-auto max-h-60">
                                {branches.map((b) => (
                                  <Listbox.Option
                                    key={b.id}
                                    value={b.id}
                                    className={({ active }) =>
                                      `cursor-pointer px-4 py-2 ${
                                        active
                                          ? "bg-gray-100 text-gray-900"
                                          : "text-gray-700"
                                      } flex justify-between items-center`
                                    }
                                  >
                                    {b.name}
                                    {form.workplaces[i] === b.id && (
                                      <Check className="w-4 h-4 text-blue-600" />
                                    )}
                                  </Listbox.Option>
                                ))}
                              </Listbox.Options>
                            </div>
                          </Listbox>
                        </div>

                        <div className="w-full lg:w-1/2 flex gap-2.5">
                          <button
                            type="button"
                            onClick={() => addBlock("workplaces")}
                            className="min-h-[60px] flex items-center justify-center border border-[var(--green)] w-full rounded-full text-2xl text-[var(--green)] "
                          >
                            +
                          </button>
                          {form.workplaces.length > 1 && (
                            <>
                              <button
                                type="button"
                                onClick={() => removeBlock("workplaces", i)}
                                className="min-h-[60px] flex items-center justify-center border border-[var(--red)] w-full rounded-full text-2xl text-[var(--red)] "
                              >
                                <TrashIcon />
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <hr className="opacity-10" />

                  {/* Departments */}
                  <div className="flex flex-col gap-2.5">
                    <label className="font-semibold text-2xl">Отделы</label>
                    {form.departments.map((_, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-5 flex-wrap lg:flex-nowrap"
                      >
                        <div className="w-full lg:w-1/2">
                          <Listbox
                            value={form.departments[i]}
                            onChange={(v) => updateArray("departments", i, v)}
                          >
                            <div className="relative flex-1">
                              <Listbox.Button
                                className="flex flex-grow w-full items-center justify-between border 
            border-[var(--gray-e6)] min-h-[60px] pl-4 pr-2.5 rounded-[15px] text-xl font-semibold text-[var(--foreground-50)]"
                              >
                                {departments.find(
                                  (d) => d.id === form.departments[i]
                                )?.name ?? "Выберите отдел"}
                                <ArrowDown className="w-5 h-5 text-[var(--foreground)]" />
                              </Listbox.Button>
                              <Listbox.Options className="absolute mt-1 w-full rounded-lg bg-white border border-gray-200 shadow-lg z-10 overflow-auto max-h-60">
                                {departments.map((d) => (
                                  <Listbox.Option
                                    key={d.id}
                                    value={d.id}
                                    className={({ active }) =>
                                      `cursor-pointer px-4 py-2 ${
                                        active
                                          ? "bg-gray-100 text-gray-900"
                                          : "text-gray-700"
                                      } flex justify-between items-center`
                                    }
                                  >
                                    {d.name}
                                    {form.departments[i] === d.id && (
                                      <Check className="w-4 h-4 text-blue-600" />
                                    )}
                                  </Listbox.Option>
                                ))}
                              </Listbox.Options>
                            </div>
                          </Listbox>
                        </div>

                        <div className="w-full lg:w-1/2 flex gap-2.5">
                          <button
                            type="button"
                            onClick={() => addBlock("departments")}
                            className="min-h-[60px] flex items-center justify-center border border-[var(--green)] w-full rounded-full text-2xl text-[var(--green)]"
                          >
                            +
                          </button>
                          {form.departments.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeBlock("departments", i)}
                              className="min-h-[60px] flex items-center justify-center border border-[var(--red)] w-full rounded-full text-2xl text-[var(--red)]"
                            >
                              <TrashIcon />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <hr className="opacity-10" />

                  <div className="flex gap-5 flex-wrap lg:flex-nowrap">
                    {/* Positions */}
                    <div className="flex flex-col gap-2.5 w-full">
                      <label className="font-semibold text-2xl">
                        Должности
                      </label>
                      {form.positions.map((_, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Listbox
                            value={form.positions[i]}
                            onChange={(v) => updateArray("positions", i, v)}
                          >
                            <div className="relative flex-1 lg:w-1/2 w-full flex-wrap lg:flex-nowrap">
                              <Listbox.Button
                                className="flex flex-grow w-full items-center justify-between border 
            border-[var(--gray-e6)] min-h-[60px] pl-4 pr-2.5 rounded-[15px] text-xl font-semibold text-[var(--foreground-50)]"
                              >
                                {positions.find(
                                  (p) => p.id === form.positions[i]
                                )?.name ?? "Выберите должность"}
                                <ArrowDown className="w-5 h-5 text-[var(--foreground)]" />
                              </Listbox.Button>
                              <Listbox.Options className="absolute mb-1 bottom-[60px] w-full rounded-lg bg-white border border-gray-200 shadow-lg z-10 overflow-auto max-h-60">
                                {positions.map((p) => (
                                  <Listbox.Option
                                    key={p.id}
                                    value={p.id}
                                    className={({ active }) =>
                                      `cursor-pointer px-4 py-2 ${
                                        active
                                          ? "bg-gray-100 text-gray-900"
                                          : "text-gray-700"
                                      } flex justify-between items-center`
                                    }
                                  >
                                    {p.name}
                                    {form.positions[i] === p.id && (
                                      <Check className="w-4 h-4 text-blue-600" />
                                    )}
                                  </Listbox.Option>
                                ))}
                              </Listbox.Options>
                            </div>
                          </Listbox>
                        </div>
                      ))}
                    </div>

                    {/* Salary */}
                    <div className="flex flex-col gap-2.5 w-full">
                      <label className="font-semibold text-2xl">Зарплата</label>
                      <input
                        type="text"
                        placeholder="00.0"
                        value={form.salary}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, salary: e.target.value }))
                        }
                        className="input"
                        required
                      />
                    </div>
                  </div>

                  <hr className="opacity-10" />

                  {/* Shifts */}
                  <div className="flex flex-col gap-2.5">
                    <label className="font-semibold text-2xl">Смены</label>
                    {form.shifts.map((_, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-5 flex-wrap lg:flex-nowrap"
                      >
                        <div className="w-1/2">
                          <Listbox
                            value={form.shifts[i]}
                            onChange={(v) => updateArray("shifts", i, v)}
                          >
                            <div className="relative flex-1">
                              <Listbox.Button
                                className="flex flex-grow w-full items-center justify-between border 
            border-[var(--gray-e6)] min-h-[60px] pl-4 pr-2.5 rounded-[15px] text-xl font-semibold text-[var(--foreground-50)]"
                              >
                                {shifts.find((s) => s.id === form.shifts[i])
                                  ?.name ?? "Выберите смену"}
                                <ArrowDown className="w-5 h-5 text-[var(--foreground)]" />
                              </Listbox.Button>
                              <Listbox.Options className="absolute mb-1 bottom-[60px] w-full rounded-lg bg-white border border-gray-200 shadow-lg z-10 overflow-auto max-h-60">
                                {shifts.map((s) => (
                                  <Listbox.Option
                                    key={s.id}
                                    value={s.id}
                                    className={({ active }) =>
                                      `cursor-pointer px-4 py-2 ${
                                        active
                                          ? "bg-gray-100 text-gray-900"
                                          : "text-gray-700"
                                      } flex justify-between items-center`
                                    }
                                  >
                                    {s.name}
                                    {form.shifts[i] === s.id && (
                                      <Check className="w-4 h-4 text-blue-600" />
                                    )}
                                  </Listbox.Option>
                                ))}
                              </Listbox.Options>
                            </div>
                          </Listbox>
                        </div>

                        <div className="w-full lg:w-1/2 flex gap-2.5">
                          <button
                            type="button"
                            onClick={() => addBlock("shifts")}
                            className="min-h-[60px] flex items-center justify-center border border-[var(--green)] w-full rounded-full text-2xl text-[var(--green)]"
                          >
                            +
                          </button>
                          {form.shifts.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeBlock("shifts", i)}
                              className="min-h-[60px] flex items-center justify-center border border-[var(--red)] w-full rounded-full text-2xl text-[var(--red)]"
                            >
                              <TrashIcon />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex w-full items-center gap-5">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-5 border border-[var(--gray-e6)] rounded-[15px] text-xl font-semibold text-[var(--foreground)] 
                      flex items-center justify-center w-full min-h-[60px]"
                    >
                      Отменить
                    </button>
                    <button
                      type="submit"
                      className="px-5 bg-[var(--primary)] rounded-[15px] text-xl font-semibold text-[var(--white)] flex items-center 
                      justify-center gap-2.5 w-full min-h-[60px]"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M7 12.9005L10.1429 16.5005L18 7.50049"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Сохранить
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
