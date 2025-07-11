"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Logo from "@/assets/images/logo.svg";
import Home from "@/assets/icons/HomeIcon.svg";
import Users from "@/assets/icons/UsersIcon.svg";
import BarChart3 from "@/assets/icons/WorkTimeIcon.svg";
import FileText from "@/assets/icons/ReportsIcon.svg";
import Building2 from "@/assets/icons/OrgIcon.svg";
import Settings from "@/assets/icons/SettingsIcon.svg";

import profileAvatar from "@/public/assets/user.jpg";

import Link from "next/link";
import SearchIcon from "@/assets/icons/searchIcon.svg";
import { Menu, X } from "lucide-react";
import { navSections } from "@/data/nav-section";
import { usePathname } from "next/navigation";
import Image from "next/image";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen lg:flex block gap-x-[50px]">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 bg-white transform 
          transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-[120%]"
          }
          max-w-[400px] min-w-[350px] w-full max-h-[calc(100vh-45px)] min-h-[600px] h-lg:min-h-[calc(100vh-45px)] h-full
          flex flex-col gap-y-[25px] m-[20px] p-[25px] rounded-[20px] mb-0 mr-0
          `}
      >
        <div className="flex items-center justify-between gap-x-4">
          <div className="flex items-center space-x-3">
            <h1 className="text-xl font-bold">
              <Link href={"/"} className="text-blue-600 font-bold">
                <Logo className="w-fit" />
              </Link>
            </h1>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-full border-1 border-[#E6E6E6] w-[60px] h-[60px] lg:hidden flex items-center justify-center cursor-pointer transition-colors bg-[#F3F5F7]"
          >
            <X size={24} />
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full 2xl:min-h-[60px] h-fit">
          <label
            htmlFor="nav-search"
            className="absolute top-[50%] translate-y-[-50%] left-[20px]"
          >
            <SearchIcon className="w-[24px] h-[24px] opacity-50" />
          </label>

          <input
            type="search"
            name="search"
            id="nav-search"
            placeholder="Поиск..."
            className={`w-full outline-0 pl-[54px] font-semibold min-h-[60px] h-fit p-[10px] 
              rounded-[15px] border-[1px] border-[var(--black-10)]`}
            autoComplete="off"
          />

          <div
            className="absolute right-[10px] top-[50%] translate-y-[-50%] 
          aspect-square w-[40px] bg-[var(--black-05)] rounded-[10px] 
          flex items-center justify-center"
          >
            <p className="text-[var(--black-50)] font-medium">/</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex items-start flex-col justify-start flex-1 gap-y-[25px] max-h-[540px] overflow-y-auto">
          {navSections.map(({ title, items }) => (
            <div key={title} className="flex items-start flex-col justify-start gap-y-[10px] w-full">
              <h3 className="text-black text-[16px] font-medium">{title}</h3>
              <ul className="space-y-1 w-full">
                {items.map((item) => {
                  const isActive = pathname === item.href;

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`flex items-center rounded-[15px] 
                        justify-start gap-x-[10px] text-[20px] 
                        font-semibold text-[var(--grey-80)] px-[20px] 
                        min-h-[60px] w-full border border-transparent 
                        hover:border-[var(--black-10)] hover:text-[var(--foreground)] transition-all 
                        ${
                          isActive
                            ? `text-[var(--primary)] bg-[var(--background)]
                            hover:border-transparent 
                            hover:text-[var(--primary)] hover:bg-[var(--background)]`
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

        {/* User Profile */}
        <div className="mt-auto">
          <Link
            href="/profile"
            className={`flex items-center 
            rounded-[50px] justify-start 
            gap-x-[10px] text-[20px] font-semibold 
            p-[10px] min-h-[60px] w-full 
            bg-[var(--background)]
            `}
          >
            <Image
              src={profileAvatar}
              alt="Профиль"
              className="w-[60px] aspect-square rounded-full"
            />
            <div>
              <p className="font-[Bounded] text-[24px] font-[566]">
                {"Исламов Камрон"
                  .split(" ")
                  .map((w, i) => (i === 0 ? w[0] + "." : w))
                  .join(" ")}
              </p>
              <p className="text-[15px] opacity-[0.5] font-normal">
                {"Администратор"}
              </p>
            </div>
          </Link>
        </div>
      </div>

      <header className="lg:hidden">
        <div className="flex items-center justify-between w-full p-6 bg-white">
          <h1 className="text-xl font-bold">
            <Link href={"/"} className="text-blue-600 font-bold">
              <Logo className="w-fit" />
            </Link>
          </h1>
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-full border-1 border-[#E6E6E6] w-[60px] h-[60px] flex items-center justify-center cursor-pointer transition-colors bg-[#F3F5F7]"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>
      <main className="md:py-6 w-full md:pr-[50px] max-w-screen overflow-x-auto lg:pl-0 md:pl-[50px] p-4 flex flex-col gap-y-5">
        {children}
      </main>
    </div>
  );
};

export default Layout;
