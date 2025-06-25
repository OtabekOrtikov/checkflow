import { MainHeadline } from "@/components/MainHeadline";
import { Navbar } from "@/components/Navbar";
import { TodayReview } from "@/layouts/TodayReview";
import { TopDisciplined } from "@/layouts/TopDisciplined";

export default function Home() {
  return (
    <div className="flex justify-flex-start">
      <Navbar />
      <main className="2xl:py-[45px] 2xl:px-[50px] lg:py-[30px] lg:px-[35px] w-full h-fit flex flex-col gap-y-[20px]">
        <MainHeadline />

        <TodayReview />

        <div className="flex justify-between items-start gap-x-[20px]">
          <TopDisciplined />
          <TopDisciplined />
        </div>
      </main>
    </div>
  );
}
