import { MainHeadline } from "@/app/components/MainHeadline";
import { Navbar } from "@/components/Navbar";
import { VisitStatistics } from "@/layouts/VisitStatistics";
import { Devices } from "@/layouts/Devices";
import { TodayReview } from "@/layouts/TodayReview";
import { TopDisciplined } from "@/layouts/TopDisciplined";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex justify-start">
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

        <Footer />
      </main>
    </div>
  );
}
