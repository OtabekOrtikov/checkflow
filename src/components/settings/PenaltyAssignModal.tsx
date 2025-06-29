"use client";

import React, { useState, useEffect } from "react";
import { Dialog, Listbox } from "@headlessui/react";
import XCircle from "@/assets/icons/XCircle.svg";
import CheckIcon from "@/assets/icons/checkIcon.svg";
import ArrowDown from "@/assets/icons/arrow-down.svg";
import { PenaltyType } from "@/types/settings.t";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  penalty: PenaltyType;
  employees: string[];
  onSave: (penaltyTypeId: string, employee: string) => Promise<any>;
  penaltyTypes?: PenaltyType[];
}

export const PenaltyAssignModal: React.FC<Props> = ({
  isOpen,
  onClose,
  penalty,
  employees,
  onSave,
  penaltyTypes = [],
}) => {
  const availableTypes = penaltyTypes.length ? penaltyTypes : [penalty];
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedPenaltyType, setSelectedPenaltyType] = useState(penalty.id);

  useEffect(() => {
    setSelectedEmployee("");
    setSelectedPenaltyType(penalty.id);
  }, [penalty, isOpen]);

  const save = async () => {
    if (!selectedEmployee) return;
    await onSave(selectedPenaltyType, selectedEmployee);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50">
      <div className="flex items-center justify-center min-h-screen bg-black/30 p-4">
        <Dialog.Panel className="bg-white rounded-[30px] w-full max-w-xl p-[15px] space-y-6">
          <div className="flex justify-between items-center">
            <Dialog.Title className="text-3xl font-[Bounded] font-[566] text-(--foreground)">
              Назначить штраф
            </Dialog.Title>
            <button onClick={onClose}>
              <XCircle />
            </button>
          </div>

          <hr className="bg-(--foreground) opacity-10" />

          <div className="grid grid-cols-1 gap-5">
            <div>
              <label className="block mb-3 text-2xl font-semibold">
                Назначается
              </label>
              <Listbox
                value={selectedPenaltyType}
                onChange={setSelectedPenaltyType}
              >
                <div className="relative">
                  <Listbox.Button className="w-full px-5 py-4 border border-(--gray-e6) rounded-lg text-left text-xl text-(--foreground) font-semibold">
                    {availableTypes.find((pt) => pt.id === selectedPenaltyType)
                      ?.name || "Выберите штраф"}
                    <ArrowDown className="absolute right-3 top-1/2 -translate-y-1/2" />
                  </Listbox.Button>
                  <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-auto">
                    {availableTypes.map((type) => (
                      <Listbox.Option
                        key={type.id}
                        value={type.id}
                        className="cursor-pointer px-5 py-2 hover:bg-(--primary) hover:text-white"
                      >
                        {type.name}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>
            </div>

            <hr className="bg-(--foreground) opacity-10" />

            <div>
              <label className="block mb-3 text-2xl font-semibold">
                Выберите сотрудника
              </label>
              <Listbox value={selectedEmployee} onChange={setSelectedEmployee}>
                <div className="relative">
                  <Listbox.Button className="w-full px-5 py-4 border border-(--gray-e6) rounded-lg text-left text-xl text-(--foreground) font-semibold">
                    {selectedEmployee || "Имя сотрудника"}
                    <ArrowDown className="absolute right-3 top-1/2 -translate-y-1/2" />
                  </Listbox.Button>
                  <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-auto">
                    {employees.map((e) => (
                      <Listbox.Option
                        key={e}
                        value={e}
                        className="cursor-pointer px-3 py-2 hover:bg-(--primary) hover:text-white"
                      >
                        {e}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>
            </div>
          </div>

          <hr className="bg-(--foreground) opacity-10" />

          <div className="flex gap-5">
            <button
              onClick={save}
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
