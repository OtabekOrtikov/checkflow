import XeondLogo from "@/assets/images/xeond.svg";

interface FooterProps {
  className?: string;
}

export const Footer = ({
  className = "",
}: FooterProps) => {
  return (
    <footer className={`flex justify-between border border-(--gray-e6) items-center w-full h-fit bg-(--white) rounded-full px-[50px] py-[30px] ${className}`}>
      <div className="">
        <XeondLogo />
      </div>
      <ul className="flex justify-center items-center gap-x-[50px] text-(--foreground) text-[16px] xl:text-[24px] font-medium *:opacity-50 *:hover:opacity-100 *:transition">
        <li>О нас</li>
        <li>Помощь</li>
        <li>Поиск</li>
      </ul>
    </footer>
  );
};
