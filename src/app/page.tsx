import { MainHeadline } from "@/components/MainHeadline";
import { Navbar } from "@/components/Navbar";
import { VisitStatistics } from "@/layouts/VisitStatistics";
import { Devices } from "@/layouts/Devices";
import { TodayReview } from "@/layouts/TodayReview";
import { TopDisciplined } from "@/layouts/TopDisciplined";
import XeondLogo from "@/assets/images/xeond.svg";

export default function Home() {
  return (
    <div className="flex justify-flex-start">
      <Navbar />
      <main className="2xl:py-[45px] 2xl:px-[50px] lg:py-[30px] lg:px-[35px] w-full h-fit flex flex-col gap-y-[20px]">
        <MainHeadline />

        <TodayReview />

        <div className="flex justify-between gap-x-[20px] items-stretch">
          <div className="flex-1 flex flex-col">
            <TopDisciplined />
          </div>
          <div className="flex-1 flex flex-col">
            <Devices />
          </div>
        </div>

        <VisitStatistics />

        <footer className="flex justify-between border border-(--gray-e6) items-center w-full h-fit bg-(--white) rounded-full px-[50px] py-[30px]">
          <div className="">
            <XeondLogo />
          </div>
          <ul className="flex justify-center items-center gap-x-[50px] text-(--foreground) text-[16px] xl:text-[24px] font-medium *:opacity-50 *:hover:opacity-100 *:transition">
            <li>О нас</li>
            <li>Помощь</li>
            <li>Поиск</li>
          </ul>
        </footer>
      </main>
    </div>
  );
}
