// src/components/profile/PositionAssignModal.tsx
"use client";
import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { PositionAssignment } from "@/types/profile.t";
import { fetchPositions } from "@/services/profileService";
import { Listbox } from "@headlessui/react";
import ArrowDown from "@/assets/icons/arrow-down.svg";
import CheckIcon from "@/assets/icons/checkIcon.svg";

export type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (p: { position: string; assignedDate: string }) => Promise<void>;
  item?: { position: string; assignedDate: string };
  existing?: { position: string; assignedDate: string };
};

export function PositionAssignModal({
  isOpen,
  onClose,
  onSave,
  existing,
  item = { position: "", assignedDate: "" },
}: Props) {
  const [allPositions, setAll] = useState<string[]>([]);
  const [position, setPosition] = useState<string>(existing?.position || "");
  const [assignedDate, setAssignedDate] = useState<string>(
    existing?.assignedDate.slice(0, 10) || ""
  );

  useEffect(() => {
    fetchPositions().then((r) => {
      // предположим, что fetchPositions() возвращает массив строковых названий
      setAll(r.data.map((p) => p.position));
    });
  }, []);

  const handleSubmit = async () => {
    await onSave({ position, assignedDate });
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50">
      <div className="flex items-center justify-center min-h-screen bg-black/30 p-4">
        <Dialog.Panel className="bg-white rounded-[20px] w-full max-w-md p-6 space-y-6">
          <Dialog.Title className="text-2xl font-semibold">
            {existing ? "Изменить должность" : "Назначить должность"}
          </Dialog.Title>

          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <label className="font-medium">Должность</label>
              <Listbox value={position} onChange={setPosition}>
                <div className="relative">
                  <Listbox.Button className="w-full p-3 border rounded-lg text-left">
                    {position || "—"}
                    <ArrowDown className="absolute right-3 top-1/2 transform -translate-y-1/2" />
                  </Listbox.Button>
                  <Listbox.Options className="absolute mt-1 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-auto">
                    {allPositions.map((opt) => (
                      <Listbox.Option
                        key={opt}
                        value={opt}
                        className="cursor-pointer px-3 py-2 hover:bg-(--primary) hover:text-white"
                      >
                        {opt}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-medium">Дата назначения</label>
              <input
                type="date"
                className="w-full p-3 border rounded-lg"
                value={assignedDate}
                onChange={(e) => setAssignedDate(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={handleSubmit}
              className="flex-1 p-3 bg-(--primary) text-white rounded-lg flex items-center justify-center gap-2"
            >
              <CheckIcon />
              Сохранить
            </button>
            <button
              onClick={onClose}
              className="flex-1 p-3 bg-(--foreground-50) text-white rounded-lg"
            >
              Отмена
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
