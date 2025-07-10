'use client';

import React from 'react';
import { AttendanceSummary } from '@/types/checkflow';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DashboardSummaryProps {
  data: AttendanceSummary;
}

const DashboardSummary: React.FC<DashboardSummaryProps> = ({ data }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'arrived':
        return 'text-green-600';
      case 'late':
        return 'text-yellow-600';
      case 'no_show':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'arrived':
        return 'Пришёл';
      case 'late':
        return 'Опоздал';
      case 'no_show':
        return 'Не пришёл';
      default:
        return 'Неизвестно';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="px-6 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">📊 Сводка на сегодня</h3>
          </div>
          <div className="text-sm text-blue-600 cursor-pointer hover:text-blue-700">
            Добавить приход и уход
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Сотрудник
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Должность
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Пришёл
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ушёл
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Опоздал
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ушёл раньше
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">Абдиев Амир</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-600">Product менеджер</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">10:22</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">18:00</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-yellow-600 font-medium">00:22</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-red-600 font-medium">03:00</div>
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">Латыпов Артём</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-600">Flutter разработчик</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">10:00</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">18:00</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-400">-</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-red-600 font-medium">01:00</div>
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">Аслан</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-600">Backend Developer</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">08:34</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">-</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-400">-</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-400">-</div>
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">Исламов Камрон</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-600">UX/UI Дизайнер</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">12:56</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">17:50</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-yellow-600 font-medium">02:56</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-red-600 font-medium">01:10</div>
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">Ахмедов Ислом</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-600">Frontend Developer</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">10:01</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">-</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-yellow-600 font-medium">00:01</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-400">-</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div className="px-6 py-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Показаны пришедшие <span className="font-medium">1-6 из 32</span>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50">
              <ChevronLeft size={16} />
            </button>
            <div className="flex items-center space-x-1">
              <button className="px-3 py-1 rounded-lg bg-blue-600 text-white text-sm font-medium">1</button>
              <button className="px-3 py-1 rounded-lg text-gray-600 hover:bg-gray-50 text-sm">2</button>
              <button className="px-3 py-1 rounded-lg text-gray-600 hover:bg-gray-50 text-sm">3</button>
              <span className="text-gray-400">...</span>
              <button className="px-3 py-1 rounded-lg text-gray-600 hover:bg-gray-50 text-sm">12</button>
            </div>
            <button className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSummary;