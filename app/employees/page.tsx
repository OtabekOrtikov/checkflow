// app/employees/page.tsx
"use client";

import { useState, useMemo, Fragment } from "react";
import useSWR from "swr";
import Layout from "@/components/Layout";
import ProtectedRoute from "@/components/ProtectedRoute";
import FilterBar from "@/components/employees/FilterBar";
import EmployeeTable from "@/components/employees/EmployeeTable";
import EmployeeModal from "@/components/employees/EmployeeModal";
import { Footer } from "@/components/Footer";

import { employeeService } from "@/services/employeeService";
import { departmentService } from "@/services/departmentService";
import { positionService } from "@/services/positionService";

import { Employee } from "@/types/employee.t";
import { Department } from "@/types/department.t";
import { Position } from "@/types/position.t";
import { Loading } from "@/components/Loading";

export default function EmployeesPage() {
  // 1. Data-fetching hooks
  const {
    data: allEmployees = [],
    error: empError,
    mutate: mutateEmployees,
  } = useSWR<Employee[]>("employees", employeeService.getEmployees);

  const { data: departments = [], error: deptError } = useSWR<Department[]>(
    "departments",
    departmentService.getDepartments
  );

  const { data: positions = [], error: posError } = useSWR<Position[]>(
    "positions",
    positionService.getPositions
  );

  // 2. UI state hooks
  const [filters, setFilters] = useState({
    status: "all" as "all" | "active" | "fired",
    workplace: "all" as number | "all",
    position: "all" as number | "all",
    created: "",
    salaryMin: "",
    salaryMax: "",
    search: "",
  });

  const [page, setPage] = useState(1);
  const pageSize = 15;

  const [modalOpen, setModalOpen] = useState(false);

  // 3. Always-call lookup maps BEFORE any early return
  const deptMap = useMemo(() => {
    return departments.reduce<Record<number, string>>((map, d) => {
      map[d.id] = d.name;
      return map;
    }, {});
  }, [departments]);

  const posMap = useMemo(() => {
    return positions.reduce<Record<number, string>>((map, p) => {
      map[p.id] = p.name;
      return map;
    }, {});
  }, [positions]);

  // 4. Always-call your filtered list before any return
  const filtered = useMemo(() => {
    return allEmployees
      .filter((e) => {
        if (filters.status === "active") return e.is_active && !e.is_fired;
        if (filters.status === "fired") return e.is_fired;
        return true;
      })
      .filter((e) =>
        filters.workplace === "all"
          ? true
          : e.place_of_work === filters.workplace
      )
      .filter((e) =>
        filters.position === "all" ? true : e.position === filters.position
      )
      .filter((e) =>
        !filters.created ? true : e.created_at.startsWith(filters.created)
      )
      .filter((e) => {
        const s = Number(e.salary);
        if (filters.salaryMin && s < +filters.salaryMin) return false;
        if (filters.salaryMax && s > +filters.salaryMax) return false;
        return true;
      })
      .filter((e) => {
        const q = filters.search.toLowerCase();
        return (
          e.full_name.toLowerCase().includes(q) ||
          e.employee_no.includes(q) ||
          e.salary.includes(q)
        );
      });
  }, [allEmployees, filters]);

  // 5. Pagination slice
  const pageCount = Math.ceil(filtered.length / pageSize);
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  // 6. Now do your early returns
  if (empError || deptError || posError) {
    return (
      <div className="p-4 text-red-500">
        Ошибка загрузки данных. Пожалуйста, перезагрузите.
      </div>
    );
  }

  if (!allEmployees.length || !departments.length || !positions.length) {
    return <Loading />;
  }

  // 7. Finally, render your layout
  return (
    <ProtectedRoute>
      <Layout>
        <div className="page-headline mb-4">
          <div className="page-headline__title">
            <h2 className="text-2xl font-semibold page-headline__h">Сотрудники</h2>
          </div>
        </div>

        <FilterBar
          all={allEmployees}
          filters={filters}
          onChange={(changes) => {
            setPage(1);
            setFilters((f) => ({ ...f, ...changes }));
          }}
          setModalOpen={setModalOpen}
        />

        <EmployeeTable
          data={paged}
          total={filtered.length}
          page={page}
          pageSize={pageSize}
          onPageChange={setPage}
          deptMap={deptMap}
          posMap={posMap}
        />

        <EmployeeModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSaved={async () => {
            await mutateEmployees();
            setModalOpen(false);
          }}
        />

        <Footer />
      </Layout>
    </ProtectedRoute>
  );
}
