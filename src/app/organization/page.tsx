import { Navbar } from "@/components/Navbar";
import { PageHeadline } from "@/components/PageHeadline";
import PlusInCircle from "@/assets/icons/plusInCircle.svg";
import Link from "next/link";

export default function OrganizationPage() {
  return (
    <div className="flex items-start">
      <Navbar />

      <main className="flex-1 p-[30px] w-full flex flex-col gap-y-[20px]">
        <PageHeadline title="Организация">
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
      </main>
    </div>
  );
}
