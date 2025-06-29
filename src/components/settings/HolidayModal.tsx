// src/components/settings/HolidayModal.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import XCircle from "@/assets/icons/XCircle.svg";
import CheckIcon from "@/assets/icons/checkIcon.svg";

interface HolidayModalProps {
  isOpen: boolean;
  onClose: () => void;
  item?: Partial<{
    id: string;
    name: string;
    color: string;
    description: string;
    startDate: string;
    endDate: string;
  }>;
  onSave: (h: {
    id: string;
    name: string;
    color: string;
    description: string;
    startDate: string;
    endDate: string;
  }) => Promise<any>;
}

const COLORS = [
  "#FF4D4F",
  "#FAAD14",
  "#52C41A",
  "#13C2C2",
  "#2F54EB",
  "#722ED1",
  "#EB2F96",
  "#36CFC9",
];

export const HolidayModal: React.FC<HolidayModalProps> = ({
  isOpen,
  onClose,
  item,
  onSave,
}) => {
  const [form, setForm] = useState({
    id: item?.id || "",
    name: item?.name || "",
    color: item?.color || COLORS[0],
    description: item?.description || "",
    startDate: item?.startDate || "",
    endDate: item?.endDate || "",
  });

  useEffect(() => {
    if (item) {
      setForm({
        id: item.id!,
        name: item.name!,
        color: item.color!,
        description: item.description!,
        startDate: item.startDate!,
        endDate: item.endDate!,
      });
    }
  }, [item]);

  const handleChange = (key: keyof typeof form, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async () => {
    if (!form.id) form.id = String(Date.now());
    await onSave(form as any);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50">
      <div className="flex items-center justify-center min-h-screen bg-black/30 p-4">
        <Dialog.Panel className="bg-white rounded-[30px] w-full max-w-4xl p-[15px] space-y-5">
          <div className="flex justify-between items-center">
            <Dialog.Title className="text-3xl font-[Bounded] font-[566] text-(--foreground)">
              {item ? "Изменить тип отгула" : "Добавление отгула"}
            </Dialog.Title>
            <button onClick={onClose}>
              <XCircle />
            </button>
          </div>

          <hr className="bg-(--foreground) opacity-10" />

          <div className="flex flex-col gap-2">
            <label className="font-medium text-2xl">Название</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border border-(--gray-e6) rounded-[15px] 
              min-h-[60px] text-xl font-semibold outline-0 px-5 py-2"
              required
            />
          </div>

          <hr className="bg-(--foreground) opacity-10" />

          <div className="flex flex-col gap-2">
            <label className="font-medium text-2xl">Цвет</label>
            <div className="flex gap-2 overflow-x-auto w-full">
              {COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => setForm((f) => ({ ...f, color: c }))}
                  className={`h-15 w-20 rounded-full border-1 ${
                    form.color === c
                      ? "border-(--primary)"
                      : "border-transparent"
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          <hr className="bg-(--foreground) opacity-10" />

          <div>
            <label className="font-medium text-2xl">Описание</label>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full h-24 p-3 border rounded-lg text-xl font-semibold outline-0 border-(--gray-e6)"
            />
          </div>

          <hr className="bg-(--foreground) opacity-10" />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-medium text-2xl">Дата начала</label>
              <input
                type="date"
                value={form.startDate}
                onChange={(e) => handleChange("startDate", e.target.value)}
                className="w-full border border-(--gray-e6) rounded-[15px] 
              min-h-[60px] text-xl font-semibold outline-0 px-5 py-2 text-(--foreground-50)"
              />
            </div>
            <div>
              <label className="font-medium text-2xl">Дата окончания</label>
              <input
                type="date"
                value={form.endDate}
                onChange={(e) => handleChange("endDate", e.target.value)}
                className="w-full border border-(--gray-e6) rounded-[15px] 
              min-h-[60px] text-xl font-semibold outline-0 px-5 py-2 text-(--foreground-50)"
              />
            </div>
          </div>

          <hr className="bg-(--foreground) opacity-10" />

          <div className="flex gap-5">
            <button
              onClick={handleSubmit}
              className="flex-1 bg-(--primary) h-[60px] text-white rounded-[15px] 
              px-4 py-2 flex items-center justify-center gap-2
              text-xl font-semibold"
            >
              <CheckIcon />
              Сохранить
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-transparent h-[60px] text-(--red) border border-(--red) 
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
