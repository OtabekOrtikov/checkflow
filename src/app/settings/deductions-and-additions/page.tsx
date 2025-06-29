// src/app/settings/deductions-and-additions/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import GridDedAddTable from "@/components/settings/GridDedAddTable";
import { DeductionAdditionType } from "@/types/settings.t";
import {
  fetchDeductionAdditionTypes,
  deleteDeductionAdditionType,
  assignDeductionAddition,
} from "@/services/settingsService";
import { DedAddAssignModal } from "@/components/settings/DedAddAssignModal";
import { fetchEmployees } from "@/services/employeeService";

export default function DeductionAdditionPage() {
  const [types, setTypes] = useState<DeductionAdditionType[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [selectedTypeId, setSelectedTypeId] = useState<string>("");

  const [employees, setEmployees] = useState<{ id: string; name: string }[]>([]);

  // load both types and employee list
  useEffect(() => {
    setLoading(true);
    Promise.all([fetchDeductionAdditionTypes(), fetchEmployees()]).then(([t, e]) => {
      setTypes(t.data);
      setEmployees(e.data);
    }).finally(() => setLoading(false));
  }, []);

  const handleDelete = (id: string) =>
    deleteDeductionAdditionType(id).then(() =>
      setTypes((prev) => prev.filter((x) => x.id !== id))
    );

  const handleAssignClick = (type: DeductionAdditionType) => {
    setSelectedTypeId(type.id);
    setAssignModalOpen(true);
  };

  const handleAssignSave = (typeId: string, employeeId: string) =>
    assignDeductionAddition(typeId, employeeId);

  return (
    <div className="flex items-start">
      <Navbar />
      <main className="flex-1 p-[30px] flex flex-col gap-y-[20px] min-h-screen">
        <GridDedAddTable
          data={types}
          loading={loading}
          page={page}
          pageSize={pageSize}
          setPage={setPage}
          onEdit={(r) => {/* … */}}
          onDelete={handleDelete}
          onAdd={() => {/* … open “create” modal … */}}
          onAssign={handleAssignClick}
        />

        {assignModalOpen && (
          <DedAddAssignModal
            isOpen={assignModalOpen}
            onClose={() => setAssignModalOpen(false)}
            types={types}
            employees={employees}
            initialTypeId={selectedTypeId}
            onSave={handleAssignSave}
          />
        )}
      </main>
    </div>
  );
}