// src/app/profile/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import {
  fetchProfileInfo,
  fetchTimeWorked,
  fetchDepartments,
  fetchPositions,
} from "@/services/profileService";
import type {
  ProfileInfo,
  TimeWorkedRecord,
  DepartmentAssignment,
  PositionAssignment,
} from "@/types/profile.t";
import { formatDate } from "@/utils/formatTime";
import { TimeWorkedChart } from "@/components/profile/TimeWorkedChart";
import PencilIcon from "@/assets/icons/pencilIcon.svg";
import { TableHeadline } from "@/components/TableHeadline";
import { Footer } from "@/components/Footer";

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileInfo | null>(null);
  const [timeRecords, setTimeRecords] = useState<TimeWorkedRecord[]>([]);
  const [departments, setDepartments] = useState<DepartmentAssignment[]>([]);
  const [positions, setPositions] = useState<PositionAssignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetchProfileInfo(),
      fetchTimeWorked(),
      fetchDepartments(),
      fetchPositions(),
    ])
      .then(([p, t, d, pos]) => {
        setProfile(p.data);
        setTimeRecords(t.data);
        setDepartments(d.data);
        setPositions(pos.data);
      })
      .catch(() => setError("Ошибка при загрузке данных профиля"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-4">Загрузка…</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!profile) return null;

  const cardData = [
    { label: "Дата начала работы", value: formatDate(profile.startDate) },
    { label: "E-mail", value: profile.email },
    [
      {
        label: "Пин-код",
        value: profile.pinCode || "Не установлен",
      },
      { label: "Таб №", value: profile.tabNumber || "Не установлен" },
    ],
    [
      {
        label: "Телефон",
        value: profile.phone || "Не установлен",
      },
      {
        label: "Домашний телефон",
        value: profile.homePhone || "Не установлен",
      },
    ],
    { label: "Отдел", value: profile.position || "Не указан" },
    { label: "Домашний адрес", value: profile.address || "Не указан" },
    { label: "Рабочий график", value: "Смена ОП" },
    { label: "Лицевой счёт", value: profile.ledgerAccount || "Не указан" },
    { label: "Дата рождения", value: formatDate(profile.birthDate) },
    { label: "Телеграм-бот", value: profile.telegramBotCode || "Не указан" },
  ];

  // Функция для переключения режима редактирования
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="flex items-start">
      <Navbar />
      <main className="flex-1 p-[30px] flex flex-col gap-y-[20px] min-h-screen">
        <div className="flex items-center justify-between w-full">
          <h2 className="flex items-center gap-x-[10px]">
            <span>
              <img
                className="w-[60px] rounded-full bg-(--white) border border-(--gray-e6)"
                src={profile.avatarUrl}
                alt="Profile Avatar"
              />
            </span>
            <span className="2xl:text-5xl lg:text-3xl text-(--foreground) font-[Bounded] font-[566]">
              {profile.fullName}
            </span>
          </h2>
          <div className="flex items-center gap-[10px]">
            <button
              type="button"
              onClick={toggleEdit}
              className="flex items-center gap-[10px] border border-(--gray-e6) 
              text-2xl font-medium text-(--foreground) py-3 px-5 rounded-full hover:border-(--foreground) transition"
            >
              <PencilIcon /> {isEditing ? "Сохранить" : "Редактировать профиль"}
            </button>
            <button
              type="button"
              className="flex items-center gap-[10px] border text-2xl 
              font-medium text-(--white) py-3 px-5 rounded-full bg-(--primary) transition"
            >
              {profile.role}
            </button>
          </div>
        </div>

        <div
          className="flex flex-col p-[20px] bg-(--white) rounded-[20px] border border-(--gray-e6)
        gap-[10px]"
        >
          <TableHeadline
            title={"Информация о сотруднике"}
            isIconVisible={false}
            isButtonVisible={false}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px]">
            {cardData.map((item, index) => {
              if (Array.isArray(item)) {
                return (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row gap-[10px] md:gap-[20px]"
                  >
                    {item.map((subItem, subIndex) => (
                      <div
                        key={subIndex}
                        className="flex-1 bg-transparent p-[12px] rounded-[10px] min-h-[80px] flex items-start flex-col gap-4 justify-between pb-[8px] border border-(--gray-e6)"
                      >
                        <div className="text-2xl font-[Bounded] font-[466] text-(--foreground) opacity-50">
                          {subItem.label}
                        </div>
                        <div className="text-2xl font-[Bounded] text-(--foreground) font-[466]">
                          {subItem.value}
                        </div>
                      </div>
                    ))}
                  </div>
                );
              }
              return (
                <div
                  key={index}
                  className="bg-transparent p-[12px] rounded-[10px] min-h-[80px] flex items-start gap-4 flex-col justify-between pb-[8px] border border-(--gray-e6)"
                >
                  <div className="text-xl font-[Bounded] font-[466] text-(--foreground) opacity-50 text-nowrap">
                    {item.label}
                  </div>
                  <input
                    type="text"
                    className="text-2xl font-[Bounded] text-(--foreground) font-[466] outline-none"
                    value={item.value}
                    disabled={!isEditing}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* График отработанного времени */}
        <TimeWorkedChart data={timeRecords} />

        {/* История переводов/назначений */}
        <Footer />
      </main>
    </div>
  );
}
