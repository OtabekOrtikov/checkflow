// src/app/settings/general/page.tsx
"use client";

import { Fragment, useEffect, useState } from "react";
import useSWR from "swr";
import Layout from "@/components/Layout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { PageHeadline } from "@/components/layout/PageHeadline";
import { TableHeadline } from "@/components/layout/TableHeadline";
import { Listbox, Transition } from "@headlessui/react";
import { Check } from "lucide-react";
import ArrowDownIcon from "@/assets/icons/arrow-down.svg";

import { settingsService } from "@/services/settingsService";
import { companyService } from "@/services/companyService";
import { Company } from "@/types/company.t";
import { CompanySettings } from "@/types/settings.t";

export default function GeneralSettingsPage() {
  // 1) Подтягиваем компанию
  const { data: company, isLoading: companyLoading } = useSWR<Company>(
    "company",
    () => companyService.getCompanyById(1) // TODO: заменить 1 на реальный ID из конекста
  );

  // 2) Подтягиваем текущие настройки
  const { data: settings, mutate } = useSWR<CompanySettings>(
    "generalSettings",
    settingsService.getGeneralSettings
  );

  const [form, setForm] = useState<CompanySettings>({
    id_display: "full_name",
    timezone: "",
    language: "",
    time_format: "24",
    date_format: "",
    currency: "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (settings) setForm(settings);
  }, [settings]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await settingsService.updateGeneralSettings(form);
      await mutate();
    } catch {
      // пока эндпоинта нет — просто молча
    }
    setSaving(false);
  };

  // варианты для списков
  const idDisplayOptions = [
    { value: "full_name", label: "Отображение Ф.И.О." },
    { value: "first_last", label: "Камрон Исламов" },
    { value: "initials", label: "К.И." },
  ];
  const timezoneOptions = [
    "(UTC +02:00) Europe/Berlin",
    "(UTC +03:00) Europe/Moscow",
    "(UTC +05:00) Asia/Tashkent",
  ];
  const languageOptions = ["Русский", "English"];
  const timeFormatOptions = ["12", "24"];
  const dateFormatOptions = ["DD.MM.YYYY", "MM/DD/YYYY", "YYYY-MM-DD"];
  const currencyOptions = ["UZS (сум)", "USD ($)", "EUR (€)"];

  return (
    <ProtectedRoute>
      <Layout>
        {/* Заголовок страницы с именем компании */}
        <PageHeadline
          title={companyLoading ? "Загрузка..." : company?.name || "—"}
          subtitle={company?.description}
          btn={false}
        />

        {/* Белый бокс */}
        <div className="tables board p-6 space-y-6">
          {/* «пустой» TableHeadline для бордюра */}
          <TableHeadline title="" icon={<></>} btn={false} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Отображение ФИО */}
            <div>
              <p className="uppercase text-sm text-gray-400 mb-1">
                Отображение Ф.И.О.
              </p>
              <Listbox
                value={form.id_display}
                onChange={(v) =>
                  setForm((f) => ({ ...f, id_display: v }))
                }
              >
                <div className="relative">
                  <Listbox.Button className="input w-full flex justify-between items-center">
                    {
                      idDisplayOptions.find(
                        (o) => o.value === form.id_display
                      )!.label
                    }
                    <ArrowDownIcon className="w-5 h-5 text-gray-500" />
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border rounded-lg shadow max-h-60 overflow-auto">
                      {idDisplayOptions.map((opt) => (
                        <Listbox.Option
                          key={opt.value}
                          value={opt.value}
                          className={({ active }) =>
                            `cursor-pointer px-4 py-2 flex justify-between ${
                              active ? "bg-gray-100" : ""
                            }`
                          }
                        >
                          {opt.label}
                          {form.id_display === opt.value && (
                            <Check className="w-4 h-4 text-blue-600" />
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>

            {/* Часовой пояс */}
            <div>
              <p className="uppercase text-sm text-gray-400 mb-1">
                Часовой пояс
              </p>
              <Listbox
                value={form.timezone}
                onChange={(v) =>
                  setForm((f) => ({ ...f, timezone: v }))
                }
              >
                <div className="relative">
                  <Listbox.Button className="input w-full flex justify-between items-center">
                    {form.timezone || "Выберите…"}
                    <ArrowDownIcon className="w-5 h-5 text-gray-500" />
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border rounded-lg shadow max-h-60 overflow-auto">
                      {timezoneOptions.map((tz) => (
                        <Listbox.Option
                          key={tz}
                          value={tz}
                          className={({ active }) =>
                            `cursor-pointer px-4 py-2 flex justify-between ${
                              active ? "bg-gray-100" : ""
                            }`
                          }
                        >
                          {tz}
                          {form.timezone === tz && (
                            <Check className="w-4 h-4 text-blue-600" />
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>

            {/* Язык */}
            <div>
              <p className="uppercase text-sm text-gray-400 mb-1">Язык</p>
              <Listbox
                value={form.language}
                onChange={(v) =>
                  setForm((f) => ({ ...f, language: v }))
                }
              >
                <div className="relative">
                  <Listbox.Button className="input w-full flex justify-between items-center">
                    {form.language || "Выберите…"}
                    <ArrowDownIcon className="w-5 h-5 text-gray-500" />
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border rounded-lg shadow max-h-60 overflow-auto">
                      {languageOptions.map((lang) => (
                        <Listbox.Option
                          key={lang}
                          value={lang}
                          className={({ active }) =>
                            `cursor-pointer px-4 py-2 flex justify-between ${
                              active ? "bg-gray-100" : ""
                            }`
                          }
                        >
                          {lang}
                          {form.language === lang && (
                            <Check className="w-4 h-4 text-blue-600" />
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>

            {/* Формат времени */}
            <div>
              <p className="uppercase text-sm text-gray-400 mb-1">
                Формат времени
              </p>
              <Listbox
                value={form.time_format}
                onChange={(v) =>
                  setForm((f) => ({ ...f, time_format: v }))
                }
              >
                <div className="relative">
                  <Listbox.Button className="input w-full flex justify-between items-center">
                    {form.time_format === "24" ? "24 часа" : "12 часов"}
                    <ArrowDownIcon className="w-5 h-5 text-gray-500" />
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border rounded-lg shadow max-h-60 overflow-auto">
                      {timeFormatOptions.map((tf) => (
                        <Listbox.Option
                          key={tf}
                          value={tf}
                          className={({ active }) =>
                            `cursor-pointer px-4 py-2 flex justify-between ${
                              active ? "bg-gray-100" : ""
                            }`
                          }
                        >
                          {tf === "24" ? "24 часа" : "12 часов"}
                          {form.time_format === tf && (
                            <Check className="w-4 h-4 text-blue-600" />
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>

            {/* Формат даты */}
            <div>
              <p className="uppercase text-sm text-gray-400 mb-1">
                Формат даты
              </p>
              <Listbox
                value={form.date_format}
                onChange={(v) =>
                  setForm((f) => ({ ...f, date_format: v }))
                }
              >
                <div className="relative">
                  <Listbox.Button className="input w-full flex justify-between items-center">
                    {form.date_format || "Выберите…"}
                    <ArrowDownIcon className="w-5 h-5 text-gray-500" />
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border rounded-lg shadow max-h-60 overflow-auto">
                      {dateFormatOptions.map((df) => (
                        <Listbox.Option
                          key={df}
                          value={df}
                          className={({ active }) =>
                            `cursor-pointer px-4 py-2 flex justify-between ${
                              active ? "bg-gray-100" : ""
                            }`
                          }
                        >
                          {df}
                          {form.date_format === df && (
                            <Check className="w-4 h-4 text-blue-600" />
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>

            {/* Валюта */}
            <div>
              <p className="uppercase text-sm text-gray-400 mb-1">Валюта</p>
              <Listbox
                value={form.currency}
                onChange={(v) =>
                  setForm((f) => ({ ...f, currency: v }))
                }
              >
                <div className="relative">
                  <Listbox.Button className="input w-full flex justify-between items-center">
                    {form.currency || "Выберите…"}
                    <ArrowDownIcon className="w-5 h-5 text-gray-500" />
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border rounded-lg shadow max-h-60 overflow-auto">
                      {currencyOptions.map((c) => (
                        <Listbox.Option
                          key={c}
                          value={c}
                          className={({ active }) =>
                            `cursor-pointer px-4 py-2 flex justify-between ${
                              active ? "bg-gray-100" : ""
                            }`
                          }
                        >
                          {c}
                          {form.currency === c && (
                            <Check className="w-4 h-4 text-blue-600" />
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>
          </div>

          {/* Сохранить */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold"
            >
              ✓ Сохранить изменения
            </button>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
