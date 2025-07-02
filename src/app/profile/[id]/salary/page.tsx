"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { PageHeadline } from "@/components/PageHeadline";

import { GridSalaryTable } from "@/components/profile/GridSalaryTable";
import SalaryAssignModal from "@/components/profile/SalaryAssignModal";

import GridWageTable from "@/components/profile/GridWageTable";
import WageAssignModal from "@/components/profile/WageAssignModal";

import GridPayrollRuleTable from "@/components/profile/GridPayrollRuleTable";
import PayrollRuleAssignModal from "@/components/profile/PayrollRuleAssignModal";

import GridAutoPenaltyTable from "@/components/profile/GridAutoPenaltyTable";
import AutoPenaltyAssignModal from "@/components/profile/AutoPenaltyAssignModal";

import {
  fetchSalaryAssignments,
  assignSalary,
  updateSalary,
  deleteSalary,
  fetchWageAssignments,
  assignWage,
  updateWage,
  deleteWage,
  fetchPayrollRuleAssignments,
  assignPayrollRule,
  updatePayrollRule,
  deletePayrollRule,
  fetchAutoPenaltyAssignments,
  assignAutoPenalty,
  updateAutoPenalty,
  deleteAutoPenalty,
} from "@/services/profileService";

import type {
  SalaryAssignment,
  WageAssignment,
  PayrollRuleAssignment,
  AutoPenaltyAssignment,
} from "@/types/profile.t";

