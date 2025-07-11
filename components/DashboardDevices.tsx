"use client";

import React from "react";
import { Device } from "@/types/checkflow";
import MapPin from "@/assets/icons/MapPin.svg";
import { TableHeadline } from "./layout/TableHeadline";
import DeviceIcon from "@/assets/icons/DeviceIcon.svg";
import { useRouter } from "next/navigation";
import { formatDate } from "@/utils/formatDate";

interface DashboardDevicesProps {
  devices: Device[];
}

const DashboardDevices: React.FC<DashboardDevicesProps> = ({ devices }) => {
  const router = useRouter();
  const handleAllDevicesClick = () => {
    // Navigate to all devices page or perform any action
    router.push("/devices");
  };

  return (
    <div className="board">
      <TableHeadline
        title={"Устройства"}
        icon={
          <DeviceIcon className="w-[24px] aspect-square text-[var(--primary)]" />
        }
        btn
        btnText="Все устройства"
        onClick={handleAllDevicesClick}
      />

      <div className="grid grid-col-1 lg:grid-cols-2 gap-2 5 flex-grow">
        {devices.map((device) => (
          <div
            key={device.id}
            className="flex flex-col min-h-[115px] lg:min-h-[220px] bg-[var(--background)] rounded-[10px] 
            border border-[var(--gray-e6)] p-3 flex-grow"
          >
            <div className="flex items-center gap-2.5">
              <div
                className={`w-[20px] aspect-square rounded-full ${
                  device.is_active ? "bg-[var(--green)]" : "bg-[var(--red)]"
                }`}
              ></div>
              <p className="text-2xl text-[var(--foreground)] font-[Bounded] font-[466]">
                {device.device_id}
              </p>
            </div>

            <div className="flex flex-col my-auto">
              <p className="text-[16px] opacity-50">Последнее соединение</p>

              <p className="text-2xl text-[var(--foreground)] font-[Bounded] font-[566]">
                {formatDate(new Date(device.updated_at), "dd.MM.yyyy в HH:mm")}
              </p>
            </div>

            <div className="flex items-center gap-2.5 mt-auto">
              <MapPin className="text-[var(--primary)]" />
              <p className="text-[16px] text-[var(--foreground)] font-[700]">
                {device.location}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardDevices;
