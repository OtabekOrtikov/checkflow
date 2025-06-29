interface PageHeadlineProps {
  title: string;
  isCountVisible?: boolean;
  count?: number;
  children?: React.ReactNode;
}

export const PageHeadline = ({
  title,
  isCountVisible = true,
  count,
  children,
}: PageHeadlineProps) => {
  return (
    <div className="flex items-center justify-start w-full">
      <h2 className="flex items-center gap-x-[10px]">
        <span className="2xl:text-5xl lg:text-3xl text-(--foreground) font-[Bounded] font-[566]">
          {title}
        </span>
        {isCountVisible && count !== undefined && (
          <span className="text-(--primary) font-[Bounded] font-[466] 2xl:text-[32px] lg:text-[24px] text-[20px] 2xl:mb-[20px] mb-[15px]">
            ({count} ч.)
          </span>
        )}
      </h2>
      {children}
    </div>
  );
};
