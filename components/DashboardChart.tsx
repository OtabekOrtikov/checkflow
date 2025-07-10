'use client';

import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { StatsResponse } from '@/types/checkflow';

interface DashboardChartProps {
  data: StatsResponse;
  onPeriodChange: (period: 'week' | 'month' | 'year') => void;
}

const DashboardChart: React.FC<DashboardChartProps> = ({ data, onPeriodChange }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const handlePeriodChange = (period: 'week' | 'month' | 'year') => {
    setSelectedPeriod(period);
    onPeriodChange(period);
  };

  const chartData = [
    { name: 'Понедельник', value: 125 },
    { name: 'Вторник', value: 75 },
    { name: 'Среда', value: 100 },
    { name: 'Четверг', value: 125 },
    { name: 'Пятница', value: 50 },
    { name: 'Суббота', value: 25 },
    { name: 'Воскресенье', value: 25 },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="px-6 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg">📈</span>
            <h3 className="text-lg font-semibold text-gray-900">Статистика посещений</h3>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePeriodChange('week')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedPeriod === 'week'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Неделя
            </button>
            <button
              onClick={() => handlePeriodChange('month')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedPeriod === 'month'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Месяц
            </button>
            <button
              onClick={() => handlePeriodChange('year')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedPeriod === 'year'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Год
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6B7280' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6B7280' }}
                domain={[0, 200]}
                ticks={[0, 25, 50, 75, 100, 150, 200]}
              />
              <Bar 
                dataKey="value" 
                fill="#3B82F6" 
                radius={[8, 8, 0, 0]}
                maxBarSize={60}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardChart;