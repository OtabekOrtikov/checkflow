'use client';

import React from 'react';
import { DisciplineUser } from '@/types/checkflow';

interface DashboardTopProps {
  disciplined: DisciplineUser[];
  undisciplined: DisciplineUser[];
}

const DashboardTop: React.FC<DashboardTopProps> = ({ disciplined, undisciplined }) => {
  const TopCard = ({ 
    title, 
    users, 
    icon,
    isDisciplined = true
  }: { 
    title: string, 
    users: DisciplineUser[], 
    icon: string,
    isDisciplined?: boolean
  }) => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <span className="text-lg">{icon}</span>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      <div className="space-y-4">
        {users.slice(0, 4).map((user, index) => (
          <div key={user.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${isDisciplined ? 'bg-gray-400' : 'bg-red-500'}`}></div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className={`text-lg font-bold ${isDisciplined ? 'text-gray-700' : 'text-red-600'}`}>
                    {user.attendanceRate}%
                  </span>
                  <span className="text-sm text-gray-500">
                    {isDisciplined ? 'Full Stack Developer' : 'UX/UI Designer'}
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
              </div>
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
        icon="📊"
        isDisciplined={true}
      />
      <TopCard
        title="Топ недисциплинированные"
        users={undisciplined}
        icon="📊"
        isDisciplined={false}
      />
    </div>
  );
};

export default DashboardTop;