import LocationIcon from "@/assets/icons/locationIcon.svg";
import { Device } from "@/types/devices.t";

interface DevicesCardProps {
  data: Device;
}

export const DevicesCard = ({ data }: DevicesCardProps) => {
  return (
    <div className="flex flex-col gap-[10px] bg-(--background) p-[12px] rounded-[10px] pb-[8px] h-full">
      <p className="font-[Bounded] font-[466] text-(--foreground) text-[16px] xl:text-[24px] flex items-center justify-start gap-x-[10px]">
        <span
          className={`xl:w-[20px] w-[16px] aspect-square block rounded-full ${
            data.status === "online" ? "bg-(--green)" : "bg-(--yellow)"
          }`}
        ></span>
        <span>{data.name}</span>
      </p>
      <p className="flex flex-col gap-0 my-auto">
        <span className="font-regular text-[16px] text-(--foreground) opacity-50">
          Последнее соединение
        </span>
        <span className="font-[Bounded] 2xl:text-[24px] text-[18px] font-[466] text-(--foreground)">
          {data.lastConnection}
        </span>
      </p>
      <p className="flex items-center gap-[10px]">
        <span className="text-(--primary)">
          <LocationIcon className="w-[24px]" />
        </span>
        <span className="truncate font-bold text-[16px] text-[var(--foreground)]">
          {data.location}
        </span>
      </p>
    </div>
  );
};
