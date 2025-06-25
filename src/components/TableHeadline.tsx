import Link from "next/link";

interface TableHeadlineProps {
  title: string;
  isIconVisible: boolean;
  isButtonVisible: boolean;
  buttonText?: string;
  buttonLink?: string;
  icon?: React.ReactNode;
  btnIcon?: React.ReactNode;
}

export const TableHeadline = (props: TableHeadlineProps) => {
  return (
    <div className="flex justify-between items-center">
      <h3 className="flex justify-start items-center gap-x-[10px] 2xl:text-[24px] lg:text-[20px] md:text-[18px] text-[16px] font-[Bounded] font-[566] text-(--foreground)">
        {props.isIconVisible && (
          <span className={`text-(--primary)`}>
            {props.icon}
          </span>
        )}
        <span>{props.title}</span>
      </h3>
      {props.isButtonVisible && (
        <Link
          href={props.buttonLink || "#"}
          className={`flex items-center gap-x-[5px] bg-transparent border border-(--black-10) p-[10px] rounded-[50px] text-(--primary) cursor-pointer`}
        >
          {props.btnIcon}
          <span>{props.buttonText}</span>
        </Link>
      )}
    </div>
  );
};
