import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { PageHeadline } from "@/components/PageHeadline";
import PlusInCircle from "@/assets/icons/plusInCircle.svg";
import Link from "next/link";

export default function ReportsPage() {
  return (
    <div className="flex items-start">
      <Navbar />

      <main
        className="flex-1 2xl:py-[45px] 2xl:px-[50px] min-h-screen
                lg:py-[30px] lg:px-[35px] flex flex-col gap-y-[20px]"
      >
        <PageHeadline title="Отгулы">
          <div className="flex items-center gap-x-[10px] ml-auto">
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
          </div>
        </PageHeadline>

        <div className="text-center py-20 text-gray-500">Загрузка…</div>

        <Footer className="mt-auto" />
      </main>
    </div>
  );
}
