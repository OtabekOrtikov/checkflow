// src/app/settings/roles/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { GridRoleTable } from "@/components/settings/GridRoleTable";
import { RoleModal } from "@/components/settings/RoleModal";
import { RoleAssignment } from "@/types/settings.t";
import {
  fetchRoleAssignments,
  createRoleAssignment,
  updateRoleAssignment,
  deleteRoleAssignment,
} from "@/services/settingsService";
import { PageHeadline } from "@/components/PageHeadline";

export default function RolesPage() {
  const [data, setData] = useState<RoleAssignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<RoleAssignment | undefined>();

  const refresh = () => {
    setLoading(true);
    fetchRoleAssignments()
      .then((r) => setData(r.data))
      .finally(() => setLoading(false));
  };

  useEffect(refresh, []);

  const employeeOptions = data.map((r) => r.name);
  const departmentOptions = Array.from(new Set(data.map((r) => r.department)));
  const locationOptions = Array.from(new Set(data.map((r) => r.location)));

  return (
    <div className="flex items-start">
      <Navbar />
      <main className="flex-1 p-8 flex flex-col gap-6 min-h-screen">
        <PageHeadline title="Общие настройки" />

        <GridRoleTable
          data={data}
          loading={loading}
          page={page}
          pageSize={pageSize}
          setPage={setPage}
          onAdd={() => {
            setEditItem(undefined);
            setModalOpen(true);
          }}
          onEdit={(item) => {
            setEditItem(item);
            setModalOpen(true);
          }}
          onDelete={(id) =>
            deleteRoleAssignment(id).then(() => {
              refresh();
            })
          }
        />

        {modalOpen && (
          <RoleModal
            title={editItem ? "Изменить роль" : "Новая роль"}
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            employees={employeeOptions}
            roles={["Админ", "Пользователь", "Менеджер"]}
            permissions={[
              "TimePad",
              "Заработная плата",
              "Редактирование ЗП",
              "Устройства",
              "Удержание и доплата",
              "Отгулы",
              "Локации",
              "Изменение профиля",
            ]}
            locations={locationOptions}
            item={
              editItem
                ? {
                    employee: editItem.name,
                    email: editItem.login,
                    role: editItem.role,
                    permissions: editItem.specialPermissions,
                    department: editItem.department,
                    location: editItem.location,
                  }
                : undefined
            }
            onSave={async (vals) => {
              if (editItem) {
                await updateRoleAssignment(editItem.id, {
                  id: editItem.id,
                  name: vals.employee,
                  login: vals.email,
                  role: vals.role,
                  specialPermissions: vals.permissions,
                  department: vals.location,
                });
              } else {
                await createRoleAssignment({
                  id: String(data.length + 1),
                  name: vals.employee,
                  login: vals.email,
                  role: vals.role,
                  specialPermissions: vals.permissions,
                  department: vals.department,
                  location: vals.location,
                });
              }
              setModalOpen(false);
              refresh();
            }}
            department={departmentOptions}
          />
        )}
      </main>
    </div>
  );
}
