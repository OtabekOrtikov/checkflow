// src/app/organization/devices/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { PageHeadline } from "@/components/PageHeadline";
import PlusInCircle from "@/assets/icons/plusInCircle.svg";
import { OrgModal } from "@/components/organization/OrgModal";
import { v4 as uuid } from "uuid";

import {
  fetchOrgDevices,
  createOrgDevice,
  updateOrgDevice,
  deleteOrgDevice,
  fetchLocations,
} from "@/services/organizationService";
import type { Device, Location } from "@/types/organization.t";
import { GridDeviceTable } from "@/components/organization/GridDeviceTable";
import { Footer } from "@/components/Footer";

export default function DevicesPage() {
  const [data, setData] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const pageSize = 5;

  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<Device | undefined>();

  // Для выпадашки локаций
  const [locOptions, setLocOptions] = useState<
    { label: string; value: string }[]
  >([]);

  const load = () => {
    setLoading(true);
    Promise.all([fetchOrgDevices(), fetchLocations()])
      .then(([devs, locs]) => {
        setData(devs.data);
        setLocOptions(
          locs.data.map((l: Location) => ({ label: l.name, value: l.name }))
        );
      })
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleSave = (vals: Device) => {
    const action = vals.id
      ? updateOrgDevice(vals.id, vals)
      : createOrgDevice({ ...vals, id: uuid() });
    return action.then(load).then(() => setModalOpen(false));
  };

  const handleDelete = (id: string) =>
    deleteOrgDevice(id)
      .then(load)
      .then(() => setModalOpen(false));

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

        <GridDeviceTable
          data={data.slice((page - 1) * pageSize, page * pageSize)}
          loading={loading}
          page={page}
          pageSize={pageSize}
          setPage={setPage}
          onEdit={(id) => {
            setEditItem(data.find((d) => d.id === id));
            setModalOpen(true);
          }}
          onDelete={handleDelete}
        />

        <Footer className="mt-auto" />
      </main>

      {modalOpen && (
        <OrgModal<Device>
          setIsOpen={setModalOpen}
          title="Устройство"
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          item={editItem}
          fields={[
            [
              { key: "name", label: "Название устройства", type: "text" },
              { key: "id", label: "ID", type: "text" },
            ],
            [
              {
                key: "type",
                label: "Тип камеры",
                type: "select",
                options: [
                  { label: "Приход", value: "Приход" },
                  { label: "Уход", value: "Уход" },
                ],
              },
              { key: "ipAddress", label: "IP Адрес", type: "text" },
            ],
            { key: "location", label: "Местоположение", type: "text" },
            {
              key: "cameraLocation",
              label: "Локация камеры",
              type: "select",
              options: locOptions,
            },
          ]}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      )}
    </>
  );
}
