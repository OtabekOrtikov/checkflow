import { NavSection } from "@/types/navbar.t";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BackToHome } from "./layout/BackToHome";

interface NavbarProps {
  data: NavSection[];
}

export const Navbar = ({ data }: NavbarProps) => {
  const pathname = usePathname();

  const parentItems = data
    .flatMap((sec) => sec.items)
    .filter((i) => Array.isArray(i.items));

  const activeParent = parentItems.find((i) => {
    // если точное совпадение /organization
    if (pathname === i.href) return true;
    // если мы на одном из sub-routes: /organization/…
    if (i.items!.some((sub) => pathname === sub.href)) return true;
    // либо просто startsWith для вложенных страниц
    return pathname.startsWith(i.href + "/");
  });

  if (activeParent) {
    const parentSection = data.find((sec) => sec.items.includes(activeParent))!;

    return (
      <div className="w-full">
        <BackToHome />

        <nav className="flex items-start flex-col justify-start flex-1 gap-y-[5px] max-h-[540px] overflow-y-auto">
          <p className="text-black text-[16px] mb-[5px]">
            {parentSection.title}
          </p>

          <Link
            href={activeParent.href}
            className={`flex items-center rounded-[15px] 
                        justify-start gap-x-[10px] text-[20px] 
                        font-semibold text-[var(--primary)] px-[20px] 
                        min-h-[60px] bg-[var(--background)] w-full border-1 border-primary 
                        transition-all`}
          >
            {activeParent.icon}
            <p>{activeParent.title}</p>
          </Link>

          <ul className="space-y-2 flex max-w-[calc(100%-35px)] w-full flex-col ml-auto">
            {activeParent.items!.map((sub) => {
              const isActive = pathname === sub.href;

              return (
                <li key={sub.href} className="w-full">
                  <Link
                    href={sub.href}
                    className={`flex items-center rounded-[15px] 
                        justify-start gap-x-[10px] text-[20px] 
                        font-semibold text-[var(--black-50)] px-[20px] 
                        min-h-[60px] w-full border-1 border-transparent 
                        hover:border-[var(--black-10)] hover:text-[var(--foreground)] transition-all ${
                          isActive
                            ? "text-[var(--foreground)] bg-[var(--background)] hover:border-transparent"
                            : ""
                        }`}
                  >
                    <p>{sub.title}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    );
  }
  return (
    <>
      {data.map((item) => (
        <div
          key={item.title}
          className="flex items-start flex-col justify-start gap-y-[10px] w-full"
        >
          <h3 className="text-black text-[16px] font-medium">{item.title}</h3>
          <ul className="space-y-1 w-full">
            {item.items.map((i) => {
              const isActive = pathname === i.href;

              return (
                <li key={i.href}>
                  <Link
                    href={i.href}
                    className={`flex items-center rounded-[15px] 
                        justify-start gap-x-[10px] text-[20px] 
                        font-semibold text-[var(--grey-80)] px-[20px] 
                        min-h-[60px] w-full border border-transparent 
                        hover:border-[var(--black-10)] hover:text-[var(--foreground)] transition-all 
                        ${
                          isActive
                            ? `text-[var(--primary)] bg-[var(--background)]
                            hover:border-transparent 
                            hover:text-[var(--primary)] hover:bg-[var(--background)]`
                            : ""
                        }`}
                  >
                    <p>{i.icon}</p>
                    <p>{i.title}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </>
  );
};
