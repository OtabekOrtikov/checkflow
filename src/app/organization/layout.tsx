import React from "react";
import { Navbar } from "@/components/Navbar";

export default function OrganizationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-strech">
      {/* Сайдбар */}
      <Navbar />

      {/* Основной контент */}
      {children}
    </div>
  );
}
