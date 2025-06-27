// src/app/organization/departments/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import {
  fetchDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "@/services/organizationService";
import { PageHeadline } from "@/components/PageHeadline";
import Pagination from "@/components/Pagination";
import { GridDepartmentTable } from "@/components/organization/GridDepartmentTable";
import { Navbar } from "@/components/Navbar";
import PlusInCircle from "@/assets/icons/plusInCircle.svg";
import { SearchInput } from "@/components/SearchInput";
import { OrgModal } from "@/components/organization/OrgModal";
import { Department } from "@/types/organization.t";

export default function DepartmentsPage() {
  const [data, setData] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<Department | undefined>();

  // Загрузка и обновление списка
  const refresh = () => {
    setLoading(true);
    return fetchDepartments()
      .then((res) => setData(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    refresh();
  }, []);

  // CRUD-хендлеры
  const handleCreate = () =>
    createDepartment({ name: "Новый отдел", employeeCount: 0 }).then(refresh);
  const handleUpdate = (id: string, upd: Partial<Department>) =>
    updateDepartment(id, upd).then(refresh);
  const handleDelete = (id: string) => deleteDepartment(id).then(refresh);

  // Пагинация
  const paged = data.slice((page - 1) * pageSize, page * pageSize);

  return (
    <>
      <main className="flex-1 p-[30px] flex flex-col gap-y-[20px] min-h-screen">
        <PageHeadline title="Организация">
          <div className="flex items-stretch gap-x-[10px] ml-auto">
            <button
              onClick={() => {
                setEditItem(undefined);
                setModalOpen(true);
              }}
              className="flex items-center gap-x-[10px] bg-(--primary) text-(--white) text-[24px] px-[20px] py-[10px] rounded-[50px] font-medium"
            >
              <PlusInCircle />
              Добавить
            </button>
          </div>
        </PageHeadline>

        <GridDepartmentTable
          data={paged}
          loading={loading}
          page={page}
          pageSize={pageSize}
          setPage={setPage}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      </main>

      <OrgModal<Department>
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        item={editItem}
        fields={[
          { key: "name", label: "Название отдела", type: "text" },
          { key: "employeeCount", label: "Кол-во сотрудников", type: "number" },
        ]}
        onSave={(dept) =>
          dept.id
            ? updateDepartment(dept.id, dept).then(refresh)
            : createDepartment({ ...dept, id: uuid() }).then(refresh)
        }
        onDelete={(id) => deleteDepartment(id).then(refresh)}
      />
    </>
  );
}
