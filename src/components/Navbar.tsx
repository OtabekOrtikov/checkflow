"use client";

import Link from "next/link";
import { SearchInput } from "./SearchInput";
import { usePathname } from "next/navigation";
import { navSections, profileTabs } from "@/data/nav-sections";
import { useEffect, useState } from "react";
import { ProfileInfo } from "@/types/profile.t";
import { fetchProfileInfo } from "@/services/profileService";
import { BackToHome } from "@/components/BackToHome";
import { TopHeader } from "@/components/TopHeader";
import { ProfileCard } from "@/components/ProfileCard";
import { formatShortName } from "@/utils/formatName";

export const Navbar = () => {
  const pathname = usePathname();
  const [user, setUser] = useState<ProfileInfo | null>(null);

  useEffect(() => {
    fetchProfileInfo()
      .then((res) => setUser(res.data))
      .catch(() => {});
  }, []);

  if (pathname.startsWith("/profile") && user) {
    return (
      <aside
        className="max-w-[400px] min-w-[350px] 
    w-full bg-white max-h-[calc(100vh-45px)] min-h-[calc(100vh-45px)] h-full
    flex flex-col gap-y-[25px] m-[20px] 
    p-[25px] rounded-[20px] mb-0"
      >
        <TopHeader />

        <SearchInput placeholder="Поиск" isSlashVisible id="search-navbar" />

        <BackToHome />

        <p className="text-black text-[16px] mb-[5px]">Профиль</p>

        <div className="flex flex-col gap-y-[5px] w-full overflow-y-scroll">
          {/* карточка профиля */}
          <div className="flex items-center px-[10px] min-h-[80px] bg-(--background) rounded-[20px] gap-x-[10px]">
            <img
              src={user.avatarUrl}
              alt={user.fullName}
              className="w-[60px] aspect-square rounded-full"
            />
            <div>
              <p className="font-semibold text-(--foreground) font-[Bounded] text-2xl w-full">
                {formatShortName(user.fullName)}
              </p>
              <p className="text-sm text-(--foreground-50)">{user.role}</p>
            </div>
          </div>

          {/* табы профиля */}
          <nav className="flex items-start flex-col justify-start ml-auto w-[90%] gap-[5px] overflow-y-auto">
            {profileTabs.map((tab) => {
              const isActive = pathname === tab.href;
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={`flex items-center rounded-[15px] justify-start gap-x-[10px] text-[20px] font-semibold px-[20px] min-h-[60px] w-full border-1 border-transparent hover:border-(--black-10) hover:text-(--foreground) transition-all ${
                    isActive ? "bg-(--background)" : "text-(--grey-80)"
                  }`}
                >
                  <p>{tab.title}</p>
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    );
  }

  const parentItems = navSections
    .flatMap((sec) => sec.items)
    .filter((i) => Array.isArray(i.items));

  // Ищем тот пункт, в котором либо совпадает сам href, либо совпадает любой из его саб-путей
  const activeParent = parentItems.find((i) => {
    // если точное совпадение /organization
    if (pathname === i.href) return true;
    // если мы на одном из sub-routes: /organization/…
    if (i.items!.some((sub) => pathname === sub.href)) return true;
    // либо просто startsWith для вложенных страниц
    return pathname.startsWith(i.href + "/");
  });

  if (activeParent) {
    const parentSection = navSections.find((sec) =>
      sec.items.includes(activeParent)
    )!;

    return (
      <aside
        className="max-w-[400px] min-w-[350px] 
    w-full bg-white max-h-[calc(100vh-45px)] min-h-[calc(100vh-45px)] h-full
    flex flex-col gap-y-[25px] m-[20px] 
    p-[25px] rounded-[20px] mb-0"
      >
        <TopHeader />

        <SearchInput placeholder="Поиск" isSlashVisible id="search-navbar" />

        <BackToHome />

        <nav className="flex items-start flex-col justify-start flex-1 gap-y-[5px] max-h-[540px] overflow-y-auto">
          <p className="text-black text-[16px] mb-[5px]">
            {parentSection.title}
          </p>

          <Link
            href={activeParent.href}
            className={`flex items-center rounded-[15px] 
                        justify-start gap-x-[10px] text-[20px] 
                        font-semibold text-(--primary) px-[20px] 
                        min-h-[60px] bg-(--background) w-full border-1 border-primary 
                        transition-all`}
          >
            {activeParent.icon}
            <p>{activeParent.title}</p>
          </Link>

          <ul className="space-y-2 flex max-w-[calc(100%-35px)] w-full flex-col ml-auto">
            {activeParent.items!.map((sub) => {
              const isActive = pathname === sub.href;

              return (
                <li key={sub.href} className="w-full">
                  <Link
                    href={sub.href}
                    className={`flex items-center rounded-[15px] 
                        justify-start gap-x-[10px] text-[20px] 
                        font-semibold text-(--black-50) px-[20px] 
                        min-h-[60px] w-full border-1 border-transparent 
                        hover:border-(--black-10) hover:text-(--foreground) transition-all ${
                          isActive
                            ? "text-(--foreground) bg-(--background) hover:border-transparent"
                            : ""
                        }`}
                  >
                    <p>{sub.title}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        {user && <ProfileCard {...user} />}
      </aside>
    );
  }

  return (
    <aside
      className="max-w-[400px] min-w-[350px] 
    w-full bg-white min-h-[calc(100vh-45px)] max-h-[calc(100vh-45px)] h-full
    flex flex-col gap-y-[25px] m-[20px] 
    p-[25px] rounded-[20px] mb-0"
    >
      <TopHeader />

      <SearchInput placeholder="Поиск" isSlashVisible id="search-navbar" />

      <nav className="flex items-start flex-col justify-start flex-1 gap-y-[25px] max-h-[540px] overflow-y-auto">
        {navSections.map(({ title, items }) => (
          <div
            key={title}
            className="flex items-start flex-col justify-start gap-y-[10px] w-full"
          >
            <p className="text-black text-[16px] font-medium">{title}</p>

            <ul className="space-y-1 w-full">
              {items.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center rounded-[15px] 
                        justify-start gap-x-[10px] text-[20px] 
                        font-semibold text-(--grey-80) px-[20px] 
                        min-h-[60px] w-full border-1 border-transparent 
                        hover:border-(--black-10) hover:text-(--foreground) transition-all ${
                          isActive
                            ? `text-(--primary) bg-(--background) 
                            hover:border-transparent 
                            hover:text-(--primary) hover:bg-(--background)`
                            : ""
                        }`}
                    >
                      <p>{item.icon}</p>
                      <p>{item.title}</p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {user && <ProfileCard {...user} />}
    </aside>
  );
};
