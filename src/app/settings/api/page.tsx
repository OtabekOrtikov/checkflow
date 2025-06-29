// src/app/settings/api/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { PageHeadline } from "@/components/PageHeadline";
import type { ApiSettings } from "@/types/settings.t";
import CopyIcon from "@/assets/icons/copyIcon.svg";
import { fetchApiSettings } from "@/services/settingsService";
import { TableHeadline } from "@/components/TableHeadline";

export default function ApiSettingsPage() {
  const [settings, setSettings] = useState<ApiSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchApiSettings()
      .then((r) => setSettings(r.data))
      .catch(() => setError("Не удалось загрузить настройки API"))
      .finally(() => setLoading(false));
  }, []);

  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // Сбросить состояние копирования через 2 секунды
    if (isCopied) return; // Предотвращаем повторное копирование, если уже скопировано
    setIsCopied(true);
    navigator.clipboard.writeText(value).catch(() => {
      setError("Не удалось скопировать в буфер обмена");
    });
  };

  if (loading) return <div className="p-4">Загрузка…</div>;
  if (error || !settings)
    return <div className="p-4 text-red-500">{error || "Ошибка"}</div>;

  return (
    <div className="flex items-start">
      <Navbar />
      <main className="flex-1 p-[30px] flex flex-col gap-y-[20px] min-h-screen">
        <PageHeadline title="Настройки API" />

        <div className="flex flex-col gap-y-[10px] bg-(--white) p-[20px] rounded-[20px] border border-(--gray-e6)">
          <TableHeadline
            title={"API"}
            isIconVisible={false}
            isButtonVisible={false}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px]">
            {[
              { label: "Client ID", value: settings.clientId },
              { label: "Client Secret", value: settings.clientSecret },
            ].map(({ label, value }) => (
              <div
                key={value}
                className="relative bg-(--background) p-[12px] pb-[8px] rounded-[10px] h-[105px] flex items-start flex-col justify-between"
              >
                <div className="w-full text-2xl font-[Bounded] font-[466] text-(--foreground) flex items-center justify-between">
                  <span>{label}</span>
                  <button
                    onClick={() => copyToClipboard(value)}
                    className="text-(--primary)"
                    title="Скопировать"
                  >
                    {isCopied ? (
                      "Скопировано!"
                    ) : (
                      <CopyIcon className="w-6 h-6" />
                    )}
                  </button>
                </div>
                <div className="text-[16px] font-[Bounded] opacity-50 text-(--foreground)">
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-sm text-[var(--foreground)]">
          Дополнительную информацию по работе с нашим API можно узнать здесь:{" "}
          <a
            href="https://dev.xeond.uz/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--primary)] hover:underline"
          >
            dev.xeond.uz
          </a>
        </p>
      </main>
    </div>
  );
}
