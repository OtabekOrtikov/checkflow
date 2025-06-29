"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { PageHeadline } from "@/components/PageHeadline";
import {
  fetchGeneralSettings,
  updateGeneralSettings,
} from "@/services/settingsService";
import {
  TIME_ZONES,
  LANGUAGES,
  TIME_FORMATS,
  DATE_FORMATS,
  CURRENCIES,
} from "@/data/settings";
import { Listbox } from "@headlessui/react";
import ArrowDown from "@/assets/icons/arrow-down.svg";
import CheckIcon from "@/assets/icons/checkIcon.svg";
import { GeneralSettings } from "@/types/settings.t";
import { TableHeadline } from "@/components/TableHeadline";

export default function GeneralSettingsPage() {
  const [form, setForm] = useState<GeneralSettings>({
    displayName: "",
    timeZone: "",
    language: "",
    timeFormat: "",
    dateFormat: "",
    currency: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchGeneralSettings()
      .then((res) => setForm(res.data))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = <K extends keyof GeneralSettings>(
    key: K,
    value: GeneralSettings[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    await updateGeneralSettings(form);
    setSaving(false);
  };

  if (loading) return <div className="p-4">Загрузка…</div>;

  const handleClickAdd = () => {
    // Здесь можно реализовать логику добавления новой настройки
    console.log("Добавление новой настройки");
  };

  return (
    <div className="flex items-start">
      <Navbar />
      <main className="flex-1 p-8 flex flex-col gap-6 min-h-screen">
        <PageHeadline title="Общие настройки" />

        <div className="bg-white rounded-[20px] p-[20px] flex flex-col gap-[10px] border border-(--gray-e6)">
          <TableHeadline
            title={"Настройки"}
            isIconVisible={false}
            isButtonVisible={false}
          />

          <div className="grid grid-cols-2 gap-6">
            {/* Отображение Ф.И.О. — текстовый input */}
            <div
              className="flex flex-col justify-between min-h-[100px] items-start p-[12px] 
            pb-[8px] bg-(--background) rounded-[10px] border border-(--gray-e6)"
            >
              <label className="text-2xl font-[Bounded] font-[466] opacity-50 text-(--foreground)">
                Отображение Ф.И.О.
              </label>
              <input
                type="text"
                value={form.displayName}
                onChange={(e) => handleChange("displayName", e.target.value)}
                className="w-full h-auto border-0 bg-transparent text-(--foreground) 
                text-2xl font-[Bounded] font-[466] outline-none border-[transparent]"
              />
            </div>

            {/* Часовой пояс */}
            <div
              className="flex flex-col justify-between min-h-[100px] items-start p-[12px] 
            pb-[8px] bg-(--background) rounded-[10px] border border-(--gray-e6)"
            >
              <label className="flex-1 text-2xl font-[Bounded] font-[466] opacity-50 text-(--foreground)">
                Часовой пояс
              </label>
              <Listbox
                value={form.timeZone}
                onChange={(v) => handleChange("timeZone", v)}
              >
                <div
                  className="relative w-full flex-1 mt-auto text-left h-auto border-0 bg-transparent text-(--foreground) 
                text-2xl font-[Bounded] font-[466] outline-none border-[transparent]"
                >
                  <Listbox.Button className="w-full text-left outline-none h-full">
                    {form.timeZone}
                    <ArrowDown className="absolute right-3 top-1/2 -translate-y-1/2" />
                  </Listbox.Button>
                  <Listbox.Options className="absolute z-10 mt-2 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-auto">
                    {TIME_ZONES.map((tz) => (
                      <Listbox.Option
                        key={tz}
                        value={tz}
                        className="cursor-pointer px-3 py-2 hover:bg-(--primary) hover:text-white"
                      >
                        {tz}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>
            </div>

            {/* Язык */}
            <div
              className="flex flex-col justify-between min-h-[100px] items-start p-[12px] 
            pb-[8px] bg-(--background) rounded-[10px] border border-(--gray-e6)"
            >
              <label className="flex-1 text-2xl font-[Bounded] font-[466] opacity-50 text-(--foreground)">
                Язык
              </label>
              <Listbox
                value={form.language}
                onChange={(v) => handleChange("language", v)}
              >
                <div
                  className="relative w-full flex-1 mt-auto text-left h-auto border-0 bg-transparent text-(--foreground) 
                text-2xl font-[Bounded] font-[466] outline-none border-[transparent]"
                >
                  <Listbox.Button className="w-full text-left outline-none h-full">
                    {form.language}
                    <ArrowDown className="absolute right-3 top-1/2 -translate-y-1/2" />
                  </Listbox.Button>
                  <Listbox.Options className="absolute z-10 mt-2 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-auto">
                    {LANGUAGES.map((lang) => (
                      <Listbox.Option
                        key={lang}
                        value={lang}
                        className="cursor-pointer px-3 py-2 hover:bg-(--primary) hover:text-white"
                      >
                        {lang}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>
            </div>

            {/* Формат времени */}
            <div
              className="flex flex-col justify-between min-h-[100px] items-start p-[12px] 
            pb-[8px] bg-(--background) rounded-[10px] border border-(--gray-e6)"
            >
              <label className="flex-1 text-2xl font-[Bounded] font-[466] opacity-50 text-(--foreground)">
                Формат времени
              </label>
              <Listbox
                value={form.timeFormat}
                onChange={(v) => handleChange("timeFormat", v)}
              >
                <div
                  className="relative w-full flex-1 mt-auto text-left h-auto border-0 bg-transparent text-(--foreground) 
                text-2xl font-[Bounded] font-[466] outline-none border-[transparent]"
                >
                  <Listbox.Button className="w-full text-left outline-none h-full">
                    {form.timeFormat}
                    <ArrowDown className="absolute right-3 top-1/2 -translate-y-1/2" />
                  </Listbox.Button>
                  <Listbox.Options className="absolute z-10 mt-2 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-auto">
                    {TIME_FORMATS.map((tf) => (
                      <Listbox.Option
                        key={tf}
                        value={tf}
                        className="cursor-pointer px-3 py-2 hover:bg-(--primary) hover:text-white"
                      >
                        {tf}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>
            </div>

            {/* Формат даты */}
            <div
              className="flex flex-col justify-between min-h-[100px] items-start p-[12px] 
            pb-[8px] bg-(--background) rounded-[10px] border border-(--gray-e6)"
            >
              <label className="flex-1 text-2xl font-[Bounded] font-[466] opacity-50 text-(--foreground)">
                Формат даты
              </label>
              <Listbox
                value={form.dateFormat}
                onChange={(v) => handleChange("dateFormat", v)}
              >
                <div
                  className="relative w-full flex-1 mt-auto text-left h-auto border-0 bg-transparent text-(--foreground) 
                text-2xl font-[Bounded] font-[466] outline-none border-[transparent]"
                >
                  <Listbox.Button className="w-full text-left outline-none h-full">
                    {form.dateFormat}
                    <ArrowDown className="absolute right-3 top-1/2 -translate-y-1/2" />
                  </Listbox.Button>
                  <Listbox.Options className="absolute z-10 mt-2 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-auto">
                    {DATE_FORMATS.map((df) => (
                      <Listbox.Option
                        key={df}
                        value={df}
                        className="cursor-pointer px-3 py-2 hover:bg-(--primary) hover:text-white"
                      >
                        {df}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>
            </div>

            {/* Валюта */}
            <div
              className="flex flex-col justify-between min-h-[100px] items-start p-[12px] 
            pb-[8px] bg-(--background) rounded-[10px] border border-(--gray-e6)"
            >
              <label className="flex-1 text-2xl font-[Bounded] font-[466] opacity-50 text-(--foreground)">
                Валюта
              </label>
              <Listbox
                value={form.currency}
                onChange={(v) => handleChange("currency", v)}
              >
                <div
                  className="relative w-full flex-1 mt-auto text-left h-auto border-0 bg-transparent text-(--foreground) 
                text-2xl font-[Bounded] font-[466] outline-none border-[transparent]"
                >
                  <Listbox.Button className="w-full text-left outline-none h-full">
                    {form.currency}
                    <ArrowDown className="absolute right-3 top-1/2 -translate-y-1/2" />
                  </Listbox.Button>
                  <Listbox.Options className="absolute z-10 mt-2 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-auto">
                    {CURRENCIES.map((cr) => (
                      <Listbox.Option
                        key={cr}
                        value={cr}
                        className="cursor-pointer px-3 py-2 hover:bg-(--primary) hover:text-white"
                      >
                        {cr}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-[10px] bg-(--primary) text-white px-6 py-3 rounded-full text-2xl font-medium"
          >
            {saving ? (
              <span>Сохранение...</span>
            ) : (
              <>
                <CheckIcon /> Сохранить изменения
              </>
            )}
          </button>
        </div>
      </main>
    </div>
  );
}
