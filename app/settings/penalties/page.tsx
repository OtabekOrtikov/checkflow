// src/app/settings/penalties/page.tsx
"use client";

import { Fragment, useState } from "react";
import useSWR from "swr";
import Layout from "@/components/Layout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { PageHeadline } from "@/components/layout/PageHeadline";
import { TableHeadline } from "@/components/layout/TableHeadline";
import Pagination from "@/components/layout/Pagination";
import { ManualPenalty, PenaltiesResponse } from "@/types/penalty.t";
import { penaltyService } from "@/services/penaltyService";
import AssignPenaltyModal from "@/components/penalties/AssignPenaltyModal";
import { Pencil, PlusCircle, Trash2, UserPlus } from "lucide-react";
import CreatePenaltyModal from "@/components/penalties/CreatePenaltyModal";

export default function PenaltiesPage() {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [createOpen, setCreateOpen] = useState(false);

  // тянем и потом берем data.manual
  const { data, mutate } = useSWR<PenaltiesResponse>(
    "penalties",
    penaltyService.getAll
  );
  const manual = data?.manual ?? [];

  // для открытия модалки назначения штрафа
  const [assignOpen, setAssignOpen] = useState(false);
  const [currentPenaltyId, setCurrentPenaltyId] = useState<number>(0);

  // пагинация
  const total = manual.length;
  const paged = manual.slice((page - 1) * pageSize, page * pageSize);

  return (
    <ProtectedRoute>
      <Layout>
        <PageHeadline
          title="Штрафы"
        />

        {/* модалка назначения */}
        <AssignPenaltyModal
          open={assignOpen}
          penaltyId={currentPenaltyId}
          onClose={() => setAssignOpen(false)}
          onSaved={() => {
            mutate();
            setAssignOpen(false);
          }}
        />

        <div className="tables board">
          <TableHeadline title="Штрафы" btn={true} btnText="Добавить"
          onClick={() => setCreateOpen(true)}
            btnIcon={<PlusCircle className="w-5 h-5" />} />

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th>Название</th>
                  <th>Описание</th>
                  <th>Сумма</th>
                  <th className="text-center">Управлять</th>
                </tr>
              </thead>
              <tbody>
                {paged.map((p: ManualPenalty) => (
                  <tr key={p.id}>
                    <td>{p.title}</td>
                    <td className="!opacity-100">{p.description ? p.description : "—"}</td>
                    <td className="!opacity-100">{p.amount}</td>
                    <td className="flex justify-center gap-2 !opacity-100">
                      {/* редактировать тип штрафа */}
                      <button
                        onClick={() => {
                          /* TODO: реализация edit-type */
                        }}
                        className="px-3 py-1 min-w-[60px] flex justify-center border border-[var(--primary)] bg-white text-[var(--red)] rounded-full"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="13"
                          height="13"
                          viewBox="0 0 13 13"
                          fill="none"
                        >
                          <path
                            d="M8.62541 0.666992L8.59994 0.692452C8.60801 0.716905 8.61641 0.741699 8.62514 0.766812C8.84187 1.39157 9.25087 2.21058 10.0202 2.97993C10.7895 3.74927 11.6085 4.15823 12.2333 4.37499C12.2581 4.38359 12.2825 4.39188 12.3067 4.39988L6.59974 10.1069C6.21501 10.4916 6.02254 10.684 5.81047 10.8495C5.56022 11.0447 5.28947 11.212 5.00299 11.3485C4.76014 11.4643 4.50201 11.5503 3.98579 11.7223L1.26357 12.6298C1.00953 12.7145 0.729447 12.6483 0.540094 12.459C0.350741 12.2696 0.284627 11.9895 0.369307 11.7355L1.27671 9.01326C1.44879 8.49706 1.53483 8.23893 1.65057 7.99606C1.7871 7.70959 1.95443 7.43886 2.14961 7.18859C2.31505 6.97653 2.50744 6.78413 2.89217 6.39939L8.62541 0.666992Z"
                            fill="#1967F2"
                          />
                        </svg>
                      </button>

                      {/* назначить сотруднику */}
                      <button
                        onClick={() => {
                          setCurrentPenaltyId(p.id);
                          setAssignOpen(true);
                        }}
                        className="px-3 py-1 min-w-[60px] flex justify-center border border-[var(--gray-e6)] bg-white text-[var(--red)] rounded-full"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M10.6663 3.99967C10.6663 5.47243 9.47241 6.66634 7.99967 6.66634C6.52691 6.66634 5.33301 5.47243 5.33301 3.99967C5.33301 2.52691 6.52691 1.33301 7.99967 1.33301C9.47241 1.33301 10.6663 2.52691 10.6663 3.99967Z"
                            fill="black"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M11.0003 14.6667C9.90039 14.6667 9.35039 14.6667 9.00873 14.3249C8.66699 13.9833 8.66699 13.4333 8.66699 12.3333C8.66699 11.2334 8.66699 10.6834 9.00873 10.3417C9.35039 10 9.90039 10 11.0003 10C12.1003 10 12.6503 10 12.9919 10.3417C13.3337 10.6834 13.3337 11.2334 13.3337 12.3333C13.3337 13.4333 13.3337 13.9833 12.9919 14.3249C12.6503 14.6667 12.1003 14.6667 11.0003 14.6667ZM12.3123 11.8305C12.4642 11.6787 12.4642 11.4325 12.3123 11.2806C12.1605 11.1287 11.9143 11.1287 11.7624 11.2806L10.4818 12.5611L10.2383 12.3176C10.0864 12.1657 9.84019 12.1657 9.68833 12.3176C9.53646 12.4695 9.53646 12.7157 9.68833 12.8676L10.2068 13.3861C10.3587 13.538 10.6049 13.538 10.7568 13.3861L12.3123 11.8305Z"
                            fill="black"
                          />
                          <path
                            opacity="0.5"
                            d="M9.65193 14.6142C9.16786 14.6489 8.62006 14.667 8.00033 14.667C2.66699 14.667 2.66699 13.3239 2.66699 11.667C2.66699 10.0101 5.05481 8.66699 8.00033 8.66699C9.92073 8.66699 11.6041 9.23793 12.5431 10.0945C12.199 10.0003 11.7161 10.0003 11.0003 10.0003C9.90039 10.0003 9.35039 10.0003 9.00873 10.3421C8.66699 10.6837 8.66699 11.2337 8.66699 12.3337C8.66699 13.4336 8.66699 13.9836 9.00873 14.3253C9.16706 14.4837 9.37013 14.5686 9.65193 14.6142Z"
                            fill="black"
                          />
                        </svg>
                      </button>

                      {/* удалить тип штрафа */}
                      <button
                        onClick={async () => {
                          await penaltyService.delete(p.id);
                          mutate();
                        }}
                        className="px-3 py-1 min-w-[60px] flex justify-center border border-[var(--red)] bg-white text-[var(--red)] rounded-full"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="17"
                          height="16"
                          viewBox="0 0 17 16"
                          fill="none"
                        >
                          <path
                            d="M2.5 4.34937C2.5 4.08638 2.71781 3.87318 2.98649 3.87318H6.17858C6.18291 3.31236 6.24369 2.54352 6.80025 2.01128C7.23827 1.59242 7.83873 1.3335 8.5 1.3335C9.16127 1.3335 9.76173 1.59242 10.1997 2.01128C10.7563 2.54352 10.8171 3.31236 10.8214 3.87318H14.0135C14.2822 3.87318 14.5 4.08638 14.5 4.34937C14.5 4.61236 14.2822 4.82556 14.0135 4.82556H2.98649C2.71781 4.82556 2.5 4.61236 2.5 4.34937Z"
                            fill="#FF4545"
                          />
                          <path
                            opacity="0.5"
                            d="M8.23007 14.6669H8.76927C10.6244 14.6669 11.552 14.6669 12.1551 14.0763C12.7582 13.4857 12.8199 12.5169 12.9433 10.5792L13.1211 7.78725C13.1881 6.73592 13.2215 6.21028 12.9189 5.87717C12.6164 5.54407 12.1055 5.54407 11.0837 5.54407H5.91571C4.89385 5.54407 4.38293 5.54407 4.08037 5.87717C3.77782 6.21028 3.8113 6.73592 3.87826 7.78725L4.05607 10.5792C4.17947 12.5169 4.24117 13.4857 4.84427 14.0763C5.44736 14.6669 6.37493 14.6669 8.23007 14.6669Z"
                            fill="#FF4545"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M6.78329 7.65451C7.05807 7.62557 7.30307 7.83664 7.33054 8.12584L7.66387 11.6346C7.69134 11.9238 7.49087 12.1818 7.21614 12.2107C6.94136 12.2396 6.69633 12.0286 6.66886 11.7394L6.33553 8.23058C6.30805 7.94138 6.50852 7.68344 6.78329 7.65451Z"
                            fill="#FF4545"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M10.2161 7.65451C10.4909 7.68344 10.6913 7.94138 10.6639 8.23058L10.3305 11.7394C10.3031 12.0286 10.0581 12.2396 9.78326 12.2107C9.50852 12.1818 9.30806 11.9238 9.33552 11.6346L9.66886 8.12584C9.69632 7.83664 9.94132 7.62557 10.2161 7.65451Z"
                            fill="#FF4545"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}

                {manual.length === 0 && (
                  <tr>
                    <td colSpan={2} className="py-4 text-center text-gray-500">
                      Нет штрафов
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <Pagination
            total={total}
            page={page}
            pageSize={pageSize}
            onPageChange={setPage}
          />

          <CreatePenaltyModal
            open={createOpen}
            onClose={() => setCreateOpen(false)}
            onSaved={async () => {
              await mutate();
              setCreateOpen(false);
            }}
          />
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
