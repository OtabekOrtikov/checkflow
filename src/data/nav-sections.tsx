import { NavSection } from "@/types/navbar.t";
import HomeIcon from "@/assets/icons/HomeIcon.svg";
import EmploeesIcon from "@/assets/icons/EmployeesIcon.svg";
import WorkGraphIcon from "@/assets/icons/WorkGraphIcon.svg";
import ReportsIcon from "@/assets/icons/ReportsIcon.svg";
import OtgulIcon from "@/assets/icons/OtgulIcon.svg";
import OrganizationIcon from "@/assets/icons/OrganizationIcon.svg";
import SettingsIcon from "@/assets/icons/SettingsIcon.svg";

export const navSections: NavSection[] = [
  {
    title: "Навигация",
    items: [
      {
        title: "Главная",
        href: "/",
        icon: <HomeIcon className="fill-current" />,
      },
      {
        title: "Сотрудники",
        href: "/employees",
        icon: <EmploeesIcon className="fill-current" />,
      },
      {
        title: "Рабочие графики",
        href: "/schedules",
        icon: <WorkGraphIcon className="fill-current" />,
      },
      {
        title: "Отчёты",
        href: "/reports",
        icon: <ReportsIcon className="fill-current" />,
      },
    ],
  },
  {
    title: "Компания",
    items: [
      {
        title: "Отгулы",
        href: "/time-off",
        icon: <OtgulIcon className="fill-current" />,
        items: [
          { title: "В ожидании", href: "/time-off/pending" },
          { title: "Принятые", href: "/time-off/approved" },
          { title: "Непринятые", href: "/time-off/rejected" },
          { title: "Удалённые", href: "/time-off/deleted" },
        ],
      },
      {
        title: "Организация",
        href: "/organization",
        icon: <OrganizationIcon className="fill-current" />,
        items: [
          { title: "Отделы", href: "/organization/departments" },
          { title: "Должности", href: "/organization/positions" },
          { title: "Локации компании", href: "/organization/locations" },
          { title: "Шаблон дня", href: "/organization/day-template" },
          { title: "Устройства", href: "/organization/devices" },
          { title: "Календари", href: "/organization/calendars" },
        ],
      },
      {
        title: "Настройки",
        href: "/settings",
        icon: <SettingsIcon className="fill-current" />,
        items: [
          { title: "Общие настройки", href: "/settings/general" },
          { title: "Роли и права доступа", href: "/settings/roles" },
          { title: "Типы отгулов", href: "/settings/time-off-types" },
          { title: "Типы увольнений", href: "/settings/termination-types" },
          {
            title: "Активность пользователей",
            href: "/settings/user-activity",
          },
          { title: "Праздники", href: "/settings/holidays" },
          { title: "Правила зарплаты", href: "/settings/payroll-rules" },
          { title: "Штрафы", href: "/settings/penalties" },
          {
            title: "Удержания и доплаты",
            href: "/settings/deductions-and-additions",
          },
        ],
      },
    ],
  },
];

export const profileTabs = [
  { title: "Обзор", href: "/profile" },
  { title: "Работа", href: "/profile/work" },
  { title: "Зарплата", href: "/profile/salary" },
  { title: "Удержание или доплата", href: "/profile/deductions" },
  { title: "Рабочий график", href: "/profile/schedule" },
  { title: "Локации", href: "/profile/locations" },
  { title: "Отгулы", href: "/profile/time-off" },
  { title: "Идентификация", href: "/profile/identification" },
  { title: "Документы", href: "/profile/documents" },
  { title: "Заметки", href: "/profile/notes" },
];
