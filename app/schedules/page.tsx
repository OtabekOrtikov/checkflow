// app/schedules/page.tsx
"use client";

import { useState, useMemo, Fragment } from "react";
import useSWR from "swr";
import Layout from "@/components/Layout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { shiftService } from "@/services/shiftService";
import { Shift } from "@/types/shift.t";
import { MainHeadline } from "@/components/app/MainHeadline";
import ScheduleTable from "@/components/schedules/ScheduleTable";
import ScheduleModal from "@/components/schedules/ScheduleModal";
import { ModalTitle } from "@/components/ModalTitle";
import { PageHeadline } from "@/components/layout/PageHeadline";
import SearchIcon from "@/assets/icons/searchIcon.svg";
import PlusCircle from "@/assets/icons/PlusCircle.svg";
import { Footer } from "@/components/Footer";

export default function SchedulesPage() {
  const {
    data: shifts = [],
    error,
    mutate,
  } = useSWR<Shift[]>("shifts", shiftService.getShifts);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  // pagination
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const filtered = useMemo(
    () =>
      shifts.filter((s) =>
        s.name.toLowerCase().includes(search.trim().toLowerCase())
      ),
    [shifts, search]
  );

  if (error) return <div className="p-4 text-red-500">Ошибка загрузки</div>;
  if (!shifts) return <div>Loading…</div>;

  // filter by name

  // compute slice
  const total = filtered.length;
  const start = (page - 1) * pageSize;
  const paged = filtered.slice(start, start + pageSize);

  return (
    <ProtectedRoute>
      <Layout>
        {/* Page headline with search + add + print */}
        <div className="page-headline mb-4 flex justify-between items-center gap-4 flex-wrap lg:flex-nowrap">
          <div className="page-headline__title">
            <h2 className="text-2xl font-semibold page-headline__h">
              Рабочие графики
            </h2>
          </div>

          <div className="flex gap-5 w-full lg:w-auto items-center">
            {/* Поиск */}
            <div className="relative w-full min-h-[60px]">
              <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[var(--black-30)]" />
              <input
                type="text"
                placeholder="Поиск"
                className="input !bg-white !pl-[40px] min-w-[150px] h-full"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
            </div>

            {/* Добавить */}
            <button
              onClick={() => setModalOpen(true)}
              className="px-5 py-3 bg-[var(--primary)] min-h-[60px] text-white rounded-full flex items-center gap-2.5  justify-center"
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="white"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M15 12H12M12 12H9M12 12V9M12 12V15"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <span className="text-2xl font-medium hidden lg:block">
                Добавить
              </span>
            </button>

            {/* Печать (только таблицы) */}
            <button
              onClick={() => window.print()}
              className="px-4 py-2 border border-[var(--gray-e6)] min-h-[60px] bg-white rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M17.1209 2.87868C16.2422 2 14.828 2 11.9996 2C9.17112 2 7.7569 2 6.87822 2.87868C6.38586 3.37105 6.16939 4.03157 6.07422 5.01484C6.63346 4.99996 7.25161 4.99998 7.92921 5H16.0704C16.7478 4.99998 17.3658 4.99996 17.9249 5.01483C17.8297 4.03156 17.6133 3.37105 17.1209 2.87868Z"
                  fill="#1967F2"
                />
                <path
                  d="M18 15.5C18 18.3284 18 20.2426 17.1213 21.1213C16.2426 22 14.8284 22 12 22C9.17158 22 7.75736 22 6.87868 21.1213C6 20.2426 6 18.3284 6 15.5H18Z"
                  fill="#1967F2"
                />
                <path
                  opacity="0.5"
                  d="M16 6H8C5.17157 6 3.75736 6 2.87868 6.87868C2 7.75736 2 9.17157 2 12C2 14.8284 2 16.2426 2.87868 17.1213C3.37323 17.6159 4.03743 17.8321 5.02795 17.9266C4.99998 17.2038 4.99999 16.3522 5 15.5C4.72386 15.5 4.5 15.2761 4.5 15C4.5 14.7239 4.72386 14.5 5 14.5H19C19.2761 14.5 19.5 14.7239 19.5 15C19.5 15.2761 19.2761 15.5003 19 15.5003C19 16.3525 19 17.2039 18.9721 17.9266C19.9626 17.8321 20.6268 17.6159 21.1213 17.1213C22 16.2426 22 14.8284 22 12C22 9.17157 22 7.75736 21.1213 6.87868C20.2426 6 18.8284 6 16 6Z"
                  fill="#1967F2"
                />
                <path
                  d="M9 10.75C9.41421 10.75 9.75 10.4142 9.75 10C9.75 9.58579 9.41421 9.25 9 9.25H6C5.58579 9.25 5.25 9.58579 5.25 10C5.25 10.4142 5.58579 10.75 6 10.75H9Z"
                  fill="#1967F2"
                />
                <path
                  d="M18 10C18 10.5523 17.5523 11 17 11C16.4477 11 16 10.5523 16 10C16 9.44772 16.4477 9 17 9C17.5523 9 18 9.44772 18 10Z"
                  fill="#1967F2"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Schedule table with pagination */}
        <div className="printable-table-container">
          <ScheduleTable
            data={paged}
            total={total}
            page={page}
            pageSize={pageSize}
            onPageChange={setPage}
          />
        </div>

        {/* Add/Edit schedule modal */}
        <ScheduleModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSaved={async () => {
            await mutate(); // refresh list
            setModalOpen(false);
          }}
        />

        <Footer />
      </Layout>
    </ProtectedRoute>
  );
}
