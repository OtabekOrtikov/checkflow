import { AttendanceSummary } from "@/types/attendance.t";
import { formatDate } from "@/utils/formatDate";

interface MainHeadlineProps {
  summary: AttendanceSummary | undefined;
}

export const MainHeadline: React.FC<MainHeadlineProps> = ({ summary }) => {
  return (
    <div className="flex justify-between sm:items-center w-full gap-[20px] sm:flex-row flex-col">
      <div>
        <h2 className="flex items-center 2xl:gap-x-[20px] gap-x-[10px]">
          <span className="aspect-square 2xl:w-[32px] w-[26px] bg-[var(--red)] block rounded-full"></span>
          <span className="2xl:text-5xl lg:text-3xl text-[var(--foreground)] font-[Bounded] font-[566]">
            {formatDate(new Date(), "eeee")}
          </span>
        </h2>
        <p className="2xl:text-4xl lg:text-2xl font-[Bounded] font-[466] opacity-30 whitespace-nowrap">
          {formatDate(new Date(), "d MMMM, yyyy")}
        </p>
      </div>

      <div className="flex items-center gap-x-[10px] overflow-x-auto lg:max-w-fit max-w-[400px]">
        <div className="flex items-start flex-col 2xl:gap-y-[20px] lg:gap-y-[10px] pb-[8px] bg-[var(--white)] rounded-[20px] p-[12px]">
          <div className="flex items-start justify-between w-full">
            <p className="2xl:text-5xl lg:text-3xl font-[Bounded] font-[566] text-[var(--foreground)]">
              {summary?.not_arrived}
            </p>
            <span className="aspect-square w-[20px] bg-[var(--red)] block rounded-full"></span>
          </div>
          <p className="font-[Bounded] font-[566] text-[var(--foreground)] opacity-[0.3] 2xl:text-2xl lg:text-[20px] whitespace-nowrap">
            Не пришли
          </p>
        </div>
        <div className="flex items-start flex-col 2xl:gap-y-[20px] lg:gap-y-[10px] pb-[8px] bg-[var(--white)] rounded-[20px] p-[12px]">
          <div className="flex items-start justify-between w-full">
            <p className="2xl:text-5xl lg:text-3xl font-[Bounded] font-[566] text-[var(--foreground)]">
              {summary?.late}
            </p>
            <span className="aspect-square w-[20px] bg-[var(--yellow)] block rounded-full"></span>
          </div>
          <p className="font-[Bounded] font-[566] text-[var(--foreground)] opacity-[0.3] 2xl:text-2xl lg:text-[20px] whitespace-nowrap">
            Опаздали
          </p>
        </div>
        <div className="flex items-start flex-col 2xl:gap-y-[20px] lg:gap-y-[10px] pb-[8px] bg-[var(--white)] rounded-[20px] p-[12px]">
          <div className="flex items-start justify-between w-full">
            <p className="2xl:text-5xl lg:text-3xl font-[Bounded] font-[566] text-[var(--foreground)]">
              {summary?.on_time}
            </p>
            <span className="aspect-square w-[20px] bg-[var(--green)] block rounded-full"></span>
          </div>
          <p className="font-[Bounded] font-[566] text-[var(--foreground)] opacity-[0.3] 2xl:text-2xl lg:text-[20px] whitespace-nowrap">
            Пришли
          </p>
        </div>
      </div>
    </div>
  );
};
