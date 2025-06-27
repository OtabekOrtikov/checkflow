// src/components/organization/OrgModal.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Dialog, Listbox } from "@headlessui/react";
import XCircle from "@/assets/icons/XCircle.svg";
import ArrowDown from "@/assets/icons/arrow-down.svg";
import CheckIcon from "@/assets/icons/checkIcon.svg";
export type FieldOption = {
  label: string;
  value: string | number;
};

export interface Field<T> {
  key: keyof T;
  label: string;
  type: "text" | "number" | "color" | "textarea" | "select";
  options?: FieldOption[];
}

interface OrgModalProps<T extends { id: string }> {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  setIsOpen: (open: boolean) => void;
  item?: T;
  /** Каждый элемент — либо одиночное поле (полная ширина), либо массив полей в одну строку */
  fields: Array<Field<T> | Field<T>[]>;
  onSave: (data: T) => Promise<any>;
  onDelete?: (id: string) => Promise<any>;
}

export function OrgModal<T extends { id: string }>({
  title,
  isOpen,
  setIsOpen,
  onClose,
  item,
  fields,
  onSave,
  onDelete,
}: OrgModalProps<T>) {
  const [form, setForm] = useState<Partial<T>>({});

  useEffect(() => {
    if (item) {
      setForm(item);
    } else {
      const fresh: Partial<T> = {};
      fields.flat().forEach((f) => {
        fresh[f.key] = (f.type === "number" ? 0 : "") as any;
      });
      setForm(fresh);
    }
  }, [item, fields]);

  const handleChange = <K extends keyof T>(key: K, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50">
      <div className="flex items-center justify-center min-h-screen bg-black/30 p=[15px]">
        <Dialog.Panel className="bg-white rounded-[30px] flex flex-col gap-[20px] w-fit max-w-full md:min-w-[1000px] p-[15px]">
          <Dialog.Title className="text-2xl font-semibold flex items-center justify-between">
            <span className="font-[Bounded] xl:text-[32px] text-2xl font-[566] text-(--foreground)">
              {title}
            </span>
            <button
              type="button"
              onClick={handleClose}
              className="cursor-pointer"
            >
              <XCircle />
            </button>
          </Dialog.Title>

          <hr className="w-full opacity-10 bg-(--foreground)" />

          <div className="space-y-4">
            {fields.map((fRow, rowIndex) => {
              const row = Array.isArray(fRow) ? fRow : [fRow];
              const cols = row.length;
              return (
                <div key={rowIndex} className={`grid grid-cols-${cols} gap-4`}>
                  {row.map((f) => {
                    const value = (form[f.key] ?? "") as any;
                    return (
                      <div
                        key={String(f.key)}
                        className="flex flex-col gap-[10px]"
                      >
                        <label className="block text-2xl font-semibold text-(--foreground)">
                          {f.label}
                        </label>
                        {f.type === "textarea" ? (
                          <textarea
                            value={value}
                            onChange={(e) =>
                              handleChange(f.key, e.target.value)
                            }
                            className="w-full px-[20px] border border-(--black-10) rounded-[15px] h-[60px] py-[20px]
                            text-xl font-semibold text-(--foreground) placeholder-(--foreground-50)"
                          />
                        ) : f.type === "select" ? (
                          <Listbox
                            value={value}
                            onChange={(val) => handleChange(f.key, val)}
                          >
                            <div className="relative">
                              <Listbox.Button className="w-full border border-(--black-10) rounded-[15px] px-[20px] h-[60px] text-left text-xl font-semibold text-(--foreground) placeholder-(--foreground-50)">
                                {(f.options || []).find(
                                  (opt) => opt.value === value
                                )?.label ?? ""}
                                <ArrowDown className="absolute right-[10px] top-1/2 translate-y-[-50%]" />
                              </Listbox.Button>
                              <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border border-(--black-10) rounded-[15px] shadow-lg max-h-60 overflow-auto focus:outline-none">
                                {(f.options || []).map((opt) => (
                                  <Listbox.Option
                                    key={opt.value}
                                    value={opt.value}
                                    className={({ active, selected }) =>
                                      [
                                        "cursor-pointer select-none py-2 px-4 text-xl font-semibold",
                                        active
                                          ? "bg-(--primary) text-white"
                                          : "text-(--foreground)",
                                        selected ? "font-bold" : "",
                                      ].join(" ")
                                    }
                                  >
                                    {opt.label}
                                  </Listbox.Option>
                                ))}
                              </Listbox.Options>
                            </div>
                          </Listbox>
                        ) : (
                          <input
                            type={f.type}
                            value={value}
                            onChange={(e) =>
                              handleChange(
                                f.key,
                                f.type === "number"
                                  ? Number(e.target.value)
                                  : e.target.value
                              )
                            }
                            className="w-full border border-(--black-10) rounded-[15px] px-[20px] h-[60px] py-[20px]
                            text-xl font-semibold text-(--foreground) placeholder-(--foreground-50)"
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>

          <div className="flex justify-between mt-6">
            <div className="space-x-2 ml-auto flex items-center w-full">
              <button
                onClick={() => onSave(form as T).then(onClose)}
                className="px-4 py-4 bg-(--primary) text-xl flex-1 justify-center cursor-pointer font-semibold flex gap-[10px] text-white rounded-[15px]"
              >
                <span>
                  <CheckIcon />
                </span>
                <span>Сохранить</span>
              </button>
              {item && onDelete && (
                <button
                  onClick={() => onDelete(item.id).then(onClose)}
                  className="px-4 py-4 bg-transparent text-xl flex-1 justify-center cursor-pointer font-semibold flex gap-[10px] text-(--red) border border-(--red) rounded-[15px]"
                >
                  Удалить
                </button>
              )}
              <button
                onClick={onClose}
                className="px-4 py-4 bg-(--foreground-50) text-xl flex-1 justify-center cursor-pointer font-semibold flex gap-[10px] text-white rounded-[15px]"
              >
                Отмена
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
