"use client";
import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { PageHeadline } from "@/components/PageHeadline";
import { GridFiredTypeTable } from "@/components/settings/GridFiredTypeTable";
import { FiredTypeModal } from "@/components/settings/FiredTypeModal";
import type { DismissalType } from "@/types/settings.t";
import {
  fetchDismissalTypes,
  createDismissalType,
  updateDismissalType,
  deleteDismissalType,
} from "@/services/settingsService";

export default function FiredTypesPage() {
  const [data, setData] = useState<DismissalType[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<DismissalType | undefined>(undefined);

  const load = () => {
    setLoading(true);
    fetchDismissalTypes().then((r) => {
      setData(r.data);
      setLoading(false);
    });
  };
  useEffect(load, []);

  const handleSave = async (item: DismissalType) => {
    if (editItem) await updateDismissalType(item.id, item);
    else await createDismissalType(item);
    setModalOpen(false);
    load();
  };

  const handleDelete = (id: string) => deleteDismissalType(id).then(load);

  return (
    <div className="flex items-start">
      <Navbar />
      <main className="flex-1 p-8 flex flex-col gap-6 min-h-screen">
        <PageHeadline title="Настройки">
          <span className="ml-auto">Типы увольнений</span>
        </PageHeadline>

        <GridFiredTypeTable
          data={data}
          loading={loading}
          page={page}
          pageSize={pageSize}
          setPage={setPage}
          onAdd={() => { setEditItem(undefined); setModalOpen(true); }}
          onEdit={(item) => { setEditItem(item); setModalOpen(true); }}
          onDelete={handleDelete}
        />

        {modalOpen && (
          <FiredTypeModal
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