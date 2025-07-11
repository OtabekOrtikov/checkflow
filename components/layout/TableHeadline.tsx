interface TableHeadlineProps {
  title: string;
  icon?: React.ReactNode;
  btn?: boolean;
  btnIcon?: React.ReactNode;
  btnText?: string;
  onClick?: () => void;
}

export const TableHeadline = ({
  title,
  icon,
  btn,
  btnIcon,
  btnText,
  onClick,
}: TableHeadlineProps) => {
  return (
    <div className="flex justify-between items-start sm:items-center flex-col sm:flex-row gap-2.5">
      <h3 className=" whitespace-nowrap flex justify-start items-center gap-x-[10px] 2xl:text-[24px] lg:text-[20px] md:text-[18px] text-[16px] font-[Bounded] font-[566] text-[var(--foreground)]">
        {icon && <span className="icon">{icon}</span>}
        <span>{title}</span>
      </h3>
      {btn && (
        <button
          type="button"
          onClick={onClick}
          className={`flex items-center gap-x-[5px] w-full sm:w-fit bg-transparent border border-[var(--black-10)] p-[10px] rounded-[50px] text-[var(--primary)] cursor-pointer`}
        >
          {btnIcon}
          <span>{btnText}</span>
        </button>
      )}
    </div>
  );
};
