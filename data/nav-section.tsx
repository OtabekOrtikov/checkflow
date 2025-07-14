import { NavSection } from "@/types/navbar.t";
import HomeIcon from "@/assets/icons/HomeIcon.svg";
import EmploeesIcon from "@/assets/icons/user-bounded.svg";
import WorkGraphIcon from "@/assets/icons/WorkTimeIcon.svg";
import ReportsIcon from "@/assets/icons/ReportsIcon.svg";
import OrganizationIcon from "@/assets/icons/OrgIcon.svg";
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
        items: [
          { title: "Сотрудники", href: "/reports/employee" },
          { title: "Посещаемость", href: "/reports/attendance" },
          { title: "Зарплата", href: "/reports/salary" },
          { title: "Пол" , href: "/reports/gender"},
          { title: "Отделы", href: "/reports/department" },
        ],
      },
    ],
  },
  {
    title: "Компания",
    items: [
      {
        title: "Организация",
        href: "/organization/departments",
        icon: <OrganizationIcon className="fill-current" />,
        items: [
          { title: "Отделы", href: "/organization/departments" },
          { title: "Локации компании", href: "/organization/locations" },
          { title: "Устройства", href: "/organization/devices" },
        ],
      },
      {
        title: "Настройки",
        href: "/settings/general",
        icon: <SettingsIcon className="fill-current" />,
        items: [
          { title: "Общие настройки", href: "/settings/general" },
          // { title: "Роли и права доступа", href: "/settings/roles" },
          // { title: "Типы отгулов", href: "/settings/time-off-types" },
          { title: "Типы увольнений", href: "/settings/termination-types" },
          {
            title: "Активность пользователей",
            href: "/settings/user-activity",
          },
          // { title: "Праздники", href: "/settings/holidays" },
          // { title: "Правила зарплаты", href: "/settings/payroll-rules" },
          { title: "Штрафы", href: "/settings/penalties" },
          // {
          //   title: "Удержания и доплаты",
          //   href: "/settings/deductions-and-additions",
          // },
          // {
          //   title: "Настройки API",
          //   href: "/settings/api",
          // },
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