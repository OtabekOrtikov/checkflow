import Link from "next/link";
import BackIcon from "@/assets/icons/arrow-left.svg";

export const BackToHome = () => {
  return (
    <Link
      href="/"
      className="flex items-center justify-start px-[20px] h-[60px] bg-(--background) rounded-[15px] text-(--primary) gap-x-[10px] font-semibold"
    >
      <BackIcon />
      Назад на главную
    </Link>
  );
};
