"use client";

import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { branchService } from "@/services/branchService";
import { Branch } from "@/types/branch.t";
import { ModalTitle } from "../ModalTitle";

interface Props {
  open: boolean;
  onClose(): void;
  onSaved(): void;
  /** При редактировании передаём существующий филиал */
  branch: Branch | null;
  companyId: number;
}

export default function BranchModal({
  open,
  onClose,
  onSaved,
  branch,
  companyId,
}: Props) {
  const [name, setName] = useState("");
  const [inn, setInn] = useState<number | "">("");
  const [location, setLocation] = useState("");
  const [saving, setSaving] = useState(false);

  // При открытии на редактирование заполняем поля
  useEffect(() => {
    if (branch) {
      setName(branch.name);
      setInn(branch.taxpair_identification_number);
      setLocation(branch.location);
    } else {
      setName("");
      setInn("");
      setLocation("");
    }
  }, [branch]);

  const handleSave = async () => {
    setSaving(true);
    if (branch) {
      await branchService.updateBranch(branch.id, {
        name,
        taxpair_identification_number: Number(inn),
        location,
      });
    } else {
      await branchService.createBranch({
        name,
        taxpair_identification_number: Number(inn),
        location,
        company: companyId,
      });
    }
    setSaving(false);
    onSaved();
  };

  const handleSaveAndAnother = async () => {
    setSaving(true);
    await branchService.createBranch({
      name,
      taxpair_identification_number: Number(inn),
      location,
      company: companyId,
    });
    setName("");
    setInn("");
    setLocation("");
    setSaving(false);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        {/* Backdrop */}
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

        {/* Panel */}
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
              <ModalTitle
                title={branch ? "Редактирование локации" : "Добавление локации"}
                onClose={onClose}
              />

              <hr className="opacity-10" />

              <div>
                <label className="block mb-1 font-medium">Название</label>
                <input
                  type="text"
                  className="input w-full"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Введите название"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">ИНН (TaxPair)</label>
                <input
                  type="number"
                  className="input w-full"
                  value={inn}
                  onChange={(e) =>
                    setInn(e.target.value === "" ? "" : Number(e.target.value))
                  }
                  placeholder="Введите ИНН"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Адрес</label>
                <input
                  type="text"
                  className="input w-full"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Введите адрес"
                  required
                />
              </div>

              <hr className="opacity-10" />

              <div className="flex gap-4 justify-end">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-5 bg-[var(--primary)] rounded-[15px] text-xl font-semibold text-white flex items-center justify-center gap-2.5 w-full min-h-[60px]"
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
                  className="px-5 border border-[var(--gray-e6)] rounded-[15px] text-xl font-semibold text-[var(--foreground)] flex items-center justify-center gap-2.5 w-full min-h-[60px] whitespace-nowrap"
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
