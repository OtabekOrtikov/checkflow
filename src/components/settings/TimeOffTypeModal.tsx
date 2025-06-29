"use client";

import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import XCircle from "@/assets/icons/XCircle.svg";
import CheckIcon from "@/assets/icons/checkIcon.svg";

export interface TimeOffTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  item?: {
    id: string;
    name: string;
    color: string;
    description: string;
  };
  onSave: (data: {
    id: string;
    name: string;
    color: string;
    description: string;
  }) => Promise<any>;
}

const COLORS = [
  "#F5222D",
  "#FA8C16",
  "#52C41A",
  "#13C2C2",
  "#2F54EB",
  "#EB2F96",
  "#FA16FF",
  "#16FFF3",
];

export const TimeOffTypeModal: React.FC<TimeOffTypeModalProps> = ({
  isOpen,
  onClose,
  item,
  onSave,
}) => {
  const [form, setForm] = useState({
    id: "",
    name: "",
    color: COLORS[0],
    description: "",
  });

  useEffect(() => {
    if (item) setForm(item);
    else
      setForm({
        id: `${Date.now()}`,
        name: "",
        color: COLORS[0],
        description: "",
      });
  }, [item]);

  const handleSave = async () => {
    if (!form.name.trim()) {
      alert("Название не может быть пустым");
      return;
    }
    if (!form.color) {
      alert("Выберите цвет");
      return;
    }
    
    // Проверка на уникальность названия
    await onSave(form);
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
