// src/app/settings/locations/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { PageHeadline } from "@/components/PageHeadline";
import { GridLocationTable } from "@/components/profile/GridLocationTable";
import { LocationModal } from "@/components/profile/LocationModal";
import {
  fetchLocations,
  createLocation,
  updateLocation,
  deleteLocation,
} from "@/services/locationService";
import type { Location } from "@/types/location.t";

export default function LocationsPage() {
  const [data, setData] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<Location | undefined>();

  const load = () => {
    setLoading(true);
    fetchLocations()
      .then((r) => setData(r.data))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  return (
    <div className="flex items-start">
      <Navbar />
      <main className="flex-1 p-8 flex flex-col gap-8">
        <PageHeadline title="Локации" />

        <GridLocationTable
          data={data}
          loading={loading}
          page={page}
          pageSize={pageSize}
          onPageChange={setPage}
          onAdd={() => {
            setEditItem(undefined);
            setModalOpen(true);
          }}
          onEdit={(loc) => {
            setEditItem(loc);
            setModalOpen(true);
          }}
          onDelete={(id) => deleteLocation(id).then(() => load())}
        />

        <LocationModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          existing={editItem}
          onSave={(loc) => createLocation(loc).then(load)}
          onUpdate={(id, loc) => updateLocation(id, loc).then(load)}
        />
      </main>
    </div>
  );
}
