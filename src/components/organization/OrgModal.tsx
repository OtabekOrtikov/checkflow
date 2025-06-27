// src/components/OrgModal.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";

interface Field<T> {
  key: keyof T;
  label: string;
  type: "text" | "number" | "color" | "textarea";
}

interface OrgModalProps<T extends { id: string }> {
  isOpen: boolean;
  onClose: () => void;
  item?: T;
  fields: Field<T>[];
  onSave: (data: T) => Promise<any>;
  onDelete?: (id: string) => Promise<any>;
}

export function OrgModal<T extends { id: string }>({
  isOpen,
  onClose,
  item,
  fields,
  onSave,
  onDelete,
}: OrgModalProps<T>) {
  const [form, setForm] = useState<any>({} as T);

  useEffect(() => {
    if (item) {
      setForm(item);
    } else {
      // пустой объект со всеми ключами
      const fresh = {} as any;
      fields.forEach((f) => (fresh[f.key] = ""));
      setForm(fresh);
    }
  }, [item, fields]);

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50">
      <div className="flex items-center justify-center min-h-screen bg-black/30 px-4">
        <Dialog.Panel className="bg-white rounded-[20px] w-full max-w-md p-6 space-y-4">
          <Dialog.Title className="text-xl font-semibold">
            {item ? "Редактировать" : "Добавить"}
          </Dialog.Title>

          <div className="grid grid-cols-1 gap-4">
            {fields.map((f) => (
              <div key={String(f.key)}>
                <label className="block mb-1 text-sm font-medium">
                  {f.label}
                </label>
                {f.type === "textarea" ? (
                  <textarea
                    value={form[f.key] as string}
                    onChange={(e) =>
                      setForm({ ...form, [f.key]: e.target.value })
                    }
                    className="w-full h-24 border rounded px-3 py-2"
                  />
                ) : (
                  <input
                    type={f.type}
                    value={form[f.key] as any}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        [f.key]:
                          f.type === "number"
                            ? Number(e.target.value)
                            : e.target.value,
                      })
                    }
                    className="w-full border rounded px-3 py-2"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-6">
            <div>
              {item && onDelete && (
                <button
                  onClick={() => onDelete(item.id).then(onClose)}
                  className="px-4 py-2 border border-red-500 text-red-500 rounded"
                >
                  Удалить
                </button>
              )}
            </div>
            <div className="space-x-2">
              <button onClick={onClose} className="px-4 py-2 border rounded">
                Отмена
              </button>
              <button
                onClick={() => onSave(form).then(onClose)}
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
