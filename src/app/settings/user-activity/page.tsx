// src/app/settings/user-activity/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { PageHeadline } from "@/components/PageHeadline";
import { GridUserActivityTable } from "@/components/settings/GridUserActivityTable";
import { fetchUserActivities } from "@/services/settingsService";
import type { UserActivity } from "@/types/settings.t";

export default function UserActivityPage() {
  const [data, setData] = useState<UserActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    setLoading(true);
    fetchUserActivities()
      .then((r) => setData(r.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex items-start">
      <Navbar />
      <main className="flex-1 p-[30px] flex flex-col gap-y-[20px] min-h-screen">
        <PageHeadline title="Настройки" />
        <GridUserActivityTable
          data={data}
          loading={loading}
          page={page}
          pageSize={pageSize}
          setPage={setPage}
        />
      </main>
    </div>
  );
}
