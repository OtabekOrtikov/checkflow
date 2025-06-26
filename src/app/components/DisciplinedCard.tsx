import { Disciplined } from "@/types/discipline.t";

interface DisciplinedCardProps {
  data: Disciplined;
}

export const DisciplinedCard = ({ data }: DisciplinedCardProps) => {
  return (
    <div className="flex flex-col w-full items-start justify-start p-[12px] pb-[8px] bg-(--background) rounded-[10px]">
      <p className="font-[Bounded] font-[566] text-(--foreground) text-[16px] xl:text-[24px] flex items-center justify-start gap-x-[10px]">
        <span className={`xl:w-[20px] w-[16px] aspect-square block rounded-full ${
          data.percentage > "70%"
            ? "bg-(--green)"
            : data.percentage > "50%"
            ? "bg-(--yellow)"
            : "bg-(--red)"
        }`}></span>
        <span>{data.percentage}</span>
      </p>
      <div className="flex flex-col items-start justify-start mt-[8px]">
        <p className="text-[16px] text-(--foreground) opacity-50">
          {data.position}
        </p>
        <p className="text-(--foreground) font-[Bounded] font-[566] xl:text-[24px] text-[20px]">
          {data.name}
        </p>
      </div>
    </div>
  );
};
