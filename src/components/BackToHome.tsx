import Link from "next/link";
import BackIcon from "@/assets/icons/arrow-left.svg";

export const BackToHome = () => {
  return (
    <Link
      href="/"
      className="flex items-center justify-start px-[20px] 
      min-h-[60px] bg-(--background) rounded-[15px] 
      text-(--primary) gap-x-[10px] font-semibold text-[16px] 2xl:text-[20px]"
    >
      <BackIcon width="24px" />
      Назад на главную
    </Link>
  );
};
