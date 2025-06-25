"use client";

import { TableHeadline } from "@/components/TableHeadline";
import DisciplinedIcon from "@/assets/icons/disciplinedIcon.svg";
import { Disciplined } from "@/types/discipline.t";
import { useEffect, useState } from "react";
import { fetchDisciplined } from "@/services/disciplinedService";
import { DisciplinedCard } from "@/components/DisciplinedCard";

export const TopDisciplined = () => {
  // Here you would typically fetch the data for the top disciplined users
  // For now, we will just return a placeholder component
  const [data, setData] = useState<Disciplined[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDisciplined()
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
        title="Топ дисциплинированные"
        icon={<DisciplinedIcon />}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px]">
        {data.map((item) => (
          <DisciplinedCard key={item.id} data={item} />
        ))}
      </div>
    </section>
  );
};
