// src/components/settings/PenaltyTypeModal.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import XCircle from "@/assets/icons/XCircle.svg";
import CheckIcon from "@/assets/icons/checkIcon.svg";
import PlusIcon from "@/assets/icons/plusIcon.svg";
import TrashIcon from "@/assets/icons/TrashIcon.svg";
import { PenaltyType, PenaltyRule } from "@/types/settings.t";

interface Props {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  item?: PenaltyType;
  onSave: (data: PenaltyType) => Promise<any>;
}

export const PenaltyTypeModal: React.FC<Props> = ({
  title,
  isOpen,
  onClose,
  item,
  onSave,
}) => {
  const emptyRule = (): PenaltyRule => ({
    start: "",
    end: "",
    amount: 0,
    unit: "Сум",
  });
  const [name, setName] = useState("");
  const [latenessRules, setLateness] = useState<PenaltyRule[]>([]);
  const [earlyLeaveRules, setEarlyLeave] = useState<PenaltyRule[]>([]);
  const [absenceEnabled, setAbsence] = useState(false);
  const [absenceAmount, setAbsenceAmount] = useState(0);
  const [absenceUnit, setAbsenceUnit] = useState("Сум");
  const [absenceThreshold, setAbsenceThreshold] = useState<number>(0);

  useEffect(() => {
    if (item) {
      setName(item.name);
      setLateness(item.latenessRules);
      setEarlyLeave(item.earlyLeaveRules);
      setAbsence(item.absenceEnabled);
      setAbsenceAmount(item.absenceAmount || 0);
      setAbsenceUnit(item.absenceUnit || "Сум");
      setAbsenceThreshold(item.absenceThreshold ?? 0);
    } else {
      setName("");
      setLateness([emptyRule()]);
      setEarlyLeave([emptyRule()]);
      setAbsence(false);
      setAbsenceAmount(0);
      setAbsenceUnit("Сум");
      setAbsenceThreshold(0);
    }
  }, [item]);

  const save = () =>
    onSave({
      id: item?.id || "",
      name,
      latenessRules,
      earlyLeaveRules,
      absenceEnabled,
      absenceAmount,
      absenceUnit,
      absenceThreshold,
    }).then(onClose);

  const updArray = (
    arr: PenaltyRule[],
    i: number,
    key: keyof PenaltyRule,
    v: any,
    setter: React.Dispatch<React.SetStateAction<PenaltyRule[]>>
  ) => {
    const copy = [...arr];
    (copy[i] as any)[key] = v;
    setter(copy);
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

          <div className="space-y-4">
            <div className="flex flex-col gap-[10px]">
              <label className="font-medium text-2xl">Название</label>
              <input
                className="w-full border border-(--gray-e6) rounded-[15px] 
              min-h-[60px] text-xl font-semibold outline-0 px-5 py-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <hr className="border-(--black-10)" />

            {/* Правила опозданий */}
            <div className="space-y-5">
              <div className="font-medium text-2xl">Опоздания сотрудников</div>
              {latenessRules.map((r, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <div className="flex flex-col gap-[10px] flex-1">
                    <label
                      className="text-2xl font-semibold text-nowrap"
                      htmlFor={`start-${i}`}
                    >
                      От
                    </label>
                    <input
                      type="time"
                      id={`start-${i}`}
                      value={r.start}
                      onChange={(e) =>
                        updArray(
                          latenessRules,
                          i,
                          "start",
                          e.target.value,
                          setLateness
                        )
                      }
                      className="w-full border border-(--gray-e6) rounded-[15px] 
                      min-h-[60px] text-xl font-semibold outline-0 px-5 py-2"
                    />
                  </div>
                  <div className="flex flex-col gap-[10px] flex-1">
                    <label
                      className="text-2xl font-semibold text-nowrap"
                      htmlFor={`end-${i}`}
                    >
                      До
                    </label>
                    <input
                      type="time"
                      id={`end-${i}`}
                      value={r.end}
                      onChange={(e) =>
                        updArray(
                          latenessRules,
                          i,
                          "end",
                          e.target.value,
                          setLateness
                        )
                      }
                      className="w-full border border-(--gray-e6) rounded-[15px] 
                      min-h-[60px] text-xl font-semibold outline-0 px-5 py-2"
                    />
                  </div>

                  <div className="flex flex-col gap-[10px] flex-1">
                    <label
                      className="text-2xl font-semibold text-nowrap"
                      htmlFor={`amount-${i}`}
                    >
                      Размер штрафа
                    </label>
                    <input
                      type="number"
                      id={`amount-${i}`}
                      value={r.amount}
                      onChange={(e) =>
                        updArray(
                          latenessRules,
                          i,
                          "amount",
                          +e.target.value,
                          setLateness
                        )
                      }
                      className="w-full border border-(--gray-e6) rounded-[15px] 
                      min-h-[60px] text-xl font-semibold outline-0 px-5 py-2"
                      placeholder="Размер"
                    />
                  </div>

                  <div className="flex flex-col gap-[10px]">
                    <label
                      className="text-2xl font-semibold text-nowrap opacity-0 select-none"
                      htmlFor={`currency-${i}`}
                    >
                      Валюта
                    </label>
                    <select
                      className="max-w-[105px] w-full border border-(--gray-e6) rounded-[15px] 
                        min-h-[60px] text-xl font-semibold outline-0 px-5 py-2"
                      value={r.unit}
                      onChange={(e) =>
                        updArray(
                          latenessRules,
                          i,
                          "unit",
                          e.target.value,
                          setLateness
                        )
                      }
                    >
                      <option value="sum">Сум</option>
                      <option value="percent">%</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-[10px]">
                    <label
                      className="text-2xl font-semibold text-nowrap opacity-0 select-none"
                      htmlFor={`currency-${i}`}
                    >
                      Удалить
                    </label>
                    <button
                      onClick={() => {
                        const copy = [...latenessRules];
                        copy.splice(i, 1);
                        setLateness(copy);
                      }}
                      className="h-[60px] max-w-[105px] border border-(--red) text-(--red) rounded-[15px] w-full flex items-center justify-center"
                    >
                      <TrashIcon className="w-[24px]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setLateness([...latenessRules, emptyRule()])}
              className="flex items-center gap-2 text-(--primary) py-3 px-5 text-2xl 
              rounded-full h-[60px] border border-(--primary) w-fit justify-center"
            >
              <PlusIcon /> Добавить ещё
            </button>

            <hr className="border-(--black-10)" />

            {/* Правила ранних уходов */}
            <div className="space-y-5">
              <div className="font-medium text-2xl">
                Ранние уходы сотрудников
              </div>
              {earlyLeaveRules.map((r, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <div className="flex flex-col gap-[10px] flex-1">
                    <label
                      className="text-2xl font-semibold text-nowrap"
                      htmlFor={`start-${i}`}
                    >
                      От
                    </label>
                    <input
                      type="time"
                      id={`start-${i}`}
                      value={r.start}
                      onChange={(e) =>
                        updArray(
                          earlyLeaveRules,
                          i,
                          "start",
                          e.target.value,
                          setEarlyLeave
                        )
                      }
                      className="w-full border border-(--gray-e6) rounded-[15px] 
                      min-h-[60px] text-xl font-semibold outline-0 px-5 py-2"
                    />
                  </div>
                  <div className="flex flex-col gap-[10px] flex-1">
                    <label
                      className="text-2xl font-semibold text-nowrap"
                      htmlFor={`end-${i}`}
                    >
                      До
                    </label>
                    <input
                      type="time"
                      id={`end-${i}`}
                      value={r.end}
                      onChange={(e) =>
                        updArray(
                          earlyLeaveRules,
                          i,
                          "end",
                          e.target.value,
                          setEarlyLeave
                        )
                      }
                      className="w-full border border-(--gray-e6) rounded-[15px] 
                      min-h-[60px] text-xl font-semibold outline-0 px-5 py-2"
                    />
                  </div>

                  <div className="flex flex-col gap-[10px] flex-1">
                    <label
                      className="text-2xl font-semibold text-nowrap"
                      htmlFor={`amount-${i}`}
                    >
                      Размер штрафа
                    </label>
                    <input
                      type="number"
                      id={`amount-${i}`}
                      value={r.amount}
                      onChange={(e) =>
                        updArray(
                          earlyLeaveRules,
                          i,
                          "amount",
                          +e.target.value,
                          setEarlyLeave
                        )
                      }
                      className="w-full border border-(--gray-e6) rounded-[15px] 
                      min-h-[60px] text-xl font-semibold outline-0 px-5 py-2"
                      placeholder="Размер"
                    />
                  </div>

                  <div className="flex flex-col gap-[10px]">
                    <label
                      className="text-2xl font-semibold text-nowrap opacity-0 select-none"
                      htmlFor={`currency-${i}`}
                    >
                      Валюта
                    </label>
                    <select
                      className="max-w-[105px] w-full border border-(--gray-e6) rounded-[15px] 
                        min-h-[60px] text-xl font-semibold outline-0 px-5 py-2"
                      value={r.unit}
                      onChange={(e) =>
                        updArray(
                          earlyLeaveRules,
                          i,
                          "unit",
                          e.target.value,
                          setEarlyLeave
                        )
                      }
                    >
                      <option value="sum">Сум</option>
                      <option value="percent">%</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-[10px]">
                    <label
                      className="text-2xl font-semibold text-nowrap opacity-0 select-none"
                      htmlFor={`currency-${i}`}
                    >
                      Удалить
                    </label>
                    <button
                      onClick={() => {
                        const copy = [...earlyLeaveRules];
                        copy.splice(i, 1);
                        setEarlyLeave(copy);
                      }}
                      className="h-[60px] max-w-[105px] border border-(--red) text-(--red) rounded-[15px] w-full flex items-center justify-center"
                    >
                      <TrashIcon className="w-[24px]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setEarlyLeave([...earlyLeaveRules, emptyRule()])}
              className="flex items-center gap-2 text-(--primary) py-3 px-5 text-2xl 
              rounded-full h-[60px] border border-(--primary) w-fit justify-center"
            >
              <PlusIcon /> Добавить ещё
            </button>

            <hr className="border-(--black-10)" />

            {/* Штраф за отсутствие */}
            <div className="space-y-2">
              <div className="flex items-center justify-between"></div>
              <div className="flex gap-4 items-end">
                <div className="flex flex-col gap-[10px] flex-1">
                  <span className="text-2xl font-semibold">
                    Штраф за отсутствие
                  </span>
                  <div
                    className="flex items-center h-[60px] border border-(--gray-e6) rounded-[15px] px-4 cursor-pointer"
                    onClick={() => setAbsence(!absenceEnabled)}
                  >
                    <button
                      onClick={() => setAbsence(!absenceEnabled)}
                      className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200
                    ${absenceEnabled ? "bg-(--primary)" : "bg-(--gray-e6)"}`}
                      aria-pressed={absenceEnabled}
                    >
                      <span
                        aria-hidden="true"
                        className={`inline-block h-5 w-5 bg-white rounded-full shadow transform ring-0 transition ease-in-out duration-200
                      ${absenceEnabled ? "translate-x-5" : "translate-x-0"}`}
                      />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-[10px] flex-1">
                  <label className="text-2xl font-semibold text-nowrap">
                    Размер штрафа
                  </label>
                  <input
                    type="number"
                    disabled={!absenceEnabled}
                    value={absenceAmount}
                    onChange={(e) => setAbsenceAmount(+e.target.value)}
                    className={`w-full border border-(--gray-e6) rounded-[15px] 
                      min-h-[60px] text-xl font-semibold outline-0 px-5 py-2 ${
                        absenceEnabled ? "" : "opacity-50 cursor-not-allowed"
                      }`}
                    placeholder="Сумма"
                  />
                </div>
                <select
                  disabled={!absenceEnabled}
                  value={absenceUnit}
                  onChange={(e) => setAbsenceUnit(e.target.value)}
                  className={`border border-(--gray-e6) rounded-[15px] h-[60px] 
                    text-xl font-semibold outline-0 px-5 ${
                      absenceEnabled ? "" : "opacity-50 cursor-not-allowed"
                    }`}
                >
                  <option value="sum">Сум</option>
                  <option value="percent">%</option>
                </select>
                <button
                  disabled={!absenceEnabled}
                  onClick={() => {
                    setAbsence(false);
                    setAbsenceThreshold(0);
                    setAbsenceAmount(0);
                    setAbsenceUnit("Сум");
                  }}
                  className={`h-[60px] w-[60px] flex items-center justify-center 
                  border border-(--red) text-(--red) rounded-[15px] ${
                    absenceEnabled ? "" : "opacity-50 cursor-not-allowed"
                  }`}
                >
                  <TrashIcon className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>

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
