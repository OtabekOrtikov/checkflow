import { TodaySummaryRow } from "@/types/attendance.t";

interface TodayReviewTableProps {
  displayed: TodaySummaryRow[];
}

export const TodayReviewTable = ({ displayed }: TodayReviewTableProps) => {
  return (
    <div className="w-full overflow-x-scroll p-[12px] bg-(--background) rounded-[10px]">
      <div
        className="ь
          min-w-fit
          grid 
          [grid-template-columns:2fr_2fr_1fr_1fr_1fr_1fr]
          gap-y-[10px]
          border-b border-gray-200
          text-center
          text-nowrap
          text-[16px]
          text-(--black-50)
          font-medium
        "
      >
        <p className="text-left">Сотрудник</p>
        <p className="text-left">Должность</p>
        <p className="">Пришел</p>
        <p className="">Ушел</p>
        <p className="">Опаздал</p>
        <p className="">Ушел раньше</p>
      </div>

      <div className="">
        {displayed.map((row) => (
          <div
            key={row.id}
            className="
              min-w-fit
              grid 
              [grid-template-columns:2fr_2fr_1fr_1fr_1fr_1fr]
              gap-y-[10px]
              border-b border-gray-200
              text-center
              text-nowrap
              text-(--foreground)
              text-[16px]
              pb-[10px]
              pt-[5px]
              last:border-b-0
              last:pb-0
            "
          >
            <div className="text-left font-medium">{row.employee}</div>
            <div className="text-left text-(--black-50)">{row.position}</div>
            <div className="">{row.arrivedAt}</div>
            <div className="">{row.leftAt ?? ""}</div>
            <div className={`text-(--yellow) font-bold`}>{row.late ?? ""}</div>
            <div className={`text-(--red) font-bold`}>
              {row.earlyLeave ?? ""}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
