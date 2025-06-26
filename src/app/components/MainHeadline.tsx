export const MainHeadline = () => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="flex items-center 2xl:gap-x-[20px] gap-x-[10px]">
          <span className="aspect-square 2xl:w-[32px] w-[26px] bg-(--red) block rounded-full"></span>
          <span className="2xl:text-5xl lg:text-3xl text-(--foreground) font-[Bounded] font-[566]">
            Воскресенье
          </span>
        </h2>
        <p className="2xl:text-4xl lg:text-2xl">8 июня, 2025</p>
      </div>
      <div className="flex items-center gap-x-[10px]">
        <div className="flex items-start flex-col 2xl:gap-y-[20px] lg:gap-y-[10px] pb-[8px] bg-(--white) rounded-[20px] p-[12px]">
          <div className="flex items-start justify-between w-full">
            <p className="2xl:text-5xl lg:text-3xl font-[Bounded] font-[566] text-(--foreground)">
              85
            </p>
            <span className="aspect-square w-[20px] bg-(--red) block rounded-full"></span>
          </div>
          <p className="font-[Bounded] font-[566] text-(--foreground) opacity-[0.3] 2xl:text-2xl lg:text-[20px]">
            Не пришли
          </p>
        </div>
        <div className="flex items-start flex-col 2xl:gap-y-[20px] lg:gap-y-[10px] pb-[8px] bg-(--white) rounded-[20px] p-[12px]">
          <div className="flex items-start justify-between w-full">
            <p className="2xl:text-5xl lg:text-3xl font-[Bounded] font-[566] text-(--foreground)">
              3
            </p>
            <span className="aspect-square w-[20px] bg-(--yellow) block rounded-full"></span>
          </div>
          <p className="font-[Bounded] font-[566] text-(--foreground) opacity-[0.3] 2xl:text-2xl lg:text-[20px]">
            Опаздали
          </p>
        </div>
        <div className="flex items-start flex-col 2xl:gap-y-[20px] lg:gap-y-[10px] pb-[8px] bg-(--white) rounded-[20px] p-[12px]">
          <div className="flex items-start justify-between w-full">
            <p className="2xl:text-5xl lg:text-3xl font-[Bounded] font-[566] text-(--foreground)">
              29
            </p>
            <span className="aspect-square w-[20px] bg-(--green) block rounded-full"></span>
          </div>
          <p className="font-[Bounded] font-[566] text-(--foreground) opacity-[0.3] 2xl:text-2xl lg:text-[20px]">
            Пришли
          </p>
        </div>
      </div>
    </div>
  );
};
