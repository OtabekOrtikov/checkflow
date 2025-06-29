// src/app/settings/holidays/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { PageHeadline } from "@/components/PageHeadline";
import { GridHolidayTable } from "@/components/settings/GridHolidayTable";
import { HolidayModal } from "@/components/settings/HolidayModal";
import type { HolidayType } from "@/types/settings.t";
import {
  fetchHolidays,
  createHoliday,
  updateHoliday,
  deleteHoliday,
} from "@/services/settingsService";

export default function HolidaysPage() {
  const [data, setData] = useState<HolidayType[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<HolidayType | undefined>(undefined);

  const load = () => {
    setLoading(true);
    fetchHolidays()
      .then((r) => setData(r.data))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleSave = async (h: HolidayType) => {
    if (editItem) {
      await updateHoliday(h.id, h);
    } else {
      await createHoliday(h);
    }
    setModalOpen(false);
    load();
  };

  const handleDelete = (id: string) => deleteHoliday(id).then(() => load());

  return (
    <div className="flex items-start">
      <Navbar />
      <main className="flex-1 p-[30px] flex flex-col gap-y-[20px] min-h-screen">
        <PageHeadline title="Настройки — Праздники" />

        <GridHolidayTable
          data={data}
          loading={loading}
          page={page}
          pageSize={pageSize}
          setPage={setPage}
          onAdd={() => {
            setEditItem(undefined);
            setModalOpen(true);
          }}
          onEdit={(h) => {
            setEditItem(h);
            setModalOpen(true);
          }}
          onDelete={handleDelete}
        />

        {modalOpen && (
          <HolidayModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            item={editItem}
            onSave={handleSave}
          />
        )}
      </main>
    </div>
  );
}
