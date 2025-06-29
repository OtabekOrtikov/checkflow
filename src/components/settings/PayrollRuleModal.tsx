// src/components/settings/PayrollRuleModal.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import XCircle from "@/assets/icons/XCircle.svg";
import PlusCircle from "@/assets/icons/plusInCircle.svg";
import TrashIcon from "@/assets/icons/TrashIcon.svg";
import CheckIcon from "@/assets/icons/checkIcon.svg";
import type {
  PayrollRule,
  PayrollRulePayment,
  PayrollRuleOvertime,
} from "@/types/settings.t";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  item?: PayrollRule;
  onSave: (data: PayrollRule) => Promise<any>;
  onDelete?: (id: string) => Promise<any>;
}

export const PayrollRuleModal: React.FC<Props> = ({
  isOpen,
  onClose,
  item,
  onSave,
  onDelete,
}) => {
  const [form, setForm] = useState<PayrollRule>({
    id: "",
    name: "",
    payments: [],
    overtimes: [],
    algorithm: "daily",
  });

  useEffect(() => {
    if (item) setForm(item);
    else
      setForm({
        id: Date.now().toString(),
        name: "",
        payments: [],
        overtimes: [],
        algorithm: "daily",
      });
  }, [item]);

  const updateField = (key: keyof PayrollRule, val: any) => {
    setForm((prev) => ({ ...prev, [key]: val }));
  };

  // Работа с массивами выплат
  const addPayment = () => {
    setForm((f) => ({
      ...f,
      payments: [
        ...f.payments,
        {
          id: Date.now().toString(),
          start: "",
          end: "",
          amount: 0,
          unit: "sum",
        },
      ],
    }));
  };
  const updatePayment = (idx: number, p: PayrollRulePayment) => {
    const arr = [...form.payments];
    arr[idx] = p;
    updateField("payments", arr);
  };
  const removePayment = (idx: number) => {
    const arr = form.payments.filter((_, i) => i !== idx);
    updateField("payments", arr);
  };

  // Аналогично для overtimes
  const addOvertime = () => {
    setForm((f) => ({
      ...f,
      overtimes: [
        ...f.overtimes,
        {
          id: Date.now().toString(),
          start: "",
          end: "",
          amount: 0,
          unit: "percent",
        },
      ],
    }));
  };
  const updateOvertime = (idx: number, o: PayrollRuleOvertime) => {
    const arr = [...form.overtimes];
    arr[idx] = o;
    updateField("overtimes", arr);
  };
  const removeOvertime = (idx: number) => {
    const arr = form.overtimes.filter((_, i) => i !== idx);
    updateField("overtimes", arr);
  };

  const handleSubmit = async () => {
    await onSave(form);
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 overflow-auto"
    >
      <div className="flex items-center justify-center min-h-screen h-fit bg-black/30 p-4">
        <Dialog.Panel className="bg-white rounded-[20px] w-full max-w-5xl p-6 space-y-6">
          <div className="flex justify-between items-center">
            <Dialog.Title className="text-3xl font-[Bounded] font-[566] text-(--foreground)">
              {item ? "Редактировать правило" : "Новое правило"}
            </Dialog.Title>
            <button
              onClick={() => {
                onClose();
              }}
            >
              <XCircle />
            </button>
          </div>

          <hr className="bg-(--foreground) opacity-10" />

          {/* Название */}
          <div className="flex flex-col gap-[10px]">
            <label className="font-medium text-2xl">Название</label>
            <input
              className="w-full border border-(--gray-e6) rounded-[15px] 
              min-h-[60px] text-xl font-semibold outline-0 px-5 py-2"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="Введите название"
            />
          </div>
          <hr className="border-(--black-10)" />

          {/* Дополнительные выплаты */}
          <div className="space-y-2">
            <div className="font-medium text-2xl">Дополнительные выплаты</div>
            {form.payments.map((p, idx) => (
              <div key={p.id} className="flex gap-2 items-center">
                <div className="flex flex-col gap-[10px] flex-1">
                  <label
                    className="text-2xl font-semibold text-nowrap"
                    htmlFor={`start-${p.id}`}
                  >
                    Начала
                  </label>
                  <input
                    type="time"
                    id={`start-${p.id}`}
                    className="w-full border border-(--gray-e6) rounded-[15px] 
                      min-h-[60px] text-xl font-semibold outline-0 px-5 py-2"
                    value={p.start}
                    onChange={(e) =>
                      updatePayment(idx, { ...p, start: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col gap-[10px] flex-1">
                  <label
                    className="text-2xl font-semibold text-nowrap"
                    htmlFor={`end-${p.id}`}
                  >
                    Конец
                  </label>
                  <input
                    type="time"
                    id={`end-${p.id}`}
                    className="w-full border border-(--gray-e6) rounded-[15px] 
                      min-h-[60px] text-xl font-semibold outline-0 px-5 py-2"
                    value={p.end}
                    onChange={(e) =>
                      updatePayment(idx, { ...p, end: e.target.value })
                    }
                  />
                </div>

                <div className="flex flex-col gap-[10px] flex-1">
                  <label
                    className="text-2xl font-semibold text-nowrap"
                    htmlFor={`amount-${p.id}`}
                  >
                    Размер (за 1 час)
                  </label>
                  <input
                    type="number"
                    id={`amount-${p.id}`}
                    className="w-full border border-(--gray-e6) rounded-[15px] 
                      min-h-[60px] text-xl font-semibold outline-0 px-5 py-2"
                    value={p.amount}
                    onChange={(e) =>
                      updatePayment(idx, { ...p, amount: +e.target.value })
                    }
                    placeholder="00,0"
                  />
                </div>
                <div className="flex flex-col gap-[10px]">
                  <label
                    className="text-2xl font-semibold text-nowrap opacity-0 select-none"
                    htmlFor={`currency-${p.id}`}
                  >
                    Валюта
                  </label>
                  <select
                    className="max-w-[105px] w-full border border-(--gray-e6) rounded-[15px] 
                        min-h-[60px] text-xl font-semibold outline-0 px-5 py-2"
                    value={p.unit}
                    onChange={(e) =>
                      updatePayment(idx, { ...p, unit: e.target.value as any })
                    }
                  >
                    <option value="sum">Сум</option>
                    <option value="percent">%</option>
                  </select>
                </div>
                <div className="flex flex-col gap-[10px]">
                  <label
                    className="text-2xl font-semibold text-nowrap opacity-0 select-none"
                    htmlFor={`currency-${p.id}`}
                  >
                    Удалить
                  </label>
                  <button
                    onClick={() => removePayment(idx)}
                    className="h-[60px] max-w-[105px] border border-(--red) text-(--red) rounded-[15px] w-full flex items-center justify-center"
                  >
                    <TrashIcon className="w-[24px]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={addPayment}
            className="flex items-center gap-2 text-(--primary) py-3 px-5 text-2xl rounded-full h-[60px] border border-(--primary) w-fit justify-center"
          >
            <PlusCircle /> Добавить ещё
          </button>

          <hr className="border-(--black-10)" />

          {/* Правила сверхурочных */}
          <div className="space-y-2">
            <div className="font-medium text-2xl">
              Правила сверхурочных часов
            </div>
            {form.overtimes.map((p, idx) => (
              <div key={p.id} className="flex gap-2 items-center">
                <div className="flex flex-col gap-[10px] flex-1">
                  <label
                    className="text-2xl font-semibold text-nowrap"
                    htmlFor={`start-${p.id}`}
                  >
                    Начала
                  </label>
                  <input
                    type="time"
                    id={`start-${p.id}`}
                    className="w-full border border-(--gray-e6) rounded-[15px] 
                      min-h-[60px] text-xl font-semibold outline-0 px-5 py-2"
                    value={p.start}
                    onChange={(e) =>
                      updatePayment(idx, { ...p, start: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col gap-[10px] flex-1">
                  <label
                    className="text-2xl font-semibold text-nowrap"
                    htmlFor={`end-${p.id}`}
                  >
                    Конец
                  </label>
                  <input
                    type="time"
                    id={`end-${p.id}`}
                    className="w-full border border-(--gray-e6) rounded-[15px] 
                      min-h-[60px] text-xl font-semibold outline-0 px-5 py-2"
                    value={p.end}
                    onChange={(e) =>
                      updatePayment(idx, { ...p, end: e.target.value })
                    }
                  />
                </div>

                <div className="flex flex-col gap-[10px] flex-1">
                  <label
                    className="text-2xl font-semibold text-nowrap"
                    htmlFor={`amount-${p.id}`}
                  >
                    Размер (за 1 час)
                  </label>
                  <input
                    type="number"
                    id={`amount-${p.id}`}
                    className="w-full border border-(--gray-e6) rounded-[15px] 
                      min-h-[60px] text-xl font-semibold outline-0 px-5 py-2"
                    value={p.amount}
                    onChange={(e) =>
                      updatePayment(idx, { ...p, amount: +e.target.value })
                    }
                    placeholder="00,0"
                  />
                </div>
                <div className="flex flex-col gap-[10px]">
                  <label
                    className="text-2xl font-semibold text-nowrap opacity-0 select-none"
                    htmlFor={`currency-${p.id}`}
                  >
                    Валюта
                  </label>
                  <select
                    className="max-w-[105px] w-full border border-(--gray-e6) rounded-[15px] 
                        min-h-[60px] text-xl font-semibold outline-0 px-5 py-2"
                    value={p.unit}
                    onChange={(e) =>
                      updatePayment(idx, { ...p, unit: e.target.value as any })
                    }
                  >
                    <option value="sum">Сум</option>
                    <option value="percent">%</option>
                  </select>
                </div>
                <div className="flex flex-col gap-[10px]">
                  <label
                    className="text-2xl font-semibold text-nowrap opacity-0 select-none"
                    htmlFor={`currency-${p.id}`}
                  >
                    Удалить
                  </label>
                  <button
                    onClick={() => removeOvertime(idx)}
                    className="h-[60px] max-w-[105px] border border-(--red) text-(--red) rounded-[15px] w-full flex items-center justify-center"
                  >
                    <TrashIcon className="w-[24px]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={addOvertime}
            className="flex items-center gap-2 text-(--primary) py-3 px-5 text-2xl rounded-full h-[60px] border border-(--primary) w-fit justify-center"
          >
            <PlusCircle /> Добавить ещё
          </button>

          <hr className="border-(--black-10)" />

          {/* Алгоритм */}
          <div>
            <div className="font-medium text-2xl">
              Алгоритм вычисления сверхурочных часов
            </div>
            <div className="flex gap-4">
              {(["daily", "monthly"] as const).map((algo) => (
                <button
                  key={algo}
                  onClick={() => updateField("algorithm", algo)}
                  className={`flex-1 h-[60px] p-3 border rounded-[15px] text-xl font-semibold text-center ${
                    form.algorithm === algo
                      ? "border-(--primary) text-(--primary) "
                      : "text-(--foreground) border-(--gray-e6)"
                  }`}
                >
                  {algo === "daily" ? "Ежедневный" : "Ежемесячный"}
                </button>
              ))}
            </div>
          </div>

          {/* Кнопки */}
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
            {item && onDelete && (
              <button
                onClick={() => onDelete(item.id!)}
                className="flex-1 bg-transparent h-[60px] rounded-[15px] 
              px-4 py-2 flex items-center justify-center gap-2 border border-(--red) text-(--red)
              text-xl font-semibold"
              >
                Удалить
              </button>
            )}
            <button
              onClick={onClose}
              className="flex-1 bg-(--gray-e6) h-[60px] text-(--foreground) rounded-[15px] 
              px-4 py-2 flex items-center justify-center gap-2
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
