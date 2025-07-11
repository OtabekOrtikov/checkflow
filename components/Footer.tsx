import Logo from "@/assets/images/xeond.svg";
import Link from "next/link";

export const Footer = () => {
  return (
    <div className="board !rounded-full mt-auto">
      <div className="flex items-center justify-between p-4 flex-col gap-4 lg:flex-row">
        <Link href={"#"}>
          <Logo className="w-[170px] h-auto text-[#1967F2]" />
        </Link>
        <div className="flex items-center gap-12 *:text-2xl font-medium text-[var(--foreground)] opacity-70">
          <Link href={"#"}>О нас</Link>
          <Link href={"#"}>Помощь</Link>
          <Link href={"#"}>Поиск</Link>
        </div>
      </div>
    </div>
  );
};
