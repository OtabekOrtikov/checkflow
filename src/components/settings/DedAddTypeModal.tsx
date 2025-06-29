"use client";
import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import XCircle from "@/assets/icons/XCircle.svg";
import CheckIcon from "@/assets/icons/checkIcon.svg";
import { DeductionAdditionType } from "@/types/settings.t";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  item?: DeductionAdditionType;
  onSave: (
    data: Omit<DeductionAdditionType, "id"> & {
      type: "sum" | "percentRate" | "percentTotal";
    },
    id?: string
  ) => Promise<any>;
}

export const DedAddTypeModal: React.FC<Props> = ({
  isOpen,
  onClose,
  item,
  onSave,
}) => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState(0);
  const [isAddition, setIsAddition] = useState(false);
  const [mode, setMode] = useState<"sum" | "percentRate" | "percentTotal">(
    "sum"
  );

  useEffect(() => {
    if (item) {
      setName(item.name);
      setDesc(item.description || "");
      setAmount(item.amount);
      setIsAddition(item.isAddition);
      setMode(item.type);
    } else {
      setName("");
      setDesc("");
      setAmount(0);
      setIsAddition(false);
      setMode("sum");
    }
  }, [item, isOpen]);

  const save = async () => {
    await onSave(
      { name, description: desc, amount, isAddition, type: mode },
      item?.id
    );
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 overflow-auto"
    >
      <div className="flex items-center justify-center min-h-screen h-fit overflow-auto bg-black/30 p-4">
        <Dialog.Panel className="bg-white rounded-[30px] w-full max-w-4xl p-[15px] space-y-[20px]">
          <div className="flex justify-between items-center">
            <Dialog.Title className="text-3xl font-[566] font-[Bounded]">
              {item ? "Редактирование" : "Новый тип"}
            </Dialog.Title>
            <button onClick={onClose}>
              <XCircle />
            </button>
          </div>

          <hr className="opacity-10" />

          <div className="space-y-5">
            <div>
              <label className="block mb-[10px] font-semibold text-2xl">
                Название
              </label>
              <input
                className="w-full border border-(--gray-e6) rounded-[15px] 
              min-h-[60px] text-xl font-semibold outline-0 px-5 py-2 text-(--foreground-50)"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <hr className="opacity-10" />

            <div>
              <label className="block mb-[10px] font-semibold text-2xl">
                Описание
              </label>
              <textarea
                className="w-full border border-(--gray-e6) rounded-[15px] 
              min-h-[60px] text-xl font-semibold outline-0 px-5 py-2 text-(--foreground-50)"
                rows={2}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
            <hr className="opacity-10" />

            <div>
              <label className="block mb-[10px] font-semibold text-2xl">
                Сумма
              </label>
              <input
                type="number"
                className="w-full border border-(--gray-e6) rounded-[15px] 
              min-h-[60px] text-xl font-semibold outline-0 px-5 py-2 text-(--foreground-50)"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
            </div>
            <div>
              <label className="block mb-[10px] font-semibold text-2xl">
                Тип
              </label>
              <div className="flex gap-4">
                <button
                  onClick={() => setMode("sum")}
                  className={`px-4 py-2 h-[60px] flex items-center font-semibold justify-center 
                    flex-1 text-xl rounded-[15px] border ${
                      mode === "sum" ? "text-(--primary)" : "border-(--gray-e6)"
                    }`}
                >
                  Сумма
                </button>
                <button
                  onClick={() => setMode("percentRate")}
                  className={`px-4 py-2 h-[60px] flex items-center font-semibold justify-center 
                    flex-1 text-xl rounded-[15px] border ${
                      mode === "percentRate"
                        ? "text-(--primary)"
                        : "border-(--gray-e6)"
                    }`}
                >
                  % От ставки
                </button>
                <button
                  onClick={() => setMode("percentTotal")}
                  className={`px-4 py-2 h-[60px] flex items-center font-semibold justify-center 
                    flex-1 text-xl rounded-[15px] border ${
                      mode === "percentTotal"
                        ? "text-(--primary)"
                        : "border-(--gray-e6)"
                    }`}
                >
                  % от Итога ЗП (штрафы)
                </button>
              </div>
            </div>

            <hr className="opacity-10" />

            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsAddition(true)}
                className={`px-5 py-2 flex-1 h-[60px] rounded-[15px] text-xl font-semibold ${
                  isAddition
                    ? "bg-[#65C813] text-white"
                    : "border border-(--gray-e6) text-(--foreground)"
                }`}
              >
                Доплата
              </button>
              <button
                onClick={() => setIsAddition(false)}
                className={`px-5 py-2 flex-1 h-[60px] rounded-[15px] text-xl font-semibold ${
                  !isAddition
                    ? "bg-[#65C813] text-white"
                    : "border border-(--gray-e6) text-(--foreground)"
                }`}
              >
                Удержание
              </button>
            </div>
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