export default function SalaryPage() {
  const { id: userId } = useParams() as { id: string };

  // --- SalaryAssignments ---
  const [salaryData, setSalaryData] = useState<SalaryAssignment[]>([]);
  const [sLoading, setSLoading] = useState(true);
  const [sPage, setSPage] = useState(1);
  const [sModalOpen, setSModalOpen] = useState(false);
  const [sEditIdx, setSEditIdx] = useState<number | null>(null);

  // --- WageAssignments ---
  const [wageData, setWageData] = useState<WageAssignment[]>([]);
  const [wLoading, setWLoading] = useState(true);
  const [wPage, setWPage] = useState(1);
  const [wModalOpen, setWModalOpen] = useState(false);
  const [wEditIdx, setWEditIdx] = useState<number | null>(null);

  // --- PayrollRuleAssignments ---
  const [ruleData, setRuleData] = useState<PayrollRuleAssignment[]>([]);
  const [rLoading, setRLoading] = useState(true);
  const [rPage, setRPage] = useState(1);
  const [rModalOpen, setRModalOpen] = useState(false);
  const [rEditIdx, setREditIdx] = useState<number | null>(null);

  // --- AutoPenaltyAssignments ---
  const [apData, setApData] = useState<AutoPenaltyAssignment[]>([]);
  const [apLoading, setApLoading] = useState(true);
  const [apPage, setApPage] = useState(1);
  const [apModalOpen, setApModalOpen] = useState(false);
  const [apEditIdx, setApEditIdx] = useState<number | null>(null);

  // initial fetch
  useEffect(() => {
    setSLoading(true);
    fetchSalaryAssignments(userId)
      .then((r) => setSalaryData(r.data))
      .finally(() => setSLoading(false));

    setWLoading(true);
    fetchWageAssignments(userId)
      .then((r) => setWageData(r.data))
      .finally(() => setWLoading(false));

    setRLoading(true);
    fetchPayrollRuleAssignments(userId)
      .then((r) => setRuleData(r.data))
      .finally(() => setRLoading(false));

    setApLoading(true);
    fetchAutoPenaltyAssignments(userId)
      .then((r) => setApData(r.data))
      .finally(() => setApLoading(false));
  }, [userId]);

  // refresh helpers
  const refreshSalary = () =>
    fetchSalaryAssignments(userId).then((r) => setSalaryData(r.data));
  const refreshWage = () =>
    fetchWageAssignments(userId).then((r) => setWageData(r.data));
  const refreshRule = () =>
    fetchPayrollRuleAssignments(userId).then((r) => setRuleData(r.data));
  const refreshAp = () =>
    fetchAutoPenaltyAssignments(userId).then((r) => setApData(r.data));

  return (
    <div className="flex items-start">
      <Navbar />

      <main className="flex-1 p-8 flex flex-col gap-8">
        <PageHeadline title="Зарплата профиля" />

        {/* Зарплата */}
        <GridSalaryTable
          data={salaryData}
          loading={sLoading}
          page={sPage}
          pageSize={10}
          setPage={setSPage}
          onAssign={() => {
            setSEditIdx(null);
            setSModalOpen(true);
          }}
          onEdit={(idx) => {
            setSEditIdx(idx);
            setSModalOpen(true);
          }}
          onDelete={(idx) => deleteSalary(userId, idx).then(refreshSalary)}
        />
        <SalaryAssignModal
          isOpen={sModalOpen}
          onClose={() => setSModalOpen(false)}
          existing={sEditIdx != null ? salaryData[sEditIdx] : undefined}
          onSave={(item) => {
            const fn =
              sEditIdx == null
                ? assignSalary(userId, item)
                : updateSalary(userId, sEditIdx, item);
            fn.then(refreshSalary);
          }}
        />

        {/* Оклад */}
        <GridWageTable
          data={wageData}
          loading={wLoading}
          page={wPage}
          pageSize={10}
          setPage={setWPage}
          onAssign={() => {
            setWEditIdx(null);
            setWModalOpen(true);
          }}
          onEdit={(idx) => {
            setWEditIdx(idx);
            setWModalOpen(true);
          }}
          onDelete={(idx) => deleteWage(userId, idx).then(refreshWage)}
        />
        <WageAssignModal
          isOpen={wModalOpen}
          onClose={() => setWModalOpen(false)}
          existing={wEditIdx != null ? wageData[wEditIdx] : undefined}
          onSave={(item) => {
            const fn =
              wEditIdx == null
                ? assignWage(userId, item)
                : updateWage(userId, wEditIdx, item);
            fn.then(refreshWage);
          }}
        />

        {/* Правило начисления */}
        <GridPayrollRuleTable
          data={ruleData}
          loading={rLoading}
          page={rPage}
          pageSize={10}
          setPage={setRPage}
          onAssign={() => {
            setREditIdx(null);
            setRModalOpen(true);
          }}
          onEdit={(idx) => {
            setREditIdx(idx);
            setRModalOpen(true);
          }}
          onDelete={(idx) => deletePayrollRule(userId, idx).then(refreshRule)}
        />
        <PayrollRuleAssignModal
          isOpen={rModalOpen}
          onClose={() => setRModalOpen(false)}
          existing={rEditIdx != null ? ruleData[rEditIdx] : undefined}
          onSave={(item) => {
            const fn =
              rEditIdx == null
                ? assignPayrollRule(userId, item)
                : updatePayrollRule(userId, rEditIdx, item);
            fn.then(refreshRule);
          }}
        />

        {/* Авто штрафы */}
        <GridAutoPenaltyTable
          data={apData}
          loading={apLoading}
          page={apPage}
          pageSize={10}
          setPage={setApPage}
          onAssign={() => {
            setApEditIdx(null);
            setApModalOpen(true);
          }}
          onEdit={(idx) => {
            setApEditIdx(idx);
            setApModalOpen(true);
          }}
          onDelete={(idx) => deleteAutoPenalty(userId, idx).then(refreshAp)}
        />
        <AutoPenaltyAssignModal
          isOpen={apModalOpen}
          onClose={() => setApModalOpen(false)}
          existing={apEditIdx != null ? apData[apEditIdx] : undefined}
          onSave={(item) => {
            const fn =
              apEditIdx == null
                ? assignAutoPenalty(userId, item)
                : updateAutoPenalty(userId, apEditIdx, item);
            fn.then(refreshAp);
          }}
        />
      </main>
    </div>
  );
}
