// src/components/reports/AttendanceModal.tsx
"use client";

import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { reportService } from "@/services/reportService";
import { CreateReportPayload } from "@/types/report.t";
import { ModalTitle } from "../ModalTitle";

interface Props {
  open: boolean;
  onClose(): void;
  onSaved(): void;
}

export default function AttendanceModal({ open, onClose, onSaved }: Props) {
  const [form, setForm] = useState<CreateReportPayload>({
    date_from: "",
    date_to: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await reportService.createAttendanceReport(form);
    setLoading(false);
    onSaved();
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
            <Dialog.Panel className="w-full max-w-3xl bg-white p-6 space-y-4 rounded-2xl">
              <ModalTitle title="Отчёт о посещениях" onClose={onClose} />
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block mb-1 font-medium">Дата начала</label>
                  <input
                    type="date"
                    className="input w-full"
                    value={form.date_from}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, date_from: e.target.value }))
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">
                    Дата окончания
                  </label>
                  <input
                    type="date"
                    className="input w-full"
                    value={form.date_to}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, date_to: e.target.value }))
                    }
                    required
                  />
                </div>
                <div className="flex gap-4 justify-end">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 border rounded-full"
                  >
                    Отмена
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-blue-600 text-white rounded-full"
                  >
                    Сохранить
                  </button>
                </div>
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
