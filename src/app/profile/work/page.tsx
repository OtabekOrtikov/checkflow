"use client";
import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { PageHeadline } from "@/components/PageHeadline";
import {
  fetchDepartmentsByUserId,
  assignDepartment,
  removeDepartment,
  fetchPositionsByUserId,
  assignPosition,
  removePosition,
} from "@/services/profileService";
import type {
  DepartmentAssignment,
  PositionAssignment,
} from "@/types/profile.t";
import GridDepartmentTable from "@/components/profile/GridDepartmentTable";
import GridPositionTable from "@/components/profile/GridPositionTable";
import { PositionAssignModal } from "@/components/profile/PositionAssignModal";
import AssignDepartmentModal from "@/components/profile/AssignDepartmentModal";

export default function WorkPage({ params }: { params: { id: string } }) {
  const userId = params.id;
  // --- Отделы ---
  const [depts, setDepts] = useState<DepartmentAssignment[]>([]);
  const [dLoading, setDLoading] = useState(true);
  const [dModalOpen, setDModalOpen] = useState(false);
  const [dEditIdx, setDEditIdx] = useState<number | null>(null);

  // --- Должности ---
  const [poses, setPoses] = useState<PositionAssignment[]>([]);
  const [pLoading, setPLoading] = useState(true);
  const [pModalOpen, setPModalOpen] = useState(false);
  const [pEditIdx, setPEditIdx] = useState<number | null>(null);

  // load
  useEffect(() => {
    setDLoading(true);
    fetchDepartmentsByUserId(userId)
      .then((r) => setDepts(r.data))
      .finally(() => setDLoading(false));

    setPLoading(true);
    fetchPositionsByUserId(userId)
      .then((r) => setPoses(r.data))
      .finally(() => setPLoading(false));
  }, [userId]);

  // dept handlers
  const refreshDepts = () =>
    fetchDepartmentsByUserId(userId).then((r) => setDepts(r.data));
  const handleDeptSave = (d: DepartmentAssignment) =>
    assignDepartment(userId, d).then(refreshDepts);
  const handleDeptDelete = (idx: number) =>
    removeDepartment(userId, idx).then(refreshDepts);

  // pos handlers
  const refreshPoses = () =>
    fetchPositionsByUserId(userId).then((r) => setPoses(r.data));
  const handlePosSave = (p: { position: string; assignedDate: string }) =>
    assignPosition(userId, p).then(refreshPoses);
  const handlePosDelete = (idx: number) =>
    removePosition(userId, idx).then(refreshPoses);

  return (
    <div className="flex items-start">
      <Navbar />

      <main className="flex-1 p-8 flex flex-col gap-8">
        <PageHeadline title="Рабочие назначения" />

        {/* Отделы */}
        <GridDepartmentTable
          data={depts}
          loading={dLoading}
          onAssign={() => {
            setDEditIdx(null);
            setDModalOpen(true);
          }}
          onEdit={(i) => {
            setDEditIdx(i);
            setDModalOpen(true);
          }}
          onDelete={handleDeptDelete}
        />

        <AssignDepartmentModal
          isOpen={dModalOpen}
          onClose={() => setDModalOpen(false)}
          onSave={handleDeptSave}
          itemIndex={dEditIdx}
          item={dEditIdx != null ? depts[dEditIdx] : undefined}
        />

        {/* Должности */}
        <GridPositionTable
          data={poses}
          loading={pLoading}
          onAssign={() => {
            setPEditIdx(null);
            setPModalOpen(true);
          }}
          onEdit={(i) => {
            setPEditIdx(i);
            setPModalOpen(true);
          }}
          onDelete={handlePosDelete}
        />

        <PositionAssignModal
          isOpen={pModalOpen}
          onClose={() => setPModalOpen(false)}
          onSave={handlePosSave}
          // Removed index prop as it is not defined in the component's Props type
          item={
            pEditIdx != null
              ? {
                  position: poses[pEditIdx].position,
                  assignedDate: poses[pEditIdx].assignedDate,
                }
              : undefined
          }
        />
      </main>
    </div>
  );
}
