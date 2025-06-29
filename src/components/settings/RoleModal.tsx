// src/components/settings/RoleModal.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Dialog, Combobox } from "@headlessui/react";
import XCircle from "@/assets/icons/XCircle.svg";
import CheckIcon from "@/assets/icons/checkIcon.svg";
import { de } from "date-fns/locale";

export interface RoleModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  employees: string[];
  roles: string[];
  permissions: string[];
  locations: string[];
  item?: {
    employee: string;
    email: string;
    role: string;
    permissions: string[];
    location: string;
    department: string;
  };
  onSave: (data: {
    employee: string;
    email: string;
    role: string;
    permissions: string[];
    location: string;
    department: string;
  }) => Promise<any>;
  department: string[];
}

export const RoleModal: React.FC<RoleModalProps> = ({
  title,
  isOpen,
  onClose,
  employees,
  roles,
  permissions,
  locations,
  item,
  onSave,
  department,
}) => {
  const [form, setForm] = useState({
    employee: "",
    email: "",
    role: "",
    permissions: [] as string[],
    location: "",
    department: "",
  });

  // контролируем открытие для Combobox-ов
  const [empOpen, setEmpOpen] = useState(false);
  const [perOpen, setPerOpen] = useState(false);

  useEffect(() => {
    if (item) setForm(item);
  }, [item]);

  const handleChange = <K extends keyof typeof form>(key: K, value: any) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSave = () => {
    onSave(form).then(onClose);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50">
      <div className="flex items-center justify-center min-h-screen bg-black/30 p-4">
        <Dialog.Panel className="bg-white rounded-[20px] w-full max-w-xl p-[15px] space-y-[20px] ">
          <div className="flex justify-between items-start">
            <Dialog.Title className="text-3xl font-[Bounded] font-[566] text-(--foreground)">
              {title}
            </Dialog.Title>
            <button onClick={onClose}>
              <XCircle />
            </button>
          </div>

          <hr className="bg-(--foreground) opacity-10" />

          {/* Сотрудник + Email */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Сотрудник</label>
              <Combobox
                value={form.employee}
                onChange={(v) => handleChange("employee", v)}
                by={(a, b) => a === b}
              >
                <div className="relative">
                  <Combobox.Input
                    className="w-full border border-(--gray-e6) rounded-[15px] px-5 py-2"
                    onFocus={() => setEmpOpen(true)}
                    onBlur={() => setEmpOpen(false)}
                    displayValue={(v: string) => v}
                    onChange={(e) =>
                      handleChange("employee", e.currentTarget.value)
                    }
                  />
                  <Combobox.Options
                    static={empOpen}
                    className="absolute mt-1 w-full bg-white border border-(--gray-e6) rounded-[15px] shadow max-h-60 overflow-auto z-10"
                  >
                    {employees.map((emp) => (
                      <Combobox.Option
                        key={emp}
                        value={emp}
                        className={({ active, selected }) =>
                          `px-5 py-2 cursor-pointer ${
                            active ? "bg-(--primary) text-white" : ""
                          } ${selected ? "font-bold" : ""}`
                        }
                      >
                        {emp}
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                </div>
              </Combobox>
            </div>
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="text"
                className="w-full border border-(--gray-e6) rounded-[15px] px-5 py-2"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>
          </div>

          <hr className="bg-(--foreground) opacity-10" />

          {/* Роль */}
          <div>
            <label className="block mb-1 font-medium">Назначить роль</label>
            <select
              className="w-full border border-(--gray-e6) rounded-[15px] px-5 py-2"
              value={form.role}
              onChange={(e) => handleChange("role", e.target.value)}
            >
              <option value="">Выберите</option>
              {roles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          <hr className="bg-(--foreground) opacity-10" />

          {/* Назначить возможности */}
          <div>
            <label className="block mb-1 font-medium">
              Назначить возможности
            </label>
            <Combobox
              value={form.permissions}
              onChange={(v) => handleChange("permissions", v)}
              multiple
            >
              <div className="relative">
                <Combobox.Input
                  className="w-full border border-(--gray-e6) rounded-[15px] px-5 py-2"
                  onFocus={() => setPerOpen(true)}
                  onBlur={() => setPerOpen(false)}
                  displayValue={(vals: string[]) => vals.join(", ")}
                />
                <Combobox.Options
                  static={perOpen}
                  className="absolute mt-1 w-full bg-white border border-(--gray-e6) rounded-[15px] shadow max-h-60 overflow-auto z-10"
                >
                  {permissions.map((perm) => (
                    <Combobox.Option
                      key={perm}
                      value={perm}
                      className={({ active, selected }) =>
                        `px-5 py-2 cursor-pointer ${
                          active ? "bg-(--primary) text-white" : ""
                        } ${selected ? "font-bold" : ""}`
                      }
                    >
                      {perm}
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              </div>
            </Combobox>
          </div>

          {/* Локация */}
          <div>
            <label className="block mb-1 font-medium">Локация</label>
            <select
              className="w-full border border-(--gray-e6) rounded-[15px] px-5 py-2"
              value={form.location}
              onChange={(e) => handleChange("location", e.target.value)}
            >
              <option value="">Выберите</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">Отдел</label>
            <select
              className="w-full border border-(--gray-e6) rounded-[15px] px-5 py-2"
              value={form.department}
              onChange={(e) => handleChange("department", e.target.value)}
            >
              <option value="">Выберите</option>
              {department.map((dep: string) => (
                <option key={dep} value={dep}>
                  {dep}
                </option>
              ))}
            </select>
          </div>

          {/* Кнопки */}
          <div className="flex gap-5">
            <button
              onClick={handleSave}
              className="flex-1 bg-(--primary) text-white rounded-[15px] 
              px-4 py-2 flex items-center justify-center gap-2
              text-xl font-semibold"
            >
              <CheckIcon />
              Сохранить
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-transparent text-(--red) border border-(--red) 
              rounded-[15px] px-4 py-2 flex items-center justify-center
              text-xl font-semibold"
            >
              Отмена
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
