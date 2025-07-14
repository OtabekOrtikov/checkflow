// src/components/penalties/AssignPenaltyModal.tsx
"use client";

import { Fragment, useState, useMemo } from "react";
import { Dialog, Transition, Combobox } from "@headlessui/react";
import useSWR from "swr";
import { penaltyService } from "@/services/penaltyService";
import { employeeService } from "@/services/employeeService";
import { Employee } from "@/types/employee.t";
import { ModalTitle } from "../ModalTitle";
import ArrowDown from "@/assets/icons/arrow-down.svg";
import { Check } from "lucide-react";

interface Props {
  open: boolean;
  onClose(): void;
  onSaved(): void;
  penaltyId: number;
}

export default function AssignPenaltyModal({
  open,
  onClose,
  onSaved,
  penaltyId,
}: Props) {
  const [employeeId, setEmployeeId] = useState<number | null>(null);
  const [query, setQuery] = useState("");
  const { data: employees = [] } = useSWR<Employee[]>(
    "employees",
    employeeService.getEmployees
  );

  const filtered = useMemo(() => {
    if (!query) return employees;
    return employees.filter((u) =>
      u.full_name.toLowerCase().includes(query.toLowerCase())
    );
  }, [employees, query]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!employeeId) return;
    await penaltyService.assign({ penalty: penaltyId, employee: employeeId });
    onSaved();
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
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

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300 transform"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200 transform"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-3xl bg-white p-6 space-y-6 rounded-2xl">
              <ModalTitle title="Назначить штраф" onClose={onClose} />

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block mb-1 font-medium">
                    Выберите сотрудника
                  </label>
                  <Combobox value={employeeId} onChange={setEmployeeId}>
                    <div className="relative">
                      <Combobox.Input
                        className="input w-full pr-10"
                        onChange={(e) => setQuery(e.target.value)}
                        displayValue={(id: number) =>
                          employees.find((u) => u.id === id)?.full_name ?? ""
                        }
                        placeholder="Начните вводить имя..."
                      />
                      <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <ArrowDown className="w-5 h-5 text-gray-400" />
                      </Combobox.Button>

                      <Transition.Root
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Combobox.Options className="absolute mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto z-10">
                          {filtered.length === 0 && (
                            <div className="px-4 py-2 text-gray-500">
                              Не найдено
                            </div>
                          )}
                          {filtered.map((u) => (
                            <Combobox.Option
                              key={u.id}
                              value={u.id}
                              className={({ active }) =>
                                `cursor-pointer px-4 py-2 flex justify-between ${
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700"
                                }`
                              }
                            >
                              <span>{u.full_name}</span>
                              {employeeId === u.id && (
                                <Check className="w-4 h-4 text-blue-600" />
                              )}
                            </Combobox.Option>
                          ))}
                        </Combobox.Options>
                      </Transition.Root>
                    </div>
                  </Combobox>
                </div>

                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2 border border-[var(--gray-e6)] rounded-[15px]"
                  >
                    Отмена
                  </button>
                  <button
                    type="submit"
                    disabled={!employeeId}
                    className="px-5 py-2 bg-[var(--primary)] text-white rounded-[15px]"
                  >
                    Сохранить
                  </button>
                </div>
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
