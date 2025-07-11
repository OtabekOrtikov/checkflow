"use client";

import React from "react";
import { TableHeadline } from "./layout/TableHeadline";
import TopIcon from "@/assets/icons/TopIcon.svg";
import { Disciplinary } from "@/types/checkflow";

interface DashboardTopProps {
  disciplined: Disciplinary[];
  undisciplined: Disciplinary[];
}

const DashboardTop: React.FC<DashboardTopProps> = ({
  disciplined,
  undisciplined,
}) => {
  const TopCard = ({
    title,
    users,
    icon,
    isDisciplined = true,
  }: {
    title: string;
    users: Disciplinary[];
    icon: React.ReactNode;
    isDisciplined?: boolean;
  }) => (
    <div className="board">
      <TableHeadline title={title} icon={icon} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2.5 flex-grow">
        {users.map((user, index) => (
          <div
            key={index}
            className="flex flex-col min-h-[105px] 
            px-3 pt-3 pb-2 bg-[var(--background)] 
            rounded-[10px] border border-[var(--gray-e6)] flex-grow"
          >
            <div className="flex items-center gap-2.5">
              <div
                className={`
                w-[20px] aspect-square rounded-full 
                ${isDisciplined ? "bg-[#808080]" : "bg-[var(--red)]"}
                `}
              ></div>
              <p className="text-2xl font-[466] font-[Bounded] text-[var(--foreground)]">
                {user.attendance_percent}%
              </p>
            </div>

            <div className="flex flex-col mt-auto">
              <p className="text-[16px] opacity-50 font-[400]">
                {user.position}
              </p>
              <p className="text-2xl font-[466] font-[Bounded] text-[var(--foreground)]">
                {user.full_name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <TopCard
        title="Топ дисциплинированные"
        users={disciplined}
        icon={<TopIcon className="w-[24px] h-[24px] text-[var(--primary)]" />}
        isDisciplined={true}
      />
      <TopCard
        title="Топ недисциплинированные"
        users={undisciplined}
        icon={<TopIcon className="w-[24px] h-[24px] text-[var(--red)]" />}
        isDisciplined={false}
      />
    </div>
  );
};

export default DashboardTop;
