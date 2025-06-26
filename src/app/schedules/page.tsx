"use client";

import { Navbar } from "@/components/Navbar";
import { PageHeadline } from "@/components/PageHeadline";
import { SearchInput } from "@/components/SearchInput";
import PlusInCircle from "@/assets/icons/plusInCircle.svg";
import Link from "next/link";
import PrintIcon from "@/assets/icons/printIcon.svg";

export default function SchedulesPage() {
  return (
    <div className="flex items-start">
      <Navbar />

      <main className="flex-1 2xl:py-[45px] 2xl:px-[50px] lg:py-[30px] lg:px-[35px] flex flex-col gap-y-[20px]">
        <PageHeadline title="Рабочие графики">
          <div className="flex items-center gap-x-[10px] ml-auto">
            <div className="relative flex-1 h-[60px] min-w-[210px] ">
              <SearchInput
                id="search-workGraphs"
                placeholder="Поиск"
                className="w-full h-full 2xl:min-h-[60px] min-w-[210px] rounded-[15px] border border-(--black-10) bg-(--white)"
              />
            </div>
            <Link
              href="/employees/add-employee/"
              className={`flex w-fit items-center gap-x-[10px] 
                bg-(--primary) text-(--white) 2xl:text-[24px] text-[20px] font-medium
                p-[10px] rounded-[50px]
                cursor-pointer`}
            >
              <PlusInCircle />
              <span>Добавить</span>
            </Link>
            <button
              className={`flex w-fit items-center gap-x-[10px] 
                text-(--primary) bg-(--white) border border-(--gray-e6) 2xl:text-[24px] text-[20px] font-medium
                p-[10px] rounded-[50px]
                cursor-pointer`}
            >
              <PrintIcon />
            </button>
          </div>
        </PageHeadline>
      </main>
    </div>
  );
}
