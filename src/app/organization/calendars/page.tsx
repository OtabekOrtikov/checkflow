// src/app/organization/calendars/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { Navbar } from "@/components/Navbar";
import { PageHeadline } from "@/components/PageHeadline";
import PlusInCircle from "@/assets/icons/plusInCircle.svg";
import Pagination from "@/components/Pagination";
import { OrgModal } from "@/components/organization/OrgModal";
import {
  fetchCalendars,
  createCalendar,
  updateCalendar,
  deleteCalendar,
} from "@/services/organizationService";
import type { Calendar } from "@/types/organization.t";
import { GridCalendarTable } from "@/components/organization/GridCalendarTable";
import { Footer } from "@/components/Footer";

export default function CalendarsPage() {
  const [data, setData] = useState<Calendar[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<Calendar | undefined>(undefined);

  const load = () => {
    setLoading(true);
    fetchCalendars()
      .then((r) => setData(r.data))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleSave = (vals: Calendar) => {
    const action = vals.id
      ? updateCalendar(vals.id, vals)
      : createCalendar({ ...vals, id: uuid() });
    return action.then(load).then(() => setModalOpen(false));
  };

  const handleDelete = (id: string) =>
    deleteCalendar(id)
      .then(load)
      .then(() => setModalOpen(false));

  const total = data.length;
  const paged = data.slice((page - 1) * pageSize, page * pageSize);

  return (
    <>
      <main className="flex-1 p-[30px] flex flex-col gap-y-[20px] min-h-screen h-full">
        <PageHeadline title="Организация">
          <div className="flex items-stretch gap-x-[10px] ml-auto">
            <button
              onClick={() => {
                setEditItem(undefined);
                setModalOpen(true);
              }}
              className="flex items-center cursor-pointer gap-x-[10px] bg-(--primary) text-(--white) text-[24px] px-[20px] py-[10px] rounded-[50px] font-medium"
            >
              <PlusInCircle />
              Добавить
            </button>
          </div>
        </PageHeadline>

        <GridCalendarTable
          data={paged}
          loading={loading}
          page={page}
          pageSize={pageSize}
          setPage={setPage}
          onEdit={(row) => {
            setEditItem(row);
            setModalOpen(true);
          }}
          onRefresh={load}
          onDelete={handleDelete}
        />

        <Footer className="mt-auto" />
      </main>

      {modalOpen && (
        <OrgModal<Calendar>
          title="Календарь"
          isOpen={modalOpen}
          setIsOpen={setModalOpen}
          onClose={() => setModalOpen(false)}
          item={editItem}
          fields={[{ key: "name", label: "Название", type: "text" }]}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      )}
    </>
  );
}
