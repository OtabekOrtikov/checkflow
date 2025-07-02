// src/components/profile/SalaryAssignModal.tsx
"use client";
import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import ArrowDown from "@/assets/icons/arrowDown.svg";
import { SalaryAssignment } from "@/types/profile.t";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  existing?: SalaryAssignment;
  onSave: (item: SalaryAssignment) => void;
}

export const SalaryAssignModal: React.FC<Props> = ({
  isOpen,
  onClose,
  existing,
  onSave,
}) => {
  const [rateType, setRateType] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [currency, setCurrency] = useState("UZS");
  const [assignedDate, setAssignedDate] = useState("");
  const [startDate, setStartDate] = useState("");

  useEffect(() => {
    if (existing) {
      setRateType(existing.rateType);
      setAmount(existing.amount);
      setCurrency(existing.currency);
      setAssignedDate(existing.assignedDate.slice(0, 10));
      setStartDate(existing.startDate.slice(0, 10));
    } else {
      setRateType("");
      setAmount(0);
      setCurrency("UZS");
      setAssignedDate("");
      setStartDate("");
    }
  }, [existing, isOpen]);

  const handleSubmit = () => {
    onSave({
      rateType,
      amount,
      currency,
      assignedDate,
      startDate,
      endDate: undefined,
    });
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center"
    >
      <Dialog.Panel className="bg-white rounded-xl p-6 w-full max-w-lg space-y-6">
        <Dialog.Title className="text-2xl font-bold">
          Назначить зарплату
        </Dialog.Title>
        {/* Дата назначения */}
        <div>
          <label>Дата назначения</label>
          <input
            type="date"
            className="w-full p-3 border rounded-lg"
            value={assignedDate}
            onChange={(e) => setAssignedDate(e.target.value)}
          />
        </div>
        {/* Тип ставки и сумма */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Тип ставки</label>
            <select
              className="w-full p-3 border rounded-lg"
              value={rateType}
              onChange={(e) => setRateType(e.target.value)}
            >
              <option value="">Выберите тип</option>
              <option value="Часовая">Часовая</option>
              <option value="Дневная">Дневная</option>
            </select>
          </div>
          <div>
            <label>Сумма</label>
            <input
              type="number"
              className="w-full p-3 border rounded-lg"
              value={amount}
              onChange={(e) => setAmount(+e.target.value)}
            />
          </div>
        </div>
        {/* Даты начала/окончания */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Дата начала</label>
            <input
              type="date"
              className="w-full p-3 border rounded-lg"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          {/* Окончание редактировать опционно */}
          <div />
        </div>
        {/* Кнопки */}
        <div className="flex justify-end gap-4">
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-(--blue) text-white rounded-lg"
          >
            Сохранить
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 border border-(--gray-e6) rounded-lg"
          >
            Отмена
          </button>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};
export default SalaryAssignModal;
