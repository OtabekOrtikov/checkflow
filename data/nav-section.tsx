import { NavSection } from "@/types/navbar.t";
import HomeIcon from "@/assets/icons/HomeIcon.svg";
import EmploeesIcon from "@/assets/icons/UsersIcon.svg";
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
        icon: <EmploeesIcon className="text-current" />,
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
        title: "Организация",
        href: "/organization/departments",
        icon: <OrganizationIcon className="fill-current" />,
      },
      {
        title: "Настройки",
        href: "/settings",
        icon: <SettingsIcon className="fill-current" />,
      },
    ],
  },
];