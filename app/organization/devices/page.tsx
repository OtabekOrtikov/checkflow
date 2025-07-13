"use client";

import { useState, useMemo } from "react";
import useSWR from "swr";
import Layout from "@/components/Layout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Device } from "@/types/device.t";
import { deviceService } from "@/services/deviceService";
import { PageHeadline } from "@/components/layout/PageHeadline";
import { TableHeadline } from "@/components/layout/TableHeadline";
import Pagination from "@/components/layout/Pagination";
import { Footer } from "@/components/Footer";

export default function DevicesPage() {
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { data: all = [] } = useSWR<Device[]>(
    "devices",
    deviceService.getDevices
  );

  // текст поиска (необязательно, можно убрать)
  const [search, setSearch] = useState("");
  const filtered = useMemo(
    () =>
      all.filter((d) =>
        d.name.toLowerCase().includes(search.trim().toLowerCase())
      ),
    [all, search]
  );

  const total = filtered.length;
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <ProtectedRoute>
      <Layout>
        {/* Заголовок страницы с опциональным поиском */}
        <PageHeadline
          title="Устройства"
          searchValue={search}
          onSearchChange={setSearch}
        />

        <div className="tables board">
          {/* Заголовок таблицы */}
          <TableHeadline title="Устройства" icon={<></>} btn={false} />

          {/* Таблица */}
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th>Название и ID</th>
                  <th>Тип работы</th>
                  <th>Локация</th>
                  <th>Часовой пояс</th>
                  <th>Послед. соед.</th>
                  <th>Активность</th>
                </tr>
              </thead>
              <tbody>
                {paged.map((d) => (
                  <tr key={d.id}>
                    {/* Название и device_id */}
                    <td className="py-4">
                      <div className="flex flex-col">
                        <span className="font-medium">{d.name}</span>
                        <span className="text-[var(--foreground-50)] text-sm">
                          {d.device_id}
                        </span>
                      </div>
                    </td>
                    {/* Тип работы */}
                    <td className="!opacity-100">
                      <span
                        className={`font-semibold ${
                          d.device_type === "Entrance"
                            ? "text-[var(--green)]"
                            : "text-[var(--red)]"
                        }`}
                      >
                        {d.device_type === "Entrance" ? "Приход" : "Уход"}
                      </span>
                    </td>
                    {/* Локация */}
                    <td className="!opacity-100">{d.location}</td>
                    {/* Часовой пояс (жёстко GMT+05:00) */}
                    <td className="!opacity-100">GMT (+05:00)</td>
                    {/* Последнее соединение */}
                    <td className="!opacity-100">
                      {new Date(d.updated_at).toLocaleString("ru-RU", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    {/* Активность */}
                    <td className="!opacity-100">
                      <span
                        className={`font-semibold ${
                          d.is_active
                            ? "text-[var(--green)]"
                            : "text-[var(--foreground)] opacity-30"
                        }`}
                      >
                        {d.is_active ? "Активен" : "Неактивен"}
                      </span>
                    </td>
                  </tr>
                ))}

                {paged.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-8 text-center text-gray-500"
                    >
                      Устройств не найдено
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Пагинация */}
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
