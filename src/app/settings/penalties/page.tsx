// src/app/settings/penalties/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { PageHeadline } from "@/components/PageHeadline";
import { GridPenaltyTable } from "@/components/settings/GridPenaltyTable";
import { fetchPenaltyTypes, createPenaltyType, updatePenaltyType, deletePenaltyType, assignPenalty } from "@/services/settingsService";
import { PenaltyTypeModal } from "@/components/settings/PenaltyTypeModal";
import { PenaltyAssignModal } from "@/components/settings/PenaltyAssignModal";
import { Footer } from "@/components/Footer";
import { PenaltyType } from "@/types/settings.t";

export default function PenaltiesPage() {
  const [types, setTypes] = useState<PenaltyType[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const [modalTypeOpen, setModalTypeOpen] = useState(false);
  const [editingType, setEditingType] = useState<PenaltyType | undefined>();
  const [modalAssignOpen, setModalAssignOpen] = useState(false);
  const [currentForAssign, setCurrentForAssign] = useState<PenaltyType>();

  const load = () => {
    setLoading(true);
    fetchPenaltyTypes()
      .then((r) => setTypes(r.data))
      .finally(() => setLoading(false));
  };
  useEffect(() => { load() }, []);

  const employeeList = ["Иванов И.","Петров П.","Сидоров С."]; // заменить реальным списком

  return (
    <div className="flex items-start">
      <Navbar />
      <main className="flex-1 p-8 flex flex-col gap-6 min-h-screen">
        <PageHeadline title="Штрафы" />

        <GridPenaltyTable
          data={types}
          loading={loading}
          page={page}
          pageSize={pageSize}
          setPage={setPage}
          onAdd={() => { setEditingType(undefined); setModalTypeOpen(true); }}
          onEdit={(t) => { setEditingType(t); setModalTypeOpen(true); }}
          onDelete={(id) => deletePenaltyType(id).then(load)}
          onAssign={(t) => { setCurrentForAssign(t); setModalAssignOpen(true); }}
        />

        <PenaltyTypeModal
          isOpen={modalTypeOpen}
          title={editingType ? "Редактировать тип штрафа" : "Новый тип штрафа"}
          item={editingType}
          onClose={() => setModalTypeOpen(false)}
          onSave={(data) => editingType
            ? updatePenaltyType(data.id, data).then(load)
            : createPenaltyType(data).then(load)}
        />

        {currentForAssign && (
          <PenaltyAssignModal
            isOpen={modalAssignOpen}
            onClose={() => setModalAssignOpen(false)}
            penalty={currentForAssign}
            employees={employeeList}
            onSave={assignPenalty}
          />
        )}

        <Footer className="mt-auto" />
      </main>
    </div>
  );
}