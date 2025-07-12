"use client";

import { Listbox, Transition, Dialog } from "@headlessui/react";
import { ChevronDown, Check } from "lucide-react";
import { useState, Fragment, useMemo } from "react";
import useSWR from "swr";
import Layout from "@/components/Layout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { employeeService } from "@/services/employeeService";
import { Employee } from "@/types/employee.t";
import Pagination from "@/components/layout/Pagination";

type Status = "all" | "active" | "fired";

export default function EmployeesPage() {
  const { data: all, error } = useSWR<Employee[]>(
    "employees",
    employeeService.getEmployees
  );
  const [filterActive, setFilterActive] = useState<Status>("all");
  const [filterWorkplace, setFilterWorkplace] = useState<number | "all">("all");
  const [filterPosition, setFilterPosition] = useState<number | "all">("all");
  const [filterCreated, setFilterCreated] = useState<string>(""); // YYYY-MM-DD
  const [filterSalaryMin, setFilterSalaryMin] = useState<string>("");
  const [filterSalaryMax, setFilterSalaryMax] = useState<string>("");

  // 2) Поиск
  const [search, setSearch] = useState("");

  // 3) Пагинация
  const [page, setPage] = useState(1);
  const pageSize = 15;
  // Modal open state
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Form fields for new employee
  const [formData, setFormData] = useState({
    employee_no: "",
    full_name: "",
    gender: "female" as "female" | "male",
    place_of_work: 0,
    position: 0,
    department: 0,
    shift: 0,
    salary: "",
    is_active: true,
    is_fired: false,
  });

  if (error) return <div>Error loading data</div>;

  // Применяем фильтры + поиск
  const filtered = useMemo(() => {
    if (!all) return [];
    return all
      .filter((e) => {
        if (filterActive === "active") return e.is_active && !e.is_fired;
        if (filterActive === "fired") return e.is_fired;
        return true;
      })
      .filter((e) => {
        if (filterWorkplace !== "all")
          return e.place_of_work === filterWorkplace;
        return true;
      })
      .filter((e) => {
        if (filterPosition !== "all") return e.position === filterPosition;
        return true;
      })
      .filter((e) => {
        if (!filterCreated) return true;
        return e.created_at.startsWith(filterCreated);
      })
      .filter((e) => {
        const sal = Number(e.salary);
        if (filterSalaryMin && sal < Number(filterSalaryMin)) return false;
        if (filterSalaryMax && sal > Number(filterSalaryMax)) return false;
        return true;
      })
      .filter((e) => {
        const needle = search.toLowerCase();
        return (
          e.full_name.toLowerCase().includes(needle) ||
          e.employee_no.toLowerCase().includes(needle) ||
          e.salary.includes(needle)
          // + можно добавить другие поля
        );
      });
  }, [
    all,
    filterActive,
    filterWorkplace,
    filterPosition,
    filterCreated,
    filterSalaryMin,
    filterSalaryMax,
    search,
  ]);

  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);
  const pageCount = Math.ceil(filtered.length / pageSize);

  return (
    <ProtectedRoute>
      <Layout>
        <div className="page-headline">
          <div className="page-headline__title">
            <h2 className="page-headline__h">Сотрудники</h2>
            <p className="page-headline__counter">(116 ч.)</p>
          </div>
        </div>

        {!all && <div>Loading…</div>}

        <div className="flex flex-wrap items-center gap-3 mb-6">
          {/* Status Listbox */}
          <div className="w-40 relative">
            <Listbox
              value={filterActive}
              onChange={(val: Status) => {
                setFilterActive(val);
                // reset page if you have pagination…
              }}
            >
              <Listbox.Button
                className="w-full flex justify-between items-center px-4 py-2 
                           bg-white border border-gray-200 rounded-full 
                           text-gray-700 hover:border-gray-300 transition"
              >
                {
                  {
                    all: "Все статусы",
                    active: "Активные",
                    fired: "Уволенные",
                  }[filterActive]
                }
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options
                  className="absolute mt-1 w-full bg-white border border-gray-200 
                             rounded-lg shadow-lg z-10 overflow-auto max-h-60"
                >
                  {[
                    { value: "all" as Status, label: "Все статусы" },
                    { value: "active" as Status, label: "Активные" },
                    { value: "fired" as Status, label: "Уволенные" },
                  ].map((opt) => (
                    <Listbox.Option
                      key={opt.value}
                      value={opt.value}
                      className={({ active }) =>
                        `cursor-pointer select-none px-4 py-2 flex items-center justify-between
                         ${
                           active
                             ? "bg-gray-100 text-gray-900"
                             : "text-gray-700"
                         }`
                      }
                    >
                      {opt.label}
                      {filterActive === opt.value && (
                        <Check className="w-4 h-4 text-green-500" />
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </Listbox>
          </div>

          {/* Repeat the same pattern for Workplace, Position, etc. */}
          {/* ... */}
          {/* Add Employee button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="ml-auto bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
          >
            Добавить
          </button>
        </div>

        {/* Add / Edit Employee Modal */}
        <Transition.Root show={isModalOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50" onClose={setIsModalOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-30" />
            </Transition.Child>
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4">
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-out duration-300 transform"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="transition ease-in duration-200 transform"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-lg bg-white rounded-lg p-6">
                    <Dialog.Title className="text-xl font-semibold mb-4">
                      Добавить сотрудника
                    </Dialog.Title>
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        await employeeService.createEmployee(formData);
                        setIsModalOpen(false);
                        // revalidate list
                      }}
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Табельный номер"
                          value={formData.employee_no}
                          onChange={(e) =>
                            setFormData({ ...formData, employee_no: e.target.value })
                          }
                          className="w-full p-2 border rounded-lg"
                          required
                        />
                        <input
                          type="text"
                          placeholder="Полное имя"
                          value={formData.full_name}
                          onChange={(e) =>
                            setFormData({ ...formData, full_name: e.target.value })
                          }
                          className="w-full p-2 border rounded-lg"
                          required
                        />
                      </div>
                      <div className="flex items-center gap-4">
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="gender"
                            value="female"
                            checked={formData.gender === "female"}
                            onChange={() =>
                              setFormData({ ...formData, gender: "female" })
                            }
                          />
                          <span>Ж</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="gender"
                            value="male"
                            checked={formData.gender === "male"}
                            onChange={() =>
                              setFormData({ ...formData, gender: "male" })
                            }
                          />
                          <span>М</span>
                        </label>
                      </div>
                      {/* Additional fields for place_of_work, position, department, shift */}
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="number"
                          placeholder="Место работы"
                          value={formData.place_of_work}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              place_of_work: Number(e.target.value),
                            })
                          }
                          className="w-full p-2 border rounded-lg"
                          required
                        />
                        <input
                          type="number"
                          placeholder="Должность"
                          value={formData.position}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              position: Number(e.target.value),
                            })
                          }
                          className="w-full p-2 border rounded-lg"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="number"
                          placeholder="Отдел"
                          value={formData.department}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              department: Number(e.target.value),
                            })
                          }
                          className="w-full p-2 border rounded-lg"
                          required
                        />
                        <input
                          type="number"
                          placeholder="Смена"
                          value={formData.shift}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              shift: Number(e.target.value),
                            })
                          }
                          className="w-full p-2 border rounded-lg"
                          required
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Зарплата"
                        value={formData.salary}
                        onChange={(e) =>
                          setFormData({ ...formData, salary: e.target.value })
                        }
                        className="w-full p-2 border rounded-lg"
                        required
                      />
                      <div className="flex justify-end space-x-2 pt-4">
                        <button
                          type="button"
                          onClick={() => setIsModalOpen(false)}
                          className="px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100 transition"
                        >
                          Отмена
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
                        >
                          Сохранить
                        </button>
                      </div>
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        <table className="min-w-full divide-y divide-gray-200 mb-4">
          <thead className="bg-[var(--background)]">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Сотрудник
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Таб. №
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Пол
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Должность
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Отдел
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Зарплата
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {paged.map((e) => (
              <tr key={e.id}>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {e.full_name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {e.employee_no}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {e.gender === "female" ? "Ж" : "М"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {e.position}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {e.department}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 font-semibold">
                  {e.salary} сум
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          total={filtered.length}
          page={page}
          pageSize={pageSize}
          onPageChange={(p) => setPage(p)}
        />
      </Layout>
    </ProtectedRoute>
  );
}
