"use client";

import { Fragment, useState, useMemo } from "react";
import useSWR from "swr";
import Layout from "@/components/Layout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Branch } from "@/types/branch.t";
import { branchService } from "@/services/branchService";
import { PageHeadline } from "@/components/layout/PageHeadline";
import { TableHeadline } from "@/components/layout/TableHeadline";
import Pagination from "@/components/layout/Pagination";
import BranchModal from "@/components/branches/BranchModal";
import { Footer } from "@/components/Footer";

export default function LocationsPage() {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const companyId = 1; // подставьте актуальный ID вашей компании

  const { data: all, mutate } = useSWR<Branch[]>(["branches", companyId], () =>
    branchService.getBranches(companyId)
  );

  const branches = all || [];
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [edit, setEdit] = useState<Branch | null>(null);

  // фильтрация
  const filtered = useMemo(
    () =>
      branches.filter((b) =>
        b.name.toLowerCase().includes(search.trim().toLowerCase())
      ),
    [branches, search]
  );

  const total = filtered.length;
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  const openNew = () => {
    setEdit(null);
    setModalOpen(true);
  };
  const openEdit = (b: Branch) => {
    setEdit(b);
    setModalOpen(true);
  };

  return (
    <ProtectedRoute>
      <Layout>
        <PageHeadline
          title="Локации компании"
          addText="Добавить"
          onAdd={openNew}
          searchValue={search}
          onSearchChange={setSearch}
          btnIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2Z"
                stroke="white"
                strokeWidth="1.5"
              />
              <path
                d="M12 7V17M7 12H17"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          }
        />

        <BranchModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSaved={() => {
            mutate();
            setModalOpen(false);
          }}
          branch={edit}
          companyId={companyId}
        />

        <div className="tables board">
          <TableHeadline title="Локации компании" icon={<> </>} btn={false} />

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th>Название</th>
                  <th>ИНН</th>
                  <th>Адрес</th>
                  <th className="text-center">Управлять</th>
                </tr>
              </thead>
              <tbody>
                {paged.map((b) => (
                  <tr key={b.id}>
                    <td>{b.name}</td>
                    <td>{b.taxpair_identification_number}</td>
                    <td>{b.location}</td>
                    <td className="flex gap-2 justify-center !opacity-100">
                      <button
                        onClick={() => openEdit(b)}
                        className="px-3 py-1 min-w-[60px] flex justify-center border border-[var(--primary)] bg-white text-[var(--red)] rounded-full"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="17"
                          height="16"
                          viewBox="0 0 17 16"
                          fill="none"
                        >
                          <path
                            opacity="0.5"
                            d="M14.3985 5.80896C15.4223 4.78516 15.4223 3.12524 14.3985 2.10144C13.3747 1.07764 11.7147 1.07764 10.6909 2.10144L10.0996 2.6928C10.1077 2.71726 10.1161 2.74204 10.1248 2.76716C10.3415 3.39192 10.7505 4.21093 11.5199 4.98027C12.2892 5.74961 13.1082 6.15858 13.733 6.37534C13.758 6.38401 13.7827 6.39237 13.807 6.40043L14.3985 5.80896Z"
                            fill="#1967F2"
                          />
                          <path
                            d="M10.1264 2.6669L10.1009 2.69236C10.109 2.71681 10.1174 2.74161 10.1261 2.76672C10.3428 3.39148 10.7519 4.21049 11.5212 4.97983C12.2905 5.74917 13.1095 6.15814 13.7343 6.37489C13.7591 6.38349 13.7835 6.39179 13.8077 6.39979L8.10072 12.1068C7.71598 12.4915 7.52352 12.6839 7.31145 12.8494C7.0612 13.0446 6.79044 13.2119 6.50397 13.3484C6.26112 13.4642 6.00299 13.5502 5.48677 13.7222L2.76454 14.6297C2.5105 14.7144 2.23042 14.6482 2.04107 14.4589C1.85172 14.2695 1.7856 13.9894 1.87028 13.7354L2.77769 11.0132C2.94977 10.497 3.0358 10.2388 3.15154 9.99597C3.28808 9.7095 3.4554 9.43877 3.65058 9.1885C3.81603 8.97643 4.00842 8.78403 4.39314 8.3993L10.1264 2.6669Z"
                            fill="#1967F2"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={async () => {
                          await branchService.deleteBranch(b.id);
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
                {paged.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-4 text-center text-gray-500">
                      Нет локаций
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
        </div>

        <Footer />
      </Layout>
    </ProtectedRoute>
  );
}
