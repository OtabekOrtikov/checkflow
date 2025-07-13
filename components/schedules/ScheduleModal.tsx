// src/components/schedules/ScheduleModal.tsx
"use client";

import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { shiftService } from "@/services/shiftService";
import { ModalTitle } from "@/components/ModalTitle";

interface ScheduleModalProps {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
}

export default function ScheduleModal({
  open,
  onClose,
  onSaved,
}: ScheduleModalProps) {
  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await shiftService.createShift({
      name,
      start_time: `${startTime}:00`,
      end_time: `${endTime}:00`,
    });
    setLoading(false);
    onSaved();
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
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

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300 transform"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200 transform"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-lg bg-white rounded-2xl p-6 space-y-6">
                <ModalTitle title="Добавить смену" onClose={onClose} />

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Название */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="shift-name" className="text-xl font-medium">
                      Название
                    </label>
                    <input
                      id="shift-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="input"
                      required
                    />
                  </div>

                  {/* Начало и конец */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="shift-start"
                        className="text-xl font-medium"
                      >
                        Начало
                      </label>
                      <input
                        id="shift-start"
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="input"
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="shift-end"
                        className="text-xl font-medium"
                      >
                        Конец
                      </label>
                      <input
                        id="shift-end"
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="input"
                        required
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex w-full items-center gap-5">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-5 border border-[var(--gray-e6)] rounded-[15px] text-xl font-semibold text-[var(--foreground)] 
                      flex items-center justify-center w-full min-h-[60px]"
                    >
                      Отменить
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
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
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
