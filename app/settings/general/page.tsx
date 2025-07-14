// src/app/settings/general/page.tsx
"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import ProtectedRoute from "@/components/ProtectedRoute";
import Layout from "@/components/Layout";
import { PageHeadline } from "@/components/layout/PageHeadline";
import { CompanySettings } from "@/types/settings.t";
import { settingsService } from "@/services/settingsService";
import { TableHeadline } from "@/components/layout/TableHeadline";
import { is } from "date-fns/locale";

export default function GeneralSettingsPage() {
  const [isLoading, setIsLoading] = useState(false);
  // Загрузка текущих настроек
  const { data: settings } = useSWR<CompanySettings>(
    "generalSettings",
    settingsService.getGeneralSettings
  );

  // Локальный стейт формы
  const [form, setForm] = useState<CompanySettings>({
    id_display: "",
    timezone: "",
    language: "",
    time_format: "24",
    date_format: "",
    currency: "",
  });

  const { data: company } = useSWR(
    "company",
    () => settingsService.getCompanyById(1) // Предположим, что ID компании 1
  );

  // Когда настройки загрузятся, заполняем форму
  useEffect(() => {
    if (settings) {
      setForm(settings);
    }
  }, [settings]);

  // Сохранение (пока просто вызывает API, без обработки ошибки)
  const handleSave = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Имитируем задержку
    // await settingsService.updateGeneralSettings(form);
    // Можно добавить уведомление об успешном сохранении...
  };

  // Пока не загрузились — ничего не рендерим (можно заменить на spinner)
  if (!settings) return null;

  return (
    <ProtectedRoute>
      <Layout>
        <PageHeadline title={company?.name || "Общие настройка"} />

        <div className="board">
          <TableHeadline title={"Настройки"} />
          <form className="grid grid-cols-1 lg:grid-cols-2 gap-2.5 items-stretch">
            {/* Формат отображения Ф.И.О. */}
            <div className="card">
              <label className="">Формат Ф.И.О.</label>
              <input
                type="text"
                className=""
                value={form.id_display}
                onChange={(e) =>
                  setForm((f) => ({ ...f, id_display: e.target.value }))
                }
              />
            </div>

            {/* Часовой пояс */}
            <div className="card">
              <label className="">Часовой пояс</label>
              <select
                className=""
                value={form.timezone}
                onChange={(e) =>
                  setForm((f) => ({ ...f, timezone: e.target.value }))
                }
              >
                <option value="">Выберите часовой пояс</option>
                <option value="(UTC+05:00) Asia/Tashkent">
                  (UTC+05:00) Asia/Tashkent
                </option>
                <option value="(UTC+03:00) Europe/Moscow">
                  (UTC+03:00) Europe/Moscow
                </option>
                {/* Добавьте сюда другие варианты при необходимости */}
              </select>
            </div>

            {/* Язык */}
            <div className="card">
              <label className="">Язык</label>
              <select
                className=""
                value={form.language}
                onChange={(e) =>
                  setForm((f) => ({ ...f, language: e.target.value }))
                }
              >
                <option value="">Выберите язык</option>
                <option value="ru">Русский</option>
                <option value="en">English</option>
              </select>
            </div>

            {/* Формат времени */}
            <div className="card">
              <label className="">Формат времени</label>
              <select
                className=""
                value={form.time_format}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    time_format: e.target.value as "12" | "24",
                  }))
                }
              >
                <option value="12">12-часовой</option>
                <option value="24">24-часовой</option>
              </select>
            </div>

            {/* Формат даты */}
            <div className="card">
              <label className="">Формат даты</label>
              <select
                className=""
                value={form.date_format}
                onChange={(e) =>
                  setForm((f) => ({ ...f, date_format: e.target.value }))
                }
              >
                <option value="">Выберите формат даты</option>
                <option value="DD.MM.YYYY">DD.MM.YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>

            {/* Валюта */}
            <div className="card">
              <label className="">Валюта</label>
              <select
                className=""
                value={form.currency}
                onChange={(e) =>
                  setForm((f) => ({ ...f, currency: e.target.value }))
                }
              >
                <option value="">Выберите валюту</option>
                <option value="UZS">UZS</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
          </form>
        </div>
        {/* Кнопки Сброс и Сохранить */}
        <div className="flex justify-center">
          {/* <button
            type="button"
            onClick={() => settings && setForm(settings)}
            className="px-5 border border-[var(--gray-e6)] rounded-[15px] text-xl font-semibold"
          >
            Сбросить
          </button> */}
          <button
            type="button"
            onClick={handleSave}
            className="h-[60px] py-3 px-5 bg-[var(--primary)] text-white rounded-full text-2xl font-medium flex items-center justify-center gap-2.5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M7 12.9L10.1429 16.5L18 7.5"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {isLoading ? "Сохранение..." : "Сохранить"}
          </button>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
