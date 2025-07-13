"use client";

import { useState } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { PageHeadline } from "@/components/layout/PageHeadline";
import { Footer } from "@/components/Footer";

export default function ReportsIndexPage() {
  // Статичные карточки
  const cards = [
    { title: "Отчёт по посещениям (Excel)", href: "/reports/attendance" },
    { title: "Отчёт по зарплате и штрафам", href: "/reports/salary" },
    { title: "Отчёт по сотруднику (PDF)", href: "/reports/employee" },
    { title: "Отчёт по отделам (Excel)", href: "/reports/department" },
    { title: "Отчёт по гендеру (Excel)", href: "/reports/gender" },
  ];

  return (
    <ProtectedRoute>
      <Layout>
        <PageHeadline title="Отчёты" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {cards.map((c) => (
            <Link key={c.href} href={c.href}>
              <div className="board">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-[Bounded] font-[466]">
                    {c.title}
                  </h3>
                  <span className="text-2xl text-[var(--green)] border border-[var(--green)] h-[30px] flex items-center justify-center rounded-full p-2 max-w-[100px] w-full min-w-[30px]">
                    ＋
                  </span>
                </div>
                <p className="text-2xl font-[Bounded] font-[466] opacity-50">
                  (0)
                </p>
              </div>
            </Link>
          ))}
        </div>

        <Footer />
      </Layout>
    </ProtectedRoute>
  );
}
