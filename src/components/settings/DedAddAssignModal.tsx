"use client";
import React, { useState, useEffect } from "react";
import { Dialog, Listbox } from "@headlessui/react";
import XCircle from "@/assets/icons/XCircle.svg";
import CheckIcon from "@/assets/icons/checkIcon.svg";
import ArrowDown from "@/assets/icons/arrow-down.svg";
import type { DeductionAdditionType } from "@/types/settings.t";
import { formatAmount } from "@/utils/formatPrice";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  types: DeductionAdditionType[];
  employees: { id: string; name: string }[];
  onSave: (typeId: string, employeeId: string) => Promise<any>;
  initialTypeId?: string;
}

export const DedAddAssignModal: React.FC<Props> = ({
  isOpen,
  onClose,
  types = [],
  employees,
  onSave,
  initialTypeId,
}) => {
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedEmp, setSelectedEmp] = useState<string>("");

  useEffect(() => {
    setSelectedEmp("");
    if (initialTypeId && isOpen) setSelectedType(initialTypeId);
    else setSelectedType("");
  }, [isOpen, types, initialTypeId]);

  const save = async () => {
    if (!selectedEmp || !selectedType) return;
    await onSave(selectedType, selectedEmp);
    onClose();
  };

  const currentType = types?.find((t) => t.id === selectedType);

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50">
      <div className="flex items-center justify-center min-h-screen bg-black/30 p-4">
        <Dialog.Panel className="bg-white rounded-[30px] w-full max-w-2xl p-[15px] space-y-5">
          <div className="flex justify-between items-center">
            <Dialog.Title className="text-3xl font-[566] font-[Bounded]">
              Назначить{" "}
              {selectedType
                ? currentType?.isAddition
                  ? "доплату"
                  : "штраф"
                : ""}
            </Dialog.Title>
            <button onClick={onClose}>
              <XCircle />
            </button>
          </div>

          <hr className="opacity-10" />

          <div>
            <label className="block mb-[10px] font-semibold text-2xl">
              Назначается
            </label>
            <Listbox value={selectedType} onChange={setSelectedType}>
              <div className="relative">
                <Listbox.Button
                  className="w-full text-left border border-(--gray-e6) rounded-[15px] 
              min-h-[60px] text-xl font-semibold outline-0 px-5 py-2 text-(--foreground-50)"
                >
                  {currentType
                    ? `${currentType?.name} — ${formatAmount(
                        currentType.amount
                      )}`
                    : "—"}
                  <ArrowDown className="absolute right-3 top-1/2 -translate-y-1/2" />
                </Listbox.Button>
                <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-auto">
                  {types.map((t) => (
                    <Listbox.Option
                      key={t.id}
                      value={t.id}
                      className="cursor-pointer px-3 py-2 hover:bg-(--primary) hover:text-white"
                    >
                      {t.name} — {t.amount}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox>
          </div>

          <hr className="opacity-10" />

          <div>
            <label className="block mb-[10px] font-semibold text-2xl">
              Сотрудник
            </label>
            <Listbox value={selectedEmp} onChange={setSelectedEmp}>
              <div className="relative">
                <Listbox.Button
                  className="w-full text-left border border-(--gray-e6) rounded-[15px] 
              min-h-[60px] text-xl font-semibold outline-0 px-5 py-2 text-(--foreground-50)"
                >
                  {employees.find((e) => e.id === selectedEmp)?.name || "—"}
                  <ArrowDown className="absolute right-3 top-1/2 -translate-y-1/2" />
                </Listbox.Button>
                <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-auto">
                  {employees.map((e) => (
                    <Listbox.Option
                      key={e.id}
                      value={e.id}
                      className="cursor-pointer px-3 py-2 hover:bg-(--primary) hover:text-white"
                    >
                      {e.name}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox>
          </div>

          <hr className="opacity-10" />

          <div className="flex gap-5">
            <button
              onClick={save}
              className="flex-1 bg-(--primary) text-white rounded-[15px] 
              px-4 py-2 flex items-center justify-center gap-2
              text-xl font-semibold h-[60px]"
            >
              <CheckIcon />
              Сохранить
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-transparent text-(--red) border border-(--red) 
              rounded-[15px] px-4 py-2 flex items-center justify-center
              text-xl font-semibold h-[60px]"
            >
              Отмена
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
