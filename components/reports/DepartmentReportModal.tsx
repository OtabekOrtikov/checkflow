// src/components/reports/DepartmentReportModal.tsx
"use client";

import { Fragment, useState } from "react";
import { Dialog, Transition, Listbox } from "@headlessui/react";
import useSWR from "swr";
import { reportService } from "@/services/reportService";
import { departmentService } from "@/services/departmentService";
import { CreateReportPayload } from "@/types/report.t";
import { Department } from "@/types/department.t";
import { ModalTitle } from "../ModalTitle";
import { Check } from "lucide-react";
import ArrowDown from "@/assets/icons/arrow-down.svg";

interface Props {
  open: boolean;
  onClose(): void;
  onSaved(): void;
}

export default function DepartmentReportModal({
  open,
  onClose,
  onSaved,
}: Props) {
  const [form, setForm] = useState<
    CreateReportPayload & { department: number }
  >({
    date_from: "",
    date_to: "",
    department: 0,
  });
  const [loading, setLoading] = useState(false);

  const { data: deps = [] } = useSWR<Department[]>(
    "departments",
    departmentService.getDepartments
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await reportService.createDepartmentReport({
      department: form.department,
      date_from: form.date_from,
      date_to: form.date_to,
    });
    setLoading(false);
    onSaved();
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
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

        {/* panel */}
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
            <Dialog.Panel className="w-full max-w-3xl bg-white p-6 space-y-4 rounded-2xl">
              <ModalTitle title="Отчёт по отделам" onClose={onClose} />
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block mb-1 font-medium">Дата начала</label>
                  <input
                    type="date"
                    className="input w-full"
                    value={form.date_from}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, date_from: e.target.value }))
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">
                    Дата окончания
                  </label>
                  <input
                    type="date"
                    className="input w-full"
                    value={form.date_to}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, date_to: e.target.value }))
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">
                    Выберите отдел
                  </label>
                  <Listbox
                    value={form.department}
                    onChange={(v) => setForm((f) => ({ ...f, department: v }))}
                  >
                    <div className="relative">
                      <Listbox.Button className="input w-full flex justify-between items-center">
                        {deps.find((d) => d.id === form.department)?.name ??
                          "—"}
                        <ArrowDown className="w-5 h-5 text-gray-500" />
                      </Listbox.Button>
                      <Listbox.Options className="absolute mt-1 w-full bg-white border rounded-lg shadow max-h-60 overflow-auto z-10">
                        {deps.map((d) => (
                          <Listbox.Option
                            key={d.id}
                            value={d.id}
                            className={({ active }) =>
                              `cursor-pointer px-4 py-2 ${
                                active ? "bg-gray-100" : ""
                              }`
                            }
                          >
                            <div className="flex justify-between">
                              {d.name}
                              {form.department === d.id && (
                                <Check className="w-4 h-4 text-blue-600" />
                              )}
                            </div>
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </div>
                  </Listbox>
                </div>
                <div className="flex gap-4 justify-end">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 border rounded-full"
                  >
                    Отмена
                  </button>
                  <button
                    type="submit"
                    disabled={loading || form.department === 0}
                    className="px-6 py-2 bg-blue-600 text-white rounded-full"
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
