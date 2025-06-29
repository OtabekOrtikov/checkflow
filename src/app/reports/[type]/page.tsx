"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { PageHeadline } from "@/components/PageHeadline";
import PlusInCircle from "@/assets/icons/plusInCircle.svg";
import { ReportTable } from "@/components/reports/ReportTable";
import {
  ReportModal,
  FieldOption,
  Field,
} from "@/components/reports/ReportModal";
import {
  fetchCategoryByType,
  downloadReport,
  deleteReport,
  createReport,
} from "@/services/reportService";
import type { Report, ReportItem } from "@/types/report.t";
import { Footer } from "@/components/Footer";
import { SearchInput } from "@/components/SearchInput";

export default function ReportDetailPage() {
  const { type } = useParams() as { type: string };
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const pageSize = 6;

  // modal
  const [modalOpen, setModalOpen] = useState(false);

  // reload report data
  const reload = () => {
    setLoading(true);
    setError(null);
    fetchCategoryByType(type)
      .then((r) => setReport(r.data))
      .catch(() => setError("Не удалось загрузить отчёт"))
      .finally(() => setLoading(false));
  };

  useEffect(reload, [type]);

  const handleDownload = (id: string) => downloadReport(type, id);
  const handleDelete = (id: string) =>
    deleteReport(type, id).then(() => reload());

  const handleSave = async (item: ReportItem) => {
    await createReport(type, item);
    await reload();
    setModalOpen(false);
  };
  const handleSaveAndAddAnother = async (item: ReportItem) => {
    await createReport(type, item);
    await reload();
    // keep modal open
  };

  // build modal fields based on report type
  const employeeOptions: FieldOption[] =
    report?.items.map((i) => ({ label: i.title || `${i.id}`, value: i.id })) ||
    [];

  let fields: Array<Field<ReportItem> | Field<ReportItem>[]> = [];

  // fields: rows of inputs
  if (type === "employee") {
    fields = [
      [
        { key: "startDate", label: "Дата начала", type: "date" },
        { key: "endDate", label: "Дата окончания", type: "date" },
      ],
      [
        {
          key: "title",
          label: "Сотрудник",
          type: "select",
          options: employeeOptions,
        },
      ],
    ];
  } else {
    fields = [
      { key: "startDate", label: "Дата начала", type: "date" },
      { key: "endDate", label: "Дата окончания", type: "date" },
    ];
  }

  if (loading) return <div className="p-4">Загрузка…</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!report) return null;

  const pagedItems = report.items.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="flex items-start">
      <Navbar />

      <main className="flex-1 p-[30px] flex flex-col gap-y-[20px] min-h-screen h-full">
        <PageHeadline title="Отчёты">
          <div className="flex items-center gap-x-[10px] ml-auto">
            <div className="relative flex-1 h-[60px] min-w-[210px]">
              <SearchInput
                id="search-reports"
                placeholder="Поиск"
                className="w-full h-full rounded-[15px] border border-(--black-10) bg-(--white)"
              />
            </div>
            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-x-[10px] bg-(--primary) text-(--white) px-[20px] py-[10px] rounded-full text-[20px]"
            >
              <PlusInCircle />
              Добавить отчёт
            </button>
          </div>
        </PageHeadline>

        <ReportTable
          type={type}
          title={report.title}
          items={pagedItems}
          loading={false}
          page={page}
          pageSize={pageSize}
          onDownload={handleDownload}
          onDelete={handleDelete}
          onPageChange={setPage}
        />

        <Footer className="mt-auto" />
      </main>

      <ReportModal<ReportItem>
        title="Новый отчёт"
        isOpen={modalOpen}
        setIsOpen={setModalOpen}
        onClose={() => setModalOpen(false)}
        fields={fields}
        onSave={async (data) => {
          await createReport(type, data);
          setModalOpen(false);
        }}
        onSaveAndAddAnother={async (data) => {
          await createReport(type, data);
          // форма сбросится автоматически
        }}
      />
    </div>
  );
}
