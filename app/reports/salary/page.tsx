"use client";

import { Fragment, useState } from "react";
import useSWR from "swr";
import Layout from "@/components/Layout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { ReportBase } from "@/types/report.t";
import { reportService } from "@/services/reportService";
import Pagination from "@/components/layout/Pagination";
import { PageHeadline } from "@/components/layout/PageHeadline";
import { TableHeadline } from "@/components/layout/TableHeadline";
import SalaryModal from "@/components/reports/SalaryModal";
import { Footer } from "@/components/Footer";

export default function SalaryReportsPage() {
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { data: reports = [], mutate } = useSWR<ReportBase[]>(
    "salaryReports",
    reportService.getSalaryReports
  );
  const [modalOpen, setModalOpen] = useState(false);

  // пагинация
  const total = reports.length;
  const paged = reports.slice((page - 1) * pageSize, page * pageSize);

  return (
    <ProtectedRoute>
      <Layout>
        <PageHeadline
          title="Отчёты по зарплате и штрафам"
          addText="Добавить отчёт"
          onAdd={() => setModalOpen(true)}
          btnIcon={
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
          }
        />

        <div className="tables board">
          <TableHeadline title="Зарплата и штрафы" btn={false} />

          <SalaryModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            onSaved={() => {
              mutate();
              setModalOpen(false);
            }}
          />

          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Дата начала</th>
                  <th>Дата окончания</th>
                  <th>Создано</th>
                  <th>Скачать Excel</th>
                </tr>
              </thead>
              <tbody>
                {paged.map((r) => (
                  <tr key={r.id}>
                    <td>{r.date_from}</td>
                    <td>{r.date_to}</td>
                    <td>{new Date(r.created_at).toLocaleString()}</td>
                    <td className="flex gap-2.5">
                      <button
                        onClick={async () => {
                          const res = await reportService.downloadSalaryReport(
                            r.id
                          );
                          const url = URL.createObjectURL(res.data);
                          const a = document.createElement("a");
                          a.href = url;
                          a.download = `salary_${r.id}.xlsx`;
                          a.click();
                          URL.revokeObjectURL(url);
                        }}
                        className="px-3 py-1 border border-[var(--green)] bg-white text-[var(--green)] rounded-full"
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
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M2.5 9.50012C2.77614 9.50012 3 9.72399 3 10.0001C3 10.9571 3.00106 11.6245 3.06877 12.1281C3.13453 12.6173 3.25483 12.8763 3.43934 13.0608C3.62385 13.2453 3.8829 13.3656 4.37208 13.4314C4.87565 13.4991 5.54306 13.5001 6.5 13.5001H10.5C11.4569 13.5001 12.1243 13.4991 12.6279 13.4314C13.1171 13.3656 13.3761 13.2453 13.5607 13.0608C13.7452 12.8763 13.8655 12.6173 13.9313 12.1281C13.9989 11.6245 14 10.9571 14 10.0001C14 9.72399 14.2239 9.50012 14.5 9.50012C14.7761 9.50012 15 9.72399 15 10.0001V10.0367C15 10.9485 15 11.6833 14.9223 12.2613C14.8417 12.8614 14.6691 13.3666 14.2678 13.7679C13.8665 14.1692 13.3613 14.3418 12.7612 14.4225C12.1832 14.5001 11.4483 14.5001 10.5366 14.5001H6.46342C5.55169 14.5001 4.81681 14.5001 4.23883 14.4225C3.63876 14.3418 3.13351 14.1692 2.73223 13.7679C2.33095 13.3666 2.15836 12.8614 2.07768 12.2613C1.99997 11.6833 1.99999 10.9485 2 10.0367C2 10.0245 2 10.0123 2 10.0001C2 9.72399 2.22386 9.50012 2.5 9.50012Z"
                            fill="#24D56D"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M8.49968 11.1668C8.64008 11.1668 8.77394 11.1078 8.86868 11.0042L11.5353 8.08752C11.7217 7.88372 11.7075 7.56746 11.5037 7.38112C11.2999 7.19479 10.9837 7.20892 10.7973 7.41272L8.99968 9.37892V2.00012C8.99968 1.72398 8.77581 1.50012 8.49968 1.50012C8.22354 1.50012 7.99968 1.72398 7.99968 2.00012V9.37892L6.20203 7.41272C6.01569 7.20892 5.69943 7.19479 5.49563 7.38112C5.29183 7.56746 5.27766 7.88372 5.46399 8.08752L8.13068 11.0042C8.22541 11.1078 8.35928 11.1668 8.49968 11.1668Z"
                            fill="#24D56D"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={async () => {
                          await reportService.deleteReport("salary", r.id);
                          mutate();
                        }}
                        className="px-3 py-1 border border-[var(--red)] bg-white text-[var(--red)] rounded-full"
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
