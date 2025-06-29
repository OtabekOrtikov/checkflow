// src/app/settings/payroll-rules/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { PageHeadline } from "@/components/PageHeadline";
import { GridPayrollRulesTable } from "@/components/settings/GridPayrollRulesTable";
import { PayrollRuleModal } from "@/components/settings/PayrollRuleModal";
import type { PayrollRule } from "@/types/settings.t";
import {
  fetchPayrollRules,
  createPayrollRule,
  updatePayrollRule,
  deletePayrollRule,
} from "@/services/settingsService";

export default function PayrollRulesPage() {
  const [data, setData] = useState<PayrollRule[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<PayrollRule | undefined>(undefined);

  const load = () => {
    setLoading(true);
    fetchPayrollRules()
      .then((res) => setData(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleSave = async (rule: PayrollRule) => {
    if (rule.id && data.find((r) => r.id === rule.id)) {
      await updatePayrollRule(rule.id, rule);
    } else {
      await createPayrollRule({ ...rule, id: Date.now().toString() });
    }
    load();
  };

  const handleDelete = async (id: string) => {
    await deletePayrollRule(id);
    load();
  };

  return (
    <div className="flex items-start">
      <Navbar />
      <main className="flex-1 p-[30px] flex flex-col gap-y-[20px] min-h-screen">
        <PageHeadline title="Правила расчёта зарплаты" />

        <GridPayrollRulesTable
          data={data}
          loading={loading}
          page={page}
          pageSize={pageSize}
          setPage={setPage}
          onAdd={() => {
            setEditItem(undefined);
            setModalOpen(true);
          }}
          onEdit={(rule) => {
            setEditItem(rule);
            setModalOpen(true);
          }}
          onDelete={handleDelete}
        />

        {modalOpen && (
          <PayrollRuleModal
            isOpen
            onClose={() => setModalOpen(false)}
            item={editItem}
            onSave={handleSave}
            onDelete={
              editItem
                ? async (id) => {
                    await handleDelete(id);
                    setModalOpen(false);
                  }
                : undefined
            }
          />
        )}
      </main>
    </div>
  );
}
