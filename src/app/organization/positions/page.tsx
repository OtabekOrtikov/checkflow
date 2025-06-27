"use client";

import { useEffect, useState } from "react";
import {
  fetchPositions,
  createPosition,
  updatePosition,
  deletePosition,
} from "@/services/organizationService";
import { PageHeadline } from "@/components/PageHeadline";
import { GridPositionTable } from "@/components/organization/GridPositionTable";
import { Position } from "@/types/organization.t";
import PlusInCircle from "@/assets/icons/plusInCircle.svg";
import { OrgModal } from "@/components/organization/OrgModal";
import { v4 as uuid } from "uuid";

export default function PositionsPage() {
  const [data, setData] = useState<Position[]>([]);
  const [loading, setLoading] = useState(true);

  // pagination
  const [page, setPage] = useState(1);
  const pageSize = 5;

  // modal
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<Position>();

  // load function
  const load = () => {
    setLoading(true);
    return fetchPositions()
      .then((r) => setData(r.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  // CRUD handlers
  const handleCreate = (vals: Omit<Position, "id">) =>
    createPosition({ ...vals, id: uuid() }).then(load);

  const handleUpdate = (id: string, upd: Partial<Position>) =>
    updatePosition(id, upd).then(load);

  const handleDelete = (id: string) => deletePosition(id).then(load);

  // pagination slice
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

        <GridPositionTable
          data={paged}
          loading={loading}
          page={page}
          pageSize={pageSize}
          setPage={setPage}
          onUpdate={(id) => {
            setEditItem(data.find((p) => p.id === id));
            setModalOpen(true);
          }}
          onDelete={handleDelete}
        />
      </main>

      {modalOpen && (
        <OrgModal<Position>
            title="Должности"
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          item={editItem}
          fields={[
            { key: "name", label: "Название должности", type: "text" },
            {
              key: "employeeCount",
              label: "Количество сотрудников",
              type: "number",
            },
          ]}
          onSave={(vals) => {
            if (vals.id) {
              return handleUpdate(vals.id, vals).then(() =>
                setModalOpen(false)
              );
            } else {
              return handleCreate(vals).then(() => setModalOpen(false));
            }
          }}
          onDelete={(id) => handleDelete(id).then(() => setModalOpen(false))}
        />
      )}
    </>
  );
}
