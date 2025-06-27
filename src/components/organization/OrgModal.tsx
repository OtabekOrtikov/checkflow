"use client";

import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";

export type FieldOption = {
  label: string;
  value: string | number;
};

export interface Field<T> {
  key: keyof T;
  label: string;
  type: "text" | "number" | "color" | "textarea" | "select";
  /** only used when type === "select" */
  options?: FieldOption[];
}

interface OrgModalProps<T extends { id: string }> {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  item?: T;
  fields: Field<T>[];
  onSave: (data: T) => Promise<any>;
  onDelete?: (id: string) => Promise<any>;
}

export function OrgModal<T extends { id: string }>({
  title,
  isOpen,
  onClose,
  item,
  fields,
  onSave,
  onDelete,
}: OrgModalProps<T>) {
  const [form, setForm] = useState<Partial<T>>({});

  // initialize form state whenever the modal opens or `item` changes
  useEffect(() => {
    if (item) {
      setForm(item);
    } else {
      const fresh: Partial<T> = {};
      fields.forEach((f) => {
        fresh[f.key] = (f.type === "number" ? 0 : "") as any;
      });
      setForm(fresh);
    }
  }, [item, fields]);

  const handleChange = <K extends keyof T>(key: K, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50">
      <div className="flex items-center justify-center min-h-screen bg-black/30 px-4">
        <Dialog.Panel className="bg-white rounded-[20px] w-full max-w-md p-6 space-y-4">
          <Dialog.Title className="text-2xl font-semibold">
            {title}
          </Dialog.Title>

          <div className="grid grid-cols-1 gap-4">
            {fields.map((f) => {
              const value = (form[f.key] ?? "") as any;

              return (
                <div key={String(f.key)}>
                  <label className="block mb-1 text-sm font-medium">
                    {f.label}
                  </label>

                  {f.type === "textarea" ? (
                    <textarea
                      value={value}
                      onChange={(e) => handleChange(f.key, e.target.value)}
                      className="w-full h-24 border rounded px-3 py-2"
                    />
                  ) : f.type === "select" ? (
                    <select
                      value={value}
                      onChange={(e) =>
                        handleChange(
                          f.key,
                          // try to parse number if option.value was numeric
                          e.target.value
                        )
                      }
                      className="w-full border rounded px-3 py-2"
                    >
                      {(f.options || []).map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
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
                      className="w-full border rounded px-3 py-2"
                    />
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex justify-between mt-6">
            {item && onDelete && (
              <button
                onClick={() => onDelete(item.id).then(onClose)}
                className="px-4 py-2 border border-red-500 text-red-500 rounded"
              >
                Удалить
              </button>
            )}
            <div className="space-x-2 ml-auto">
              <button onClick={onClose} className="px-4 py-2 border rounded">
                Отмена
              </button>
              <button
                onClick={() => onSave(form as T).then(onClose)}
                className="px-4 py-2 bg-(--primary) text-white rounded"
              >
                Сохранить
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
