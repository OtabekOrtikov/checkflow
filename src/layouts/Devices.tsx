"use client";

import { TableHeadline } from "@/components/TableHeadline";
import DevicesIcon from "@/assets/icons/devicesIcon.svg";
import { Device } from "@/types/devices.t";
import { useEffect, useState } from "react";
import { fetchDevices } from "@/services/devicesService";
import { DevicesCard } from "@/app/components/DevicesCard";

export const Devices = () => {
  const [data, setData] = useState<Device[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDevices()
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section className="flex-1 border border-(--gray-e6) h-full p-[20px] flex gap-[10px] flex-col rounded-[20px] bg-(--white) w-full">
      <TableHeadline
        isIconVisible
        isButtonVisible={false}
        title="Устройства"
        icon={<DevicesIcon />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[10px] h-full">
        {data.map((item) => (
          <DevicesCard key={item.id} data={item} />
        ))}
      </div>
    </section>
  );
};
