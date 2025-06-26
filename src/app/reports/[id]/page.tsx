"use client";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { PageHeadline } from "@/components/PageHeadline";
import { fetchReports } from "@/services/reportService";
import { useState, useEffect } from "react";
import type { Report } from "@/types/report.t";

export default function ReportsPage() {
  return (
    <div className="flex items-start">
      <Navbar />

      <main
        className="flex-1 2xl:py-[45px] 2xl:px-[50px] min-h-screen 
        lg:py-[30px] lg:px-[35px] flex flex-col gap-y-[20px]"
      >
        <PageHeadline title="Отчеты" />

        

        <Footer className="mt-auto" />
      </main>
    </div>
  );
}
