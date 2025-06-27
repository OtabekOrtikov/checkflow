import React from "react";
import { Navbar } from "@/components/Navbar";

export default function OrganizationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start">
      {/* Сайдбар */}
      <Navbar />

      {/* Основной контент */}
      <main className="flex-1 min-h-screen">{children}</main>
    </div>
  );
}
