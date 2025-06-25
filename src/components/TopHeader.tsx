import Logo from "@/assets/images/logo.svg";
import BurgerIcon from "@/assets/icons/burgerIcon.svg";
import Link from "next/link";

export const TopHeader = () => {
  return (
    <div className="flex items-center justify-between gap-x-4">
      <h1 className="font-[566] font-[Bounded] text-[32px]">
        <Link href={"/"}>
          <Logo />
        </Link>
      </h1>
      <button
        type="submit"
        className="rounded-full border-1 
              border-[#E6E6E6] w-[60px] h-[60px] 
              flex sm:hidden items-center justify-center 
              cursor-pointer transition-colors bg-[#F3F5F7]"
      >
        <BurgerIcon className="h-6 w-6 text-gray-500" />
      </button>
    </div>
  );
};
