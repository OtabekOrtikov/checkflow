"use client";

import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { Navbar } from "@/components/Navbar";
import { PageHeadline } from "@/components/PageHeadline";
import PlusInCircle from "@/assets/icons/plusInCircle.svg";
import {
  fetchDayTemplates,
  createDayTemplate,
  updateDayTemplate,
  deleteDayTemplate,
} from "@/services/organizationService";
import type { DayTemplate } from "@/types/organization.t";
// дефолтный импорт компонента
import { OrgModal } from "@/components/organization/OrgModal";
import { GridDayTemplateTable } from "@/components/organization/GridDayTemplateTable";

export default function DayTemplatesPage() {
  const [data, setData] = useState<DayTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<DayTemplate | undefined>();

  const load = () => {
    setLoading(true);
    fetchDayTemplates()
      .then((r) => setData(r.data))
      .finally(() => setLoading(false));
  };
  useEffect(load, []);

  const handleSave = (vals: DayTemplate) => {
    const action = vals.id
      ? updateDayTemplate(vals.id, vals)
      : createDayTemplate({ ...vals, id: uuid() });
    return action.then(load).then(() => setModalOpen(false));
  };

  const handleDelete = (id: string) =>
    deleteDayTemplate(id)
      .then(load)
      .then(() => setModalOpen(false));

  const handleDuplicate = (row: DayTemplate) => {
    createDayTemplate({ ...row, id: uuid(), name: `${row.name} (копия)` }).then(
      load
    );
  };

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

        <GridDayTemplateTable
          data={data}
          loading={loading}
          page={page}
          pageSize={pageSize}
          setPage={setPage}
          // здесь аннотируем тип
          onEdit={(row: DayTemplate) => {
            setEditItem(row);
            setModalOpen(true);
          }}
          onDuplicate={handleDuplicate}
          onDelete={handleDelete}
        />

        {modalOpen && (
          <OrgModal<DayTemplate>
            setIsOpen={setModalOpen}
            title="Шаблон дня"
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            item={editItem}
            fields={[
              { key: "name", label: "Название шаблона", type: "text" },
              { key: "color", label: "Цвет", type: "color" },
              { key: "description", label: "Описание", type: "text" },
            ]}
            onSave={handleSave}
            onDelete={handleDelete}
          />
        )}
      </main>
    </>
  );
}
