"use client";

import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ModalTitle } from "@/components/ModalTitle";
import { departmentService } from "@/services/departmentService";

interface Props {
  open: boolean;
  onClose(): void;
  onSaved(): void;
}

export default function DepartmentModal({ open, onClose, onSaved }: Props) {
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) return;
    setSaving(true);
    await departmentService.createDepartment({ name });
    setSaving(false);
    onSaved();
  };

  const handleSaveAndAnother = async () => {
    if (!name.trim()) return;
    setSaving(true);
    await departmentService.createDepartment({ name });
    setSaving(false);
    onSaved();
    setName("");
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        {/* backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-30"
          leave="ease-in duration-200"
          leaveFrom="opacity-30"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black" style={{ opacity: 0.3 }} />
        </Transition.Child>

        {/* panel */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300 transform"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200 transform"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-4xl bg-white p-6 space-y-4 rounded-2xl">
              <ModalTitle title="Добавление отдела" onClose={onClose} />

              <hr className="opacity-10" />

              <div>
                <label className="block mb-1 font-medium">Название</label>
                <input
                  type="text"
                  className="input w-full"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Введите название отдела"
                  required
                />
              </div>

              <hr className="opacity-10" />

              <div className="flex gap-5 flex-wrap lg:flex-nowrap">
                <button
                  type="submit"
                  onClick={handleSave}
                  disabled={saving}
                  className="px-5 bg-[var(--primary)] rounded-[15px] text-xl font-semibold text-[var(--white)] flex items-center 
                      justify-center gap-2.5 w-full min-h-[60px]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M7 12.9005L10.1429 16.5005L18 7.50049"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Сохранить
                </button>
                <button
                  type="button"
                  onClick={handleSaveAndAnother}
                  disabled={saving}
                  className="px-5 border border-[var(--gray-e6)] rounded-[15px] text-xl font-semibold text-[var(--foreground)] flex items-center 
                      justify-center gap-2.5 w-full min-h-[60px] whitespace-nowrap"
                >
                  Сохранить и добавить другой объект
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
