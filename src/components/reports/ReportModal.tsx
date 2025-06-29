// src/components/reports/ReportModal.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Dialog, Listbox } from "@headlessui/react";
import XCircle from "@/assets/icons/XCircle.svg";
import ArrowDown from "@/assets/icons/arrow-down.svg";
import CheckIcon from "@/assets/icons/checkIcon.svg";

export type FieldOption = {
  label: string;
  value: string;
};

export interface Field<T> {
  key: keyof T;
  label: string;
  type: "text" | "date" | "select";
  options?: FieldOption[];
}

export interface ReportModalProps<T extends { id?: string }> {
  title: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onClose: () => void;
  item?: T;
  fields: Array<Field<T> | Field<T>[]>;
  onSave: (data: T) => Promise<any>;
  onDelete?: (id: string) => Promise<any>;
  onSaveAndAddAnother?: (data: T) => Promise<any>;
}

export function ReportModal<T extends { id?: string }>({
  title,
  isOpen,
  setIsOpen,
  onClose,
  fields,
  onSave,
  onSaveAndAddAnother,
}: ReportModalProps<T>) {
  const [form, setForm] = useState<Partial<T>>({});

  // Initialize form when modal opens or fields change
  useEffect(() => {
    const init: Partial<T> = {};
    fields.flat().forEach((f) => {
      init[f.key] = "" as any;
    });
    setForm(init);
  }, [fields, isOpen]);

  const handleChange = <K extends keyof T>(key: K, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    await onSave(form as T);
    onClose();
  };

  const handleSaveAndAnother = async () => {
    if (onSaveAndAddAnother) {
      await onSaveAndAddAnother(form as T);
      const reset: Partial<T> = {};
      fields.flat().forEach((f) => {
        reset[f.key] = "" as any;
      });
      setForm(reset);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50">
      <div className="flex items-center justify-center min-h-screen bg-black/30 p-4">
        <Dialog.Panel className="bg-white rounded-[30px] w-full max-w-4xl p-4 gap-[20px] flex flex-col">
          <div className="flex justify-between items-center">
            <Dialog.Title className="text-3xl font-[Bounded] font-[566] text-(--foreground)">
              {title}
            </Dialog.Title>
            <button onClick={onClose}>
              <XCircle />
            </button>
          </div>

          <hr className="bg-(--foreground) opacity-10" />

          <div className="space-y-4">
            {fields.map((row, rowIndex) => {
              const rowFields = Array.isArray(row) ? row : [row];
              const colClass =
                rowFields.length === 2
                  ? "grid-cols-2"
                  : rowFields.length === 3
                  ? "grid-cols-3"
                  : "grid-cols-1";
              return (
                <div key={rowIndex} className={`grid ${colClass} gap-4`}>
                  {rowFields.map((f, colIndex) => {
                    const val = form[f.key] as any;
                    return (
                      <div
                        key={`row-${rowIndex}-col-${colIndex}-${String(f.key)}`}
                        className="flex flex-col gap-2"
                      >
                        <label className="text-lg font-medium">{f.label}</label>
                        {f.type === "select" ? (
                          <Listbox
                            value={val}
                            onChange={(v) => handleChange(f.key, v)}
                          >
                            <div className="relative">
                              <Listbox.Button className="w-full h-12 p-3 border rounded-[15px] border-(--black-10) text-left">
                                {(f.options || []).find((o) => o.value === val)
                                  ?.label || "—"}
                                <ArrowDown className="absolute right-3 top-1/2 transform -translate-y-1/2" />
                              </Listbox.Button>
                              <Listbox.Options className="absolute mt-1 w-full bg-white border border-(--black-10) rounded-lg shadow-lg max-h-60 overflow-auto">
                                {(f.options || []).map((opt) => (
                                  <Listbox.Option
                                    key={opt.value}
                                    value={opt.value}
                                    className="cursor-pointer px-3 py-2 hover:bg-(--primary) hover:text-white"
                                  >
                                    {opt.label}
                                  </Listbox.Option>
                                ))}
                              </Listbox.Options>
                            </div>
                          </Listbox>
                        ) : (
                          <input
                            type={f.type === "date" ? "date" : "text"}
                            value={val || ""}
                            onChange={(e) =>
                              handleChange(f.key, e.target.value)
                            }
                            className="w-full h-12 p-3 border rounded-[15px] border-(--black-10)"
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleSave}
              className="flex-1 h-12 bg-(--primary) 
              text-white rounded-lg flex items-center 
              justify-center gap-[10px] text-[20px] font-semibold "
            >
              <CheckIcon />
              Сохранить
            </button>
            {onSaveAndAddAnother && (
              <button
                onClick={handleSaveAndAnother}
                className="flex-1 h-12 border border-(--black-10) 
                text-(--foreground) rounded-lg flex items-center 
                justify-center font-semibold text-[20px] text-nowrap"
              >
                Сохранить и добавить ещё
              </button>
            )}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
