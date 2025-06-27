// src/app/organization/locations/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { PageHeadline } from "@/components/PageHeadline";
import { GridLocationTable } from "@/components/organization/GridLocationTable";
import { OrgModal } from "@/components/organization/OrgModal";
import { v4 as uuid } from "uuid";
import PlusInCircle from "@/assets/icons/plusInCircle.svg";
import type { Location } from "@/types/organization.t";
import {
  fetchLocations,
  createLocation,
  updateLocation,
  deleteLocation,
} from "@/services/organizationService";
import { Footer } from "@/components/Footer";

export default function LocationsPage() {
  const [data, setData] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  // модал
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<Location | undefined>(undefined);

  const load = () => {
    setLoading(true);
    fetchLocations()
      .then((r) => setData(r.data))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleSave = (vals: Partial<Location> & { id?: string }) => {
    if (vals.id) {
      return updateLocation(vals.id, vals).then(load);
    } else {
      const newLoc: Location = {
        id: uuid(),
        name: vals.name || "",
        deviceCount: vals.deviceCount || 0,
        employeeCount: vals.employeeCount || 0,
      };
      return createLocation(newLoc).then(load);
    }
  };
  const handleDelete = (id: string) => deleteLocation(id).then(load);

  // пагинация
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

        <GridLocationTable
          data={paged}
          loading={loading}
          page={page}
          pageSize={pageSize}
          setPage={setPage}
          onUpdate={(id) => {
            const item = data.find((l) => l.id === id);
            setEditItem(item);
            setModalOpen(true);
          }}
          onDelete={handleDelete}
        />

        <Footer className="mt-auto" />
      </main>

      {modalOpen && (
        <OrgModal<Location>
          title="Локации"
          setIsOpen={setModalOpen}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          item={editItem}
          fields={[
            { key: "name", label: "Название локации", type: "text" },
            { key: "deviceCount", label: "Устройств", type: "number" },
            { key: "employeeCount", label: "Сотрудников", type: "number" },
          ]}
          onSave={(vals) => handleSave(vals).finally(() => setModalOpen(false))}
          onDelete={(id) => handleDelete(id).finally(() => setModalOpen(false))}
        />
      )}
    </>
  );
}
