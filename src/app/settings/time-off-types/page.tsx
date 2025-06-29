"use client";

import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { PageHeadline } from "@/components/PageHeadline";
import { GridTimeOffTypeTable } from "@/components/settings/GridTimeOffTypeTable";
import { TimeOffTypeModal } from "@/components/settings/TimeOffTypeModal";
import { TimeOffType } from "@/types/settings.t";
import {
  fetchTimeOffTypes,
  createTimeOffType,
  updateTimeOffType,
  deleteTimeOffType,
} from "@/services/settingsService";

export default function TimeOffTypesPage() {
  const [data, setData] = useState<TimeOffType[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<TimeOffType | undefined>(undefined);

  const load = () => {
    setLoading(true);
    fetchTimeOffTypes().then((r) => {
      setData(r.data);
      setLoading(false);
    });
  };

  useEffect(load, []);

  const handleSave = async (item: TimeOffType) => {
    if (editItem) await updateTimeOffType(item.id, item);
    else await createTimeOffType(item);
    setModalOpen(false);
    load();
  };

  const handleDelete = (id: string) => {
    deleteTimeOffType(id).then(load);
  };

  return (
    <div className="flex items-start">
      <Navbar />
      <main className="flex-1 p-8 flex flex-col gap-6 min-h-screen">
        <PageHeadline title="Настройки" />

        <GridTimeOffTypeTable
          data={data}
          loading={loading}
          page={page}
          pageSize={pageSize}
          setPage={setPage}
          onAdd={() => {
            setEditItem(undefined);
            setModalOpen(true);
          }}
          onEdit={(item) => {
            setEditItem(item);
            setModalOpen(true);
          }}
          onDelete={handleDelete}
        />

        {modalOpen && (
          <TimeOffTypeModal
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