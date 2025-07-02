// src/components/settings/LocationModal.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import XCircle from "@/assets/icons/XCircle.svg";
import CheckIcon from "@/assets/icons/checkIcon.svg";
import type { Location } from "@/types/location.t";

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (loc: Omit<Location, "id">) => Promise<any>;
  onUpdate?: (id: string, loc: Omit<Location, "id">) => Promise<any>;
  existing?: Location;
}

export const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onUpdate,
  existing,
}) => {
  const [form, setForm] = useState<Omit<Location, "id">>({
    name: "",
    address: "",
  });

  useEffect(() => {
    if (existing) {
      setForm({ name: existing.name, address: existing.address });
    } else {
      setForm({ name: "", address: "" });
    }
  }, [existing]);

  const handleChange = (key: keyof Omit<Location, "id">, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const handleSave = async () => {
    if (existing && onUpdate) {
      await onUpdate(existing.id, form);
    } else {
      await onSave(form);
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50">
      <div className="flex items-center justify-center min-h-screen bg-black/30 p-4">
        <Dialog.Panel className="bg-white rounded-[30px] w-full max-w-md p-6 space-y-6">
          <div className="flex justify-between items-center">
            <Dialog.Title className="text-2xl font-semibold">
              {existing ? "Редактировать локацию" : "Добавить локацию"}
            </Dialog.Title>
            <button onClick={onClose}>
              <XCircle />
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-lg font-medium">Название</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full h-12 p-3 border rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-lg font-medium">Адрес</label>
              <input
                type="text"
                value={form.address}
                onChange={(e) => handleChange("address", e.target.value)}
                className="w-full h-12 p-3 border rounded-lg"
              />
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={handleSave}
              className="flex-1 h-12 bg-(--primary) text-white rounded-lg flex items-center justify-center gap-2"
            >
              <CheckIcon />
              {existing ? "Сохранить" : "Добавить"}
            </button>
            <button
              onClick={onClose}
              className="flex-1 h-12 bg-(--foreground-50) rounded-lg flex items-center justify-center text-white"
            >
              Отмена
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
