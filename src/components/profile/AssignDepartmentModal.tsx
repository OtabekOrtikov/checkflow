"use client";

import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import CheckIcon from "@/assets/icons/checkIcon.svg";
import XCircle from "@/assets/icons/XCircle.svg";
import type { DepartmentAssignment } from "@/types/profile.t";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (d: DepartmentAssignment) => Promise<void>;
  item: DepartmentAssignment | undefined;
  itemIndex: number | null;
};

export default function AssignDepartmentModal({
  isOpen,
  onClose,
  onSave,
  item: initial,
  itemIndex,
}: Props) {
  const [form, setForm] = useState<DepartmentAssignment>({
    department: "",
    startDate: new Date().toISOString().slice(0, 10),
  });

  useEffect(() => {
    if (initial) setForm(initial);
    else
      setForm({
        department: "",
        startDate: new Date().toISOString().slice(0, 10),
      });
  }, [initial, isOpen]);

  const handleChange = <K extends keyof DepartmentAssignment>(
    key: K,
    value: DepartmentAssignment[K]
  ) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const handleSubmit = async () => {
    await onSave(form);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50">
      <div className="flex items-center justify-center min-h-screen bg-black/30 px-4">
        <Dialog.Panel className="bg-white rounded-[20px] w-full max-w-sm p-6 space-y-6">
          <div className="flex justify-between items-center">
            <Dialog.Title className="text-xl font-semibold">
              {initial ? "Редактировать назначение" : "Назначить отдел"}
            </Dialog.Title>
            <button onClick={onClose}>
              <XCircle />
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Отдел</label>
              <input
                type="text"
                value={form.department}
                onChange={(e) => handleChange("department", e.target.value)}
                className="w-full border rounded px-3 py-2"
                placeholder="Название отдела"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Дата начала</label>
              <input
                type="date"
                value={form.startDate}
                onChange={(e) => handleChange("startDate", e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-(--foreground-50) rounded text-white"
            >
              Отмена
            </button>
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 px-4 py-2 bg-(--primary) text-white rounded"
            >
              <CheckIcon /> Сохранить
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
